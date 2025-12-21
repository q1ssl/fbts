// // // import React from 'react';
// // // import './JobOfferLetter.css'
// // // import Header from '../Header/Header';

// // // const EmploymentOfferLetter = () => {
// // //   const handleAccept = () => {
// // //     alert('Offer Accepted! Thank you for accepting the position.');
// // //   };

// // //   const handleReject = () => {
// // //     alert('Offer Rejected. We appreciate your consideration.');
// // //   };

// // //   return (
// // //     <>
// // //     <Header/>
// // //     <div className="job-offer-container">
// // //       {/* Header */}
// // //       <div className="job-offer-header">
// // //         <div className="job-offer-logo-container">
// // //           <div className="job-offer-logo-grid">
// // //             <div className="job-offer-logo-square job-offer-logo-orange"></div>
// // //             <div className="job-offer-logo-square job-offer-logo-red"></div>
// // //             <div className="job-offer-logo-square job-offer-logo-green"></div>
// // //             <div className="job-offer-logo-square job-offer-logo-blue"></div>
// // //           </div>
// // //           <div className="job-offer-logo-text">
// // //             <div className="job-offer-logo-title">NEST</div>
// // //             <div className="job-offer-logo-subtitle">HRMS</div>
// // //             <div className="job-offer-logo-company">BY FLAMINGO INFINITE</div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Date and Address */}
// // //       <div className="job-offer-date-section">
// // //         <div className="job-offer-date">10-09-2025</div>
// // //         <div className="job-offer-address-section">
// // //           <div className="job-offer-address-label">To,</div>
// // //           <div className="job-offer-address-details">
// // //             <div>meghachaugule96@gmail.com,</div>
// // //             <div>Software Developer,</div>
// // //             <div>Mumbai,</div>
// // //             <div>Borivali-400092</div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Subject */}
// // //       <div className="job-offer-subject">
// // //         Subject: Offer Of Employment
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="job-offer-content">
// // //         <p className="job-offer-intro">
// // //           On behalf of <strong>Flamingo Infinite</strong>, we are delighted to extend an offer of 
// // //           employment to you. Please find below a summary of the terms and conditions for 
// // //           your anticipated employment with us:
// // //         </p>

// // //         <div className="job-offer-details-grid">
// // //           <div className="job-offer-detail-item"><strong>Designation:</strong> Software Developer</div>
// // //           <div className="job-offer-detail-item"><strong>Grade:</strong> Grade A1</div>
// // //           <div className="job-offer-detail-item"><strong>Reporting:</strong> You will be reporting to Software Developer</div>
// // //           <div className="job-offer-detail-item"><strong>Posting:</strong> None</div>
// // //         </div>

// // //         <div className="job-offer-remuneration">
// // //           <strong>Remuneration:</strong> Your Annual CTC will be ₹25,89,156/- (Rupees Twenty-Five Lakh Eighty-Nine Thousand One Hundred and Fifty-Six Only).
// // //         </div>

// // //         <p className="job-offer-paragraph">
// // //           The Company reserves the right to re-designate or revise your position or work 
// // //           description at any time, with written notice.
// // //         </p>

// // //         <p className="job-offer-paragraph">
// // //           If you accept this offer, your start date will be <strong>10-09-2025</strong> or another mutually 
// // //           agreed-upon date.
// // //         </p>

// // //         <div className="job-offer-important-notice">
// // //           <p className="job-offer-notice-title">Important:</p>
// // //           <p>Please note that this offer letter is valid for 3 days from the date of release. If not 
// // //           accepted within this timeframe, the offer will be considered null and void.</p>
// // //         </div>

// // //         <p className="job-offer-paragraph">
// // //           The offer of employment is contingent upon satisfactory references. A formal Letter 
// // //           of Appointment will be issued on your joining date.
// // //         </p>
// // //       </div>

// // //       {/* Salary Breakdown Table */}
// // //       <div className="job-offer-salary-section">
// // //         <h3 className="job-offer-salary-title">Salary Breakdown - Annexure 1</h3>
        
// // //         <div className="job-offer-table-container">
// // //           <table className="job-offer-table">
// // //             <thead className="job-offer-table-header">
// // //               <tr>
// // //                 <th className="job-offer-table-cell job-offer-table-header-cell">Components</th>
// // //                 <th className="job-offer-table-cell job-offer-table-header-cell job-offer-table-cell-right">Monthly (₹)</th>
// // //                 <th className="job-offer-table-cell job-offer-table-header-cell job-offer-table-cell-right">Annually (₹)</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="job-offer-table-body">
// // //               <tr className="job-offer-table-row job-offer-table-row-alternate">
// // //                 <td className="job-offer-table-cell job-offer-table-cell-bold">Basic Salary</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">75,000.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">9,00,000.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row">
// // //                 <td className="job-offer-table-cell">House Rent Allowance</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">37,500.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">4,50,000.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row job-offer-table-row-alternate">
// // //                 <td className="job-offer-table-cell">Special Allowance</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">83,889.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">10,06,668.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row">
// // //                 <td className="job-offer-table-cell">Leave Travel Allowance</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">19,374.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">2,32,488.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row job-offer-table-row-gross">
// // //                 <td className="job-offer-table-cell job-offer-table-cell-bold">Total Gross Pay (A)</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right job-offer-table-cell-bold">2,15,763.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right job-offer-table-cell-bold">25,89,156.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row">
// // //                 <td className="job-offer-table-cell">Gratuity</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">0.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">0.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row job-offer-table-row-alternate">
// // //                 <td className="job-offer-table-cell job-offer-table-cell-bold">Total Employer Contribution (B)</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right job-offer-table-cell-bold">0.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right job-offer-table-cell-bold">0.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row">
// // //                 <td className="job-offer-table-cell">Provident Fund</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">0.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">0.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row job-offer-table-row-alternate">
// // //                 <td className="job-offer-table-cell">Professional Tax</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">0.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right">0.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row">
// // //                 <td className="job-offer-table-cell job-offer-table-cell-bold">Total Deductions (C)</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right job-offer-table-cell-bold">0.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right job-offer-table-cell-bold">0.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row job-offer-table-row-net">
// // //                 <td className="job-offer-table-cell job-offer-table-cell-bold">Net Take Home [A-C] (D)</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right job-offer-table-cell-bold">2,15,763.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right job-offer-table-cell-bold">25,89,156.00</td>
// // //               </tr>
// // //               <tr className="job-offer-table-row job-offer-table-row-ctc">
// // //                 <td className="job-offer-table-cell job-offer-table-cell-bold">CTC [A+B] (E)</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right job-offer-table-cell-bold">2,15,763.00</td>
// // //                 <td className="job-offer-table-cell job-offer-table-cell-right job-offer-table-cell-bold">25,89,156.00</td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       {/* Notes */}
// // //       <div className="job-offer-notes-section">
// // //         <h4 className="job-offer-notes-title">NOTES:</h4>
// // //         <ul className="job-offer-notes-list">
// // //           <li>Income Tax deductions on above will be applicable as per rules.</li>
// // //           <li>LTA – Exempt if claimed twice in a block of four years.</li>
// // //           <li>Gratuity as per company policy and applicable law.</li>
// // //           <li>Professional tax may vary by month/state regulations.</li>
// // //         </ul>
// // //       </div>

// // //       {/* Closing */}
// // //       <div className="job-offer-closing">
// // //         <p>
// // //           We wish you all the best and look forward to welcoming you to the Flamingo Infinite 
// // //           Group.
// // //         </p>
// // //       </div>

// // //       {/* Signature Section */}
// // //       <div className="job-offer-signature-section">
// // //         <div className="job-offer-company-signature">
// // //           <div className="job-offer-company-name">For Flamingo Infinite.</div>
// // //           <div className="job-offer-signatory">
// // //             <div className="job-offer-signatory-name">Developer Daiyan</div>
// // //             <div className="job-offer-signatory-title">Group Chief Human Resource Officer</div>
// // //           </div>
// // //         </div>
        
// // //         <div className="job-offer-computer-note">
// // //           Please note this is a computer-generated letter, hence no signature required.
// // //         </div>
        
// // //         <div className="job-offer-signature-fields">
// // //           <div className="job-offer-signature-field">
// // //             <div className="job-offer-signature-line">Signature:</div>
// // //           </div>
// // //           <div className="job-offer-date-field">
// // //             <div className="job-offer-signature-line">Date:</div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>

// // //     {/* Action Buttons - Now OUTSIDE the scrolling container */}
// // //     <div className="job-offer-actions">
// // //       <button 
// // //         className="job-offer-button job-offer-button-accept"
// // //         onClick={handleAccept}
// // //       >
// // //         Accept Offer
// // //       </button>
// // //       <button 
// // //         className="job-offer-button job-offer-button-reject"
// // //         onClick={handleReject}
// // //       >
// // //         Reject Offer
// // //       </button>
// // //     </div>
// // //     </>
// // //   );
// // // };

// // // export default EmploymentOfferLetter;






// // // import React from 'react';

// // // const EmploymentOfferLetter = () => {
// // //   const handleAccept = () => {
// // //     alert('Offer Accepted! Thank you for accepting the position.');
// // //   };

// // //   const handleReject = () => {
// // //     alert('Offer Rejected. We appreciate your consideration.');
// // //   };

