import React, { useState } from 'react';
import './StatusTabs.css';
import AttendanceRequest from './AttendanceRequest'
import Header from '../../Header/Header';

const StatusTabs = ({ statusData, onStatusClick }) => {
  const defaultStatusData = [
    { status: 'Pending Approval', count: 3 },
    { status: 'Approved', count: 0 },
    { status: 'Rejected', count: 0 },
    { status: 'Cancelled', count: 0 }
  ];

  const [activeStatus, setActiveStatus] = useState('Pending Approval');
  const statuses = statusData || defaultStatusData;

  const handleStatusClick = (status, index) => {
    setActiveStatus(status.status);
    if (onStatusClick) {
      onStatusClick(status, index);
    }
  };

  return (
    <>
    
   <Header/>
    <div className="status-tabs-container">
      {statuses.map((item, index) => (
        <div
          key={index}
          className={`status-tab ${item.status === activeStatus ? 'status-tab-active' : ''}`}
          onClick={() => handleStatusClick(item, index)}
        >
          <div className="status-label">
            {item.status}
          </div>
          
          <div className="status-badge">
            {item.count}
          </div>
        </div>
      ))}
    </div>
      <AttendanceRequest/>
     </>
  );
};

export default StatusTabs;
