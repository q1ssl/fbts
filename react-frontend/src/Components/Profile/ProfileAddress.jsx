import React, { useState } from 'react';
import Header from '../Header/Header';

const ProfileAddress = () => {
  const [addressData, setAddressData] = useState({
    mobile: '9137592977',
    personal_email: 'kamblesandeep778@gmail.com',
    preferred_contact_email: 'Personal Email',
    company_email: '',
    preferred_email: 'kamblesandeep778@gmail.com',
    unsubscribed: false,
    emergency_contact_name: 'Aruna kalekar',
    emergency_phone: '07218364578',
    relation: '',
    // Current Address
    current_address_line1: '',
    current_address_line2: '',
    current_city: '',
    current_state: '',
    current_pincode: '',
    current_country: 'India',
    // Permanent Address
    permanent_address_line1: '',
    permanent_address_line2: '',
    permanent_city: '',
    permanent_state: '',
    permanent_pincode: '',
    permanent_country: 'India',
    same_as_current: false
  });

  const handleInputChange = (field, value) => {
    setAddressData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSameAsCurrent = (checked) => {
    if (checked) {
      setAddressData(prev => ({
        ...prev,
        same_as_current: true,
        permanent_address_line1: prev.current_address_line1,
        permanent_address_line2: prev.current_address_line2,
        permanent_city: prev.current_city,
        permanent_state: prev.current_state,
        permanent_pincode: prev.current_pincode,
        permanent_country: prev.current_country,
      }));
    } else {
      setAddressData(prev => ({
        ...prev,
        same_as_current: false
      }));
    }
  };

  const handleSave = () => {
    console.log('Saving address data:', addressData);
    // Add API call here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="employee-profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Employee Profile - Address & Contacts</h1>
          <p className="profile-subtitle">Manage contact information and addresses</p>
        </div>

        <div className="tab-content-container">
          <div className="address-content">
            {/* Contact Information Section */}
            <div className="form-section">
              <h3 className="section-title">Contact Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="mobile">Mobile <span className="required">*</span></label>
                  <input
                    type="tel"
                    id="mobile"
                    value={addressData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="personal_email">Personal Email <span className="required">*</span></label>
                  <input
                    type="email"
                    id="personal_email"
                    value={addressData.personal_email}
                    onChange={(e) => handleInputChange('personal_email', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferred_contact_email">Preferred Contact Email</label>
                  <select
                    id="preferred_contact_email"
                    value={addressData.preferred_contact_email}
                    onChange={(e) => handleInputChange('preferred_contact_email', e.target.value)}
                    className="form-input"
                  >
                    <option value="Personal Email">Personal Email</option>
                    <option value="Company Email">Company Email</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="company_email">Company Email</label>
                  <input
                    type="email"
                    id="company_email"
                    value={addressData.company_email}
                    onChange={(e) => handleInputChange('company_email', e.target.value)}
                    className="form-input"
                    placeholder="Will be assigned by company"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferred_email">Preferred Email</label>
                  <input
                    type="email"
                    id="preferred_email"
                    value={addressData.preferred_email}
                    onChange={(e) => handleInputChange('preferred_email', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="unsubscribed">Email Preferences</label>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="unsubscribed"
                      checked={addressData.unsubscribed}
                      onChange={(e) => handleInputChange('unsubscribed', e.target.checked)}
                    />
                    <label htmlFor="unsubscribed" className="checkbox-label">Unsubscribed from company emails</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Address Section */}
            <div className="form-section">
              <h3 className="section-title">Current Address</h3>
              <div className="form-grid">
                <div className="form-group form-group-full">
                  <label htmlFor="current_address_line1">Address Line 1</label>
                  <input
                    type="text"
                    id="current_address_line1"
                    value={addressData.current_address_line1}
                    onChange={(e) => handleInputChange('current_address_line1', e.target.value)}
                    className="form-input"
                    placeholder="House/Flat No., Building Name"
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="current_address_line2">Address Line 2</label>
                  <input
                    type="text"
                    id="current_address_line2"
                    value={addressData.current_address_line2}
                    onChange={(e) => handleInputChange('current_address_line2', e.target.value)}
                    className="form-input"
                    placeholder="Street, Area, Locality"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="current_city">City</label>
                  <input
                    type="text"
                    id="current_city"
                    value={addressData.current_city}
                    onChange={(e) => handleInputChange('current_city', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="current_state">State</label>
                  <input
                    type="text"
                    id="current_state"
                    value={addressData.current_state}
                    onChange={(e) => handleInputChange('current_state', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="current_pincode">Pincode</label>
                  <input
                    type="text"
                    id="current_pincode"
                    value={addressData.current_pincode}
                    onChange={(e) => handleInputChange('current_pincode', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="current_country">Country</label>
                  <select
                    id="current_country"
                    value={addressData.current_country}
                    onChange={(e) => handleInputChange('current_country', e.target.value)}
                    className="form-input"
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Permanent Address Section */}
            <div className="form-section">
              <h3 className="section-title">Permanent Address</h3>
              
              <div className="checkbox-container mb-4">
                <input
                  type="checkbox"
                  id="same_as_current"
                  checked={addressData.same_as_current}
                  onChange={(e) => handleSameAsCurrent(e.target.checked)}
                />
                <label htmlFor="same_as_current" className="checkbox-label">Same as current address</label>
              </div>

              <div className="form-grid">
                <div className="form-group form-group-full">
                  <label htmlFor="permanent_address_line1">Address Line 1</label>
                  <input
                    type="text"
                    id="permanent_address_line1"
                    value={addressData.permanent_address_line1}
                    onChange={(e) => handleInputChange('permanent_address_line1', e.target.value)}
                    className="form-input"
                    placeholder="House/Flat No., Building Name"
                    disabled={addressData.same_as_current}
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="permanent_address_line2">Address Line 2</label>
                  <input
                    type="text"
                    id="permanent_address_line2"
                    value={addressData.permanent_address_line2}
                    onChange={(e) => handleInputChange('permanent_address_line2', e.target.value)}
                    className="form-input"
                    placeholder="Street, Area, Locality"
                    disabled={addressData.same_as_current}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="permanent_city">City</label>
                  <input
                    type="text"
                    id="permanent_city"
                    value={addressData.permanent_city}
                    onChange={(e) => handleInputChange('permanent_city', e.target.value)}
                    className="form-input"
                    disabled={addressData.same_as_current}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="permanent_state">State</label>
                  <input
                    type="text"
                    id="permanent_state"
                    value={addressData.permanent_state}
                    onChange={(e) => handleInputChange('permanent_state', e.target.value)}
                    className="form-input"
                    disabled={addressData.same_as_current}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="permanent_pincode">Pincode</label>
                  <input
                    type="text"
                    id="permanent_pincode"
                    value={addressData.permanent_pincode}
                    onChange={(e) => handleInputChange('permanent_pincode', e.target.value)}
                    className="form-input"
                    disabled={addressData.same_as_current}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="permanent_country">Country</label>
                  <select
                    id="permanent_country"
                    value={addressData.permanent_country}
                    onChange={(e) => handleInputChange('permanent_country', e.target.value)}
                    className="form-input"
                    disabled={addressData.same_as_current}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="form-section">
              <h3 className="section-title">Emergency Contact</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="emergency_contact_name">Contact Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="emergency_contact_name"
                    value={addressData.emergency_contact_name}
                    onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emergency_phone">Contact Phone <span className="required">*</span></label>
                  <input
                    type="tel"
                    id="emergency_phone"
                    value={addressData.emergency_phone}
                    onChange={(e) => handleInputChange('emergency_phone', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="relation">Relationship</label>
                  <select
                    id="relation"
                    value={addressData.relation}
                    onChange={(e) => handleInputChange('relation', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Relationship</option>
                    <option value="Parent">Parent</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Child">Child</option>
                    <option value="Friend">Friend</option>
                    <option value="Other">Other</option>
                  </select>
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

          .address-content {
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

          .form-group-full {
            grid-column: 1 / -1;
          }

          .form-group label {
            font-size: 13px;
            font-weight: 500;
            color: #555;
            margin-bottom: 5px;
          }

          .required {
            color: #e74c3c;
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

          .form-input:disabled {
            background-color: #f5f5f5;
            cursor: not-allowed;
            opacity: 0.6;
          }

          .checkbox-container {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .checkbox-container input[type="checkbox"] {
            width: auto;
            margin: 0;
          }

          .checkbox-label {
            font-size: 14px;
            margin: 0;
            cursor: pointer;
          }

          .mb-4 {
            margin-bottom: 16px;
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

export default ProfileAddress;