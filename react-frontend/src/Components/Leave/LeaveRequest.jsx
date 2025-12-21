import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./LeaveRequest.css";
import Header from "../Header/Header";
import { createLeaveApplication } from "../Home/dashboardApi";
import api from "../../api";
 
const LeaveRequest = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      leaves: [
        {
          fromDate: "",
          toDate: "",
          leaveType: "",
          noOfDays: "",
          reason: "",
        },
      ],
    },
    mode: "onChange",
  });
 
  const { fields, append, remove } = useFieldArray({
    control,
    name: "leaves",
  });
 
  const watchedLeaves = watch("leaves");
 
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const res = await api.get('/api/resource/Leave Type?fields=["name"]');
        setLeaveTypes(res.data.data || []);
      } catch (err) {
        console.error("Error loading leave types:", err);
        setLeaveTypes([
          { name: "Annual Leave" },
          { name: "Sick Leave" },
          { name: "Personal Leave" },
          { name: "Emergency Leave" },
          { name: "Maternity Leave" },
          { name: "Paternity Leave" },
        ]);
      }
    };
 
    fetchLeaveTypes();
  }, []);
 
  // FIXED: Auto-calculate leave days
  useEffect(() => {
    watchedLeaves.forEach((leave, index) => {
      if (leave?.fromDate && leave?.toDate) {
        const fromDate = new Date(leave.fromDate);
        const toDate = new Date(leave.toDate);
       
        if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime()) && toDate >= fromDate) {
          const timeDiff = toDate.getTime() - fromDate.getTime();
          const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
          setValue(`leaves.${index}.noOfDays`, daysDiff.toString());
        } else {
          setValue(`leaves.${index}.noOfDays`, "");
        }
      } else {
        setValue(`leaves.${index}.noOfDays`, "");
      }
    });
  }, [watchedLeaves, setValue]);
 
  // Helper to check for overlapping dates
  const hasOverlappingLeaves = (leaves) => {
    const validLeaves = leaves.filter(l => l.fromDate && l.toDate);
    if (validLeaves.length < 2) return false;
   
    const ranges = validLeaves.map(l => ({
      start: new Date(l.fromDate),
      end: new Date(l.toDate),
    }));
 
    for (let i = 0; i < ranges.length; i++) {
      for (let j = i + 1; j < ranges.length; j++) {
        if (
          ranges[i].start <= ranges[j].end &&
          ranges[j].start <= ranges[i].end
        ) {
          return true;
        }
      }
    }
    return false;
  };
 
  const onSubmit = async (data) => {
    console.log("=== FORM SUBMISSION DEBUG START ===");
    console.log("Form data:", data);
   
    const employeeId = localStorage.getItem("employee_id");
    console.log("Employee ID:", employeeId);
 
    if (!employeeId) {
      alert("Employee ID not found. Please login again.");
      return;
    }
 
    const validLeaves = data.leaves.filter(leave =>
      leave.fromDate && leave.toDate && leave.leaveType && leave.reason
    );
   
    if (validLeaves.length === 0) {
      alert("Please fill out at least one complete leave request.");
      return;
    }
 
    if (hasOverlappingLeaves(validLeaves)) {
      alert("Some leave dates are overlapping. Please fix them.");
      return;
    }
 
    const payloads = validLeaves.map((leave) => ({
      employee: employeeId,
      leave_type: leave.leaveType,
      from_date: leave.fromDate,
      to_date: leave.toDate,
      description: leave.reason,
      no_of_days: parseInt(leave.noOfDays) || 1,
    }));
 
    setIsSubmitting(true);
   
    try {
      const results = [];
      for (let i = 0; i < payloads.length; i++) {
        try {
          const result = await createLeaveApplication(payloads[i]);
          results.push({ success: true, data: result });
        } catch (error) {
          console.error(`API Call ${i + 1} failed:`, error);
          results.push({ success: false, error });
        }
      }
     
      const successful = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);
     
      if (successful.length === payloads.length) {
        alert(`All ${successful.length} leave request(s) submitted successfully!`);
        handleCancel();
      } else if (successful.length > 0) {
        alert(`${successful.length} out of ${payloads.length} requests succeeded. ${failed.length} failed.`);
      } else {
        alert("All leave requests failed. Check console for details.");
      }
     
    } catch (err) {
      console.error("Submission error:", err);
      alert(`Submission failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const handleAddLeaveForm = () => {
    append({
      fromDate: "",
      toDate: "",
      leaveType: "",
      noOfDays: "",
      reason: "",
    });
  };
 
  const handleCancel = () => {
    reset({
      leaves: [
        {
          fromDate: "",
          toDate: "",
          leaveType: "",
          noOfDays: "",
          reason: "",
        },
      ],
    });
  };
 
  const handleRemoveLeave = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };
 
  return (
    <>
      <Header />
      <div className="Leave-request-container">
        <form onSubmit={handleSubmit(onSubmit)} className="Leave-request-form">
          {fields.map((field, index) => (
            <div key={field.id}>
              {/* Row 1 */}
              <div className="Leave-request-row-one-line">
                <div>
                  <label>From Date *</label>
                  <input
                    type="date"
                    {...register(`leaves.${index}.fromDate`, {
                      required: "From date is required",
                    })}
                  />
                  {errors.leaves?.[index]?.fromDate && (
                    <span className="error-message">
                      {errors.leaves[index].fromDate.message}
                    </span>
                  )}
                </div>
 
                <div>
                  <label>To Date *</label>
                  <input
                    type="date"
                    {...register(`leaves.${index}.toDate`, {
                      required: "To date is required",
                      validate: (value) => {
                        const from = watchedLeaves[index]?.fromDate;
                        if (from && value && new Date(value) < new Date(from)) {
                          return "To date cannot be before from date";
                        }
                        return true;
                      },
                    })}
                  />
                  {errors.leaves?.[index]?.toDate && (
                    <span className="error-message">
                      {errors.leaves[index].toDate.message}
                    </span>
                  )}
                </div>
 
                <div>
                  <label>Leave Type *</label>
                  <select
                    {...register(`leaves.${index}.leaveType`, {
                      required: "Leave type is required",
                    })}
                  >
                    <option value="">-- Select Leave Type --</option>
                    {leaveTypes.map((lt, idx) => (
                      <option key={`${lt.name}-${idx}`} value={lt.name}>
                        {lt.name}
                      </option>
                    ))}
                  </select>
                  {errors.leaves?.[index]?.leaveType && (
                    <span className="error-message">
                      {errors.leaves[index].leaveType.message}
                    </span>
                  )}
                </div>
              </div>
 
              {/* Row 2 */}
              <div className="Leave-request-row">
                <div>
                  <label>No of Days</label>
                  <input
                    type="text"
                    value={watchedLeaves[index]?.noOfDays || ""}
                    readOnly
                    placeholder="Auto-calculated"
                    style={{
                      backgroundColor: '#f8f9fa',
                      border: '1px solid #ced4da',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      color: '#495057',
                      fontWeight: 'bold',
                      width: '100%'
                    }}
                  />
                  {/* Hidden field for form submission */}
                  <input
                    type="hidden"
                    {...register(`leaves.${index}.noOfDays`)}
                  />
                </div>
 
                <div>
                  <label>Reason *</label>
                  <input
                    type="text"
                    placeholder="Enter reason for leave (minimum 10 characters)"
                    {...register(`leaves.${index}.reason`, {
                      required: "Reason is required",
                      minLength: {
                        value: 10,
                        message: "Reason must be at least 10 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "Reason cannot exceed 200 characters"
                      }
                    })}
                  />
                  {errors.leaves?.[index]?.reason && (
                    <span className="error-message">
                      {errors.leaves[index].reason.message}
                    </span>
                  )}
                </div>
              </div>
 
              {/* Remove Button */}
              {fields.length > 1 && (
                <div className="remove-leave-container">
                  <button
                    type="button"
                    onClick={() => handleRemoveLeave(index)}
                    className="remove-leave-btn"
                  >
                    Remove This Leave
                  </button>
                </div>
              )}
 
              {index !== fields.length - 1 && <hr />}
            </div>
          ))}
 
          {/* Actions */}
          <div className="Leave-request-actions">
            <button
              type="button"
              onClick={handleAddLeaveForm}
              className="Leave-request-add-btn"
              disabled={isSubmitting}
            >
              Add Another Leave <span className="Leave-request-plus">+</span>
            </button>
 
            <div className="Leave-request-btns">
              <button
                type="button"
                onClick={handleCancel}
                className="Leave-request-cancel"
                disabled={isSubmitting}
              >
                Cancel
              </button>
             
              <button
                type="submit"
                className="Leave-request-submit"
                disabled={isSubmitting || !isValid}
                title={!isValid ? "Please fill all required fields correctly" : ""}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
 
export default LeaveRequest;