// // //   return (
// // //     <>
// // //       <div style={{ paddingBottom: '100px' }}>
// // //         <div style={{
// // //           maxWidth: '800px',
// // //           margin: '0 auto',
// // //           padding: '40px',
// // //           fontFamily: 'Arial, sans-serif',
// // //           lineHeight: '1.6',
// // //           color: '#333',
// // //           background: '#fff'
// // //         }}>
// // //           {/* Header */}
// // //           <div style={{ marginBottom: '30px' }}>
// // //             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
// // //               <div style={{ display: 'flex', marginRight: '15px' }}>
// // //                 <div style={{
// // //                   display: 'grid',
// // //                   gridTemplateColumns: '1fr 1fr',
// // //                   gap: '2px',
// // //                   width: '40px',
// // //                   height: '40px'
// // //                 }}>
// // //                   <div style={{ backgroundColor: '#ff6b35', borderRadius: '3px' }}></div>
// // //                   <div style={{ backgroundColor: '#f7931e', borderRadius: '3px' }}></div>
// // //                   <div style={{ backgroundColor: '#4caf50', borderRadius: '3px' }}></div>
// // //                   <div style={{ backgroundColor: '#2196f3', borderRadius: '3px' }}></div>
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>NEST</div>
// // //                 <div style={{ fontSize: '12px', color: '#666' }}>HRMS</div>
// // //                 <div style={{ fontSize: '10px', color: '#888' }}>BY FLAMINGO INFINITE</div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Date and Address */}
// // //           <div style={{ marginBottom: '30px' }}>
// // //             <div style={{ textAlign: 'right', marginBottom: '20px', fontWeight: 'bold' }}>
// // //               10-09-2025
// // //             </div>
// // //             <div>
// // //               <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>To,</div>
// // //               <div style={{ marginLeft: '20px' }}>
// // //                 <div>meghachaugule96@gmail.com,</div>
// // //                 <div>Software Developer,</div>
// // //                 <div>Mumbai,</div>
// // //                 <div>Borivali-400092</div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Subject */}
// // //           <div style={{ marginBottom: '30px', fontWeight: 'bold', textDecoration: 'underline' }}>
// // //             Subject: Offer Of Employment
// // //           </div>

// // //           {/* Main Content */}
// // //           <div style={{ marginBottom: '30px' }}>
// // //             <p style={{ marginBottom: '20px' }}>
// // //               On behalf of <strong>Flamingo Infinite</strong>, we are delighted to extend an offer of 
// // //               employment to you. Please find below a summary of the terms and conditions for 
// // //               your anticipated employment with us:
// // //             </p>

// // //             <div style={{ marginBottom: '20px' }}>
// // //               <div style={{ marginBottom: '10px' }}><strong>Designation:</strong> Software Developer</div>
// // //               <div style={{ marginBottom: '10px' }}><strong>Grade:</strong> Grade A1</div>
// // //               <div style={{ marginBottom: '10px' }}><strong>Reporting:</strong> You will be reporting to Software Developer</div>
// // //               <div style={{ marginBottom: '10px' }}><strong>Posting:</strong> None</div>
// // //             </div>

// // //             <div style={{ marginBottom: '20px' }}>
// // //               <strong>Remuneration:</strong> Your Annual CTC will be ₹25,89,156/- (Rupees Twenty-Five Lakh Eighty-Nine Thousand One Hundred and Fifty-Six Only).
// // //             </div>

// // //             <p style={{ marginBottom: '20px' }}>
// // //               The Company reserves the right to re-designate or revise your position or work 
// // //               description at any time, with written notice.
// // //             </p>

// // //             <p style={{ marginBottom: '20px' }}>
// // //               If you accept this offer, your start date will be <strong>10-09-2025</strong> or another mutually 
// // //               agreed-upon date.
// // //             </p>

// // //             <div style={{ 
// // //               background: '#fff3cd', 
// // //               border: '1px solid #ffeaa7', 
// // //               padding: '15px', 
// // //               borderRadius: '5px',
// // //               marginBottom: '20px'
// // //             }}>
// // //               <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>Important:</p>
// // //               <p style={{ margin: '0' }}>Please note that this offer letter is valid for 3 days from the date of release. If not 
// // //               accepted within this timeframe, the offer will be considered null and void.</p>
// // //             </div>

// // //             <p style={{ marginBottom: '20px' }}>
// // //               The offer of employment is contingent upon satisfactory references. A formal Letter 
// // //               of Appointment will be issued on your joining date.
// // //             </p>
// // //           </div>

// // //           {/* Salary Breakdown Table */}
// // //           <div style={{ marginBottom: '30px' }}>
// // //             <h3 style={{ marginBottom: '20px' }}>Salary Breakdown - Annexure 1</h3>
            
// // //             <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
// // //               <thead>
// // //                 <tr style={{ backgroundColor: '#f8f9fa' }}>
// // //                   <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Components</th>
// // //                   <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>Monthly (₹)</th>
// // //                   <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>Annually (₹)</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 <tr style={{ backgroundColor: '#f8f9fa' }}>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold' }}>Basic Salary</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>75,000.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>9,00,000.00</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px' }}>House Rent Allowance</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>37,500.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>4,50,000.00</td>
// // //                 </tr>
// // //                 <tr style={{ backgroundColor: '#f8f9fa' }}>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px' }}>Special Allowance</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>83,889.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>10,06,668.00</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px' }}>Leave Travel Allowance</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>19,374.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>2,32,488.00</td>
// // //                 </tr>
// // //                 <tr style={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold' }}>Total Gross Pay (A)</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>2,15,763.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>25,89,156.00</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px' }}>Gratuity</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>0.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>0.00</td>
// // //                 </tr>
// // //                 <tr style={{ backgroundColor: '#f8f9fa' }}>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold' }}>Total Employer Contribution (B)</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>0.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>0.00</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px' }}>Provident Fund</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>0.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>0.00</td>
// // //                 </tr>
// // //                 <tr style={{ backgroundColor: '#f8f9fa' }}>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px' }}>Professional Tax</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>0.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right' }}>0.00</td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold' }}>Total Deductions (C)</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>0.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>0.00</td>
// // //                 </tr>
// // //                 <tr style={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold' }}>Net Take Home [A-C] (D)</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>2,15,763.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>25,89,156.00</td>
// // //                 </tr>
// // //                 <tr style={{ backgroundColor: '#fff3e0', fontWeight: 'bold' }}>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', fontWeight: 'bold' }}>CTC [A+B] (E)</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>2,15,763.00</td>
// // //                   <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>25,89,156.00</td>
// // //                 </tr>
// // //               </tbody>
// // //             </table>
// // //           </div>

// // //           {/* Notes */}
// // //           <div style={{ marginBottom: '30px' }}>
// // //             <h4 style={{ marginBottom: '15px' }}>NOTES:</h4>
// // //             <ul style={{ paddingLeft: '20px' }}>
// // //               <li>Income Tax deductions on above will be applicable as per rules.</li>
// // //               <li>LTA – Exempt if claimed twice in a block of four years.</li>
// // //               <li>Gratuity as per company policy and applicable law.</li>
// // //               <li>Professional tax may vary by month/state regulations.</li>
// // //             </ul>
// // //           </div>

// // //           {/* Closing */}
// // //           <div style={{ marginBottom: '30px' }}>
// // //             <p>
// // //               We wish you all the best and look forward to welcoming you to the Flamingo Infinite 
// // //               Group.
// // //             </p>
// // //           </div>

// // //           {/* Signature Section */}
// // //           <div style={{ marginBottom: '30px' }}>
// // //             <div style={{ marginBottom: '20px' }}>
// // //               <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>For Flamingo Infinite.</div>
// // //               <div>
// // //                 <div style={{ fontWeight: 'bold' }}>Developer Daiyan</div>
// // //                 <div>Group Chief Human Resource Officer</div>
// // //               </div>
// // //             </div>
            
// // //             <div style={{ 
// // //               fontSize: '12px', 
// // //               color: '#666', 
// // //               fontStyle: 'italic',
// // //               marginBottom: '20px'
// // //             }}>
// // //               Please note this is a computer-generated letter, hence no signature required.
// // //             </div>
            

