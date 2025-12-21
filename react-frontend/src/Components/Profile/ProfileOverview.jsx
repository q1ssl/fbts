// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Header from '../Header/Header';

// const Profile = () => {
//   const { tab } = useParams(); // Get the tab from URL parameter
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Default to overview if no tab specified
//   const activeTab = tab || 'overview';

//   const [employeeData, setEmployeeData] = useState({
//     // Overview Tab Data
//     first_name: 'Sumit',
//     middle_name: 'Balu',
//     last_name: 'Borchate',
//     employee_name: 'Sumit Balu Borchate',
//     gender: 'Male',
//     date_of_birth: '1995-10-07',
//     salutation: 'Mr',
//     date_of_joining: '2024-09-12',
//     status: 'Active',
//     // Company Details
//     company: 'ABC Technologies Pvt Ltd',
//     department: 'IT Department',
//     employment_type: 'Full Time',
//     designation: 'Team Leader',
//     grade: 'Grade A',
//     reports_to: 'John Smith',
//     branch: 'Head Office Mumbai',
    
//     // Joining tab data
//     joining: {
//       job_applicant: '',
//       confirmation_date: '2024-09-12',
//       notice_days: '0',
//       offer_date: '2024-09-12',
//       contract_end_date: '',
//       date_of_retirement: '2055-10-07'
//     },
    
//     // Address & Contacts tab data
//     address: {
//       mobile: '9137592977',
//       personal_email: 'kamblesandeep778@gmail.com',
//       preferred_contact_email: 'Personal Email',
//       company_email: '',
//       preferred_email: 'kamblesandeep778@gmail.com',
//       unsubscribed: false,
//       emergency_contact_name: 'Aruna kalekar',
//       emergency_phone: '07218364578',
//       relation: ''
//     },
    
//     // Attendance & Leaves tab data
//     attendance: {
//       attendance_device_id: '',
//       holiday_list: 'Maharashtra Holidays - 2025-26',
//       applicable_holiday_list: '',
//       default_shift: 'Standard Shift',
//       expense_approver: 'get.ur.wish@gmail.com',
//       shift_request_approver: 'get.ur.wish@gmail.com',
//       leave_approver: 'get.ur.wish@gmail.com'
//     },
    
//     // Other tabs data
//     salary: {},
//     personal: {},
//     profile: {},
//     exit: {},
//     connections: {}
//   });

//   const statusOptions = ['Active', 'Inactive', 'Suspended', 'Left'];

//   // Redirect to overview if no tab specified
//   useEffect(() => {
//     if (!tab) {
//       navigate('/dashboard/profile/overview', { replace: true });
//     }
//   }, [tab, navigate]);

//   const handleInputChange = (field, value) => {
//     if (field === 'joining') {
//       setEmployeeData(prev => ({
//         ...prev,
//         joining: value
//       }));
//     } else if (field === 'address') {
//       setEmployeeData(prev => ({
//         ...prev,
//         address: value
//       }));
//     } else if (field === 'attendance') {
//       setEmployeeData(prev => ({
//         ...prev,
//         attendance: value
//       }));
//     } else {
//       setEmployeeData(prev => ({
//         ...prev,
//         [field]: value
//       }));
//     }
//   };

