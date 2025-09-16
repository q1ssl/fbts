import frappe
from frappe import _
import json
import requests
import random
from frappe.core.doctype.user.user import update_password
from frappe.twofactor import get_email_subject_for_2fa, get_email_body_for_2fa
import urllib.parse
import zipfile
import io


@frappe.whitelist(allow_guest=True)
def login(email_id, password, device_token=None):
    if not frappe.db.exists("User", {"name": email_id}):
        frappe.local.response['http_status_code'] = 404
        frappe.local.response['status'] = False
        frappe.local.response['message'] = f"User {email_id} Not Found"
        frappe.local.response['data'] = []
        return

    user = frappe.get_doc("User", {"name": email_id})
    emp = frappe.get_doc("Employee", {"user_id": email_id})

    res = internal_login(email_id, password)
    if not res.get("message") == "Logged In":
        frappe.local.response['http_status_code'] = 404
        frappe.local.response['status'] = False
        frappe.local.response['message'] = "Incorrect Password"
        frappe.local.response['data'] = []
        return

    if device_token:
        exists_pnd = frappe.db.get_value("Push Notification Device", {"device_token": device_token}, "name")
        if not exists_pnd:
            doc = frappe.get_doc({
                'doctype': 'Push Notification Device',
                'device_token': device_token,
                'user': user.name or frappe.session.user
            })
            doc.insert(ignore_permissions=True)

    sys_settings = frappe.get_single("System Settings")
    hours, minutes = sys_settings.session_expiry.split(":")
    expires_in = (int(hours) * 3600) + (int(minutes) * 60)

    otoken = frappe.new_doc("OAuth Bearer Token")
    otoken.access_token = frappe.generate_hash(length=30)
    otoken.refresh_token = frappe.generate_hash(length=30)
    otoken.user = user.name
    otoken.scopes = "all"
    otoken.client = frappe.get_value("OAuth Client", None, "client_id")
    otoken.expires_in = expires_in
    otoken.save(ignore_permissions=True)
    frappe.db.commit()

    out = [{
        "access_token": otoken.access_token,
        "full_name": user.full_name,
        "employee_id": emp.name,
        "expires_in": expires_in
    }]

    frappe.local.response['status'] = True
    frappe.local.response['message'] = "Successfully Logged In"
    frappe.local.response['data'] = out


def internal_login(email_id, password):
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    url = f"{frappe.utils.get_url()}/api/method/login"
    payload = json.dumps({"usr": email_id, "pwd": password})
    response = requests.request("POST", url, headers=headers, data=payload)
    return json.loads(response.text)


@frappe.whitelist()
def logout(access_token):
    email_id = frappe.session.user
    if not frappe.db.exists("User", {"name": email_id}):
        frappe.local.response['http_status_code'] = 404
        frappe.local.response['status'] = False
        frappe.local.response['message'] = f"User {email_id} Not Found"
        frappe.local.response['data'] = []
        return

    if not frappe.db.exists("OAuth Bearer Token", access_token):
        frappe.local.response['http_status_code'] = 404
        frappe.local.response['status'] = False
        frappe.local.response['message'] = "Invalid Token"
        frappe.local.response['data'] = []
        return

    frappe.db.set_value("OAuth Bearer Token", access_token, "status", "Revoked")
    frappe.local.response['status'] = True
    frappe.local.response['message'] = "Successfully Logged Out"
    frappe.local.response['data'] = []


@frappe.whitelist(allow_guest=True)
def generate_otp(email_id, expires_in_sec=30):
    if not frappe.db.exists("User", {"name": email_id}):
        frappe.local.response['http_status_code'] = 404
        frappe.local.response['status'] = False
        frappe.local.response['message'] = f"User {email_id} Not Found"
        frappe.local.response['data'] = []
        return

    otp = ''.join(str(random.randint(0, 9)) for _ in range(4))
    frappe.cache().set_value(f"otp:{email_id}", otp, expires_in_sec=expires_in_sec)
    template_args = {"otp": otp, "otp_issuer": "Frappe Framework"}

    frappe.sendmail(
        recipients=email_id,
        subject=get_email_subject_for_2fa(template_args),
        message=get_email_body_for_2fa(template_args),
        header=[_("Verification Code"), "blue"],
        delayed=False,
        retry=3,
    )

    frappe.local.response['status'] = True
    frappe.local.response['message'] = "OTP Sent to email"
    frappe.local.response['data'] = [{"otp": otp}]


@frappe.whitelist(allow_guest=True)
def validate_otp(email_id, otp):
    cached_otp = frappe.cache().get_value(f"otp:{email_id}")
    if not cached_otp:
        frappe.local.response['http_status_code'] = 404
        frappe.local.response['status'] = False
        frappe.local.response['message'] = "OTP Expired or not generated"
        frappe.local.response['data'] = []
        return

    if cached_otp != otp:
        frappe.local.response['http_status_code'] = 404
        frappe.local.response['status'] = False
        frappe.local.response['message'] = "Invalid OTP"
        frappe.local.response['data'] = []
        return

    user = frappe.get_doc("User", email_id)
    user.validate_reset_password()
    url = user.reset_password()
    key = urllib.parse.parse_qs(urllib.parse.urlparse(url).query)["key"][0]

    frappe.cache().delete_value(f"otp:{email_id}")
    frappe.local.response['status'] = True
    frappe.local.response['message'] = "Password reset key generated"
    frappe.local.response['data'] = [{"pwd_reset_key": key}]


@frappe.whitelist(allow_guest=True)
def reset_password(new_password, key):
    response = update_password(new_password, key=key)
    if frappe.local.response.get("message") == "Logged In":
        frappe.local.response['status'] = True
        frappe.local.response['message'] = "Password Reset Successfully"
        return

    if frappe.local.response.get('http_status_code') == 410:
        frappe.local.response['http_status_code'] = 404
        frappe.local.response['status'] = False
        frappe.local.response['message'] = response
        return


def download_zip(files, output_filename):
    zip_stream = io.BytesIO()
    with zipfile.ZipFile(zip_stream, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for file in files:
            file_path = frappe.utils.get_files_path(file.file_name, is_private=file.is_private)
            zip_file.write(file_path, arcname=file.file_name)

    frappe.local.response.filename = output_filename
    frappe.local.response.filecontent = zip_stream.getvalue()
    frappe.local.response.type = "download"
    zip_stream.close()