// // //             <div style={{ marginTop: '25px' }}>
// // //                   <div style={{ marginBottom: '20px' }}>
// // //                     <span style={{ display: 'inline-block', marginRight: '15px', fontWeight: 'bold', fontSize: '12px' }}>Signature:</span>
// // //                     <span style={{ 
// // //                       display: 'inline-block', 
// // //                       width: '200px', 
// // //                       height: '1px', 
// // //                       background: '#333', 
// // //                       verticalAlign: 'middle' 
// // //                     }}></span>
// // //                   </div>
// // //                   <div style={{ marginBottom: '20px' }}>
// // //                     <span style={{ display: 'inline-block', marginRight: '15px', fontWeight: 'bold', fontSize: '12px' }}>Date:</span>
// // //                     <span style={{ 
// // //                       display: 'inline-block', 
// // //                       width: '200px', 
// // //                       height: '1px', 
// // //                       background: '#333', 
// // //                       verticalAlign: 'middle' 
// // //                     }}></span>
// // //                   </div>
// // //                 </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Fixed Bottom Navigation with Accept/Reject Buttons */}
// // //       <div style={{
// // //         position: 'fixed',
// // //         bottom: '0',
// // //         left: '0',
// // //         right: '0',
// // //         background: 'rgba(26, 32, 44, 0.95)',
// // //         backdropFilter: 'blur(10px)',
// // //         padding: '15px 0',
// // //         boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.3)',
// // //         zIndex: '1000'
// // //       }}>
// // //         <div style={{
// // //           maxWidth: '800px',
// // //           margin: '0 auto',
// // //           display: 'flex',
// // //           justifyContent: 'center',
// // //           gap: '40px',
// // //           padding: '0 20px'
// // //         }}>
// // //           <button 
// // //             onClick={handleAccept}
// // //             style={{
// // //               backgroundColor: '#4caf50',
// // //               color: 'white',
// // //               border: 'none',
// // //               padding: '12px 30px',
// // //               borderRadius: '25px',
// // //               fontSize: '16px',
// // //               fontWeight: '600',
// // //               cursor: 'pointer',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               gap: '8px',
// // //               transition: 'all 0.3s ease',
// // //               boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
// // //             }}
// // //             onMouseOver={(e) => {
// // //               e.target.style.backgroundColor = '#45a049';
// // //               e.target.style.transform = 'translateY(-2px)';
// // //               e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
// // //             }}
// // //             onMouseOut={(e) => {
// // //               e.target.style.backgroundColor = '#4caf50';
// // //               e.target.style.transform = 'translateY(0)';
// // //               e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
// // //             }}
// // //           >
// // //             <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
// // //               <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
// // //             </svg>
// // //             Accept Offer
// // //           </button>
          
// // //           <button 
// // //             onClick={handleReject}
// // //             style={{
// // //               backgroundColor: '#f44336',
// // //               color: 'white',
// // //               border: 'none',
// // //               padding: '12px 30px',
// // //               borderRadius: '25px',
// // //               fontSize: '16px',
// // //               fontWeight: '600',
// // //               cursor: 'pointer',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               gap: '8px',
// // //               transition: 'all 0.3s ease',
// // //               boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)'
// // //             }}
// // //             onMouseOver={(e) => {
// // //               e.target.style.backgroundColor = '#da190b';
// // //               e.target.style.transform = 'translateY(-2px)';
// // //               e.target.style.boxShadow = '0 6px 20px rgba(244, 67, 54, 0.4)';
// // //             }}
// // //             onMouseOut={(e) => {
// // //               e.target.style.backgroundColor = '#f44336';
// // //               e.target.style.transform = 'translateY(0)';
// // //               e.target.style.boxShadow = '0 4px 15px rgba(244, 67, 54, 0.3)';
// // //             }}
// // //           >
// // //             <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
// // //               <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
// // //             </svg>
// // //             Reject Offer
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default EmploymentOfferLetter;



// // import React from 'react';

// // const EmploymentOfferLetter = () => {
// //   const handleAccept = () => {
// //     alert('Offer Accepted! Thank you for accepting the position.');
// //   };

// //   const handleReject = () => {
// //     alert('Offer Rejected. We appreciate your consideration.');
// //   };

// //   return (
// //     <>
// //       <div style={{ paddingBottom: '100px' }}>
// //         <div style={{
         
// //           margin: '0 auto',
// //           padding: '20px',
// //           fontFamily: 'Arial, sans-serif',
// //           lineHeight: '1.6',
// //           color: '#333',
// //           background: '#fff'
// //         }}>
// //           {/* Flex Container for Two Columns */}
// //           <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            
// //             {/* Left Column */}
// //             <div style={{ flex: '1', minWidth: '0', border: '1px solid #000000ff', padding:'20px' }}>
// //               {/* Header */}
// //               <div style={{ marginBottom: '30px' }}>
// //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
// //                   <div style={{ display: 'flex', marginRight: '15px' }}>
// //                     <div style={{
// //                       display: 'grid',
// //                       gridTemplateColumns: '1fr 1fr',
// //                       gap: '2px',
// //                       width: '40px',
// //                       height: '40px'
// //                     }}>
// //                       <div style={{ backgroundColor: '#ff6b35', borderRadius: '3px' }}></div>
// //                       <div style={{ backgroundColor: '#f7931e', borderRadius: '3px' }}></div>
// //                       <div style={{ backgroundColor: '#4caf50', borderRadius: '3px' }}></div>
// //                       <div style={{ backgroundColor: '#2196f3', borderRadius: '3px' }}></div>
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>NEST</div>
// //                     <div style={{ fontSize: '12px', color: '#666' }}>HRMS</div>
// //                     <div style={{ fontSize: '10px', color: '#888' }}>BY FLAMINGO INFINITE</div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Date */}
// //               {/* <div style={{ textAlign: 'right', marginBottom: '20px', fontWeight: 'bold' }}>
// //                 10-09-2025
// //               </div> */}

// //               {/* Address */}
// //               {/* <div style={{ marginBottom: '30px' }}>
// //                 <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>To,</div>
// //                 <div style={{ marginLeft: '20px' }}>
// //                   <div>meghachaugule96@gmail.com,</div>
// //                   <div>Software Developer,</div>
// //                   <div>Mumbai,</div>
// //                   <div>Borivali-400092</div>
// //                 </div>
// //               </div> */}

// //               {/* Subject */}
// //               <div style={{ marginBottom: '30px', fontWeight: 'bold', textDecoration: 'underline' }}>
// //                 Subject: Offer Of Employment
// //               </div>

// //               {/* Main Content */}
// //               <div style={{ marginBottom: '30px' }}>
// //                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
// //                   On behalf of <strong>Flamingo Infinite</strong>, we are delighted to extend an offer of 
// //                   employment to you. Please find below a summary of the terms and conditions for 
// //                   your anticipated employment with us:
// //                 </p>

// //                 <div style={{ marginBottom: '20px',fontSize: '12px' }}>
// //                   <div style={{ marginBottom: '10px' }}><strong>Designation:</strong> Software Developer</div>
// //                   <div style={{ marginBottom: '10px' }}><strong>Grade:</strong> Grade A1</div>
// //                   <div style={{ marginBottom: '10px' }}><strong>Reporting:</strong> You will be reporting to Software Developer</div>
// //                   <div style={{ marginBottom: '10px' }}><strong>Posting:</strong> None</div>
// //                 </div>

// //                 <div style={{ marginBottom: '20px',fontSize: '12px' }}>
// //                   <strong>Remuneration:</strong> Your Annual CTC will be ₹25,89,156/- (Rupees Twenty-Five Lakh Eighty-Nine Thousand One Hundred and Fifty-Six Only).
// //                 </div>

// //                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
// //                   The Company reserves the right to re-designate or revise your position or work 
// //                   description at any time, with written notice.
// //                 </p>

// //                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
// //                   If you accept this offer, your start date will be <strong>10-09-2025</strong> or another mutually 
// //                   agreed-upon date.
// //                 </p>

// //                 <div style={{ 
// //                   background: '#fff3cd', 
// //                   border: '1px solid #ffeaa7', 
// //                   padding: '15px', 
// //                   borderRadius: '5px',
// //                   marginBottom: '20px',
// //                   fontSize: '12px'
// //                 }}>
// //                   <p style={{ fontWeight: 'bold', margin: '0 0 10px 0'}}>Important:</p>
// //                   <p style={{ margin: '0', fontSize: '12px' }}>Please note that this offer letter is valid for 3 days from the date of release. If not 
// //                   accepted within this timeframe, the offer will be considered null and void.</p>
// //                 </div>

// //                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
// //                   The offer of employment is contingent upon satisfactory references. A formal Letter 
// //                   of Appointment will be issued on your joining date.
// //                 </p>
// //                  {/* Closing */}
// //               <div style={{ marginBottom: '20px' }}>
// //                 <p style={{ fontSize: '12px' }}>
// //                   We wish you all the best and look forward to welcoming you to the Flamingo Infinite 
// //                   Group.
// //                 </p>
// //               </div>

// //               {/* Signature Section */}
// //               <div style={{ marginBottom: '20px' }}>
// //                 <div style={{ marginBottom: '15px' }}>
// //                   <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>For Flamingo Infinite.</div>
// //                   <div>
// //                     <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Developer Daiyan</div>
// //                     <div style={{ fontSize: '11px' }}>Group Chief Human Resource Officer</div>
// //                   </div>
// //                 </div>
                
// //                 <div style={{ 
// //                   fontSize: '10px', 
// //                   color: '#666', 
// //                   fontStyle: 'italic',
// //                   marginBottom: '15px'
// //                 }}>
// //                 </div>
                
              
// //               </div>
// //               </div>
              
// //             </div>

// //             {/* Right Column */}
// //             <div style={{ flex: '1', minWidth: '0', border: '1px solid #000000ff', padding:'20px' }}>
// //               {/* Salary Breakdown Table */}
// //               <div style={{ marginBottom: '30px' }}>
// //                 <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>Salary Breakdown - Annexure</h3>
                