//   const renderAttendanceTab = () => {
//     return (
//       <div className="attendance-content">
//         {/* Attendance Settings Section */}
//         <div className="form-section">
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="attendance_device_id">Attendance Device ID (Biometric/RF tag ID)</label>
//               <input
//                 type="text"
//                 id="attendance_device_id"
//                 value={employeeData.attendance.attendance_device_id}
//                 onChange={(e) => handleInputChange('attendance', {...employeeData.attendance, attendance_device_id: e.target.value})}
//                 className="form-input"
//                 placeholder=""
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="holiday_list">Holiday List</label>
//               <select
//                 id="holiday_list"
//                 value={employeeData.attendance.holiday_list}
//                 onChange={(e) => handleInputChange('attendance', {...employeeData.attendance, holiday_list: e.target.value})}
//                 className="form-input"
//               >
//                 <option value="">Begin typing for results...</option>
//                 <option value="Maharashtra Holidays - 2025-26">Maharashtra Holidays - 2025-26</option>
//                 <option value="National Holidays - 2025-26">National Holidays - 2025-26</option>
//                 <option value="Regional Holidays - 2025-26">Regional Holidays - 2025-26</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="applicable_holiday_list">Applicable Holiday List</label>
//               <input
//                 type="text"
//                 id="applicable_holiday_list"
//                 value={employeeData.attendance.applicable_holiday_list}
//                 onChange={(e) => handleInputChange('attendance', {...employeeData.attendance, applicable_holiday_list: e.target.value})}
//                 className="form-input"
//                 placeholder=""
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="default_shift">Default Shift</label>
//               <select
//                 id="default_shift"
//                 value={employeeData.attendance.default_shift}
//                 onChange={(e) => handleInputChange('attendance', {...employeeData.attendance, default_shift: e.target.value})}
//                 className="form-input"
//               >
//                 <option value="">Begin typing for results...</option>
//                 <option value="Standard Shift">Standard Shift</option>
//                 <option value="Morning Shift">Morning Shift</option>
//                 <option value="Evening Shift">Evening Shift</option>
//                 <option value="Night Shift">Night Shift</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Approvers Section */}
//         <div className="form-section">
//           <h3 className="section-title">Approvers</h3>
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="expense_approver">Expense Approver</label>
//               <input
//                 type="email"
//                 id="expense_approver"
//                 value={employeeData.attendance.expense_approver}
//                 onChange={(e) => handleInputChange('attendance', {...employeeData.attendance, expense_approver: e.target.value})}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="shift_request_approver">Shift Request Approver</label>
//               <input
//                 type="email"
//                 id="shift_request_approver"
//                 value={employeeData.attendance.shift_request_approver}
//                 onChange={(e) => handleInputChange('attendance', {...employeeData.attendance, shift_request_approver: e.target.value})}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="leave_approver">Leave Approver</label>
//               <input
//                 type="email"
//                 id="leave_approver"
//                 value={employeeData.attendance.leave_approver}
//                 onChange={(e) => handleInputChange('attendance', {...employeeData.attendance, leave_approver: e.target.value})}
//                 className="form-input"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderAddressTab = () => {
//     return (
//       <div className="address-content">
//         {/* Contact Information Section */}
//         <div className="form-section">
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="mobile">Mobile</label>
//               <input
//                 type="tel"
//                 id="mobile"
//                 value={employeeData.address.mobile}
//                 onChange={(e) => handleInputChange('address', {...employeeData.address, mobile: e.target.value})}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="personal_email">Personal Email</label>
//               <input
//                 type="email"
//                 id="personal_email"
//                 value={employeeData.address.personal_email}
//                 onChange={(e) => handleInputChange('address', {...employeeData.address, personal_email: e.target.value})}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="preferred_contact_email">Preferred Contact Email</label>
//               <select
//                 id="preferred_contact_email"
//                 value={employeeData.address.preferred_contact_email}
//                 onChange={(e) => handleInputChange('address', {...employeeData.address, preferred_contact_email: e.target.value})}
//                 className="form-input"
//               >
//                 <option value="Personal Email">Personal Email</option>
//                 <option value="Company Email">Company Email</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="company_email">Company Email</label>
//               <input
//                 type="email"
//                 id="company_email"
//                 value={employeeData.address.company_email}
//                 onChange={(e) => handleInputChange('address', {...employeeData.address, company_email: e.target.value})}
//                 className="form-input"
//                 placeholder=""
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="preferred_email">Preferred Email</label>
//               <input
//                 type="email"
//                 id="preferred_email"
//                 value={employeeData.address.preferred_email}
//                 onChange={(e) => handleInputChange('address', {...employeeData.address, preferred_email: e.target.value})}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="unsubscribed">Email Preferences</label>
//               <div className="checkbox-container">
//                 <input
//                   type="checkbox"
//                   id="unsubscribed"
//                   checked={employeeData.address.unsubscribed}
//                   onChange={(e) => handleInputChange('address', {...employeeData.address, unsubscribed: e.target.checked})}
//                 />
//                 <label htmlFor="unsubscribed" className="checkbox-label">Unsubscribed</label>
//               </div>
//               <small className="form-help-text">Provide Email Address registered in company</small>
//             </div>
//           </div>
//         </div>

