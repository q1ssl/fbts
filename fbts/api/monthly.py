import calendar
import datetime
from collections import defaultdict
from typing import Optional, Tuple, Dict, Any

import frappe
from frappe.utils import add_days, getdate


# -----------------------------
# Helpers
# -----------------------------
def _parse_month_to_range(month: Optional[str]) -> Tuple[datetime.date, datetime.date]:
    """Return (month_start, month_end). Defaults to current month."""
    today = datetime.date.today()
    if not month or not str(month).strip():
        y, m = today.year, today.month
        start = datetime.date(y, m, 1)
        end = datetime.date(y, m, calendar.monthrange(y, m)[1])
        return start, end

    s = str(month).strip()
    y = today.year
    m = None
    for fmt in ("%b %Y", "%B %Y", "%Y-%m", "%m-%Y", "%b", "%B"):
        try:
            dt = datetime.datetime.strptime(s, fmt)
            m = dt.month
            y = dt.year if "%Y" in fmt else y
            break
        except ValueError:
            continue
    if not m:
        # last-resort year token
        for t in s.replace("-", " ").split():
            if t.isdigit() and len(t) == 4:
                y = int(t)
        try:
            m = datetime.datetime.strptime(s, "%b").month
        except ValueError:
            m = datetime.datetime.strptime(s, "%B").month

    start = datetime.date(y, m, 1)
    end = datetime.date(y, m, calendar.monthrange(y, m)[1])
    return start, end


def _format_date(d: datetime.date) -> str:
    """e.g., 1st July"""
    day = d.day
    if 11 <= day <= 13:
        suffix = "th"
    else:
        suffix = {1: "st", 2: "nd", 3: "rd"}.get(day % 10, "th")
    return f"{day}{suffix} {d.strftime('%B')}"


def _format_time(dt: Optional[datetime.datetime]) -> str:
    """Return HH:MM:SS or empty string."""
    return dt.strftime("%H:%M:%S") if dt else ""


