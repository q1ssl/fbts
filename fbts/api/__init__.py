import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def get_last_checkin_info(employee):
    """
    Fetches the latest (most recent) check-in record for a specific employee.
    
    Args:
        employee (str): Employee ID (e.g., "FI-00001")
        
    Returns:
        dict or None: Contains 'employee', 'time', and 'log_type' of the latest record
    """
    try:
        checkin = frappe.db.get_all(
            "Employee Checkin",
            filters={"employee": employee},
            fields=["employee", "time", "log_type"],
            order_by="time desc",
            limit=1
        )
        return checkin[0] if checkin else {}

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), _("Error fetching last employee checkin"))
        return {"error": str(e)}


import frappe
from frappe import _
from frappe.utils import getdate
from datetime import timedelta

@frappe.whitelist()  # ✅ Authenticated access only
def get_last_10_attendance_records(employee=None):
    """
    Returns the latest 10 attendance records for a given employee.
    Each record includes: employee, date, in_time, out_time, status, working_hours.
    """
    try:
        if not employee:
            employee = frappe.form_dict.get("employee")

        if not employee:
            return {"status": "error", "message": "Employee ID is required"}

        checkins = frappe.db.sql("""
            SELECT 
                employee,
                log_type,
                time AS log_time
            FROM `tabEmployee Checkin`
            WHERE employee = %s
            ORDER BY time DESC
        """, (employee,), as_dict=True)

        attendance = {}
        record_count = 0

        for entry in checkins:
            log_date = entry["log_time"].date()
            date_key = log_date.strftime("%d-%m-%Y")

            if date_key not in attendance:
                if record_count == 10:
                    break
                attendance[date_key] = {
                    "employee": employee,
                    "date": date_key,
                    "in_time": None,
                    "out_time": None,
                    "status": "Absent",
                    "working_hours": None
                }
                record_count += 1

            if entry["log_type"] == "IN" and attendance[date_key]["in_time"] is None:
                attendance[date_key]["in_time"] = entry["log_time"]
            elif entry["log_type"] == "OUT" and attendance[date_key]["out_time"] is None:
                attendance[date_key]["out_time"] = entry["log_time"]

        for record in attendance.values():
            in_time = record["in_time"]
            out_time = record["out_time"]

            if in_time:
                record["status"] = "Present"
            record["in_time"] = in_time.strftime("%H:%M:%S") if in_time else None
            record["out_time"] = out_time.strftime("%H:%M:%S") if out_time else None

            if in_time and out_time:
                duration = out_time - in_time
                total_seconds = int(duration.total_seconds())
                hours = total_seconds // 3600
                minutes = (total_seconds % 3600) // 60
                seconds = total_seconds % 60
                record["working_hours"] = f"{hours:02}:{minutes:02}:{seconds:02}"
            else:
                record["working_hours"] = None

        return {
            "status": "success",
            "employee": employee,
            "records": list(attendance.values())
        }

    except Exception as e:
        frappe.log_error(f"Error in get_last_10_attendance_records: {str(e)}", "Attendance API")
        return {"status": "error", "message": str(e)}


import frappe

@frappe.whitelist(allow_guest=True)
def get_emp_leave_list(employee: str):
    if not employee:
        frappe.throw("Parameter 'employee' is required.", exc=frappe.ValidationError)

    return frappe.db.get_all(
        "Leave Application",
        fields=[
            "name",
            "employee",
            "from_date",
            "to_date",
            "leave_type",
            "description",
            "total_leave_days",
            "leave_approver",
            "status",
            "posting_date",
        ],
        filters={"employee": employee},
        order_by="posting_date desc",
        ignore_permissions=True,  # since you want guest
    )
