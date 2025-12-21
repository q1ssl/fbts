import React, { useEffect, useState } from "react";
import "./Attendance.css";
import MonthlyAttendance from "./MonthlyAttendance";
import Header from "../Header/Header";
// Use the same API as MonthlyAttendance
import { fetchMonthlyAttendance } from "../Home/dashboardApi";
import dayjs from "dayjs";

const Attendance = () => {
  const today = new Date().toISOString().split("T")[0];
  const [view, setView] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(today);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to get day with suffix (1st, 2nd, 3rd, etc.)
  const getDayWithSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd"; 
      case 3: return "rd";
      default: return "th";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (view !== "daily") return;
      
      setLoading(true);
      setError(null);
      
      try {
        const employeeId = localStorage.getItem("employee_id") || "FI00077";
        const selectedDateObj = dayjs(selectedDate);
        const monthName = selectedDateObj.format("MMMM").toLowerCase();
        
        console.log("Daily API Request - Employee:", employeeId, "Month:", monthName, "Selected Date:", selectedDate);
        
        // Use the same API as MonthlyAttendance
        const response = await fetchMonthlyAttendance(employeeId, monthName);
        console.log("Monthly API Response:", response);

        // Filter the monthly data to find the specific date
        if (response && response.days && Array.isArray(response.days)) {
          console.log("Searching for date:", selectedDate, "in", response.days.length, "records");
          
          const selectedDay = dayjs(selectedDate).date(); // Get day number (1, 2, 3, etc.)
          const selectedDayWithSuffix = selectedDay + getDayWithSuffix(selectedDay); // "1st", "2nd", "3rd", etc.
          
          console.log("Looking for day:", selectedDayWithSuffix, "September");
          
          const dayRecord = response.days.find((day) => {
            console.log("Checking day record:", day.date);
            // API returns dates like "2nd September", "1st September"
            return day.date === `${selectedDayWithSuffix} September`;
          });

          console.log("Found day record:", dayRecord);

          if (dayRecord) {
            const formatted = {
              dateFormatted: dayRecord.date, // Use the API date as is
              day: dayjs(selectedDate).format("ddd"), // Get day name from selected date
              check_in: dayRecord.check_in || "--",
              check_out: dayRecord.check_out || "--"
            };
            
            console.log("Formatted data:", formatted);
            setAttendanceData(formatted);
          } else {
            console.log("No matching record found for:", selectedDayWithSuffix, "September");
            setAttendanceData(null);
          }
        } else {
          console.log("No days array found in response");
          setAttendanceData(null);
        }
        
      } catch (err) {
        console.error("Error fetching daily attendance:", err);
        setError("Failed to load attendance data.");
        setAttendanceData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, view]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="HomeDashboard">
        <h2 className="Atd-heading">My Attendance</h2>
        <div className="Atd-attendance-container">
          <div className="Atd-toggle-buttons">
            <button
              className={`Atd-btn ${view === "daily" ? "Atd-active" : ""}`}
              onClick={() => setView("daily")}
            >
              Daily
            </button>
            <button
              className={`Atd-btn ${view === "monthly" ? "Atd-active" : ""}`}
              onClick={() => setView("monthly")}
            >
              Monthly
            </button>
          </div>

          {view === "daily" ? (
            <>
              <div className="Atd-date-picker">
                <label htmlFor="date">Select Date:</label>
                <input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="Atd-calendar-input"
                  max={today}
                />
              </div>

              <div className="Atd-table">
                <div className="Atd-table-row Atd-header">
                  <span>Date</span>
                  <span>Day</span>
                  <span>Check In</span>
                  <span>Check Out</span>
                </div>

                {loading ? (
                  <div className="Atd-loading-state">
                    <span>Loading attendance data...</span>
                  </div>
                ) : error ? (
                  <div className="Atd-error-state">
                    <span>{error}</span>
                    <button 
                      onClick={() => setSelectedDate(selectedDate)}
                      className="Atd-retry-btn"
                    >
                      Try Again
                    </button>
                  </div>
                ) : attendanceData ? (
                  <div className="Atd-table-row">
                    <span>{attendanceData.dateFormatted}</span>
                    <span>{attendanceData.day}</span>
                    <span>{attendanceData.check_in}</span>
                    <span>{attendanceData.check_out}</span>
                  </div>
                ) : (
                  <div className="Atd-no-records">No Records Found</div>
                )}
              </div>
            </>
          ) : (
            <MonthlyAttendance />
          )}
        </div>
      </div>
    </>
  );
};

export default Attendance;