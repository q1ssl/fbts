# myapp/job_offer/handlers.py
import frappe
from frappe import _

ROLE_NAME = "Job Applicant"

def _ensure_user(email: str, first_name: str = "", new_password: str | None = None) -> str:
    """Create Website User if missing; ensure Job Applicant role. Returns user name (email)."""
    if not email:
        frappe.throw(_("Applicant Email is required."))

    if frappe.db.exists("User", email):
        user = frappe.get_doc("User", email)
    else:
        user = frappe.get_doc({
            "doctype": "User",
            "email": email,
            "first_name": first_name or "",
            "enabled": 1,
            "user_type": "Website User",
            "send_welcome_email": 0,
            "new_password":"fbts@123",
            "search_bar": 0, "notifications": 0, "list_sidebar": 0, "bulk_actions": 0,
            "view_switcher": 0, "form_sidebar": 0, "timeline": 0, "dashboard": 0,
        })
        user.insert(ignore_permissions=True)

    roles = {r.role for r in (user.get("roles") or [])}
    if ROLE_NAME not in roles:
        user.append("roles", {"role": ROLE_NAME})
        user.flags.ignore_permissions = True
        user.save(ignore_permissions=True)

    return user.name

def _ensure_user_permission(email: str, job_offer_name: str) -> str:
    """Create User Permission (User→this Job Offer) if missing. Returns UP name."""
    if not email:
        frappe.throw(_("Applicant Email is required."))
    if not job_offer_name:
        frappe.throw(_("Job Offer name is required."))

    if not frappe.db.exists("User", email):
        frappe.throw(_("User does not exist yet. Please create the User first."))

    existing = frappe.db.get_value(
        "User Permission",
        {"user": email, "allow": "Job Offer", "for_value": job_offer_name},
        "name",
    )
    if existing:
        return existing

    up = frappe.get_doc({
        "doctype": "User Permission",
        "user": email,
        "allow": "Job Offer",
        "for_value": job_offer_name,
        "apply_to_all_doctypes": 0,
        "applicable_for": "Job Offer",
    })
    up.insert(ignore_permissions=True)
    return up.name

def ensure_user_and_permission(doc, method=None):
    """
    Hook target:
    - after_insert / on_update of Job Offer
    Enforces order: User first, then User Permission (idempotent).
    """
    try:
        if getattr(doc, "docstatus", 0) == 2:
            return  # ignore cancelled

        email = (doc.applicant_email or "").strip()
        first_name = (doc.applicant_name or "").strip()
        if not email:
            # Soft notice; nothing to do without email
            frappe.msgprint(_("Applicant Email is required to auto-create User & Permission."))
            return

        # 1) ensure User
        _ensure_user(email=email, first_name=first_name)

        # 2) ensure Permission (requires doc.name to exist)
        if doc.name:
            _ensure_user_permission(email=email, job_offer_name=doc.name)

    except Exception:
        frappe.log_error(frappe.get_traceback(), "Job Offer Hook: ensure_user_and_permission")

# Optional helpers you may wire later:
def on_cancel_job_offer(doc, method=None):
    """Example: You could revoke permission on cancel (business-dependent)."""
    try:
        email = (doc.applicant_email or "").strip()
        if not email or not doc.name:
            return
        name = frappe.db.get_value(
            "User Permission",
            {"user": email, "allow": "Job Offer", "for_value": doc.name},
            "name",
        )
        if name:
            up = frappe.get_doc("User Permission", name)
            up.delete(ignore_permissions=True)
    except Exception:
        frappe.log_error(frappe.get_traceback(), "Job Offer Hook: on_cancel_job_offer")

def repair_missing_permissions():
    """(Optional scheduled job) scan Job Offers and fix missing permissions."""
    # Example sketch, left minimal intentionally
    for jo in frappe.get_all("Job Offer", fields=["name", "applicant_email", "applicant_name"], filters={"docstatus": ["!=", 2]}):
        try:
            if not jo.applicant_email:
                continue
            _ensure_user(jo.applicant_email, jo.applicant_name or "")
            _ensure_user_permission(jo.applicant_email, jo.name)
        except Exception:
            frappe.log_error(frappe.get_traceback(), "Job Offer Hook: repair_missing_permissions")



