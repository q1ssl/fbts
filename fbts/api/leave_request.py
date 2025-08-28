import frappe

@frappe.whitelist(allow_guest=True)
def get_leave_applications(leave_approver: str):
    if not leave_approver:
        frappe.throw("Parameter 'leave_approver' is required.", exc=frappe.ValidationError)

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
        filters={"leave_approver": leave_approver},
        order_by="posting_date desc",
    )



import frappe

@frappe.whitelist(allow_guest=True)
def update_leave_status(name: str, status: str):
    if not name or not status:
        frappe.throw("Both 'name' (Leave Application ID) and 'status' are required.", exc=frappe.ValidationError)

    leave_app = frappe.get_doc("Leave Application", name)
    leave_app.status = status
    leave_app.save(ignore_permissions=True)
    frappe.db.commit()

    return {"message": f"Leave Application {name} updated to status {status}"}




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
        ignore_permissions=True   
    )