# -----------------------------
# Main API
# -----------------------------
@frappe.whitelist(allow_guest=True)
def get_employee_holiday_names(
    employee: Optional[str] = None,
    month: Optional[str] = None,
    grace_minutes: int = 0,
):
    """
    Returns per-employee day records with:
      - holiday_name: "WO" (if weekly_off=1) else holiday description (or "")
      - check_in, check_out, total_hours
      - leave_type, leave_description, half_day (0/1)
      - is_late (0/1), late_by_minutes (int)

    Also adds:
      - weekly_working_hours: {"YYYY-Www": float_hours}
      - total_working_hours: float_hours
    """
    month_start, month_end = _parse_month_to_range(month)

    # 1) Employees
    emp_filters: Dict[str, Any] = {"status": "Active"}
    if employee:
        emp_filters["name"] = employee

    employees = frappe.db.get_all(
        "Employee",
        filters=emp_filters,
        fields=["name", "employee_name", "holiday_list"],
        limit=None,
    )
    if not employees:
        return {} if not employee else {}
    emp_ids = [e["name"] for e in employees]

    # 2) Active Shift Assignments (employee -> shift_type)
    shift_assignments = frappe.db.get_all(
        "Shift Assignment",
        filters={"status": "Active", "employee": ["in", emp_ids]},
        fields=["employee", "shift_type"],
        limit=None,
    )
    emp_to_shift: Dict[str, str] = {}
    for row in shift_assignments:
        emp_to_shift[row["employee"]] = row["shift_type"]

    # 3) Shift Type timings (name -> (start_time, end_time)) as timedelta from midnight
    shift_types = frappe.db.get_all(
        "Shift Type",
        fields=["name", "start_time", "end_time"],
        limit=None,
    )
    shift_time_map: Dict[str, Tuple[Optional[datetime.timedelta], Optional[datetime.timedelta]]] = {}
    for st in shift_types:
        shift_time_map[st["name"]] = (st.get("start_time"), st.get("end_time"))

    # 4) Holidays limited to month
    holiday_map: Dict[str, Dict[datetime.date, Dict[str, Any]]] = defaultdict(dict)
    holiday_lists = list({e.get("holiday_list") for e in employees if e.get("holiday_list")})
    if holiday_lists:
        holiday_records = frappe.db.get_all(
            "Holiday",
            filters={
                "parent": ["in", holiday_lists],
                "holiday_date": ["between", [month_start, month_end]],
            },
            fields=["parent", "holiday_date", "description", "weekly_off"],
            limit=None,
        )
        for h in holiday_records:
            d = getdate(h["holiday_date"])
            holiday_map[h["parent"]][d] = {
                "description": (h.get("description") or "").strip(),
                "weekly_off": 1 if h.get("weekly_off") else 0,
            }

    # 5) Check-ins for the month only (first IN, last OUT)
    checkin_map: Dict[str, Dict[datetime.date, Dict[str, Any]]] = defaultdict(dict)
    if emp_ids:
        checkin_rows = frappe.db.sql(
            """
            SELECT
                employee,
                DATE(time) AS work_date,
                MIN(CASE WHEN log_type = 'IN'  THEN time END)  AS first_in,
                MAX(CASE WHEN log_type = 'OUT' THEN time END)  AS last_out
            FROM `tabEmployee Checkin`
            WHERE employee IN %(emp_ids)s
              AND DATE(time) BETWEEN %(start)s AND %(end)s
            GROUP BY employee, DATE(time)
            """,
            {"emp_ids": tuple(emp_ids), "start": month_start, "end": month_end},
            as_dict=True,
        )
        for r in checkin_rows:
            d = getdate(r["work_date"])
            cin = r.get("first_in")
            cout = r.get("last_out")
            hours = None
            if cin and cout and cout > cin:
                delta = (cout - cin).total_seconds()
                hours = round(delta / 3600.0, 2)
            checkin_map[r["employee"]][d] = {
                "check_in": cin,
                "check_out": cout,
                "total_hours": hours,
            }

    # 6) Leaves overlapping the month
    leave_rows = frappe.db.get_all(
        "Leave Application",
        filters={
            "status": "Approved",
            "employee": ["in", emp_ids],
            "from_date": ["<=", month_end],
            "to_date": [">=", month_start],
        },
        fields=["employee", "from_date", "to_date", "leave_type", "description", "half_day"],
        limit=None,
    )
    leave_map: Dict[str, Dict[datetime.date, Dict[str, Any]]] = defaultdict(dict)
    for l in leave_rows:
        start = max(getdate(l["from_date"]), month_start)
        end = min(getdate(l["to_date"]), month_end)
        emp_id = l["employee"]
        cur = start
        while cur <= end:
            leave_map[emp_id].setdefault(
                cur,
                {
                    "leave_type": l.get("leave_type") or "",
                    "leave_description": (l.get("description") or "").strip(),
                    "half_day": 1 if l.get("half_day") else 0,
                },
            )
            cur = add_days(cur, 1)

    # 7) Build result (with late detection & pretty formatting)
    result = {}
    grace_td = datetime.timedelta(minutes=int(grace_minutes or 0))

    for emp in employees:
        emp_id = emp["name"]
        emp_name = emp["employee_name"]
        hlist = emp.get("holiday_list") or ""

        holiday_dates = set(holiday_map[hlist].keys()) if hlist and hlist in holiday_map else set()
        checkin_dates = set(checkin_map.get(emp_id, {}).keys())
        leave_dates = set(leave_map.get(emp_id, {}).keys())
        all_dates = sorted(holiday_dates | checkin_dates | leave_dates)

        # resolve shift start_time for this employee
        shift_name = emp_to_shift.get(emp_id)
        shift_start_td = shift_time_map.get(shift_name, (None, None))[0] if shift_name else None

        records = []
        weekly_hours = defaultdict(float)
        total_hours_all = 0.0

        for d in all_dates:
            # holiday label
            holiday_name = ""
            if hlist and hlist in holiday_map and d in holiday_map[hlist]:
                info = holiday_map[hlist][d]
                holiday_name = "WO" if info.get("weekly_off") else (info.get("description") or "")

            # check-ins
            cin = checkin_map.get(emp_id, {}).get(d, {}).get("check_in")
            cout = checkin_map.get(emp_id, {}).get(d, {}).get("check_out")
            hours = checkin_map.get(emp_id, {}).get(d, {}).get("total_hours")

            # accumulate hours
            if isinstance(hours, (int, float)):
                iso_year, iso_week, _ = d.isocalendar()
                week_key = f"{iso_year}-W{iso_week:02d}"
                weekly_hours[week_key] += float(hours)
                total_hours_all += float(hours)

            # leave info
            leave_info = leave_map.get(emp_id, {}).get(d, {})

            # late detection
            is_late = 0
            late_by_minutes = 0
            if cin and shift_start_td is not None:
                shift_start_dt = datetime.datetime.combine(d, datetime.time(0, 0, 0)) + shift_start_td
                if cin > (shift_start_dt + grace_td):
                    late_by_minutes = int(round((cin - shift_start_dt).total_seconds() / 60.0))
                    is_late = 1

            # formatted record
            records.append({
                "date": _format_date(d),
                "holiday_name": holiday_name,
                "check_in": _format_time(cin),
                "check_out": _format_time(cout),
                "total_hours": hours,
                "leave_type": leave_info.get("leave_type", ""),
                "leave_description": leave_info.get("leave_description", ""),
                "half_day": leave_info.get("half_day", 0),
                "is_late": is_late,
                "late_by_minutes": late_by_minutes,
            })

        weekly_totals_rounded = {k: round(v, 2) for k, v in sorted(weekly_hours.items())}
        result[emp_id] = {
            "employee_name": emp_name,
            "holiday_list": hlist,
            "weekly_working_hours": weekly_totals_rounded,
            "total_working_hours": round(total_hours_all, 2),
            "days": records,
        }

    if employee and employee in result:
        return result[employee]
    return result
