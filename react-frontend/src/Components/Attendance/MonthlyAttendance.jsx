import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MonthlyAttendance.css";
import { fetchMonthlyAttendance } from "../Home/dashboardApi";
import dayjs from "dayjs";

const months2025 = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthlyAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState("September"); // default for testing
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const employeeId = localStorage.getItem("employee_id") || "FI00077";

    const fetchData = async () => {
      try {
        const records = await fetchMonthlyAttendance(employeeId, selectedMonth.toLowerCase());
        console.log("Monthly API Records:", records);

        // Helper function to shorten the status
        const getStatusShort = (r) => {
          if (r.holiday_name) return r.holiday_name;
          if (r.leave_type) return r.leave_type;

          const statusMap = {
            "Present": "P",
            "Absent": "A",
            "Work from Home": "WFH",
            "Half Day Absent": "HDA"
          };

          return statusMap[r.status] || r.status || "--";
        };

        const formatted = (records.days || []).map((r) => {
          const parsed = dayjs(r.date, ["DD-MM-YYYY", "YYYY-MM-DD"]);
          return {
            dateFormatted: parsed.isValid() ? parsed.format("DD MMM") : r.date,
            day: parsed.isValid() ? parsed.format("ddd") : "--",
            check_in: r.check_in || "--",
            check_out: r.check_out || "--",
            status: getStatusShort(r),
            working_hours: r.total_hours || r.working_hours || "--",
            lc: r.is_late ? `Late by ${r.late_by_minutes} min` : "--",
            weekHrs: "--", // You can update this if API provides it
            action: r.leave_type ? "Leave" : "Regularise",
            approved: false // You can modify based on API approval data
          };
        });

        setAttendanceData(formatted);
      } catch (err) {
        console.error("Error fetching monthly attendance:", err);
        setAttendanceData([]);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value.split(" ")[0]);
  };

  return (
    <div className="Atd-monthly-container">
      <div className="Atd-month-selector">
        <label htmlFor="month">Select Month:</label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          {months2025.map((month) => (
            <option key={month} value={month}>{month} 2025</option>
          ))}
        </select>
      </div>

      <div className="Atd-table">
        <div className="Atd-table-row Atd-header">
          <span>Date</span>
          <span>Day</span>
          <span>Check In</span>
          <span>Check Out</span>
          <span>Status</span>
          <span>Working Hrs</span>
          <span>LC</span>
          <span>Weekly Hrs</span>
          <span>Action</span>
        </div>

        {attendanceData.length > 0 ? (
          attendanceData.map((row, i) => (
            <div className="Atd-table-row" key={i}>
              <span>{row.dateFormatted}</span>
              <span>{row.day}</span>
              <span>{row.check_in}</span>
              <span>{row.check_out}</span>
              <span className={`Atd-status ${row.status?.toLowerCase().replace(/\s+/g, "-")}`}>
                {row.status}
              </span>
              <span>{row.working_hours}</span>
              <span>{row.lc}</span>
              <span>{row.weekHrs}</span>
              <span className={row.approved ? "Atd-approved" : ""}>
                {row.action === "Regularise" ? (
                  <Link to="/dashboard/regularise">
                    <button className="Atd-regularise-btn">Regularise</button>
                  </Link>
                ) : (
                  row.action
                )}
              </span>
            </div>
          ))
        ) : (
          <div className="Atd-no-records">No Records Found</div>
        )}
      </div>
    </div>
  );
};

export default MonthlyAttendance;
