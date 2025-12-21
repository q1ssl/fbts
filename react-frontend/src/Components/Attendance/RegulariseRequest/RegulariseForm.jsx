import React, { useState } from "react";
import "./RegulariseForm.css";
import Header from "../../Header/Header";
import StatusTabs from "./StatusTab";

const RegulariseForm = () => {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    checkIn: "",
    checkOut: "",
    workingHrs: "",
    regulariseType: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted:\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <>
    <Header/>
    <div className="regularise-container">
      <h3 className="form-title">Regularise Request</h3>

      <form onSubmit={handleSubmit} className="regularise-form">
        <div className="reg-form-row-from-date">
         <div className="regularise-to-from">  <label>From Date</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
          </div> 
          <div className="regularise-to-from"> 
           <label>To Date</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required /> 
            </div>
        </div>



        {/* <StatusTabs/> */}




        <div className="form-row">
        <div className="form-row-from-date">
          <label>Check In</label>
          <input type="time" name="checkIn" value={formData.checkIn} onChange={handleChange} />          </div>
          <label>Check Out</label>
          <input type="time" value={formData.checkOut} onChange={handleChange} />
        </div>

        <div className="form-row">
        <div className="form-row-from-date"> 
          <label>Working Hrs</label>
          <input type="numbers" name="workingHrs" value={formData.workingHrs} onChange={handleChange} placeholder="e.g., 9:00" />
        </div>
          <label>Regularise Type</label>
          <select name="regulariseType" value={formData.regulariseType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Missed Punch">Missed Punch</option>
            <option value="Wrong Entry">Wrong Entry</option>
          </select>
        </div>

        <div className="form-row remarks-row">
          <label>Remarks</label>
          <textarea name="remarks" rows="4" value={formData.remarks} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn">Cancel</button>
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
     </>
  );
};

export default RegulariseForm;
