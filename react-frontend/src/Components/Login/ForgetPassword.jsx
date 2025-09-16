// // import React, { useState } from 'react';
// // import { Mail, Send, Loader2, CheckCircle, AlertCircle, ArrowLeft, Key } from 'lucide-react';

// // const ForgetPassword = () => {
// //   const [email, setEmail] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [validatingOtp, setValidatingOtp] = useState(false);
// //   const [generateResponse, setGenerateResponse] = useState(null);
// //   const [validateResponse, setValidateResponse] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [step, setStep] = useState(1); // 1 for generate, 2 for validate

// //   const handleSubmit = async () => {
    
        
// //     if (!email) {
// //       setError('Please enter an email address');
// //       return;
// //     }

// //     if (!email.includes('@') || !email.includes('.')) {
// //       setError('Please enter a valid email address');
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);
// //     setResponse(null);

// //     try {
// //       const apiResponse = await fetch('https://fbts.flamingohrms.com/api/method/fbts.api.auth.generate_otp', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           email_id: email
// //         })
// //       });

// //       const data = await apiResponse.json();

// //       if (apiResponse.ok) {
// //         setResponse(data);
// //       } else {
// //         setError(data.message || 'Failed to generate OTP');
// //       }
// //     } catch (err) {
// //       setError('Network error. Please check your connection and try again.');
// //       console.error('API Error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     setEmail('');
// //     setOtp('');
// //     setGenerateResponse(null);
// //     setValidateResponse(null);
// //     setError(null);
// //     setStep(1);
// //   };

// //   const handleBackToGenerate = () => {
// //     setOtp('');
// //     setValidateResponse(null);
// //     setError(null);
// //     setStep(1);
// //   };
// //   const handleGenerateOTP = async () => {
// //     if (!email) {
// //         setError('Please enter an email address');
// //         return;
// //     }

// //     if (!email.includes('@') || !email.includes('.')) {
// //         setError('Please enter a valid email address');
// //         return;
// //     }

// //     setLoading(true);
// //     setError(null);
// //     setGenerateResponse(null);

// //     try {
// //         const apiResponse = await fetch('https://fbts.flamingohrms.com/api/method/fbts.api.auth.generate_otp', {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //             email_id: email
// //         })
// //         });

// //         const data = await apiResponse.json();

// //         if (apiResponse.ok) {
// //         setGenerateResponse(data);
// //         setStep(2); // Move to validation step
// //         } else {
// //         setError(data.message || 'Failed to generate OTP');
// //         }
// //     } catch (err) {
// //         setError('Network error. Please check your connection and try again.');
// //         console.error('API Error:', err);
// //     } finally {
// //         setLoading(false);
// //     }
// //     };

// //     const handleValidateOTP = async () => {
// //     if (!otp) {
// //         setError('Please enter the OTP');
// //         return;
// //     }

// //     if (otp.length < 4) {
// //         setError('Please enter a valid OTP');
// //         return;
// //     }

// //     setValidatingOtp(true);
// //     setError(null);
// //     setValidateResponse(null);

// //     try {
// //         const apiResponse = await fetch('https://fbts.flamingohrms.com/api/method/fbts.api.auth.validate_otp', {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //             email_id: email,
// //             otp: otp
// //         })
// //         });

// //         const data = await apiResponse.json();

// //         if (apiResponse.ok) {
// //         setValidateResponse(data);
// //         } else {
// //         setError(data.message || 'Failed to validate OTP');
// //         }
// //     } catch (err) {
// //         setError('Network error. Please check your connection and try again.');
// //         console.error('API Error:', err);
// //     } finally {
// //         setValidatingOtp(false);
// //     }
// //     };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
// //       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
// //         <div className="text-center mb-8">
// //           <div className="bg-pink-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
// //             {step === 1 ? (
// //               <Mail className="text-pink-600" size={24} />
// //             ) : (
// //               <Key className="text-pink-600" size={24} />
// //             )}
// //           </div>
// //           <h1 className="text-2xl font-bold text-gray-900 mb-2">
// //             {step === 1 ? 'Generate OTP' : 'Validate OTP'}
// //           </h1>
// //           <p className="text-gray-600">
// //             {step === 1 
// //               ? 'Enter your email address to receive an OTP' 
// //               : `Enter the OTP sent to ${email}`
// //             }
// //           </p>
// //         </div>

