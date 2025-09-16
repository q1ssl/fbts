import frappe
from frappe import _
from frappe.utils import getdate
from frappe.utils.response import json_handler
from frappe.utils.data import strip
from frappe.model.document import Document
from frappe.utils.safe_exec import safe_exec
from frappe.utils import cstr
import json

@frappe.whitelist(allow_guest=True)
def get_employee_wise_holidays():
    result = []
    employees = frappe.db.get_all(
        "Employee",
        fields=["name", "employee_name", "holiday_list"],
        filters={"holiday_list": ["!=", ""]}
    )

    for emp in employees:
        holidays = frappe.db.get_all(
            "Holiday",
            fields=["holiday_date", "description"],
            filters={"parent": emp["holiday_list"], "weekly_off": 0},
            order_by="holiday_date asc"
        )

        # Filter out Sundays
        filtered_holidays = [
            h for h in holidays if (h.get("description") or "").strip().lower() != "sunday"
        ]

        result.append({
            "employee": emp["employee_name"],
            "holiday_list": emp["holiday_list"],
            "holidays": filtered_holidays
        })

    return result
