import React, { useEffect, useState } from "react";
import "./HomeDashboard.css";
import axios from "axios";
import { FaBirthdayCake, FaCalendarAlt } from "react-icons/fa";
import Arrow from "../../assets/Arrow.png";
import Header from "../Header/Header";
import Checkin from "./Checkin";
import {
  fetchHolidayList,
  fetchTodayBirthdays,
} from "./dashboardApi";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const HomeDashboard = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [birthdayList, setBirthdayList] = useState([]);
  const [birthdayCount, setBirthdayCount] = useState(0);

  useEffect(() => {
    const id = localStorage.getItem("employee_id");
    if (id) setEmployeeId(id);
  }, []);

  useEffect(() => {
    if (!employeeId) return;

    const fetchData = async () => {
      try {
        // ✅ Direct API call to get last 10 attendance records
        const attendanceRes = await axios.post(
          "https://fbts.flamingohrms.com/api/method/fbts.api.work_duration.get_last_10_attendance_records",
          { employee: employeeId }
        );
        const attendance = attendanceRes.data.message?.records || [];

        // Other API calls (holidays, birthdays)
        const [holidayList, birthdayData] = await Promise.all([
          fetchHolidayList(employeeId),
          fetchTodayBirthdays(),
        ]);

        const today = dayjs();
        const endOfYear = dayjs().endOf("year");

        const upcoming = holidayList.filter((h) => {
          const date = dayjs(h.holiday_date, "DD-MM-YYYY");
          return (
            date.isValid() &&
            (date.isSame(today, "day") ||
              (date.isAfter(today, "day") && date.isBefore(endOfYear.add(1, "day"))))
          );
        });

        // ✅ Set all attendance records (no slicing)
        // setAttendanceRecords(attendance);
        setAttendanceRecords(attendance.slice(0, 3));

        setHolidays(upcoming.slice(0, 3));
        setBirthdayList(birthdayData.employees || []);
        setBirthdayCount(birthdayData.count || 0);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };

    fetchData();
  }, [employeeId]);

  return (
    <> 
     <Header /> 
      <div className="HomeDashboard">
     
      <h2>Welcome </h2>

      <div className="home-checkIn">
        <Checkin employeeId={employeeId} />
      </div>

      <div className="widgets-container">
        {/* Attendance */}
        <div className="widget-column">
          <h3>My Attendance</h3>
          <div className="widget">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Total Hrs</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.length > 0 ? (
                  attendanceRecords.map((rec, idx) => (
                    <tr key={idx}>
                      <td>{rec.date}</td>
                      <td>{rec.in_time || "--"}</td>
                      <td>{rec.out_time || "--"}</td>
                      <td>{rec.working_hours || "--"}</td>
                      {/* <td className={status ${rec.status?.toLowerCase()}}> */}
                        <td className={`status ${rec.status?.toLowerCase()}`}>
                        {rec.status.charAt(0)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Attendance Records</td>
                  </tr>
                )}
              </tbody>
            </table>

            <Link to="/attendance">
              <div className="calendar-link">
               <div style={{display:"flex", gap:"10px"}}>  <FaCalendarAlt className="icon" /> My Attendance Calendar </div>
                <span>
                  <div className="icon-sildebar">
                    <img src={Arrow} alt="arrow" />
                  </div>
                </span>
              </div>
            </Link>
          </div>

          <Link to="/myleave">
            <div className="widget link-box">
              Leave Balance
              <span>
                <div className="icon-sildebar">
                  <img src={Arrow} alt="arrow" />
                </div>
              </span>
            </div>
          </Link>

          <div className="widget birthday-box">
            <div style={{display:"flex", gap:"10px"}}>  <FaBirthdayCake className="icon" /> Today's Birthday </div>
           <div style={{display:"flex", gap:"10px"}}> 
            <span className="count">{birthdayCount}</span>
             <span>
              <div className="icon-sildebar">
                <img src={Arrow} alt="arrow" />
              </div>
            </span>
            </div>
            {birthdayList.length > 0 && (
              <ul className="birthday-list">
                {birthdayList.map((emp, idx) => (
                  <li key={idx}>
                    {emp.employee_name} (
                    {dayjs(emp.date_of_birth).format("DD MMM")})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Links & Holidays */}
        <div className="widget-column">
          <h3>Quick Links</h3>
          <div className="widget holiday-list">
            <Link to="holiday-list">
              <div className="Holidays-list-arrowBTN">
                <div>Holidays List</div>
                <div className="icon-sildebar">
                  <img src={Arrow} alt="arrow" />
                </div>
              </div>
            </Link>
            <table>
              <tbody>
                {holidays.length > 0 ? (
                  holidays.map((h, idx) => (
                    <tr key={idx}>
                      <td>{h.holiday_date}</td>
                      <td>
                        {dayjs(h.holiday_date, "DD-MM-YYYY").format("dddd")}
                      </td>
                      <td>{h.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No upcoming holidays.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="widget-cards-container">
            <Link to="/leaverequest"> 
            <div className="widget-card">
              <div className="widget-card-header">
                <span className="widget-card-title">Leave Request</span>
                <div className="icon-sildebar">
                  <img src={Arrow} alt="arrow" />
                </div>
              </div>
              <div className="widget-card-badge-section">
                <span className="badge">0</span>
              </div>
            </div>
            </Link>

            <div className="widget-card">
              <Link to="/regularise"> 
              <div className="widget-card-header">
                <span className="widget-card-title">Attendance Regularise</span>
                <div className="icon-sildebar">
                  <img src={Arrow} alt="arrow" />
                </div>
              </div>
              </Link>
              <div className="widget-card-content">
                <div className="widget-card-subtitle">
                  <span className="small-text">Pending Approval</span>
                  <span className="badge">5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="widget link-box">
            Company Policy
            <span>
              <div className="icon-sildebar">
                <img src={Arrow} alt="arrow" />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomeDashboard;