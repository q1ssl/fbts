frappe.ui.form.on("Job Offer", {
    custom_ctc: function(frm) {
        amount_in_word(frm);
    }
});

function amount_in_word(frm) {
    if (frm.doc.custom_ctc) {
        frappe.call({
            method: "fbts.amount_in_words.get_money_in_words",
            args: {
                amount: frm.doc.custom_ctc
            },
            callback: function(r) {
                if (r.message) {
                    frm.set_value("custom_total_in_words_inr", r.message);
                }
            }
        });
    } else {
        frm.set_value("custom_total_in_words_inr", "");
    }
}
