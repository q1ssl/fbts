// frappe.ui.form.on("Job Offer", {
//     custom_ctc: function(frm) {
//         amount_in_word(frm);
//     }
// });

// function amount_in_word(frm) {
//     if (frm.doc.custom_ctc) {
//         frappe.call({
//             method: "fbts.amount_in_words.get_money_in_words",
//             args: {
//                 amount: frm.doc.custom_ctc
//             },
//             callback: function(r) {
//                 if (r.message) {
//                     frm.set_value("custom_total_in_words_inr", r.message);
//                 }
//             }
//         });
//     } else {
//         frm.set_value("custom_total_in_words_inr", "");
//     }
// }


// Client Script: Job Offer
// - Fill earnings & deductions from Salary Structure
// - Evaluate formulas like "base*0.5", "B*0.5", "B-CA-EA", "PF*1"
// - Treat 0 as blank so formulas will overwrite "₹ 0.00" rows
// - Only compute if amount is blank (undefined/null/""/0)

// (() => {
//   const API_METHOD = "fbts.salary_str.get_salary_structure_components";
//   const TABLES = { earnings: "earnings", deductions: "deductions" };
//   const PARENT_BASE_FIELD = "base";

//   // ---------- Safe number helpers (no dependency on frappe.flt/cint) ----------
//   function toFloat(v, precision = null) {
//     if (v === undefined || v === null) return 0;
//     // handle strings like "1,00,000.00" or with currency symbols in UI (defensive)
//     const s = String(v).replace(/[^\d.\-]/g, "");
//     let n = parseFloat(s);
//     if (isNaN(n)) n = 0;
//     if (precision === null) return n;
//     const m = Math.pow(10, precision);
//     return Math.round(n * m) / m;
//   }
//   function toInt(v) {
//     const n = parseInt(v, 10);
//     return isNaN(n) ? 0 : n;
//   }

//   // Allow typical math symbols and identifiers
//   const SAFE_EXPR = /^[0-9+\-*/()., _a-zA-Z<>!=&|?:%]+$/;

//   // Build evaluation context from parent and already-known child amounts
//   function build_context(frm) {
//     const ctx = { Math, base: toFloat(frm.doc[PARENT_BASE_FIELD]) };

//     [TABLES.earnings, TABLES.deductions].forEach((table) => {
//       (frm.doc[table] || []).forEach((row) => {
//         if (row.abbr) ctx[row.abbr] = toFloat(row.amount);
//       });
//     });

//     return ctx;
//   }

//   // Evaluate a formula string using ctx; resolve ABBR tokens to ctx["ABBR"]
//   function evaluate_formula(expr, ctx) {
//     if (!expr || typeof expr !== "string") return null;
//     // quick guard
//     if (!SAFE_EXPR.test(expr)) {
//       throw new Error("Formula contains unsupported characters.");
//     }

//     // Replace tokens with ctx lookups to avoid accidental globals
//     // Note: use word boundaries so PF doesn't match inside PFE
//     const tokens = Object.keys(ctx).filter((k) => k !== "Math");
//     for (const key of tokens) {
//       const re = new RegExp(`\\b${key}\\b`, "g");
//       expr = expr.replace(re, `ctx["${key}"]`);
//     }

//     // eslint-disable-next-line no-new-func
//     const fn = new Function("ctx", "with (ctx) { return (" + expr + "); }");
//     return fn(ctx);
//   }

//   // Compute a single row ONLY if its amount is blank (undefined/null/""/0)
//   function compute_row_if_blank(frm, row, ctx) {
//     const isBlankAmount =
//       row.amount === undefined || row.amount === null || row.amount === "" || row.amount === 0;

//     if (!isBlankAmount) return false;
//     if (!row.formula || !String(row.formula).trim()) return false;

//     try {
//       const raw = evaluate_formula(String(row.formula).trim(), ctx);
//       const num = toFloat(raw, 2);
//       row.amount = isNaN(num) ? 0 : num;

//       // update ctx so dependent formulas in the same pass or next pass can use this
//       if (row.abbr) ctx[row.abbr] = row.amount;
//       return true;
//     } catch (err) {
//       console.warn("Formula evaluation failed:", row, err);
//       frappe.show_alert({
//         message: `Could not evaluate formula for ${row.abbr || row.salary_component || "row"}.`,
//         indicator: "orange",
//       });
//       return false;
//     }
//   }

//   // Run multiple passes to satisfy dependencies like B -> CA -> EA -> SA
//   function recompute_all_blank_amounts(frm) {
//     let ctx = build_context(frm);

//     // Up to 5 passes to resolve chains; stops early if nothing changes in a pass
//     for (let pass = 0; pass < 5; pass++) {
//       let changed = false;

//       [TABLES.earnings, TABLES.deductions].forEach((table) => {
//         (frm.doc[table] || []).forEach((row) => {
//           // compute only if blank; PF/PFE/PT, etc. will cascade
//           const did = compute_row_if_blank(frm, row, ctx);
//           if (did) changed = true;
//         });
//       });

//       if (!changed) break;
//       ctx = build_context(frm); // refresh context with any new values
//     }

//     frm.refresh_fields([TABLES.earnings, TABLES.deductions]);
//   }

//   // ----------------- Server payload → child rows -----------------
//   const FIELD_MAP = (row) => ({
//     salary_component: row.salary_component,
//     abbr: row.abbr,
//     amount: row.amount, // may be 0/blank; we'll compute
//     default_amount: row.default_amount,
//     additional_amount: row.additional_amount,
//     amount_based_on_formula: row.amount_based_on_formula,
//     formula: row.formula, // string like "base*0.5" or "B-CA-EA"
//     condition: row.condition,
//     depends_on_payment_days: row.depends_on_payment_days,
//     is_tax_applicable: row.is_tax_applicable,
//     is_flexible_benefit: row.is_flexible_benefit,
//     variable_based_on_taxable_salary: row.variable_based_on_taxable_salary,
//     statistical_component: row.statistical_component,
//     do_not_include_in_total: row.do_not_include_in_total,
//     do_not_include_in_accounts: row.do_not_include_in_accounts,
//     deduct_full_tax_on_selected_payroll_date: row.deduct_full_tax_on_selected_payroll_date,
//     tax_on_additional_salary: row.tax_on_additional_salary,
//     tax_on_flexible_benefit: row.tax_on_flexible_benefit,
//     year_to_date: row.year_to_date,
//   });

//   function fill_child_table(frm, tablefield, rows) {
//     frm.clear_table(tablefield);
//     (rows || []).forEach((r) => {
//       const child = frm.add_child(tablefield);
//       Object.assign(child, FIELD_MAP(r));
//     });
//     frm.refresh_field(tablefield);
//   }

//   async function apply_salary_structure(frm, { overwrite = true } = {}) {
//     const structure = frm.doc.salary_structure;
//     if (!structure) return;

//     try {
//       frappe.show_progress("Loading", 30, 100, "Fetching Salary Structure…");
//       const { message } = await frappe.call({ method: API_METHOD, args: { structure } });

//       if (!message) {
//         frappe.msgprint({
//           title: "No Data",
//           message: "No components returned for the selected Salary Structure.",
//           indicator: "orange",
//         });
//         return;
//       }

//       // Optional meta assigns
//       if (message.meta) {
//         if (frm.fields_dict.currency && message.meta.currency) {
//           frm.set_value("currency", message.meta.currency);
//         }
//         if (frm.fields_dict.payroll_frequency && message.meta.payroll_frequency) {
//           frm.set_value("payroll_frequency", message.meta.payroll_frequency);
//         }
//       }

//       if (overwrite) {
//         fill_child_table(frm, TABLES.earnings, message.earnings);
//         fill_child_table(frm, TABLES.deductions, message.deductions);
//       } else {
//         (message.earnings || []).forEach((r) => {
//           const child = frm.add_child(TABLES.earnings);
//           Object.assign(child, FIELD_MAP(r));
//         });
//         (message.deductions || []).forEach((r) => {
//           const child = frm.add_child(TABLES.deductions);
//           Object.assign(child, FIELD_MAP(r));
//         });
//         frm.refresh_fields([TABLES.earnings, TABLES.deductions]);
//       }

//       // Now compute all amounts that are blank/0 using formulas
//       recompute_all_blank_amounts(frm);

//       frappe.show_progress("Loading", 100, 100, "Done");
//     } catch (e) {
//       console.error(e);
//       frappe.msgprint({
//         title: "Failed",
//         message: e?.message || "Could not load components from Salary Structure.",
//         indicator: "red",
//       });
//     } finally {
//       frappe.hide_progress();
//     }
//   }

//   // ----------------- Form events -----------------
//   frappe.ui.form.on("Job Offer", {
//     salary_structure: function (frm) {
//       if (frm.doc.salary_structure) {
//         apply_salary_structure(frm, { overwrite: true });
//       } else {
//         frm.clear_table(TABLES.earnings);
//         frm.clear_table(TABLES.deductions);
//         frm.refresh_fields([TABLES.earnings, TABLES.deductions]);
//       }
//     },

//     // If Base changes, recompute rows that are blank/0
//     [PARENT_BASE_FIELD]: function (frm) {
//       recompute_all_blank_amounts(frm);
//     },

//     refresh: function (frm) {
//       frm.add_custom_button("Fill from Salary Structure", () =>
//         apply_salary_structure(frm, { overwrite: true })
//       );
//       frm.add_custom_button("Append from Salary Structure", () =>
//         apply_salary_structure(frm, { overwrite: false })
//       );

//       if (!frm.doc.salary_structure) {
//         frm.dashboard.clear_headline();
//         frm.dashboard.set_headline(
//           `<span class="text-muted">Select a Salary Structure to populate earnings & deductions.</span>`
//         );
//       }

//       // Also recompute on refresh to catch any rows that are still 0
//       // (useful after importing / scripting)
//       recompute_all_blank_amounts(frm);
//     },
//   });
// })();