//         {/* Emergency Contact Section */}
//         <div className="form-section">
//           <h3 className="section-title">Emergency Contact</h3>
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="emergency_contact_name">Emergency Contact Name</label>
//               <input
//                 type="text"
//                 id="emergency_contact_name"
//                 value={employeeData.address.emergency_contact_name}
//                 onChange={(e) => handleInputChange('address', {...employeeData.address, emergency_contact_name: e.target.value})}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="emergency_phone">Emergency Phone</label>
//               <input
//                 type="tel"
//                 id="emergency_phone"
//                 value={employeeData.address.emergency_phone}
//                 onChange={(e) => handleInputChange('address', {...employeeData.address, emergency_phone: e.target.value})}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="relation">Relation</label>
//               <input
//                 type="text"
//                 id="relation"
//                 value={employeeData.address.relation}
//                 onChange={(e) => handleInputChange('address', {...employeeData.address, relation: e.target.value})}
//                 className="form-input"
//                 placeholder=""
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderJoiningTab = () => {
//     return (
//       <div className="joining-content">
//         <div className="form-section">
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="job_applicant">Job Applicant</label>
//               <input
//                 type="text"
//                 id="job_applicant"
//                 value={employeeData.joining.job_applicant}
//                 onChange={(e) => handleInputChange('joining', {...employeeData.joining, job_applicant: e.target.value})}
//                 className="form-input"
//                 placeholder=""
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="confirmation_date">Confirmation Date</label>
//               <input
//                 type="date"
//                 id="confirmation_date"
//                 value={employeeData.joining.confirmation_date}
//                 onChange={(e) => handleInputChange('joining', {...employeeData.joining, confirmation_date: e.target.value})}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="notice_days">Notice (days)</label>
//               <input
//                 type="number"
//                 id="notice_days"
//                 value={employeeData.joining.notice_days}
//                 onChange={(e) => handleInputChange('joining', {...employeeData.joining, notice_days: e.target.value})}
//                 className="form-input"
//                 min="0"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="offer_date">Offer Date</label>
//               <input
//                 type="date"
//                 id="offer_date"
//                 value={employeeData.joining.offer_date}
//                 onChange={(e) => handleInputChange('joining', {...employeeData.joining, offer_date: e.target.value})}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="contract_end_date">Contract End Date</label>
//               <input
//                 type="date"
//                 id="contract_end_date"
//                 value={employeeData.joining.contract_end_date}
//                 onChange={(e) => handleInputChange('joining', {...employeeData.joining, contract_end_date: e.target.value})}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="date_of_retirement">Date Of Retirement</label>
//               <input
//                 type="date"
//                 id="date_of_retirement"
//                 value={employeeData.joining.date_of_retirement}
//                 onChange={(e) => handleInputChange('joining', {...employeeData.joining, date_of_retirement: e.target.value})}
//                 className="form-input"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderOverviewTab = () => {
//     return (
//       <div className="overview-content">
//         {/* Personal Information Section */}
//         <div className="form-section">
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="first_name">First Name <span className="required">*</span></label>
//               <input
//                 type="text"
//                 id="first_name"
//                 value={employeeData.first_name}
//                 onChange={(e) => handleInputChange('first_name', e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="gender">Gender <span className="required">*</span></label>
//               <select
//                 id="gender"
//                 value={employeeData.gender}
//                 onChange={(e) => handleInputChange('gender', e.target.value)}
//                 className="form-input"
//               >
//                 <option value="">Begin typing for results...</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="date_of_joining">Date of Joining <span className="required">*</span></label>
//               <input
//                 type="date"
//                 id="date_of_joining"
//                 value={employeeData.date_of_joining}
//                 onChange={(e) => handleInputChange('date_of_joining', e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="middle_name">Middle Name</label>
//               <input
//                 type="text"
//                 id="middle_name"
//                 value={employeeData.middle_name}
//                 onChange={(e) => handleInputChange('middle_name', e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="date_of_birth">Date of Birth <span className="required">*</span></label>
//               <input
//                 type="date"
//                 id="date_of_birth"
//                 value={employeeData.date_of_birth}
//                 onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="status">Status <span className="required">*</span></label>
//               <select
//                 id="status"
//                 value={employeeData.status}
//                 onChange={(e) => handleInputChange('status', e.target.value)}
//                 className="form-input"
//               >
//                 {statusOptions.map(status => (
//                   <option key={status} value={status}>{status}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="last_name">Last Name</label>
//               <input
//                 type="text"
//                 id="last_name"
//                 value={employeeData.last_name}
//                 onChange={(e) => handleInputChange('last_name', e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="salutation">Salutation</label>
//               <select
//                 id="salutation"
//                 value={employeeData.salutation}
//                 onChange={(e) => handleInputChange('salutation', e.target.value)}
//                 className="form-input"
//               >
//                 <option value="">Begin typing for results...</option>
//                 <option value="Mr">Mr</option>
//                 <option value="Mrs">Mrs</option>
//                 <option value="Ms">Ms</option>
//                 <option value="Dr">Dr</option>
//               </select>
//             </div>

//             <div className="form-group form-group-full">
//               <label htmlFor="employee_name">Full Name</label>
//               <input
//                 type="text"
//                 id="employee_name"
//                 value={employeeData.employee_name}
//                 onChange={(e) => handleInputChange('employee_name', e.target.value)}
//                 className="form-input"
//                 readOnly
//               />
//             </div>
//           </div>
//         </div>

//         {/* Company Details Section */}
//         <div className="form-section">
//           <h3 className="section-title">Company Details</h3>
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="company">Company <span className="required">*</span></label>
//               <select
//                 id="company"
//                 value={employeeData.company}
//                 onChange={(e) => handleInputChange('company', e.target.value)}
//                 className="form-input"
//               >
//                 <option value="">Begin typing for results...</option>
//                 <option value="ABC Technologies Pvt Ltd">ABC Technologies Pvt Ltd</option>
//                 <option value="XYZ Corp">XYZ Corp</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="designation">Designation</label>
//               <select
//                 id="designation"
//                 value={employeeData.designation}
//                 onChange={(e) => handleInputChange('designation', e.target.value)}
//                 className="form-input"
//               >
//                 <option value="">Begin typing for results...</option>
//                 <option value="Team Leader">Team Leader</option>
//                 <option value="Developer">Developer</option>
//                 <option value="Manager">Manager</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="grade">Grade</label>
//               <select
//                 id="grade"
//                 value={employeeData.grade}
//                 onChange={(e) => handleInputChange('grade', e.target.value)}
//                 className="form-input"
//               >
//                 <option value="">Begin typing for results...</option>
//                 <option value="Grade A">Grade A</option>
//                 <option value="Grade B">Grade B</option>
//                 <option value="Grade C">Grade C</option>
//                 <option value="Senior Grade">Senior Grade</option>
//                 <option value="Executive Grade">Executive Grade</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="department">Department</label>
//               <select
//                 id="department"
//                 value={employeeData.department}
//                 onChange={(e) => handleInputChange('department', e.target.value)}
//                 className="form-input"
//               >
//                 <option value="">Begin typing for results...</option>
//                 <option value="IT Department">IT Department</option>
//                 <option value="HR Department">HR Department</option>
//                 <option value="Finance Department">Finance Department</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="employment_type">Employment Type</label>
//               <select
//                 id="employment_type"
//                 value={employeeData.employment_type}
//                 onChange={(e) => handleInputChange('employment_type', e.target.value)}
//                 className="form-input"
//               >
//                 <option value="">Begin typing for results...</option>
//                 <option value="Full Time">Full Time</option>
//                 <option value="Part Time">Part Time</option>
//                 <option value="Contract">Contract</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="reports_to">Reports to</label>
//               <input
//                 type="text"
//                 id="reports_to"
//                 value={employeeData.reports_to}
//                 onChange={(e) => handleInputChange('reports_to', e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="branch">Branch</label>
//               <input
//                 type="text"
//                 id="branch"
//                 value={employeeData.branch}
//                 onChange={(e) => handleInputChange('branch', e.target.value)}
//                 className="form-input"
//                 readOnly
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return renderOverviewTab();
//       case 'joining':
//         return renderJoiningTab();
//       case 'address-contacts':
//         return renderAddressTab();
//       case 'attendance-leaves':
//         return renderAttendanceTab();
//       case 'salary':
//         return <div className="tab-content">Salary information will be displayed here...</div>;
//       case 'personal':
//         return <div className="tab-content">Personal information will be displayed here...</div>;
//       case 'profile-info':
//         return <div className="tab-content">Profile information will be displayed here...</div>;
//       case 'exit':
//         return <div className="tab-content">Exit information will be displayed here...</div>;
//       case 'connections':
//         return <div className="tab-content">Connections information will be displayed here...</div>;
//       default:
//         return renderOverviewTab();
//     }
//   };

//   // Auto-generate full name when first/middle/last name changes
//   useEffect(() => {
//     const fullName = [
//       employeeData.first_name,
//       employeeData.middle_name,
//       employeeData.last_name
//     ].filter(name => name && name.trim() !== '').join(' ');
    
//     if (fullName !== employeeData.employee_name) {
//       setEmployeeData(prev => ({
//         ...prev,
//         employee_name: fullName
//       }));
//     }
//   }, [employeeData.first_name, employeeData.middle_name, employeeData.last_name]);

//   // Get current tab title for breadcrumb
//   const getTabTitle = () => {
//     const tabTitles = {
//       'overview': 'Overview',
//       'joining': 'Joining',
//       'address-contacts': 'Address & Contacts',
//       'attendance-leaves': 'Attendance & Leaves',
//       'salary': 'Salary',
//       'personal': 'Personal',
//       'profile-info': 'Profile',
//       'exit': 'Exit',
//       'connections': 'Connections'
//     };
//     return tabTitles[activeTab] || 'Overview';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-pulse text-center">
//             <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3"></div>
//             <div className="h-3 bg-gray-300 rounded w-40 mb-2 mx-auto"></div>
//             <div className="h-2 bg-gray-200 rounded w-32 mx-auto"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="max-w-7xl mx-auto p-6">
//           <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6">
//             <div className="text-center">
//               <div className="w-12 h-12 text-red-500 mx-auto mb-4">⚠️</div>
//               <h2 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
//               <p className="text-gray-600 mb-4">{error}</p>
//               <button 
//                 onClick={() => window.location.reload()} 
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       <div className="employee-profile-container">
//         {/* Breadcrumb Header */}
//         <div className="profile-header">
//           <h1 className="profile-title">Employee Profile - {getTabTitle()}</h1>
//           <p className="profile-subtitle">Manage your profile information</p>
//         </div>

//         {/* Tab Content */}
//         <div className="tab-content-container">
//           {renderTabContent()}
//         </div>

//         {/* Action Buttons */}
//         <div className="action-buttons">
//           <button className="btn-secondary">Cancel</button>
//           <button className="btn-primary">Save</button>
//         </div>

//         <style jsx>{`
//           .employee-profile-container {
//             max-width: 1200px;
//             margin: 0 auto;
//             padding: 20px;
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//           }

//           .profile-header {
//             margin-bottom: 30px;
//             padding-bottom: 20px;
//             border-bottom: 1px solid #e1e5e9;
//           }

//           .profile-title {
//             font-size: 24px;
//             font-weight: 600;
//             color: #333;
//             margin: 0 0 5px 0;
//           }

//           .profile-subtitle {
//             font-size: 14px;
//             color: #666;
//             margin: 0;
//           }

//           .tab-content-container {
//             min-height: 400px;
//             background: white;
//             border-radius: 8px;
//             padding: 30px;
//             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//             border: 1px solid #e1e5e9;
//           }

//           .overview-content, .joining-content, .address-content, .attendance-content {
//             max-width: 800px;
//           }

//           .form-section {
//             margin-bottom: 30px;
//           }

//           .section-title {
//             font-size: 18px;
//             font-weight: 600;
//             color: #333;
//             margin: 0 0 20px 0;
//             padding-bottom: 8px;
//             border-bottom: 1px solid #e1e5e9;
//           }

//           .form-grid {
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             gap: 20px;
//             align-items: start;
//           }

//           .form-group {
//             display: flex;
//             flex-direction: column;
//           }

//           .form-group-full {
//             grid-column: 1 / -1;
//           }

//           .form-group label {
//             font-size: 13px;
//             font-weight: 500;
//             color: #555;
//             margin-bottom: 5px;
//           }

//           .required {
//             color: #e74c3c;
//           }

//           .form-input {
//             padding: 8px 12px;
//             border: 1px solid #d1d5db;
//             border-radius: 4px;
//             font-size: 14px;
//             transition: border-color 0.2s ease;
//             background-color: #f9f9f9;
//           }

//           .form-input:focus {
//             outline: none;
//             border-color: #007bff;
//             background-color: #fff;
//           }

//           .form-input[readonly] {
//             background-color: #f5f5f5;
//             cursor: not-allowed;
//           }

//           .checkbox-container {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             margin-top: 5px;
//           }

//           .checkbox-container input[type="checkbox"] {
//             width: auto;
//             margin: 0;
//           }

//           .checkbox-label {
//             font-size: 14px;
//             margin: 0;
//             cursor: pointer;
//           }

//           .form-help-text {
//             font-size: 12px;
//             color: #666;
//             margin-top: 4px;
//             font-style: italic;
//           }

//           .tab-content {
//             padding: 30px;
//             text-align: center;
//             color: #666;
//             font-style: italic;
//             background-color: #f8f9fa;
//             border-radius: 4px;
//             border: 1px solid #e1e5e9;
//           }

//           .action-buttons {
//             display: flex;
//             gap: 12px;
//             justify-content: flex-end;
//             margin-top: 30px;
//             padding-top: 20px;
//             border-top: 1px solid #e1e5e9;
//           }

//           .btn-secondary {
//             padding: 10px 20px;
//             border: 1px solid #d1d5db;
//             background-color: #fff;
//             color: #666;
//             border-radius: 4px;
//             cursor: pointer;
//             font-size: 14px;
//             transition: all 0.2s ease;
//           }

//           .btn-secondary:hover {
//             background-color: #f5f5f5;
//           }

//           .btn-primary {
//             padding: 10px 20px;
//             border: 1px solid #007bff;
//             background-color: #007bff;
//             color: white;
//             border-radius: 4px;
//             cursor: pointer;
//             font-size: 14px;
//             transition: all 0.2s ease;
//           }

//           .btn-primary:hover {
//             background-color: #0056b3;
//           }

//           @media (max-width: 768px) {
//             .form-grid {
//               grid-template-columns: 1fr;
//               gap: 15px;
//             }

//             .employee-profile-container {
//               padding: 15px;
//             }

//             .tab-content-container {
//               padding: 20px;
//             }
//           }

//           @media (max-width: 480px) {
//             .action-buttons {
//               flex-direction: column;
//             }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default Profile;







import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

const ProfileOverview = () => {
  const [employeeData, setEmployeeData] = useState({
    first_name: 'Sumit',
    middle_name: 'Balu',
    last_name: 'Borchate',
    employee_name: 'Sumit Balu Borchate',
    gender: 'Male',
    date_of_birth: '1995-10-07',
    salutation: 'Mr',
    date_of_joining: '2024-09-12',
    status: 'Active',
    company: 'ABC Technologies Pvt Ltd',
    department: 'IT Department',
    employment_type: 'Full Time',
    designation: 'Team Leader',
    grade: 'Grade A',
    reports_to: 'John Smith',
    branch: 'Head Office Mumbai',
  });

  const statusOptions = ['Active', 'Inactive', 'Suspended', 'Left'];

  const handleInputChange = (field, value) => {
    setEmployeeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Auto-generate full name when first/middle/last name changes
  useEffect(() => {
    const fullName = [
      employeeData.first_name,
      employeeData.middle_name,
      employeeData.last_name
    ].filter(name => name && name.trim() !== '').join(' ');
    
    if (fullName !== employeeData.employee_name) {
      setEmployeeData(prev => ({
        ...prev,
        employee_name: fullName
      }));
    }
  }, [employeeData.first_name, employeeData.middle_name, employeeData.last_name]);

  const handleSave = () => {
    console.log('Saving overview data:', employeeData);
    // Add API call here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="employee-profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Employee Profile - Overview</h1>
          <p className="profile-subtitle">Manage basic employee information</p>
        </div>

        <div className="tab-content-container">
          <div className="overview-content">
            {/* Personal Information Section */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="first_name">First Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="first_name"
                    value={employeeData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender <span className="required">*</span></label>
                  <select
                    id="gender"
                    value={employeeData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Gender...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="date_of_joining">Date of Joining <span className="required">*</span></label>
                  <input
                    type="date"
                    id="date_of_joining"
                    value={employeeData.date_of_joining}
                    onChange={(e) => handleInputChange('date_of_joining', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="middle_name">Middle Name</label>
                  <input
                    type="text"
                    id="middle_name"
                    value={employeeData.middle_name}
                    onChange={(e) => handleInputChange('middle_name', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date_of_birth">Date of Birth <span className="required">*</span></label>
                  <input
                    type="date"
                    id="date_of_birth"
                    value={employeeData.date_of_birth}
                    onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status <span className="required">*</span></label>
                  <select
                    id="status"
                    value={employeeData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="form-input"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    value={employeeData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="salutation">Salutation</label>
                  <select
                    id="salutation"
                    value={employeeData.salutation}
                    onChange={(e) => handleInputChange('salutation', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Salutation...</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="employee_name">Full Name</label>
                  <input
                    type="text"
                    id="employee_name"
                    value={employeeData.employee_name}
                    className="form-input"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Company Details Section */}
            <div className="form-section">
              <h3 className="section-title">Company Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="company">Company <span className="required">*</span></label>
                  <select
                    id="company"
                    value={employeeData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Company...</option>
                    <option value="ABC Technologies Pvt Ltd">ABC Technologies Pvt Ltd</option>
                    <option value="XYZ Corp">XYZ Corp</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="designation">Designation</label>
                  <select
                    id="designation"
                    value={employeeData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Designation...</option>
                    <option value="Team Leader">Team Leader</option>
                    <option value="Developer">Developer</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="grade">Grade</label>
                  <select
                    id="grade"
                    value={employeeData.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Grade...</option>
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Grade C">Grade C</option>
                    <option value="Senior Grade">Senior Grade</option>
                    <option value="Executive Grade">Executive Grade</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select
                    id="department"
                    value={employeeData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Department...</option>
                    <option value="IT Department">IT Department</option>
                    <option value="HR Department">HR Department</option>
                    <option value="Finance Department">Finance Department</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="employment_type">Employment Type</label>
                  <select
                    id="employment_type"
                    value={employeeData.employment_type}
                    onChange={(e) => handleInputChange('employment_type', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Employment Type...</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="reports_to">Reports to</label>
                  <input
                    type="text"
                    id="reports_to"
                    value={employeeData.reports_to}
                    onChange={(e) => handleInputChange('reports_to', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="branch">Branch</label>
                  <input
                    type="text"
                    id="branch"
                    value={employeeData.branch}
                    className="form-input"
                    readOnly
                  />
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

          .overview-content {
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

          .form-input[readonly] {
            background-color: #f5f5f5;
            cursor: not-allowed;
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

          @media (max-width: 480px) {
            .action-buttons {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProfileOverview;