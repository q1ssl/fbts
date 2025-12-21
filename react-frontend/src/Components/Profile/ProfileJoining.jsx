import React, { useState } from 'react';
import Header from '../Header/Header';

const ProfileJoining = () => {
  const [joiningData, setJoiningData] = useState({
    job_applicant: '',
    confirmation_date: '2024-09-12',
    notice_days: '0',
    offer_date: '2024-09-12',
    contract_end_date: '',
    date_of_retirement: '2055-10-07'
  });

  const handleInputChange = (field, value) => {
    setJoiningData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving joining data:', joiningData);
    // Add API call here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="employee-profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Employee Profile - Joining Details</h1>
          <p className="profile-subtitle">Manage employee joining and contract information</p>
        </div>

        <div className="tab-content-container">
          <div className="joining-content">
            <div className="form-section">
              <h3 className="section-title">Joining Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="job_applicant">Job Applicant</label>
                  <input
                    type="text"
                    id="job_applicant"
                    value={joiningData.job_applicant}
                    onChange={(e) => handleInputChange('job_applicant', e.target.value)}
                    className="form-input"
                    placeholder="Enter job applicant reference"
                  />
                  <small className="form-help-text">Reference to the job application</small>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmation_date">Confirmation Date</label>
                  <input
                    type="date"
                    id="confirmation_date"
                    value={joiningData.confirmation_date}
                    onChange={(e) => handleInputChange('confirmation_date', e.target.value)}
                    className="form-input"
                  />
                  <small className="form-help-text">Date when employment was confirmed</small>
                </div>

                <div className="form-group">
                  <label htmlFor="notice_days">Notice Period (days)</label>
                  <input
                    type="number"
                    id="notice_days"
                    value={joiningData.notice_days}
                    onChange={(e) => handleInputChange('notice_days', e.target.value)}
                    className="form-input"
                    min="0"
                  />
                  <small className="form-help-text">Required notice period in days</small>
                </div>

                <div className="form-group">
                  <label htmlFor="offer_date">Offer Date</label>
                  <input
                    type="date"
                    id="offer_date"
                    value={joiningData.offer_date}
                    onChange={(e) => handleInputChange('offer_date', e.target.value)}
                    className="form-input"
                  />
                  <small className="form-help-text">Date when job offer was made</small>
                </div>

                <div className="form-group">
                  <label htmlFor="contract_end_date">Contract End Date</label>
                  <input
                    type="date"
                    id="contract_end_date"
                    value={joiningData.contract_end_date}
                    onChange={(e) => handleInputChange('contract_end_date', e.target.value)}
                    className="form-input"
                  />
                  <small className="form-help-text">Leave empty for permanent positions</small>
                </div>

                <div className="form-group">
                  <label htmlFor="date_of_retirement">Date of Retirement</label>
                  <input
                    type="date"
                    id="date_of_retirement"
                    value={joiningData.date_of_retirement}
                    onChange={(e) => handleInputChange('date_of_retirement', e.target.value)}
                    className="form-input"
                  />
                  <small className="form-help-text">Expected retirement date</small>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="form-section">
              <h3 className="section-title">Employment Timeline</h3>
              <div className="timeline-container">
                <div className="timeline-item">
                  <div className="timeline-dot timeline-dot-blue"></div>
                  <div className="timeline-content">
                    <h4>Offer Date</h4>
                    <p>{joiningData.offer_date || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-dot timeline-dot-green"></div>
                  <div className="timeline-content">
                    <h4>Confirmation Date</h4>
                    <p>{joiningData.confirmation_date || 'Not specified'}</p>
                  </div>
                </div>
                
                {joiningData.contract_end_date && (
                  <div className="timeline-item">
                    <div className="timeline-dot timeline-dot-orange"></div>
                    <div className="timeline-content">
                      <h4>Contract End Date</h4>
                      <p>{joiningData.contract_end_date}</p>
                    </div>
                  </div>
                )}
                
                <div className="timeline-item">
                  <div className="timeline-dot timeline-dot-gray"></div>
                  <div className="timeline-content">
                    <h4>Retirement Date</h4>
                    <p>{joiningData.date_of_retirement || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn-secondary">Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save</button>
        </div>

        <style jsx>{`
          .employee-profile-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }

          .profile-header {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e1e5e9;
          }

          .profile-title {
            font-size: 24px;
            font-weight: 600;
            color: #333;
            margin: 0 0 5px 0;
          }

          .profile-subtitle {
            font-size: 14px;
            color: #666;
            margin: 0;
          }

          .tab-content-container {
            min-height: 400px;
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border: 1px solid #e1e5e9;
          }

          .joining-content {
            max-width: 800px;
          }

          .form-section {
            margin-bottom: 30px;
          }

          .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin: 0 0 20px 0;
            padding-bottom: 8px;
            border-bottom: 1px solid #e1e5e9;
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            align-items: start;
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          .form-group label {
            font-size: 13px;
            font-weight: 500;
            color: #555;
            margin-bottom: 5px;
          }

          .form-input {
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 14px;
            transition: border-color 0.2s ease;
            background-color: #f9f9f9;
          }

          .form-input:focus {
            outline: none;
            border-color: #007bff;
            background-color: #fff;
          }

          .form-help-text {
            font-size: 12px;
            color: #666;
            margin-top: 4px;
            font-style: italic;
          }

          .timeline-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin: 20px 0;
          }

          .timeline-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            position: relative;
          }

          .timeline-item:not(:last-child)::after {
            content: '';
            position: absolute;
            left: 8px;
            top: 20px;
            width: 2px;
            height: 30px;
            background-color: #e1e5e9;
          }

          .timeline-dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .timeline-dot-blue {
            background-color: #3b82f6;
          }

          .timeline-dot-green {
            background-color: #10b981;
          }

          .timeline-dot-orange {
            background-color: #f59e0b;
          }

          .timeline-dot-gray {
            background-color: #6b7280;
          }

          .timeline-content h4 {
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin: 0 0 4px 0;
          }

          .timeline-content p {
            font-size: 13px;
            color: #666;
            margin: 0;
          }

          .action-buttons {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e1e5e9;
          }

          .btn-secondary {
            padding: 10px 20px;
            border: 1px solid #d1d5db;
            background-color: #fff;
            color: #666;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
          }

          .btn-secondary:hover {
            background-color: #f5f5f5;
          }

          .btn-primary {
            padding: 10px 20px;
            border: 1px solid #007bff;
            background-color: #007bff;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
          }

          .btn-primary:hover {
            background-color: #0056b3;
          }

          @media (max-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr;
              gap: 15px;
            }

            .employee-profile-container {
              padding: 15px;
            }

            .tab-content-container {
              padding: 20px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProfileJoining;