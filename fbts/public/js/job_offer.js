frappe.ui.form.on('Job Offer', {
  after_save(frm) {
    apply_role_restrictions(frm);
    render_offer_preview(frm);     // preview only; no save
    amount_in_word_safe(frm);
  },
  onload(frm) {
    apply_role_restrictions(frm);
    render_offer_preview(frm);     // preview only; no save
    amount_in_word_safe(frm);
  },
  refresh(frm) {
    apply_role_restrictions(frm);
    render_offer_preview(frm);     // preview only; no save (prevents dirty on refresh)
    amount_in_word_safe(frm);
  },

  // When user edits fields, recompute & SAVE only if changed
  offer_date(frm) { build_offer_letter_if_changed(frm); },
  company(frm) { build_offer_letter_if_changed(frm); },
  designation(frm) { build_offer_letter_if_changed(frm); },
  custom_joining_date(frm) { build_offer_letter_if_changed(frm); },
  grade(frm) { build_offer_letter_if_changed(frm); },
  custom_total_amount_inr(frm) { build_offer_letter_if_changed(frm); },
  custom_posting_location(frm) { build_offer_letter_if_changed(frm); },
  custom_reporting_manager(frm) { build_offer_letter_if_changed(frm); },
  earnings_add(frm) { build_offer_letter_if_changed(frm); },
  earnings_remove(frm) { build_offer_letter_if_changed(frm); },
  deductions_add(frm) { build_offer_letter_if_changed(frm); },
  deductions_remove(frm) { build_offer_letter_if_changed(frm); },

  // Recompute amount-in-words when base or offered CTC changes
  base(frm) { amount_in_word_safe(frm); build_offer_letter_if_changed(frm); },
  custom_offered_ctc(frm) { amount_in_word_safe(frm); build_offer_letter_if_changed(frm); },
});

/* ---------------- core builders ---------------- */

function compute_ctc_rows_and_totals(d, currency) {
  const fmtMoney = (n) => frappe.format(n || 0, { fieldtype: "Currency" }, { currency });

  let A_m = 0, B_m = 0, C_m = 0;
  let rows_html = "";

  // A: Earnings included in total
  (d.earnings || []).forEach(r => {
    if ((r.do_not_include_in_total || 0) != 1) {
      A_m += (r.amount || 0);
      rows_html += `<tr><td>${r.salary_component || ""}</td><td class="r">${fmtMoney(r.amount)}</td><td class="r">${fmtMoney((r.amount||0)*12)}</td></tr>`;
    }
  });
  rows_html += `<tr class="section-a"><td><b>Total Gross Pay (A)</b></td><td class="r"><b>${fmtMoney(A_m)}</b></td><td class="r"><b>${fmtMoney(A_m*12)}</b></td></tr>`;

  // B: Employer contributions (earnings/deductions flagged do_not_include_in_total == 1)
  (d.earnings || []).forEach(r => {
    if ((r.do_not_include_in_total || 0) == 1) {
      B_m += (r.amount || 0);
      rows_html += `<tr><td>${r.salary_component || ""}</td><td class="r">${fmtMoney(r.amount)}</td><td class="r">${fmtMoney((r.amount||0)*12)}</td></tr>`;
    }
  });
  (d.deductions || []).forEach(r => {
    if ((r.do_not_include_in_total || 0) == 1) {
      B_m += (r.amount || 0);
      rows_html += `<tr><td>${r.salary_component || ""}</td><td class="r">${fmtMoney(r.amount)}</td><td class="r">${fmtMoney((r.amount||0)*12)}</td></tr>`;
    }
  });
  rows_html += `<tr class="section-b"><td><b>Total Employer Contribution (B)</b></td><td class="r"><b>${fmtMoney(B_m)}</b></td><td class="r"><b>${fmtMoney(B_m*12)}</b></td></tr>`;

  // C: Deductions included in total
  (d.deductions || []).forEach(r => {
    if ((r.do_not_include_in_total || 0) != 1) {
      C_m += (r.amount || 0);
      rows_html += `<tr><td>${r.salary_component || ""}</td><td class="r">${fmtMoney(r.amount)}</td><td class="r">${fmtMoney((r.amount||0)*12)}</td></tr>`;
    }
  });
  rows_html += `<tr class="section-c"><td><b>Total Deductions (C)</b></td><td class="r"><b>${fmtMoney(C_m)}</b></td><td class="r"><b>${fmtMoney(C_m*12)}</b></td></tr>`;

  const D_m = A_m - C_m; // Net Take Home
  const E_m = A_m + B_m; // CTC Monthly

  rows_html += `<tr class="net"><td><b>Net Take Home (D=A−C)</b></td><td class="r"><b>${fmtMoney(D_m)}</b></td><td class="r"><b>${fmtMoney(D_m*12)}</b></td></tr>`;
  rows_html += `<tr class="ctc"><td><b>CTC (E=A+B)</b></td><td class="r"><b>${fmtMoney(E_m)}</b></td><td class="r"><b>${fmtMoney(E_m*12)}</b></td></tr>`;

  return { rows_html, A_m, B_m, C_m, D_m, E_m };
}