// //         {step === 1 ? (
// //           // Generate OTP Step
// //           <div className="space-y-6">
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Email Address
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   placeholder="Enter your email address"
// //                   className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
// //                   disabled={loading}
// //                   onKeyPress={(e) => e.key === 'Enter' && handleGenerateOTP()}
// //                 />
// //                 <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
// //               </div>
// //             </div>

// //             <button
// //               onClick={handleGenerateOTP}
// //               disabled={loading || !email}
// //               className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
// //             >
// //               {loading ? (
// //                 <>
// //                   <Loader2 className="animate-spin" size={18} />
// //                   Generating OTP...
// //                 </>
// //               ) : (
// //                 <>
// //                   <Send size={18} />
// //                   Generate OTP
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         ) : (
// //           // Validate OTP Step
// //           <div className="space-y-6">
// //             <div>
// //               <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Enter OTP
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   id="otp"
// //                   value={otp}
// //                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
// //                   placeholder="Enter 6-digit OTP"
// //                   className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors text-center text-lg tracking-widest"
// //                   disabled={validatingOtp}
// //                   onKeyPress={(e) => e.key === 'Enter' && handleValidateOTP()}
// //                   maxLength={6}
// //                 />
// //                 <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
// //               </div>
// //             </div>

// //             <div className="flex gap-3">
// //               <button
// //                 onClick={handleBackToGenerate}
// //                 disabled={validatingOtp}
// //                 className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 <ArrowLeft size={18} />
// //                 Back
// //               </button>
              
// //               <button
// //                 onClick={handleValidateOTP}
// //                 disabled={validatingOtp || !otp}
// //                 className="flex-1 bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
// //               >
// //                 {validatingOtp ? (
// //                   <>
// //                     <Loader2 className="animate-spin" size={18} />
// //                     Validating...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <CheckCircle size={18} />
// //                     Validate OTP
// //                   </>
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {error && (
// //           <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
// //             <div className="flex items-center gap-2 text-red-800">
// //               <AlertCircle size={18} />
// //               <span className="font-medium">Error</span>
// //             </div>
// //             <p className="text-red-700 mt-1 text-sm">{error}</p>
// //           </div>
// //         )}

// //         {generateResponse && step === 2 && (
// //           <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
// //             <div className="flex items-center gap-2 text-green-800 mb-2">
// //               <CheckCircle size={18} />
// //               <span className="font-medium">OTP Generated Successfully</span>
// //             </div>
// //             <div className="text-sm text-green-700">
// //               <p className="mb-1">OTP has been sent to your email. Please check your inbox and enter the code above.</p>
// //               <details className="mt-2">
// //                 <summary className="font-medium cursor-pointer hover:text-green-800">View API Response</summary>
// //                 <pre className="bg-green-100 p-2 rounded text-xs overflow-x-auto mt-2">
// //                   {JSON.stringify(generateResponse, null, 2)}
// //                 </pre>
// //               </details>
// //             </div>
// //           </div>
// //         )}

// //         {validateResponse && (
// //           <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
// //             <div className="flex items-center gap-2 text-green-800 mb-2">
// //               <CheckCircle size={18} />
// //               <span className="font-medium">OTP Validated Successfully!</span>
// //             </div>
// //             <div className="text-sm text-green-700">
// //               <p className="font-medium mb-1">Validation Response:</p>
// //               <pre className="bg-green-100 p-2 rounded text-xs overflow-x-auto">
// //                 {JSON.stringify(validateResponse, null, 2)}
// //               </pre>
// //             </div>
// //           </div>
// //         )}

// //         {(generateResponse || validateResponse || error) && (
// //           <button
// //             onClick={handleReset}
// //             className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
// //           >
// //             Start Over
// //           </button>
// //         )}

// //         <div className="mt-8 text-center">
// //           <p className="text-xs text-gray-500">
// //             {step === 1 
// //               ? 'API: fbts.flamingohrms.com/api/method/fbts.api.auth.generate_otp'
// //               : 'API: fbts.flamingohrms.com/api/method/fbts.api.auth.validate_otp'
// //             }
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ForgetPassword;








// import React, { useState } from 'react';
// import { Mail, Send, Loader2, CheckCircle, AlertCircle, ArrowLeft, Key, Lock, Eye, EyeOff } from 'lucide-react';

// const ForgetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   const [loading, setLoading] = useState(false);
//   const [validatingOtp, setValidatingOtp] = useState(false);
//   const [resettingPassword, setResettingPassword] = useState(false);
  
//   const [generateResponse, setGenerateResponse] = useState(null);
//   const [validateResponse, setValidateResponse] = useState(null);
//   const [resetResponse, setResetResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [step, setStep] = useState(1); // 1: Generate OTP, 2: Validate OTP, 3: Reset Password

//   const validateEmail = (email) => {
//     return email && email.includes('@') && email.includes('.');
//   };

//   const validatePasswordStrength = (password) => {
//     const errors = [];
//     if (password.length < 8) {
//       errors.push('Password must be at least 8 characters long');
//     }
//     if (!/[A-Z]/.test(password)) {
//       errors.push('Password must contain at least one uppercase letter');
//     }
//     if (!/[a-z]/.test(password)) {
//       errors.push('Password must contain at least one lowercase letter');
//     }
//     if (!/\d/.test(password)) {
//       errors.push('Password must contain at least one number');
//     }
//     if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
//       errors.push('Password must contain at least one special character');
//     }
//     return errors;
//   };

//   const handleGenerateOTP = async () => {
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setGenerateResponse(null);

//     try {
//       const apiResponse = await fetch('https://fbts.flamingohrms.com/api/method/fbts.api.auth.generate_otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email_id: email
//         })
//       });

//       const data = await apiResponse.json();

//       if (apiResponse.ok) {
//         setGenerateResponse(data);
//         setStep(2); // Move to validation step
//       } else {
//         setError(data.message || 'Failed to generate OTP');
//       }
//     } catch (err) {
//       setError('Network error. Please check your connection and try again.');
//       console.error('API Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleValidateOTP = async () => {
//     if (!otp) {
//       setError('Please enter the OTP');
//       return;
//     }

//     if (otp.length < 4) {
//       setError('Please enter a valid OTP');
//       return;
//     }

//     setValidatingOtp(true);
//     setError(null);
//     setValidateResponse(null);

//     try {
//       const apiResponse = await fetch('https://fbts.flamingohrms.com/api/method/fbts.api.auth.validate_otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email_id: email,
//           otp: otp
//         })
//       });

//       const data = await apiResponse.json();

//       if (apiResponse.ok) {
//         setValidateResponse(data);
//         setStep(3); // Move to password reset step
//       } else {
//         setError(data.message || 'Failed to validate OTP');
//       }
//     } catch (err) {
//       setError('Network error. Please check your connection and try again.');
//       console.error('API Error:', err);
//     } finally {
//       setValidatingOtp(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     // Validate password fields
//     if (!newPassword) {
//       setError('Please enter a new password');
//       return;
//     }

//     if (!confirmPassword) {
//       setError('Please confirm your password');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     // Validate password strength
//     const passwordErrors = validatePasswordStrength(newPassword);
//     if (passwordErrors.length > 0) {
//       setError(passwordErrors.join('. '));
//       return;
//     }

//     setResettingPassword(true);
//     setError(null);
//     setResetResponse(null);

//     try {
//       const apiResponse = await fetch('https://fbts.flamingohrms.com/api/method/fbts.api.auth.reset_password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email_id: email,
//           new_password: newPassword
//         })
//       });

//       const data = await apiResponse.json();

//       if (apiResponse.ok) {
//         setResetResponse(data);
//       } else {
//         setError(data.message || 'Failed to reset password');
//       }
//     } catch (err) {
//       setError('Network error. Please check your connection and try again.');
//       console.error('API Error:', err);
//     } finally {
//       setResettingPassword(false);
//     }
//   };

//   const handleReset = () => {
//     setEmail('');
//     setOtp('');
//     setNewPassword('');
//     setConfirmPassword('');
//     setGenerateResponse(null);
//     setValidateResponse(null);
//     setResetResponse(null);
//     setError(null);
//     setStep(1);
//   };

//   const handleBackToStep = (targetStep) => {
//     setError(null);
//     if (targetStep === 1) {
//       setOtp('');
//       setNewPassword('');
//       setConfirmPassword('');
//       setValidateResponse(null);
//       setResetResponse(null);
//       setStep(1);
//     } else if (targetStep === 2) {
//       setNewPassword('');
//       setConfirmPassword('');
//       setResetResponse(null);
//       setStep(2);
//     }
//   };

//   const getStepTitle = () => {
//     switch (step) {
//       case 1: return 'Generate OTP';
//       case 2: return 'Validate OTP';
//       case 3: return 'Reset Password';
//       default: return 'Reset Password';
//     }
//   };

//   const getStepDescription = () => {
//     switch (step) {
//       case 1: return 'Enter your email address to receive an OTP';
//       case 2: return `Enter the OTP sent to ${email}`;
//       case 3: return 'Create a new password for your account';
//       default: return '';
//     }
//   };

//   const getStepIcon = () => {
//     switch (step) {
//       case 1: return <Mail className="text-pink-600" size={24} />;
//       case 2: return <Key className="text-pink-600" size={24} />;
//       case 3: return <Lock className="text-pink-600" size={24} />;
//       default: return <Mail className="text-pink-600" size={24} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="bg-pink-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//             {getStepIcon()}
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {getStepTitle()}
//           </h1>
//           <p className="text-gray-600">
//             {getStepDescription()}
//           </p>
//         </div>

//         {/* Progress Indicator */}
//         <div className="flex items-center justify-center mb-8">
//           <div className="flex items-center space-x-4">
//             {[1, 2, 3].map((stepNum) => (
//               <div key={stepNum} className="flex items-center">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                     stepNum === step
//                       ? 'bg-pink-600 text-white'
//                       : stepNum < step
//                       ? 'bg-green-500 text-white'
//                       : 'bg-gray-200 text-gray-600'
//                   }`}
//                 >
//                   {stepNum < step ? <CheckCircle size={16} /> : stepNum}
//                 </div>
//                 {stepNum < 3 && (
//                   <div
//                     className={`w-12 h-1 mx-2 ${
//                       stepNum < step ? 'bg-green-500' : 'bg-gray-200'
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Step Content */}
//         {step === 1 && (
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email address"
//                   className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
//                   disabled={loading}
//                   onKeyPress={(e) => e.key === 'Enter' && handleGenerateOTP()}
//                 />
//                 <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//               </div>
//             </div>

//             <button
//               onClick={handleGenerateOTP}
//               disabled={loading || !email}
//               className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin" size={18} />
//                   Generating OTP...
//                 </>
//               ) : (
//                 <>
//                   <Send size={18} />
//                   Generate OTP
//                 </>
//               )}
//             </button>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
//                 Enter OTP
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="otp"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                   placeholder="Enter 6-digit OTP"
//                   className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors text-center text-lg tracking-widest"
//                   disabled={validatingOtp}
//                   onKeyPress={(e) => e.key === 'Enter' && handleValidateOTP()}
//                   maxLength={6}
//                 />
//                 <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => handleBackToStep(1)}
//                 disabled={validatingOtp}
//                 className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ArrowLeft size={18} />
//                 Back
//               </button>
              
//               <button
//                 onClick={handleValidateOTP}
//                 disabled={validatingOtp || !otp}
//                 className="flex-1 bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//               >
//                 {validatingOtp ? (
//                   <>
//                     <Loader2 className="animate-spin" size={18} />
//                     Validating...
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle size={18} />
//                     Validate OTP
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                 New Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="newPassword"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   placeholder="Enter new password"
//                   className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
//                   disabled={resettingPassword}
//                 />
//                 <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                 Confirm New Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="Confirm new password"
//                   className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
//                   disabled={resettingPassword}
//                 />
//                 <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Password Requirements */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
//               <ul className="text-xs text-gray-600 space-y-1">
//                 <li>• At least 8 characters long</li>
//                 <li>• Contains uppercase and lowercase letters</li>
//                 <li>• Contains at least one number</li>
//                 <li>• Contains at least one special character</li>
//               </ul>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => handleBackToStep(2)}
//                 disabled={resettingPassword}
//                 className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ArrowLeft size={18} />
//                 Back
//               </button>
              
//               <button
//                 onClick={handleResetPassword}
//                 disabled={resettingPassword || !newPassword || !confirmPassword}
//                 className="flex-1 bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//               >
//                 {resettingPassword ? (
//                   <>
//                     <Loader2 className="animate-spin" size={18} />
//                     Resetting Password...
//                   </>
//                 ) : (
//                   <>
//                     <Lock size={18} />
//                     Reset Password
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Error Display */}
//         {error && (
//           <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
//             <div className="flex items-center gap-2 text-red-800">
//               <AlertCircle size={18} />
//               <span className="font-medium">Error</span>
//             </div>
//             <p className="text-red-700 mt-1 text-sm">{error}</p>
//           </div>
//         )}

//         {/* Success Messages */}
//         {generateResponse && step >= 2 && (
//           <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
//             <div className="flex items-center gap-2 text-green-800 mb-2">
//               <CheckCircle size={18} />
//               <span className="font-medium">OTP Generated Successfully</span>
//             </div>
//             <p className="text-sm text-green-700">OTP has been sent to your email.</p>
//           </div>
//         )}

//         {validateResponse && step >= 3 && (
//           <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
//             <div className="flex items-center gap-2 text-green-800 mb-2">
//               <CheckCircle size={18} />
//               <span className="font-medium">OTP Validated Successfully</span>
//             </div>
//             <p className="text-sm text-green-700">You can now reset your password.</p>
//           </div>
//         )}

//         {resetResponse && (
//           <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
//             <div className="flex items-center gap-2 text-green-800 mb-2">
//               <CheckCircle size={18} />
//               <span className="font-medium">Password Reset Successfully!</span>
//             </div>
//             <div className="text-sm text-green-700">
//               <p className="mb-1">Your password has been reset successfully. You can now log in with your new password.</p>
//               <details className="mt-2">
//                 <summary className="font-medium cursor-pointer hover:text-green-800">View API Response</summary>
//                 <pre className="bg-green-100 p-2 rounded text-xs overflow-x-auto mt-2">
//                   {JSON.stringify(resetResponse, null, 2)}
//                 </pre>
//               </details>
//             </div>
//           </div>
//         )}

//         {/* Start Over Button */}
//         {(generateResponse || validateResponse || resetResponse || error) && (
//           <button
//             onClick={handleReset}
//             className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//           >
//             Start Over
//           </button>
//         )}

//         {/* API Info */}
//         <div className="mt-8 text-center">
//           <p className="text-xs text-gray-500">
//             {step === 1 && 'API: fbts.api.auth.generate_otp'}
//             {step === 2 && 'API: fbts.api.auth.validate_otp'}
//             {step === 3 && 'API: fbts.api.auth.reset_password'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;













import React, { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle, AlertCircle, ArrowLeft, Key, Lock, Eye, EyeOff } from 'lucide-react';

const ForgetPassword= () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [validatingOtp, setValidatingOtp] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  
  const [generateResponse, setGenerateResponse] = useState(null);
  const [validateResponse, setValidateResponse] = useState(null);
  const [resetResponse, setResetResponse] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  // Direct API call function to handle CORS issues
  const makeAPICall = async (endpoint, data) => {
    const baseURL = import.meta.env.DEV ? '' : 'https://fbts.flamingohrms.com';
    const url = `${baseURL}/api/method/fbts.api.auth.${endpoint}`;
    
    console.log('Making API call to:', url);
    console.log('With data:', data);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit', // Don't send cookies for these endpoints
        body: JSON.stringify(data)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      return result;
    } catch (error) {
      console.error('API Call Error:', error);
      throw error;
    }
  };

  const validateEmail = (email) => {
    return email && email.includes('@') && email.includes('.');
  };

  const validatePasswordStrength = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    return errors;
  };

  const handleGenerateOTP = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    setGenerateResponse(null);

    try {
      const data = await makeAPICall('generate_otp', { email_id: email });
      setGenerateResponse(data);
      setStep(2);
    } catch (err) {
      console.error('Generate OTP Error:', err);
      if (err.message.includes('CORS') || err.message.includes('Failed to fetch')) {
        setError('CORS Error: Please set up a proxy server or contact the backend team to enable CORS for your domain.');
      } else {
        setError(err.message || 'Failed to generate OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleValidateOTP = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    if (otp.length < 4) {
      setError('Please enter a valid OTP');
      return;
    }

    setValidatingOtp(true);
    setError(null);
    setValidateResponse(null);

    try {
      const data = await makeAPICall('validate_otp', {
        email_id: email,
        otp: otp
      });
      setValidateResponse(data);
      setStep(3);
    } catch (err) {
      console.error('Validate OTP Error:', err);
      if (err.message.includes('CORS') || err.message.includes('Failed to fetch')) {
        setError('CORS Error: Please set up a proxy server or contact the backend team to enable CORS for your domain.');
      } else {
        setError(err.message || 'Failed to validate OTP. Please try again.');
      }
    } finally {
      setValidatingOtp(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }

    if (!confirmPassword) {
      setError('Please confirm your password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordErrors = validatePasswordStrength(newPassword);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join('. '));
      return;
    }

    setResettingPassword(true);
    setError(null);
    setResetResponse(null);

    try {
      const data = await makeAPICall('reset_password', {
        email_id: email,
        new_password: newPassword
      });
      setResetResponse(data);
    } catch (err) {
      console.error('Reset Password Error:', err);
      if (err.message.includes('CORS') || err.message.includes('Failed to fetch')) {
        setError('CORS Error: Please set up a proxy server or contact the backend team to enable CORS for your domain.');
      } else {
        setError(err.message || 'Failed to reset password. Please try again.');
      }
    } finally {
      setResettingPassword(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setGenerateResponse(null);
    setValidateResponse(null);
    setResetResponse(null);
    setError(null);
    setStep(1);
  };

  const handleBackToStep = (targetStep) => {
    setError(null);
    if (targetStep === 1) {
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setValidateResponse(null);
      setResetResponse(null);
      setStep(1);
    } else if (targetStep === 2) {
      setNewPassword('');
      setConfirmPassword('');
      setResetResponse(null);
      setStep(2);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Generate OTP';
      case 2: return 'Validate OTP';
      case 3: return 'Reset Password';
      default: return 'Reset Password';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return 'Enter your email address to receive an OTP';
      case 2: return `Enter the OTP sent to ${email}`;
      case 3: return 'Create a new password for your account';
      default: return '';
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 1: return <Mail className="text-pink-600" size={24} />;
      case 2: return <Key className="text-pink-600" size={24} />;
      case 3: return <Lock className="text-pink-600" size={24} />;
      default: return <Mail className="text-pink-600" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-pink-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            {getStepIcon()}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {getStepTitle()}
          </h1>
          <p className="text-gray-600">
            {getStepDescription()}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNum === step
                      ? 'bg-pink-600 text-white'
                      : stepNum < step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNum < step ? <CheckCircle size={16} /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      stepNum < step ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                  disabled={loading}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerateOTP()}
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <button
              onClick={handleGenerateOTP}
              disabled={loading || !email}
              className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating OTP...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Generate OTP
                </>
              )}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors text-center text-lg tracking-widest"
                  disabled={validatingOtp}
                  onKeyPress={(e) => e.key === 'Enter' && handleValidateOTP()}
                  maxLength={6}
                />
                <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleBackToStep(1)}
                disabled={validatingOtp}
                className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={18} />
                Back
              </button>
              
              <button
                onClick={handleValidateOTP}
                disabled={validatingOtp || !otp}
                className="flex-1 bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {validatingOtp ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Validating...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Validate OTP
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                  disabled={resettingPassword}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                  disabled={resettingPassword}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Contains uppercase and lowercase letters</li>
                <li>• Contains at least one number</li>
                <li>• Contains at least one special character</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleBackToStep(2)}
                disabled={resettingPassword}
                className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={18} />
                Back
              </button>
              
              <button
                onClick={handleResetPassword}
                disabled={resettingPassword || !newPassword || !confirmPassword}
                className="flex-1 bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {resettingPassword ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Resetting Password...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Reset Password
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Error Display with CORS-specific help */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle size={18} />
              <span className="font-medium">Error</span>
            </div>
            <p className="text-red-700 mt-1 text-sm">{error}</p>
            {error.includes('CORS') && (
              <div className="mt-3 text-sm text-red-600">
                <p className="font-medium">To fix CORS issues:</p>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                  <li>Add the Vite proxy configuration shown above</li>
                  <li>Restart your development server</li>
                  <li>Or ask your backend team to add CORS headers</li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Success Messages */}
        {generateResponse && step >= 2 && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <CheckCircle size={18} />
              <span className="font-medium">OTP Generated Successfully</span>
            </div>
            <p className="text-sm text-green-700">OTP has been sent to your email.</p>
          </div>
        )}

        {validateResponse && step >= 3 && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <CheckCircle size={18} />
              <span className="font-medium">OTP Validated Successfully</span>
            </div>
            <p className="text-sm text-green-700">You can now reset your password.</p>
          </div>
        )}

        {resetResponse && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <CheckCircle size={18} />
              <span className="font-medium">Password Reset Successfully!</span>
            </div>
            <p className="text-sm text-green-700">Your password has been reset successfully. You can now log in with your new password.</p>
          </div>
        )}

        {/* Start Over Button */}
        {(generateResponse || validateResponse || resetResponse || error) && (
          <button
            onClick={handleReset}
            className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Start Over
          </button>
        )}

        {/* Environment Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Environment: {import.meta.env.DEV ? 'Development' : 'Production'}
          </p>
          <p className="text-xs text-gray-500">
            {step === 1 && 'API: fbts.api.auth.generate_otp'}
            {step === 2 && 'API: fbts.api.auth.validate_otp'}
            {step === 3 && 'API: fbts.api.auth.reset_password'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;