# import frappe

# @frappe.whitelist(allow_guest=True)
# def create_checkin(employee, log_type, latitude=22.5738752, longitude=88.3785728):
#     doc = frappe.get_doc({
#         "doctype": "Employee Checkin",
#         "employee": employee,
#         "log_type": log_type,
#         "time": frappe.utils.now(),
#         "device_id": "WebApp",
#         "latitude": latitude,
#         "longitude": longitude
#     })
#     doc.insert()
#     frappe.db.commit()
#     return {"message": "Check-in created", "name": doc.name}


import frappe

@frappe.whitelist(allow_guest=True)
def create_checkin(employee, latitude=22.5738752, longitude=88.3785728):
    # Fetch last check-in for the employee
    last_log_type = frappe.db.get_value(
        "Employee Checkin",
        filters={"employee": employee},
        fieldname="log_type",
        order_by="time desc"
    )

    # Toggle log_type
    if last_log_type == "IN":
        new_log_type = "OUT"
    else:
        new_log_type = "IN"

    # Create new check-in
    doc = frappe.get_doc({
        "doctype": "Employee Checkin",
        "employee": employee,
        "log_type": new_log_type,
        "time": frappe.utils.now(),
        "device_id": "WebApp",
        "latitude": latitude,
        "longitude": longitude
    })
    doc.insert()
    frappe.db.commit()

    return {
        "message": f"{new_log_type} check-in created",
        "name": doc.name,
        "log_type": new_log_type
    }



# my_app/api/leave.py

import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def create_leave_application(data):
    # parse JSON string to dict
    data = frappe.parse_json(data)

    doc = frappe.get_doc({
        "doctype": "Leave Application",
        "employee": data.get("employee"),
        "leave_type": data.get("leave_type"),
        "from_date": data.get("from_date"),
        "to_date": data.get("to_date"),
        "company": data.get("company"),
        "description": data.get("description"),
        "posting_date": frappe.utils.nowdate(),
        "status": "Open"
    })
    doc.insert()
    return {"name": doc.name, "message": "Leave Application created"}


import frappe
from frappe import _
from frappe.utils.print_format import download_pdf

@frappe.whitelist(allow_guest=True)
def download_salary_slip(name: str):
    """
    Generates and returns the Salary Slip PDF file as a base64-encoded blob
    or streams the PDF directly for download.
    """
    if not name:
        frappe.throw(_("Salary Slip name is required."))
    

    # Make sure the user has access to the document
    salary_slip = frappe.get_doc("Salary Slip", name)
    if not salary_slip.has_permission("read"):
        frappe.throw(_("You are not authorized to view this Salary Slip."))

    # Check if it's submitted
    if salary_slip.docstatus != 1:
        frappe.throw(_("Only submitted Salary Slips can be downloaded."))

    # Use default or custom print format
    default_print_format = frappe.get_meta("Salary Slip").default_print_format or "Standard"

    try:
        # This sets frappe.local.response with the file data
        download_pdf("Salary Slip", name, format=default_print_format)
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Download Salary Slip Error")
        frappe.throw(_("Failed to generate Salary Slip PDF."))

    # Return file content as base64 if needed (frontend usually expects a blob)
    return {
        "filename": f"{name}.pdf",
        "content_type": frappe.local.response.type,
        "base64": frappe.safe_encode(frappe.local.response.filecontent, "base64"),
    }

from frappe import _
import frappe
from datetime import datetime

@frappe.whitelist(allow_guest=True)
def get_employee_salary_slips(employee):
    """
    Get minimal salary slip data for an employee with formatted period
    Args:
        employee (str): Employee ID (required)
    Returns:
        list: Salary slips with only name, amounts, and formatted period
    """
    if not employee:
        frappe.throw(_("Employee ID is required"))
    
    if not frappe.db.exists("Employee", employee):
        frappe.throw(_("Employee not found"))
    
    fields = [
        "name",
        "gross_pay",
        "total_deduction",
        "net_pay",
        "rounded_total",
        "start_date"
    ]
    
    salary_slips = frappe.get_all(
        'Salary Slip',
        fields=fields,
        filters={'employee': employee},
        order_by='start_date desc'
    )
    
    # Transform results to only include what you need
    result = []
    for slip in salary_slips:
        if slip.get('start_date'):
            period = datetime.strptime(str(slip['start_date']), "%Y-%m-%d").strftime("%b %Y")
            result.append({
                "name": slip['name'],
                "period": period,  # "Jan 2025"
                "gross": slip['gross_pay'],
                "deductions": slip['total_deduction'],
                "net": slip['net_pay'] if slip.get('net_pay') else slip['rounded_total']
            })
    
    return result




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
            filters={"name": name}
        )

        return employees

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "get_employees API Error")
        return {
            "status": "error",
            "message": str(e)
        }




@frappe.whitelist(allow_guest=True)
def get_notifications(to_user):
    return frappe.db.get_all(
        "PWA Notification",
        filters={"to_user": to_user},
        fields=[
            "to_user", "from_user", "message",
            "reference_document_type", "reference_document_name", "read"
        ]
    )



import frappe

@frappe.whitelist(allow_guest=True)
def chat(message, employee):
    if not message:
        frappe.throw("Message is required")
    if not employee:
        frappe.throw("Employee is required")

    doc = frappe.get_doc({
        "doctype": "Group Chat",
        "message": message,
        "employee": employee
    })
    doc.insert(ignore_permissions=True)
    return {"name": doc.name}



from datetime import timedelta
import frappe
from frappe.utils import getdate, format_time

@frappe.whitelist(allow_guest=True)
def group_chat():
    messages = frappe.db.get_all(
        "Group Chat",
        fields=[
            "employee",
            "employee_name",
            "message",
            "creation"
        ],
        order_by="creation asc"  # chronological order like chat
    )

    today = getdate()
    yesterday = today - timedelta(days=1)

    grouped = []
    last_date_label = None

    for msg in messages:
        msg_date = msg["creation"].date()

        if msg_date == today:
            date_label = "Today"
        elif msg_date == yesterday:
            date_label = "Yesterday"
        else:
            date_label = msg["creation"].strftime("%d %B %Y")

        # Add date divider if it's a new date group
        if date_label != last_date_label:
            grouped.append({
                "type": "date",
                "label": date_label
            })
            last_date_label = date_label

        # Add chat message
        grouped.append({
            "type": "message",
            "employee": msg["employee"],
            "employee_name": msg["employee_name"],
            "message": msg["message"],
            "time": format_time(msg["creation"])
        })

    return grouped



@frappe.whitelist(allow_guest=True)
def leave_status(employee):
    leave_counts = frappe.db.get_all(
        "Leave Application",
        filters={"employee": employee},
        fields=["status", "COUNT(status) as count"],
        group_by="status"
    )
    return leave_counts
