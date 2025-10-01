import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def get_employees(name=None):
    try:
        if not name:
            return []  # No name passed, don't return all employees

        employees = frappe.db.get_all(
            "Employee",
            fields=["name", "employee_name", "image", "company", "date_of_birth", "gender"],
            filters=[{"name": name}]
        )

        return employees

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "get_employees API Error")
        return {
            "status": "error",
            "message": str(e)
        }