function build_letter_html(d, currency) {
  const fmtMoney = (n) => frappe.format(n || 0, { fieldtype: "Currency" }, { currency });
  const fmtDate = (v) => v ? frappe.datetime.str_to_user(v) : "";

  // --- Annual CTC calculation (rule: use custom_offered_ctc if > base; else base) ---
  const toNum = (v) => {
    if (v === undefined || v === null) return 0;
    const s = String(v).replace(/[^\d.\-]/g, "");
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  };
  const baseMonthly = toNum(d.base);
  const offeredMonthly = toNum(d.custom_offered_ctc);
  const monthly = offeredMonthly > baseMonthly ? offeredMonthly : baseMonthly;
  const annualCTC = (monthly * 12) || 0;

  // CTC table for annexure
  const { rows_html } = compute_ctc_rows_and_totals(d, currency);

  return `
${fmtDate(d.offer_date)}

To,
${d.applicant_name || ""}
${d.designation || ""}
${d.custom_posting_location || "Mumbai"},
Borivali-400092

Subject: Offer Of Employment

On behalf of ${d.company || ""}, we are delighted to extend an offer of employment to you.
Please find below a summary of the terms and conditions for your anticipated employment with us:

Designation: ${d.designation || ""}
Grade: ${d.grade || d.custom_grade || ""}
Reporting: You will be reporting to ${d.custom_reporting_manager || d.designation || ""}
Posting: ${d.custom_posting_location || ""}

Remuneration: Your Annual CTC will be  ${fmtMoney(annualCTC)} ${d.custom_total_amount_inr ? `(${d.custom_total_amount_inr})` : ""}

The Company reserves the right to re-designate or revise your position or work description at any time, with written notice.

If you accept this offer, your start date will be ${fmtDate(d.custom_joining_date)} or another mutually agreed-upon date.

Please note that this offer letter is valid for 3 days from the date of release. If not accepted within this timeframe, the offer will be considered null and void.

The offer of employment is contingent upon satisfactory references. A formal Letter of Appointment will be issued on your joining date.

We wish you all the best and look forward to welcoming you to the ${d.company || ""} Group.

For ${d.company || ""},

${d.custom_reporting_manager || ""}
Group Chief Human Resource Officer

<hr>
<b>Annexure 1: CTC Breakup</b>
<table border="1" cellspacing="0" cellpadding="4" width="100%">
  <tr style="background:#eee;font-weight:bold">
    <th>Components</th>
    <th>Monthly</th>
    <th>Annually</th>
  </tr>
  ${rows_html}
</table>
`.trim();
}

/* ---------------- preview vs save ---------------- */

// RENDER ONLY (no save) — call this in onload/refresh
function render_offer_preview(frm) {
  if (!frm.fields_dict.custom_letter_of_job_offer) return;

  const d = frm.doc || {};
  const currency = d.currency || "INR";
  const html = build_letter_html(d, currency);

  const f = frm.fields_dict.custom_letter_of_job_offer;
  // If it's an HTML/Text Editor, write directly to wrapper to avoid marking doc dirty
  if (f.df.fieldtype === "HTML" && f.$wrapper) {
    f.$wrapper.html(`<div class="offer-preview" style="white-space:pre-wrap">${html}</div>`);
  } else if (f.df.fieldtype === "Text Editor" && f.$wrapper) {
    // Quill editor exists – show read-only preview area above it to avoid editing doc
    let $prev = f.$wrapper.find(".offer-preview");
    if (!$prev.length) {
      f.$wrapper.prepend('<div class="offer-preview" style="white-space:pre-wrap;margin-bottom:8px;"></div>');
      $prev = f.$wrapper.find(".offer-preview");
    }
    $prev.html(html);
  } else {
    // Fallback: do NOT set_value on refresh to avoid dirty flag
  }
}

// SAVE ONLY IF CHANGED — call this on field edits, not on refresh
function build_offer_letter_if_changed(frm) {
  if (!frm.fields_dict.custom_letter_of_job_offer) return;
  const d = frm.doc || {};
  const currency = d.currency || "INR";
  const new_html = build_letter_html(d, currency);
  const old_val = (frm.doc.custom_letter_of_job_offer || "").trim();

  if (old_val !== new_html) {
    frm.set_value('custom_letter_of_job_offer', new_html);
  }
  // Update preview too so user sees latest even if field type isn't HTML
  render_offer_preview(frm);
}

/* ---------------- other helpers ---------------- */

// Amount-in-words for Annual CTC based on: (custom_offered_ctc > base ? offered : base) × 12
function amount_in_word_safe(frm) {
  const toNum = (v) => {
    if (v === undefined || v === null) return 0;
    const s = String(v).replace(/[^\d.\-]/g, "");
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  };

  const baseMonthly = toNum(frm.doc.base);
  const offeredMonthly = toNum(frm.doc.custom_offered_ctc);
  const monthly = offeredMonthly > baseMonthly ? offeredMonthly : baseMonthly;
  const annualCTC = (monthly * 12) || 0;

  const existing = frm.doc.custom_total_amount_inr || "";

  if (!annualCTC) {
    if (existing) frm.set_value("custom_total_amount_inr", "");
    return;
  }

  frappe.call({
    method: "fbts.amount_in_words.get_money_in_words",
    args: { amount: annualCTC },
    callback: function (r) {
      if (r.message && r.message !== existing) {
        frm.set_value("custom_total_amount_inr", r.message);
      }
    }
  });
}

function apply_role_restrictions(frm) {
  const restrictedRole = "Job Applicant";
  const exemptRole = "HR Manager";

  const isRestricted = frappe.user_roles.includes(restrictedRole);
  const isExempt = frappe.user_roles.includes(exemptRole);

  if (isRestricted && !isExempt) {
    const fieldsToToggle = [
      'job_applicant',
      'designation',
      'applicant_name',
      'offer_date',
      'company'
    ];
    fieldsToToggle.forEach(field => frm.set_df_property(field, 'hidden', 1));
    frm.remove_custom_button(__('Create Employee'));
  }
}
