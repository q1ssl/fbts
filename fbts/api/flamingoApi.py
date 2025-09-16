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