// //                 <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '12px' }}>
// //                   <thead>
// //                     <tr style={{ backgroundColor: '#f8f9fa' }}>
// //                       <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Components</th>
// //                       <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>Monthly (₹)</th>
// //                       <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>Annually (₹)</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     <tr style={{ backgroundColor: '' }}>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', }}>Basic Salary</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>75,000.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>9,00,000.00</td>
// //                     </tr>
// //                     <tr>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px' }}>House Rent Allowance</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>37,500.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>4,50,000.00</td>
// //                     </tr>
// //                     <tr style={{ backgroundColor: '' }}>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px' }}>Special Allowance</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>83,889.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>10,06,668.00</td>
// //                     </tr>
// //                     <tr>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px' }}>Leave Travel Allowance</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>19,374.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>2,32,488.00</td>
// //                     </tr>
// //                     <tr style={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Gross Pay (A)</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>2,15,763.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>25,89,156.00</td>
// //                     </tr>
// //                     <tr>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px' }}>Gratuity</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>0.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>0.00</td>
// //                     </tr>
// //                     <tr style={{ backgroundColor: '#f8f9fa' }}>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Employer Contribution (B)</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>0.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>0.00</td>
// //                     </tr>
// //                     <tr>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px' }}>Provident Fund</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>0.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>0.00</td>
// //                     </tr>
// //                     <tr style={{ backgroundColor: '' }}>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px' }}>Professional Tax</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>0.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>0.00</td>
// //                     </tr>
// //                     <tr>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Deductions (C)</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>0.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>0.00</td>
// //                     </tr>
// //                     <tr style={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Net Take Home [A-C] (D)</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>2,15,763.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>25,89,156.00</td>
// //                     </tr>
// //                     <tr style={{ backgroundColor: '#fff3e0', fontWeight: 'bold' }}>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>CTC [A+B] (E)</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>2,15,763.00</td>
// //                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>25,89,156.00</td>
// //                     </tr>
// //                   </tbody>
// //                 </table>
// //               </div>
// //                 {/* Notes */}
// //                <div style={{ 
// //                 margintop: '0px',
// //                 border: '1px solid #ddd',
// //                 padding: '12px',
// //                 background: '#f9f9f9'
// //               }}>
// //                 <h4 style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '12px' }}>NOTES:</h4>
// //                 <ul style={{ paddingLeft: '15px', margin: '0', fontSize: '12px' }}>
// //                   <li>Income Tax deductions on above will be applicable as per rules.</li>
// //                   <li>LTA – Exempt if claimed twice in a block of four years.</li>
// //                   <li>Gratuity as per company policy and applicable law.</li>
// //                   <li>Professional tax may vary by month/state regulations.</li>
// //                 </ul>
// //               </div> 

            
              

             
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Fixed Bottom Navigation with Accept/Reject Buttons */}
// //       <div style={{
// //         position: 'fixed',
// //         bottom: '0',
// //         left: '0',
// //         right: '0',
// //         background: 'rgba(26, 32, 44, 0.95)',
// //         backdropFilter: 'blur(10px)',
// //         padding: '15px 0',
// //         boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.3)',
// //         zIndex: '1000'
// //       }}>
// //         <div style={{
// //           maxWidth: '1200px',
// //           margin: '0 auto',
// //           display: 'flex',
// //           justifyContent: 'center',
// //           gap: '40px',
// //           padding: '0 20px'
// //         }}>
// //           <button 
// //             onClick={handleAccept}
// //             style={{
// //               backgroundColor: '#4caf50',
// //               color: 'white',
// //               border: 'none',
// //               padding: '12px 30px',
// //               borderRadius: '25px',
// //               fontSize: '16px',
// //               fontWeight: '600',
// //               cursor: 'pointer',
// //               display: 'flex',
// //               alignItems: 'center',
// //               gap: '8px',
// //               transition: 'all 0.3s ease',
// //               boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
// //             }}
// //             onMouseOver={(e) => {
// //               e.target.style.backgroundColor = '#45a049';
// //               e.target.style.transform = 'translateY(-2px)';
// //               e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
// //             }}
// //             onMouseOut={(e) => {
// //               e.target.style.backgroundColor = '#4caf50';
// //               e.target.style.transform = 'translateY(0)';
// //               e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
// //             }}
// //           >
// //             <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
// //               <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
// //             </svg>
// //             Accept Offer
// //           </button>
          
// //           <button 
// //             onClick={handleReject}
// //             style={{
// //               backgroundColor: '#f44336',
// //               color: 'white',
// //               border: 'none',
// //               padding: '12px 30px',
// //               borderRadius: '25px',
// //               fontSize: '16px',
// //               fontWeight: '600',
// //               cursor: 'pointer',
// //               display: 'flex',
// //               alignItems: 'center',
// //               gap: '8px',
// //               transition: 'all 0.3s ease',
// //               boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)'
// //             }}
// //             onMouseOver={(e) => {
// //               e.target.style.backgroundColor = '#da190b';
// //               e.target.style.transform = 'translateY(-2px)';
// //               e.target.style.boxShadow = '0 6px 20px rgba(244, 67, 54, 0.4)';
// //             }}
// //             onMouseOut={(e) => {
// //               e.target.style.backgroundColor = '#f44336';
// //               e.target.style.transform = 'translateY(0)';
// //               e.target.style.boxShadow = '0 4px 15px rgba(244, 67, 54, 0.3)';
// //             }}
// //           >
// //             <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
// //               <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
// //             </svg>
// //             Reject Offer
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default EmploymentOfferLetter;





// import React, { useState, useEffect } from 'react';

// const EmploymentOfferLetter = () => {
//   const [offerData, setOfferData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   // Function to fetch offer data from your API
//   const fetchOfferData = async (jobApplicantEmail) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`https://fbts.flamingohrms.com/api/method/fbts.api.job_offer.job_offer?job_applicant=${jobApplicantEmail}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch offer data');
//       }
      
//       const data = await response.json();
      
//       if (data.message && data.message.length > 0) {
//         setOfferData(data.message[0]); // Get the first offer
//       } else {
//         throw new Error('No offer data found');
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to load offer letter data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // You can get this email from URL params, props, or user input
//     const jobApplicantEmail = 'sakshimahadik04@gmail.com'; // Replace with dynamic value
//     fetchOfferData(jobApplicantEmail);
//   }, []);

//   const handleAccept = async () => {
//     try {
//       setSubmitting(true);
      
//       // Replace with your actual accept endpoint
//       const response = await fetch(`https://fbts.flamingohrms.com/api/method/fbts.api.job_offer.accept_offer`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           offer_name: offerData.name,
//           job_applicant: offerData.job_applicant,
//           action: 'accept',
//           timestamp: new Date().toISOString()
//         })
//       });

//       if (response.ok) {
//         alert('Offer Accepted! Thank you for accepting the position.');
//         // You might want to redirect or update the UI here
//       } else {
//         throw new Error('Failed to accept offer');
//       }
//     } catch (error) {
//       alert('Error accepting offer. Please try again.');
//       console.error('Accept error:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       setSubmitting(true);
      
//       // Replace with your actual reject endpoint
//       const response = await fetch(`https://fbts.flamingohrms.com/api/method/fbts.api.job_offer.reject_offer`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           offer_name: offerData.name,
//           job_applicant: offerData.job_applicant,
//           action: 'reject',
//           timestamp: new Date().toISOString()
//         })
//       });

//       if (response.ok) {
//         alert('Offer Rejected. We appreciate your consideration.');
//         // You might want to redirect or update the UI here
//       } else {
//         throw new Error('Failed to reject offer');
//       }
//     } catch (error) {
//       alert('Error rejecting offer. Please try again.');
//       console.error('Reject error:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   // Calculate totals from earnings and deductions
//   const calculateTotals = () => {
//     if (!offerData) return { grossPay: 0, totalDeductions: 0, netPay: 0 };
    
//     const grossPay = offerData.earnings?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
//     const totalDeductions = offerData.deductions?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
//     const employerContrib = offerData.employer_contributions?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
    
//     return {
//       grossPay,
//       totalDeductions,
//       employerContrib,
//       netPay: grossPay - totalDeductions,
//       ctc: grossPay + employerContrib
//     };
//   };

//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         fontSize: '18px'
//       }}>
//         Loading offer letter...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         fontSize: '18px',
//         color: 'red'
//       }}>
//         <div>{error}</div>
//         <button 
//           onClick={() => window.location.reload()} 
//           style={{
//             marginTop: '20px',
//             padding: '10px 20px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (!offerData) {
//     return null;
//   }

//   const totals = calculateTotals();

//   return (
//     <>
//       <div style={{ paddingBottom: '100px' }}>
//         <div style={{
//           margin: '0 auto',
//           padding: '20px',
//           fontFamily: 'Arial, sans-serif',
//           lineHeight: '1.6',
//           color: '#333',
//           background: '#fff'
//         }}>
//           {/* Flex Container for Two Columns */}
//           <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            
//             {/* Left Column */}
//             <div style={{ flex: '1', minWidth: '0', border: '1px solid #000000ff', padding:'20px' }}>
//               {/* Header */}
//               <div style={{ marginBottom: '30px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//                   <div style={{ display: 'flex', marginRight: '15px' }}>
//                     <div style={{
//                       display: 'grid',
//                       gridTemplateColumns: '1fr 1fr',
//                       gap: '2px',
//                       width: '40px',
//                       height: '40px'
//                     }}>
//                       <div style={{ backgroundColor: '#ff6b35', borderRadius: '3px' }}></div>
//                       <div style={{ backgroundColor: '#f7931e', borderRadius: '3px' }}></div>
//                       <div style={{ backgroundColor: '#4caf50', borderRadius: '3px' }}></div>
//                       <div style={{ backgroundColor: '#2196f3', borderRadius: '3px' }}></div>
//                     </div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>NEST</div>
//                     <div style={{ fontSize: '12px', color: '#666' }}>HRMS</div>
//                     <div style={{ fontSize: '10px', color: '#888' }}>BY {offerData.company?.toUpperCase() || 'FLAMINGO INFINITE'}</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Date and Address */}
//               <div style={{ marginBottom: '20px' }}>
//                 <div style={{ textAlign: 'right', marginBottom: '15px', fontWeight: 'bold', fontSize: '12px' }}>
//                   {offerData.offer_date || 'N/A'}
//                 </div>
//                 <div>
//                   <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '12px' }}>To,</div>
//                   <div style={{ marginLeft: '15px', fontSize: '12px' }}>
//                     <div>{offerData.job_applicant},</div>
//                     <div>{offerData.applicant_name},</div>
//                     <div>{offerData.designation},</div>
//                     <div>Mumbai, Borivali-400092</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Subject */}
//               <div style={{ marginBottom: '30px', fontWeight: 'bold', textDecoration: 'underline' }}>
//                 Subject: Offer Of Employment
//               </div>

