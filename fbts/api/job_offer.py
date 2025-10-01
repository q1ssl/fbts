import frappe

@frappe.whitelist(allow_guest=True)
def job_offer(job_applicant: str):
    """
    Return Job Offer(s) for a given Job Applicant with:
      - earnings (salary_component, amount, yearly)
      - deductions (salary_component, amount, yearly)
      - employer_contributions (salary_component, amount, yearly) 
        -> rows flagged do_not_include_in_total = 1
    """
    offers = frappe.get_all(
        "Job Offer",
        fields=[
            "name", "job_applicant", "applicant_name", "designation", "gender",
            "offer_date", "is_executive", "custom_joining_date",
            "custom_reporting_manager", "grade", "base", "level",
            "custom_offered_ctc", "custom_total_amount_inr", "status", "company"
        ],
        filters={"job_applicant": job_applicant},
        order_by="creation desc",
    )

    results = []
    for o in offers:
        doc = frappe.get_doc("Job Offer", o["name"])

        # ---- iterate earnings ----
        earnings = [
            {
                "salary_component": row.salary_component,
                "amount": row.amount or 0,
                "yearly": (row.amount or 0) * 12,
            }
            for row in (doc.earnings or [])
        ]

        # ---- iterate deductions ----
        deductions = [
            {
                "salary_component": row.salary_component,
                "amount": row.amount or 0,
                "yearly": (row.amount or 0) * 12,
            }
            for row in (doc.deductions or [])
        ]

        # ---- employer contributions ----
        employer_contributions = []
        for row in (doc.earnings or []) + (doc.deductions or []):
            if int(row.do_not_include_in_total or 0) == 1:
                employer_contributions.append({
                    "salary_component": row.salary_component,
                    "amount": row.amount or 0,
                    "yearly": (row.amount or 0) * 12,
                })

        results.append({
            **o,
            "earnings": earnings,
            "deductions": deductions,
            "employer_contributions": employer_contributions,
        })

    return results
