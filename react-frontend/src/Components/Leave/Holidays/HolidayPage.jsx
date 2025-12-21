
import React, { useEffect, useState } from 'react';
import { fetchHolidayList } from '../../Home/dashboardApi';
import './HolidayPage.css';
import Header from '../../Header/Header';
import dayjs from 'dayjs';

const HolidayPage = () => {
  const [holidays, setHolidays] = useState({ past: [], upcoming: [], optional: [] });
  const [activeTab, setActiveTab] = useState('upcoming');
  const employeeId = localStorage.getItem('employee_id');

  useEffect(() => {
    const loadHolidays = async () => {
      if (!employeeId) return;
      const allHolidays = await fetchHolidayList(employeeId);

      const today = dayjs();
      const past = [];
      const upcoming = [];
      const optional = [];

      allHolidays.forEach((holiday, index) => {
        const date = dayjs(holiday.holiday_date, 'DD-MM-YYYY');
        const entry = {
          id: index + 1,
          date: date.format('DD-MM-YYYY'),
          day: date.format('dddd'),
          name: holiday.description,
        };

        if (holiday.optional) {
          optional.push(entry);
        } else if (date.isBefore(today, 'day')) {
          past.push(entry);
        } else {
          upcoming.push(entry);
        }
      });

      setHolidays({ past, upcoming, optional });
    };

    loadHolidays();
  }, [employeeId]);

  const renderTable = (data) => (
    <table className="holiday-table">
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Date</th>
          <th>Day</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((holiday) => (
            <tr key={holiday.id}>
              <td>{holiday.id}</td>
              <td>{holiday.date}</td>
              <td>{holiday.day}</td>
              <td>
                <span className="holiday-badge">{holiday.name}</span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No holidays found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <>
      <Header />
      <div className="holiday-page">
        <div className="holiday-filter-section">
          <select>
            <option>Flamingo BPO Technology Solutions Ltd</option>
          </select>
          <select>
            <option>Mumbai</option>
            <option>Vasai</option>
          </select>
          <select>
            <option>2025</option>
          </select>
          <button className="holiday-search-btn">🔍</button>
        </div>

        <div className="holiday-button-group">
          <button
            className={`holiday-tab-btn-past ${activeTab === 'past' ? 'active holiday-orange' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Holidays
          </button>
          <button
            className={`holiday-tab-btn-upcomming ${activeTab === 'upcoming' ? 'active holiday-green' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcomming Holidays
          </button>
          <button
            className={`holiday-tab-btn-options ${activeTab === 'optional' ? 'active holiday-red' : ''}`}
            onClick={() => setActiveTab('optional')}
          >
            Optional Holidays
          </button>
        </div>

        <div className="holiday-table-wrapper">
          {renderTable(holidays[activeTab])}
        </div>
      </div>
    </>
  );
};

export default HolidayPage;