//               {/* Main Content */}
//               <div style={{ marginBottom: '30px' }}>
//                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   On behalf of <strong>{offerData.company || 'Flamingo Infinite'}</strong>, we are delighted to extend an offer of 
//                   employment to you. Please find below a summary of the terms and conditions for 
//                   your anticipated employment with us:
//                 </p>

//                 <div style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   <div style={{ marginBottom: '10px' }}><strong>Designation:</strong> {offerData.designation}</div>
//                   <div style={{ marginBottom: '10px' }}><strong>Grade:</strong> {offerData.grade}</div>
//                   <div style={{ marginBottom: '10px' }}><strong>Reporting:</strong> You will be reporting to {offerData.custom_reporting_manager}</div>
//                   <div style={{ marginBottom: '10px' }}><strong>Posting:</strong> {offerData.level || 'None'}</div>
//                 </div>

//                 <div style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   <strong>Remuneration:</strong> Your Annual CTC will be ₹{formatCurrency(offerData.custom_offered_ctc || totals.ctc)}/- 
//                   ({offerData.custom_total_amount_inr || 'Amount in words'}).
//                 </div>

//                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   The Company reserves the right to re-designate or revise your position or work 
//                   description at any time, with written notice.
//                 </p>

//                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   If you accept this offer, your start date will be <strong>{offerData.custom_joining_date}</strong> or another mutually 
//                   agreed-upon date.
//                 </p>

//                 <div style={{ 
//                   background: '#fff3cd', 
//                   border: '1px solid #ffeaa7', 
//                   padding: '15px', 
//                   borderRadius: '5px',
//                   marginBottom: '20px',
//                   fontSize: '12px'
//                 }}>
//                   <p style={{ fontWeight: 'bold', margin: '0 0 10px 0'}}>Important:</p>
//                   <p style={{ margin: '0', fontSize: '12px' }}>
//                     Please note that this offer letter is valid for 3 days from the date of release. 
//                     If not accepted within this timeframe, the offer will be considered null and void.
//                   </p>
//                 </div>

//                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   The offer of employment is contingent upon satisfactory references. A formal Letter 
//                   of Appointment will be issued on your joining date.
//                 </p>

//                 {/* Closing */}
//                 <div style={{ marginBottom: '20px' }}>
//                   <p style={{ fontSize: '12px' }}>
//                     We wish you all the best and look forward to welcoming you to the {offerData.company || 'Flamingo Infinite'} Group.
//                   </p>
//                 </div>

//                 {/* Signature Section */}
//                 <div style={{ marginBottom: '20px' }}>
//                   <div style={{ marginBottom: '15px' }}>
//                     <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>For {offerData.company || 'Flamingo Infinite'}.</div>
//                     <div>
//                       <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{offerData.custom_reporting_manager || 'Developer Daiyan'}</div>
//                       <div style={{ fontSize: '11px' }}>Group Chief Human Resource Officer</div>
//                     </div>
//                   </div>
                  
//                   <div style={{ 
//                     fontSize: '10px', 
//                     color: '#666', 
//                     fontStyle: 'italic',
//                     marginBottom: '15px'
//                   }}>
//                     Please note this is a computer-generated letter, hence no signature required.
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div style={{ flex: '1', minWidth: '0', border: '1px solid #000000ff', padding:'20px' }}>
//               {/* Salary Breakdown Table */}
//               <div style={{ marginBottom: '30px' }}>
//                 <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>Salary Breakdown - Annexure</h3>
                
//                 <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '12px' }}>
//                   <thead>
//                     <tr style={{ backgroundColor: '#f8f9fa' }}>
//                       <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Components</th>
//                       <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>Monthly (₹)</th>
//                       <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>Annually (₹)</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {/* Earnings */}
//                     {offerData.earnings?.map((earning, index) => (
//                       <tr key={`earning-${index}`} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
//                         <td style={{ border: '1px solid #ddd', padding: '10px' }}>{earning.salary_component}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(earning.amount || 0)}
//                         </td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(earning.yearly || 0)}
//                         </td>
//                       </tr>
//                     ))}
                    
//                     {/* Total Gross Pay */}
//                     <tr style={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Gross Pay (A)</td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.grossPay)}
//                       </td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.grossPay * 12)}
//                       </td>
//                     </tr>
                    
//                     {/* Employer Contributions */}
//                     {offerData.employer_contributions?.map((contrib, index) => (
//                       <tr key={`contrib-${index}`} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
//                         <td style={{ border: '1px solid #ddd', padding: '10px' }}>{contrib.salary_component}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(contrib.amount || 0)}
//                         </td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(contrib.yearly || 0)}
//                         </td>
//                       </tr>
//                     ))}
                    
//                     {/* Total Employer Contribution */}
//                     <tr style={{ backgroundColor: '#f8f9fa' }}>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Employer Contribution (B)</td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.employerContrib)}
//                       </td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.employerContrib * 12)}
//                       </td>
//                     </tr>
                    
//                     {/* Deductions */}
//                     {offerData.deductions?.map((deduction, index) => (
//                       <tr key={`deduction-${index}`} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
//                         <td style={{ border: '1px solid #ddd', padding: '10px' }}>{deduction.salary_component}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(deduction.amount || 0)}
//                         </td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(deduction.yearly || 0)}
//                         </td>
//                       </tr>
//                     ))}
                    
//                     {/* Total Deductions */}
//                     <tr>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Deductions (C)</td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.totalDeductions)}
//                       </td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.totalDeductions * 12)}
//                       </td>
//                     </tr>
                    
//                     {/* Net Take Home */}
//                     <tr style={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Net Take Home [A-C] (D)</td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.netPay)}
//                       </td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.netPay * 12)}
//                       </td>
//                     </tr>
                    
//                     {/* CTC */}
//                     <tr style={{ backgroundColor: '#fff3e0', fontWeight: 'bold' }}>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>CTC [A+B] (E)</td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.ctc)}
//                       </td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.ctc * 12)}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               {/* Notes */}
//               <div style={{ 
//                 marginTop: '0px',
//                 border: '1px solid #ddd',
//                 padding: '12px',
//                 background: '#f9f9f9'
//               }}>
//                 <h4 style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '12px' }}>NOTES:</h4>
//                 <ul style={{ paddingLeft: '15px', margin: '0', fontSize: '12px' }}>
//                   <li>Income Tax deductions on above will be applicable as per rules.</li>
//                   <li>LTA – Exempt if claimed twice in a block of four years.</li>
//                   <li>Gratuity as per company policy and applicable law.</li>
//                   <li>Professional tax may vary by month/state regulations.</li>
//                 </ul>
//               </div>

//               {/* Status Display */}
//               <div style={{ 
//                 marginTop: '15px',
//                 padding: '10px',
//                 background: offerData.status === 'Awaiting Response' ? '#fff3cd' : '#d4edda',
//                 border: '1px solid #ddd',
//                 borderRadius: '5px',
//                 textAlign: 'center'
//               }}>
//                 <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
//                   Status: {offerData.status}
//                 </div>
//                 <div style={{ fontSize: '11px', color: '#666' }}>
//                   Offer ID: {offerData.name}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Fixed Bottom Navigation with Accept/Reject Buttons */}
//       {offerData.status === 'Awaiting Response' && (
//         <div style={{
//           position: 'fixed',
//           bottom: '0',
//           left: '0',
//           right: '0',
//           background: 'rgba(26, 32, 44, 0.95)',
//           backdropFilter: 'blur(10px)',
//           padding: '15px 0',
//           boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.3)',
//           zIndex: '1000'
//         }}>
//           <div style={{
//             maxWidth: '1200px',
//             margin: '0 auto',
//             display: 'flex',
//             justifyContent: 'center',
//             gap: '40px',
//             padding: '0 20px'
//           }}>
//             <button 
//               onClick={handleAccept}
//               disabled={submitting}
//               style={{
//                 backgroundColor: submitting ? '#cccccc' : '#4caf50',
//                 color: 'white',
//                 border: 'none',
//                 padding: '12px 30px',
//                 borderRadius: '25px',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: submitting ? 'not-allowed' : 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
//               }}
//             >
//               <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
//               </svg>
//               {submitting ? 'Processing...' : 'Accept Offer'}
//             </button>
            
//             <button 
//               onClick={handleReject}
//               disabled={submitting}
//               style={{
//                 backgroundColor: submitting ? '#cccccc' : '#f44336',
//                 color: 'white',
//                 border: 'none',
//                 padding: '12px 30px',
//                 borderRadius: '25px',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: submitting ? 'not-allowed' : 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)'
//               }}
//             >
//               <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
//               </svg>
//               {submitting ? 'Processing...' : 'Reject Offer'}
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EmploymentOfferLetter;







