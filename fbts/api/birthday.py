import frappe
from datetime import datetime

@frappe.whitelist(allow_guest=True)
def get_today_birthdays():
    """
    Returns a list of active employees whose birthday is today
    and the total count.
    
    Output:
    {
        "count": 2,
        "employees": [
            {
                "name": "FI-00001",
                "employee_name": "Developer Daiyan",
                "date_of_birth": "2002-06-05"
            },
            ...
        ]
    }
    """
    today = datetime.today()
    today_day = today.day
    today_month = today.month

    # Use SQL to compare month and day
    query = """
        SELECT name, employee_name, date_of_birth
        FROM `tabEmployee`
        WHERE status = 'Active'
        AND MONTH(date_of_birth) = %s
        AND DAY(date_of_birth) = %s
    """
    results = frappe.db.sql(query, (today_month, today_day), as_dict=True)

    return {
        "count": len(results),
        "employees": results
    }
