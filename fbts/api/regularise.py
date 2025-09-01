import frappe

@frappe.whitelist(allow_guest=True)
def get_employee_checkins(employee: str):
    filters = {"employee": employee}
    rows = frappe.db.get_all(
        "Employee Checkin",
        fields=["name", "employee", "employee_name", "log_type", "time"],
        filters=filters,
        order_by="time desc",
        limit=5
    )
    return rows


import frappe
from frappe.utils import get_datetime

@frappe.whitelist(allow_guest=True)
def update_employee_checkin_regularise(name: str, new_time: str):
    """Update regularise time and force status back to 'Open'."""
    value = get_datetime(new_time)

    # Ensure record exists
    if not frappe.db.exists("Employee Checkin", name):
        frappe.throw(f"Employee Checkin '{name}' not found")

    # Update both fields: regularise_time and status = Open
    frappe.db.set_value(
        "Employee Checkin",
        name,
        {
            "custom_regularise_time": value,
            "custom_status": "Open",
        },
        update_modified=True,
    )

    # Read back updated values
    updated_time, updated_status = frappe.db.get_value(
        "Employee Checkin",
        name,
        ["custom_regularise_time", "custom_status"]
    )

    return {
        "status": "success",
        "name": name,
        "custom_regularise_time": str(updated_time) if updated_time else None,
        "custom_status": updated_status
    }




# Approver

import frappe

@frappe.whitelist(allow_guest=True)
def get_regularise_request(custom_regularise_approver: str):
    filters = {"custom_regularise_approver": custom_regularise_approver,"custom_status":"Open"}
    rows = frappe.db.get_all(
        "Employee Checkin",
        fields=["name", "employee", "employee_name", "log_type", "time","custom_regularise_time","custom_regularise_approver"],
        filters=filters,
        order_by="time desc",
        limit=5
    )
    return rows



# Reject or Approved

import frappe

@frappe.whitelist(allow_guest=True)
def apply_regularise_time(name: str, custom_status: str):
    """
    Update Employee Checkin time based on custom_status.
    - If Approved: set `time` = `custom_regularise_time`
    - If Rejected: keep `time` as is
    - Else: no change
    """
    if not frappe.db.exists("Employee Checkin", name):
        frappe.throw(f"Employee Checkin '{name}' not found")

    # Load the doc
    doc = frappe.get_doc("Employee Checkin", name)

    action = "none"
    if custom_status == "Approved":
        if not doc.custom_regularise_time:
            frappe.throw("custom_regularise_time is empty; cannot update `time` when status is Approved.")

        frappe.db.set_value(
            "Employee Checkin",
            name,
            {"time": doc.custom_regularise_time, "custom_status": "Approved"},
            update_modified=True,
        )
        action = "updated_time_to_regularised"

    elif custom_status == "Rejected":
        frappe.db.set_value(
            "Employee Checkin",
            name,
            {"custom_status": "Rejected"},
            update_modified=True,
        )
        action = "skipped_rejected"

    else:
        # Just update the status field without touching time
        frappe.db.set_value(
            "Employee Checkin",
            name,
            {"custom_status": custom_status},
            update_modified=True,
        )
        action = "status_updated_only"

    # Fetch latest values
    time_val, reg_time, status_now = frappe.db.get_value(
        "Employee Checkin",
        name,
        ["time", "custom_regularise_time", "custom_status"]
    )

    return {
        "status": "success",
        "name": name,
        "action": action,
        "time": str(time_val) if time_val else None,
        "custom_regularise_time": str(reg_time) if reg_time else None,
        "custom_status": status_now,
    }


import frappe

@frappe.whitelist()
def apply_regularise_time(name, custom_status):
    # Your logic to update status
    doc = frappe.get_doc("Employee Checkin", name)
    doc.custom_status = custom_status
    doc.save()

    # Fire realtime event to refresh form on frontend
    frappe.publish_realtime('refresh_checkin_form', {'name': name})