import React, { useState, useEffect } from 'react';

const EmploymentOfferLetter = () => {
  const [offerData, setOfferData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Function to fetch offer data from your API
  const fetchOfferData = async (jobApplicantEmail) => {
    try {
      setLoading(true);
      const response = await fetch(`https://fbts.flamingohrms.com/api/method/fbts.api.job_offer.job_offer?job_applicant=${jobApplicantEmail}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch offer data');
      }
      
      const data = await response.json();
      
      if (data.message && data.message.length > 0) {
        setOfferData(data.message[0]); // Get the first offer
      } else {
        throw new Error('No offer data found');
      }
    } catch (err) {
      setError(err.message || 'Failed to load offer letter data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // You can get this email from URL params, props, or user input
    const jobApplicantEmail = 'sakshimahadik04@gmail.com'; // Replace with dynamic value
    fetchOfferData(jobApplicantEmail);
  }, []);

  const handleAccept = async () => {
    try {
      setSubmitting(true);
      
      // Replace with your actual accept endpoint
      const response = await fetch(`https://fbts.flamingohrms.com/api/method/fbts.api.job_offer.accept_offer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offer_name: offerData.name,
          job_applicant: offerData.job_applicant,
          action: 'accept',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert('Offer Accepted! Thank you for accepting the position.');
        // You might want to redirect or update the UI here
      } else {
        throw new Error('Failed to accept offer');
      }
    } catch (error) {
      alert('Error accepting offer. Please try again.');
      console.error('Accept error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    try {
      setSubmitting(true);
      
      // Replace with your actual reject endpoint
      const response = await fetch(`https://fbts.flamingohrms.com/api/method/fbts.api.job_offer.reject_offer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offer_name: offerData.name,
          job_applicant: offerData.job_applicant,
          action: 'reject',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert('Offer Rejected. We appreciate your consideration.');
        // You might want to redirect or update the UI here
      } else {
        throw new Error('Failed to reject offer');
      }
    } catch (error) {
      alert('Error rejecting offer. Please try again.');
      console.error('Reject error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Calculate totals from earnings and deductions
  const calculateTotals = () => {
    if (!offerData) return { grossPay: 0, totalDeductions: 0, netPay: 0 };
    
    const grossPay = offerData.earnings?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
    const totalDeductions = offerData.deductions?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
    const employerContrib = offerData.employer_contributions?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
    
    return {
      grossPay,
      totalDeductions,
      employerContrib,
      netPay: grossPay - totalDeductions,
      ctc: grossPay + employerContrib
    };
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading offer letter...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: 'red'
      }}>
        <div>{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!offerData) {
    return null;
  }

  const totals = calculateTotals();

  return (
    <>
      <div style={{ paddingBottom: '100px' }}>
        <div style={{
          margin: '0 auto',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.6',
          color: '#333',
          background: '#fff'
        }}>
          {/* Flex Container for Two Columns */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            
            {/* Left Column */}
            <div style={{ flex: '1', minWidth: '0', border: '1px solid #000000ff', padding:'20px' }}>
              {/* Header */}
              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', marginRight: '15px' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '2px',
                      width: '40px',
                      height: '40px'
                    }}>
                      <div style={{ backgroundColor: '#ff6b35', borderRadius: '3px' }}></div>
                      <div style={{ backgroundColor: '#f7931e', borderRadius: '3px' }}></div>
                      <div style={{ backgroundColor: '#4caf50', borderRadius: '3px' }}></div>
                      <div style={{ backgroundColor: '#2196f3', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>NEST</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>HRMS</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>BY {offerData.company?.toUpperCase() || 'FLAMINGO INFINITE'}</div>
                  </div>
                </div>
              </div>

              {/* Date and Address */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ textAlign: 'right', marginBottom: '15px', fontWeight: 'bold', fontSize: '12px' }}>
                  {offerData.offer_date || 'N/A'}
                </div>
                <div>
                  <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '12px' }}>To,</div>
                  <div style={{ marginLeft: '15px', fontSize: '12px' }}>
                    <div>{offerData.job_applicant},</div>
                    <div>{offerData.applicant_name},</div>
                    <div>{offerData.designation},</div>
                    <div>Mumbai, Borivali-400092</div>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div style={{ marginBottom: '30px', fontWeight: 'bold', textDecoration: 'underline' }}>
                Subject: Offer Of Employment
              </div>

              {/* Main Content */}
              <div style={{ marginBottom: '30px' }}>
                <p style={{ marginBottom: '20px', fontSize: '12px' }}>
                  On behalf of <strong>{offerData.company || 'Flamingo Infinite'}</strong>, we are delighted to extend an offer of 
                  employment to you. Please find below a summary of the terms and conditions for 
                  your anticipated employment with us:
                </p>

                <div style={{ marginBottom: '20px', fontSize: '12px' }}>
                  <div style={{ marginBottom: '10px' }}><strong>Designation:</strong> {offerData.designation}</div>
                  <div style={{ marginBottom: '10px' }}><strong>Grade:</strong> {offerData.grade}</div>
                  <div style={{ marginBottom: '10px' }}><strong>Reporting:</strong> You will be reporting to {offerData.custom_reporting_manager}</div>
                  <div style={{ marginBottom: '10px' }}><strong>Posting:</strong> {offerData.level || 'None'}</div>
                </div>

                <div style={{ marginBottom: '20px', fontSize: '12px' }}>
                  <strong>Remuneration:</strong> Your Annual CTC will be ₹{formatCurrency(totals.ctc * 12)}/- 
                  ({offerData.custom_total_amount_inr || 'Amount in words'}).
                </div>

                <p style={{ marginBottom: '20px', fontSize: '12px' }}>
                  The Company reserves the right to re-designate or revise your position or work 
                  description at any time, with written notice.
                </p>

                <p style={{ marginBottom: '20px', fontSize: '12px' }}>
                  If you accept this offer, your start date will be <strong>{offerData.custom_joining_date}</strong> or another mutually 
                  agreed-upon date.
                </p>

                <div style={{ 
                  background: '#fff3cd', 
                  border: '1px solid #ffeaa7', 
                  padding: '15px', 
                  borderRadius: '5px',
                  marginBottom: '20px',
                  fontSize: '12px'
                }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 10px 0'}}>Important:</p>
                  <p style={{ margin: '0', fontSize: '12px' }}>
                    Please note that this offer letter is valid for 3 days from the date of release. 
                    If not accepted within this timeframe, the offer will be considered null and void.
                  </p>
                </div>

                <p style={{ marginBottom: '20px', fontSize: '12px' }}>
                  The offer of employment is contingent upon satisfactory references. A formal Letter 
                  of Appointment will be issued on your joining date.
                </p>

                {/* Closing */}
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '12px' }}>
                    We wish you all the best and look forward to welcoming you to the {offerData.company || 'Flamingo Infinite'} Group.
                  </p>
                </div>

                {/* Signature Section */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>For {offerData.company || 'Flamingo Infinite'}.</div>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{offerData.custom_reporting_manager || 'Developer Daiyan'}</div>
                      <div style={{ fontSize: '11px' }}>Group Chief Human Resource Officer</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    fontSize: '10px', 
                    color: '#666', 
                    fontStyle: 'italic',
                    marginBottom: '15px'
                  }}>
                    Please note this is a computer-generated letter, hence no signature required.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ flex: '1', minWidth: '0', border: '1px solid #000000ff', padding:'20px' }}>
              {/* Salary Breakdown Table */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>Salary Breakdown - Annexure</h3>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Components</th>
                      <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>Monthly (₹)</th>
                      <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>Annually (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Earnings */}
                    {offerData.earnings?.map((earning, index) => (
                      <tr key={`earning-${index}`} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                        <td style={{ border: '1px solid #ddd', padding: '10px' }}>{earning.salary_component}</td>
                        <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
                          {formatCurrency(earning.amount || 0)}
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
                          {formatCurrency(earning.yearly || 0)}
                        </td>
                      </tr>
                    ))}
                    
                    {/* Total Gross Pay */}
                    <tr style={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
                      <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Gross Pay (A)</td>
                      <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(totals.grossPay)}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(totals.grossPay * 12)}
                      </td>
                    </tr>
                    
                    {/* Employer Contributions */}
                    {offerData.employer_contributions?.map((contrib, index) => (
                      <tr key={`contrib-${index}`} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                        <td style={{ border: '1px solid #ddd', padding: '10px' }}>{contrib.salary_component}</td>
                        <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
                          {formatCurrency(contrib.amount || 0)}
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
                          {formatCurrency(contrib.yearly || 0)}
                        </td>
                      </tr>
                    ))}
                    
                    {/* Total Employer Contribution */}
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Employer Contribution (B)</td>
                      <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(totals.employerContrib)}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(totals.employerContrib * 12)}
                      </td>
                    </tr>
                    
                    {/* Deductions */}
                    {offerData.deductions?.map((deduction, index) => (
                      <tr key={`deduction-${index}`} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                        <td style={{ border: '1px solid #ddd', padding: '10px' }}>{deduction.salary_component}</td>
                        <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
                          {formatCurrency(deduction.amount || 0)}
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
                          {formatCurrency(deduction.yearly || 0)}
                        </td>
                      </tr>
                    ))}
                    
                    {/* Total Deductions */}
                    <tr>
                      <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Deductions (C)</td>
                      <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(totals.totalDeductions)}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(totals.totalDeductions * 12)}
                      </td>
                    </tr>
                    
                    {/* Net Take Home */}
                    <tr style={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
                      <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Net Take Home [A-C] (D)</td>
                      <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(totals.netPay)}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(totals.netPay * 12)}
                      </td>
                    </tr>
                    
                    {/* CTC */}
                    <tr style={{ backgroundColor: '#fff3e0', fontWeight: 'bold' }}>
                      <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>CTC [A+B] (E)</td>
                      <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(totals.ctc)}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(totals.ctc * 12)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Notes */}
              <div style={{ 
                marginTop: '0px',
                border: '1px solid #ddd',
                padding: '12px',
                background: '#f9f9f9'
              }}>
                <h4 style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '12px' }}>NOTES:</h4>
                <ul style={{ paddingLeft: '15px', margin: '0', fontSize: '12px' }}>
                  <li>Income Tax deductions on above will be applicable as per rules.</li>
                  <li>LTA – Exempt if claimed twice in a block of four years.</li>
                  <li>Gratuity as per company policy and applicable law.</li>
                  <li>Professional tax may vary by month/state regulations.</li>
                </ul>
              </div>

              {/* Status Display */}
              {/* <div style={{ 
                marginTop: '15px',
                padding: '10px',
                background: offerData.status === 'Awaiting Response' ? '#fff3cd' : '#d4edda',
                border: '1px solid #ddd',
                borderRadius: '5px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  Status: {offerData.status}
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  Offer ID: {offerData.name}
                </div>
              </div> */}

              {/* CTC Calculation Debug Info
              <div style={{ 
                marginTop: '15px',
                padding: '10px',
                background: '#f0f8ff',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                  CTC Calculation Details:
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  <div>Base: ₹{formatCurrency(totals.base)}</div>
                  <div>Custom Offered CTC: ₹{formatCurrency(totals.customOfferedCtc)}</div>
                  <div>Earnings Total: ₹{formatCurrency(totals.grossPay * 12)} (yearly)</div>
                  <div style={{ fontWeight: 'bold', marginTop: '5px', color: '#333' }}>
                    Final CTC: ₹{formatCurrency(totals.finalCTC)} 
                    {totals.base > totals.customOfferedCtc ? ' (Base * 12)' : 
                     totals.customOfferedCtc > totals.base ? ' (Custom CTC * 12)' : ' (Earnings Total)'}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation with Accept/Reject Buttons */}
      {offerData.status === 'Awaiting Response' && (
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          width:'100%',
          background:"#c7bfbfff",
          backdropFilter: 'blur(1px)',
          padding: '10px 0',
         
        }}>
          <div style={{
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'right',
            gap: '40px',
            padding: '0 20px'
          }}>
            <button 
              onClick={handleAccept}
              disabled={submitting}
              style={{
                backgroundColor: submitting ? '#cccccc' : '#4caf50',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              {submitting ? 'Processing...' : 'Accept Offer'}
            </button>
            
            <button 
              onClick={handleReject}
              disabled={submitting}
              style={{
                backgroundColor: submitting ? '#cccccc' : '#f44336',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)'
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              {submitting ? 'Processing...' : 'Reject Offer'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmploymentOfferLetter;












// import React, { useState, useEffect } from 'react';

// const EmploymentOfferLetter = () => {
//   const [offerData, setOfferData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   // Function to fetch offer data from your API
//   const fetchOfferData = async (jobApplicantEmail) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`https://fbts.flamingohrms.com/api/method/fbts.api.job_offer.job_offer?job_applicant=${jobApplicantEmail}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch offer data');
//       }
      
//       const data = await response.json();
      
//       if (data.message && data.message.length > 0) {
//         setOfferData(data.message[0]); // Get the first offer
//       } else {
//         throw new Error('No offer data found');
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to load offer letter data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Get username from localStorage (from your login code)
//     const jobApplicantEmail = localStorage.getItem('username');
    
//     if (jobApplicantEmail) {
//       fetchOfferData(jobApplicantEmail);
//     } else {
//       setError('No username found. Please login first.');
//       setLoading(false);
//     }
//   }, []);

//   const handleAccept = async () => {
//     try {
//       setSubmitting(true);
      
//       // Replace with your actual accept endpoint
//       const response = await fetch(`https://fbts.flamingohrms.com/api/method/fbts.api.job_offer.accept_offer`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           offer_name: offerData.name,
//           job_applicant: offerData.job_applicant,
//           action: 'accept',
//           timestamp: new Date().toISOString()
//         })
//       });

//       if (response.ok) {
//         alert('Offer Accepted! Thank you for accepting the position.');
//         // You might want to redirect or update the UI here
//       } else {
//         throw new Error('Failed to accept offer');
//       }
//     } catch (error) {
//       alert('Error accepting offer. Please try again.');
//       console.error('Accept error:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       setSubmitting(true);
      
//       // Replace with your actual reject endpoint
//       const response = await fetch(`https://fbts.flamingohrms.com/api/method/fbts.api.job_offer.reject_offer`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           offer_name: offerData.name,
//           job_applicant: offerData.job_applicant,
//           action: 'reject',
//           timestamp: new Date().toISOString()
//         })
//       });

//       if (response.ok) {
//         alert('Offer Rejected. We appreciate your consideration.');
//         // You might want to redirect or update the UI here
//       } else {
//         throw new Error('Failed to reject offer');
//       }
//     } catch (error) {
//       alert('Error rejecting offer. Please try again.');
//       console.error('Reject error:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   // Calculate totals from earnings and deductions
//   const calculateTotals = () => {
//     if (!offerData) return { grossPay: 0, totalDeductions: 0, netPay: 0 };
    
//     const grossPay = offerData.earnings?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
//     const totalDeductions = offerData.deductions?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
//     const employerContrib = offerData.employer_contributions?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
    
//     return {
//       grossPay,
//       totalDeductions,
//       employerContrib,
//       netPay: grossPay - totalDeductions,
//       ctc: grossPay + employerContrib
//     };
//   };

//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         fontSize: '18px'
//       }}>
//         Loading offer letter...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         fontSize: '18px',
//         color: 'red'
//       }}>
//         <div>{error}</div>
//         <button 
//           onClick={() => window.location.reload()} 
//           style={{
//             marginTop: '20px',
//             padding: '10px 20px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (!offerData) {
//     return null;
//   }

//   const totals = calculateTotals();

//   return (
//     <>
//       <div style={{ paddingBottom: '100px' }}>
//         <div style={{
//           margin: '0 auto',
//           padding: '20px',
//           fontFamily: 'Arial, sans-serif',
//           lineHeight: '1.6',
//           color: '#333',
//           background: '#fff'
//         }}>
//           {/* Flex Container for Two Columns */}
//           <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            
//             {/* Left Column */}
//             <div style={{ flex: '1', minWidth: '0', border: '1px solid #000000ff', padding:'20px' }}>
//               {/* Header */}
//               <div style={{ marginBottom: '30px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//                   <div style={{ display: 'flex', marginRight: '15px' }}>
//                     <div style={{
//                       display: 'grid',
//                       gridTemplateColumns: '1fr 1fr',
//                       gap: '2px',
//                       width: '40px',
//                       height: '40px'
//                     }}>
//                       <div style={{ backgroundColor: '#ff6b35', borderRadius: '3px' }}></div>
//                       <div style={{ backgroundColor: '#f7931e', borderRadius: '3px' }}></div>
//                       <div style={{ backgroundColor: '#4caf50', borderRadius: '3px' }}></div>
//                       <div style={{ backgroundColor: '#2196f3', borderRadius: '3px' }}></div>
//                     </div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>NEST</div>
//                     <div style={{ fontSize: '12px', color: '#666' }}>HRMS</div>
//                     <div style={{ fontSize: '10px', color: '#888' }}>BY {offerData.company?.toUpperCase() || 'FLAMINGO INFINITE'}</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Date and Address */}
//               <div style={{ marginBottom: '20px' }}>
//                 <div style={{ textAlign: 'right', marginBottom: '15px', fontWeight: 'bold', fontSize: '12px' }}>
//                   {offerData.offer_date || 'N/A'}
//                 </div>
//                 <div>
//                   <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '12px' }}>To,</div>
//                   <div style={{ marginLeft: '15px', fontSize: '12px' }}>
//                     <div>{offerData.job_applicant},</div>
//                     <div>{offerData.applicant_name},</div>
//                     <div>{offerData.designation},</div>
//                     <div>Mumbai, Borivali-400092</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Subject */}
//               <div style={{ marginBottom: '30px', fontWeight: 'bold', textDecoration: 'underline' }}>
//                 Subject: Offer Of Employment
//               </div>

//               {/* Main Content */}
//               <div style={{ marginBottom: '30px' }}>
//                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   On behalf of <strong>{offerData.company || 'Flamingo Infinite'}</strong>, we are delighted to extend an offer of 
//                   employment to you. Please find below a summary of the terms and conditions for 
//                   your anticipated employment with us:
//                 </p>

//                 <div style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   <div style={{ marginBottom: '10px' }}><strong>Designation:</strong> {offerData.designation}</div>
//                   <div style={{ marginBottom: '10px' }}><strong>Grade:</strong> {offerData.grade}</div>
//                   <div style={{ marginBottom: '10px' }}><strong>Reporting:</strong> You will be reporting to {offerData.custom_reporting_manager}</div>
//                   <div style={{ marginBottom: '10px' }}><strong>Posting:</strong> {offerData.level || 'None'}</div>
//                 </div>

//                 <div style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   <strong>Remuneration:</strong> Your Annual CTC will be ₹{formatCurrency(offerData.custom_offered_ctc || totals.ctc)}/- 
//                   ({offerData.custom_total_amount_inr || 'Amount in words'}).
//                 </div>

//                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   The Company reserves the right to re-designate or revise your position or work 
//                   description at any time, with written notice.
//                 </p>

//                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   If you accept this offer, your start date will be <strong>{offerData.custom_joining_date}</strong> or another mutually 
//                   agreed-upon date.
//                 </p>

//                 <div style={{ 
//                   background: '#fff3cd', 
//                   border: '1px solid #ffeaa7', 
//                   padding: '15px', 
//                   borderRadius: '5px',
//                   marginBottom: '20px',
//                   fontSize: '12px'
//                 }}>
//                   <p style={{ fontWeight: 'bold', margin: '0 0 10px 0'}}>Important:</p>
//                   <p style={{ margin: '0', fontSize: '12px' }}>
//                     Please note that this offer letter is valid for 3 days from the date of release. 
//                     If not accepted within this timeframe, the offer will be considered null and void.
//                   </p>
//                 </div>

//                 <p style={{ marginBottom: '20px', fontSize: '12px' }}>
//                   The offer of employment is contingent upon satisfactory references. A formal Letter 
//                   of Appointment will be issued on your joining date.
//                 </p>

//                 {/* Closing */}
//                 <div style={{ marginBottom: '20px' }}>
//                   <p style={{ fontSize: '12px' }}>
//                     We wish you all the best and look forward to welcoming you to the {offerData.company || 'Flamingo Infinite'} Group.
//                   </p>
//                 </div>

//                 {/* Signature Section */}
//                 <div style={{ marginBottom: '20px' }}>
//                   <div style={{ marginBottom: '15px' }}>
//                     <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>For {offerData.company || 'Flamingo Infinite'}.</div>
//                     <div>
//                       <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{offerData.custom_reporting_manager || 'Developer Daiyan'}</div>
//                       <div style={{ fontSize: '11px' }}>Group Chief Human Resource Officer</div>
//                     </div>
//                   </div>
                  
//                   <div style={{ 
//                     fontSize: '10px', 
//                     color: '#666', 
//                     fontStyle: 'italic',
//                     marginBottom: '15px'
//                   }}>
//                     Please note this is a computer-generated letter, hence no signature required.
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div style={{ flex: '1', minWidth: '0', border: '1px solid #000000ff', padding:'20px' }}>
//               {/* Salary Breakdown Table */}
//               <div style={{ marginBottom: '30px' }}>
//                 <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>Salary Breakdown - Annexure</h3>
                
//                 <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '12px' }}>
//                   <thead>
//                     <tr style={{ backgroundColor: '#f8f9fa' }}>
//                       <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Components</th>
//                       <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>Monthly (₹)</th>
//                       <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>Annually (₹)</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {/* Earnings */}
//                     {offerData.earnings?.map((earning, index) => (
//                       <tr key={`earning-${index}`} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
//                         <td style={{ border: '1px solid #ddd', padding: '10px' }}>{earning.salary_component}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(earning.amount || 0)}
//                         </td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(earning.yearly || 0)}
//                         </td>
//                       </tr>
//                     ))}
                    
//                     {/* Total Gross Pay */}
//                     <tr style={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Gross Pay (A)</td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.grossPay)}
//                       </td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.grossPay * 12)}
//                       </td>
//                     </tr>
                    
//                     {/* Employer Contributions */}
//                     {offerData.employer_contributions?.map((contrib, index) => (
//                       <tr key={`contrib-${index}`} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
//                         <td style={{ border: '1px solid #ddd', padding: '10px' }}>{contrib.salary_component}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(contrib.amount || 0)}
//                         </td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(contrib.yearly || 0)}
//                         </td>
//                       </tr>
//                     ))}
                    
//                     {/* Total Employer Contribution */}
//                     <tr style={{ backgroundColor: '#f8f9fa' }}>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Employer Contribution (B)</td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.employerContrib)}
//                       </td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.employerContrib * 12)}
//                       </td>
//                     </tr>
                    
//                     {/* Deductions */}
//                     {offerData.deductions?.map((deduction, index) => (
//                       <tr key={`deduction-${index}`} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
//                         <td style={{ border: '1px solid #ddd', padding: '10px' }}>{deduction.salary_component}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(deduction.amount || 0)}
//                         </td>
//                         <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right' }}>
//                           {formatCurrency(deduction.yearly || 0)}
//                         </td>
//                       </tr>
//                     ))}
                    
//                     {/* Total Deductions */}
//                     <tr>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Total Deductions (C)</td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.totalDeductions)}
//                       </td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.totalDeductions * 12)}
//                       </td>
//                     </tr>
                    
//                     {/* Net Take Home */}
//                     <tr style={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>Net Take Home [A-C] (D)</td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.netPay)}
//                       </td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.netPay * 12)}
//                       </td>
//                     </tr>
                    
//                     {/* CTC */}
//                     <tr style={{ backgroundColor: '#fff3e0', fontWeight: 'bold' }}>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>CTC [A+B] (E)</td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.ctc)}
//                       </td>
//                       <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
//                         {formatCurrency(totals.ctc * 12)}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               {/* Notes */}
//               <div style={{ 
//                 marginTop: '0px',
//                 border: '1px solid #ddd',
//                 padding: '12px',
//                 background: '#f9f9f9'
//               }}>
//                 <h4 style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '12px' }}>NOTES:</h4>
//                 <ul style={{ paddingLeft: '15px', margin: '0', fontSize: '12px' }}>
//                   <li>Income Tax deductions on above will be applicable as per rules.</li>
//                   <li>LTA – Exempt if claimed twice in a block of four years.</li>
//                   <li>Gratuity as per company policy and applicable law.</li>
//                   <li>Professional tax may vary by month/state regulations.</li>
//                 </ul>
//               </div>

//               {/* Status Display */}
//               <div style={{ 
//                 marginTop: '15px',
//                 padding: '10px',
//                 background: offerData.status === 'Awaiting Response' ? '#fff3cd' : '#d4edda',
//                 border: '1px solid #ddd',
//                 borderRadius: '5px',
//                 textAlign: 'center'
//               }}>
//                 <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
//                   Status: {offerData.status}
//                 </div>
//                 <div style={{ fontSize: '11px', color: '#666' }}>
//                   Offer ID: {offerData.name}
//                 </div>
//               </div>

//               {/* CTC Calculation Debug Info */}
//               <div style={{ 
//                 marginTop: '15px',
//                 padding: '10px',
//                 background: '#f0f8ff',
//                 border: '1px solid #ddd',
//                 borderRadius: '5px'
//               }}>
//                 <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
//                   CTC Calculation Details:
//                 </div>
//                 <div style={{ fontSize: '11px', color: '#666' }}>
//                   <div>Base: ₹{formatCurrency(totals.base)}</div>
//                   <div>Custom Offered CTC: ₹{formatCurrency(totals.customOfferedCtc)}</div>
//                   <div>Earnings Total: ₹{formatCurrency(totals.grossPay * 12)} (yearly)</div>
//                   <div style={{ fontWeight: 'bold', marginTop: '5px', color: '#333' }}>
//                     Final CTC: ₹{formatCurrency(totals.finalCTC)} 
//                     {totals.base > totals.customOfferedCtc ? ' (Base * 12)' : 
//                      totals.customOfferedCtc > totals.base ? ' (Custom CTC * 12)' : ' (Earnings Total)'}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Fixed Bottom Navigation with Accept/Reject Buttons */}
//       {offerData.status === 'Awaiting Response' && (
//         <div style={{
//           position: 'fixed',
//           bottom: '0',
//           left: '0',
//           right: '0',
//           background: 'rgba(26, 32, 44, 0.95)',
//           backdropFilter: 'blur(10px)',
//           padding: '15px 0',
//           boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.3)',
//           zIndex: '1000'
//         }}>
//           <div style={{
//             maxWidth: '1200px',
//             margin: '0 auto',
//             display: 'flex',
//             justifyContent: 'center',
//             gap: '40px',
//             padding: '0 20px'
//           }}>
//             <button 
//               onClick={handleAccept}
//               disabled={submitting}
//               style={{
//                 backgroundColor: submitting ? '#cccccc' : '#4caf50',
//                 color: 'white',
//                 border: 'none',
//                 padding: '12px 30px',
//                 borderRadius: '25px',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: submitting ? 'not-allowed' : 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
//               }}
//             >
//               <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
//               </svg>
//               {submitting ? 'Processing...' : 'Accept Offer'}
//             </button>
            
//             <button 
//               onClick={handleReject}
//               disabled={submitting}
//               style={{
//                 backgroundColor: submitting ? '#cccccc' : '#f44336',
//                 color: 'white',
//                 border: 'none',
//                 padding: '12px 30px',
//                 borderRadius: '25px',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: submitting ? 'not-allowed' : 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)'
//               }}
//             >
//               <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
//               </svg>
//               {submitting ? 'Processing...' : 'Reject Offer'}
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EmploymentOfferLetter;