import frappe
from frappe import _
from frappe.utils.data import cint

@frappe.whitelist(allow_guest=True)
def _pick_fields(row):
    """Return only useful fields from Salary Detail rows."""
    return {
        "idx": cint(row.get("idx")),
        "salary_component": row.get("salary_component"),
        "abbr": row.get("abbr"),
        "amount": row.get("amount"),
        "default_amount": row.get("default_amount"),
        "additional_amount": row.get("additional_amount"),
        "amount_based_on_formula": row.get("amount_based_on_formula"),
        "formula": row.get("formula"),
        "condition": row.get("condition"),
        "depends_on_payment_days": row.get("depends_on_payment_days"),
        "is_tax_applicable": row.get("is_tax_applicable"),
        "is_flexible_benefit": row.get("is_flexible_benefit"),
        "variable_based_on_taxable_salary": row.get("variable_based_on_taxable_salary"),
        "statistical_component": row.get("statistical_component"),
        "do_not_include_in_total": row.get("do_not_include_in_total"),
        "deduct_full_tax_on_selected_payroll_date": row.get("deduct_full_tax_on_selected_payroll_date"),
        "tax_on_additional_salary": row.get("tax_on_additional_salary"),
        "tax_on_flexible_benefit": row.get("tax_on_flexible_benefit"),
        "year_to_date": row.get("year_to_date"),
    }

@frappe.whitelist()
def get_salary_structure_components(structure: str):
    """
    Return earnings and deductions rows for a Salary Structure.
    """
    if not structure:
        frappe.throw(_("Please provide a Salary Structure name."))

    if not frappe.has_permission("Salary Structure", "read", structure):
        frappe.throw(
            _("No permission to read Salary Structure: {0}").format(structure),
            frappe.PermissionError,
        )

    ss = frappe.db.get_value(
        "Salary Structure",
        structure,
        ["name", "currency", "payroll_frequency", "is_active"],
        as_dict=True,
    )
    if not ss:
        frappe.throw(_("Salary Structure '{0}' not found.").format(structure))

    fields = [
        "idx",
        "salary_component",
        "abbr",
        "amount",
        "default_amount",
        "additional_amount",
        "amount_based_on_formula",
        "formula",
        "condition",
        "depends_on_payment_days",
        "is_tax_applicable",
        "is_flexible_benefit",
        "variable_based_on_taxable_salary",
        "statistical_component",
        "do_not_include_in_total",
        "deduct_full_tax_on_selected_payroll_date",
        "tax_on_additional_salary",
        "tax_on_flexible_benefit",
        "year_to_date",
    ]

    earnings_rows = frappe.get_all(
        "Salary Detail",
        filters={"parent": structure, "parenttype": "Salary Structure", "parentfield": "earnings"},
        fields=fields,
        order_by="idx asc",
    )

    deduction_rows = frappe.get_all(
        "Salary Detail",
        filters={"parent": structure, "parenttype": "Salary Structure", "parentfield": "deductions"},
        fields=fields,
        order_by="idx asc",
    )

    return {
        "salary_structure": ss.name,
        "meta": {
            "currency": ss.currency,
            "payroll_frequency": ss.payroll_frequency,
            "is_active": ss.is_active,
        },
        "earnings": [_pick_fields(r) for r in earnings_rows],
        "deductions": [_pick_fields(r) for r in deduction_rows],
    }
