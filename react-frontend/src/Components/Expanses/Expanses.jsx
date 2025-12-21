import React, { useState } from "react";
import "./Expenses.css";
import Header from "../Header/Header";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    type: "",
    amount: "",
    date: "",
    description: "",
    file: null,
    status: "Pending",
  });

  const [filter, setFilter] = useState("All");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses([...expenses, form]);
    setForm({
      type: "",
      amount: "",
      date: "",
      description: "",
      file: null,
      status: "Pending",
    });
  };

  const filteredExpenses =
    filter === "All" ? expenses : expenses.filter((e) => e.status === filter);

  return (
    <>
      <Header />
      <div className="expense-container">
        <h2>Employee Expense Management</h2>

        <form className="expense-form" onSubmit={handleSubmit}>
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="">Select Expense Type</option>
            <option value="Travel">Travel</option>
            <option value="Meals">Meals</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Supplies">Supplies</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={2}
          ></textarea>

          <input type="file" name="file" onChange={handleChange} />

          <button type="submit">Submit Expense</button>
        </form>

        <div className="expense-filter">
          <label>Filter by Status:</label>
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="expense-list">
          {filteredExpenses.length ? (
            filteredExpenses.map((exp, i) => (
              <div className="expense-card" key={i}>
                <div className="expense-header">
                  <h4>{exp.type}</h4>
                  <span className={`status ${exp.status.toLowerCase()}`}>
                    {exp.status}
                  </span>
                </div>
                <p><strong>Amount:</strong> ₹{exp.amount}</p>
                <p><strong>Date:</strong> {exp.date}</p>
                <p>{exp.description}</p>
                {exp.file && (
                  <a
                    href={URL.createObjectURL(exp.file)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Receipt
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="no-expense">No expenses to show.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Expenses;
