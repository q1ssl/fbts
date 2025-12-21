// import api from "./api";

// // Get last 10 attendance records
// export const fetchAttendanceRecords = async (employeeId) => {
//   try {
//     const res = await api.post(
//       "/api/method/fbts.api.work_duration.get_last_10_attendance_records",
//       { employee: employeeId }
//     );
//     return res.data.message?.records || [];
//   } catch (error) {
//     console.error('Error fetching attendance records:', error);
//     throw error;
//   }
// };

// // Get employee-wise holidays
// export const fetchHolidayList = async (employeeId) => {
//   try {
//     const res = await api.post(
//       "/api/method/fbts.api.holiday.get_employee_wise_holidays",
//       { employee: employeeId }
//     );
//     const data = res.data.message || [];
//     return Array.isArray(data) && data.length
//       ? data[0].holidays || []
//       : [];
//   } catch (error) {
//     console.error('Error fetching holiday list:', error);
//     throw error;
//   }
// };

// // Get today's birthdays
// export const fetchTodayBirthdays = async () => {
//   try {
//     const res = await api.post(
//       "/api/method/fbts.api.birthday.get_today_birthdays"
//     );
//     const msg = res.data.message || {};
//     return {
//       employees: msg.employees || [],
//       count: msg.count || 0,
//     };
//   } catch (error) {
//     console.error('Error fetching today birthdays:', error);
//     throw error;
//   }
// };

// // Get leave balance
// export const fetchLeaveBalance = async (employeeId) => {
//   try {
//     const res = await api.post(
//       "/api/method/fbts.api.leave_balance.get_employee_leave_balance",
//       { employee: employeeId }
//     );
//     return res.data.message || {};
//   } catch (error) {
//     console.error('Error fetching leave balance:', error);
//     throw error;
//   }
// };

// // Create leave application
// export const createLeaveApplication = async (payload) => {
//   try {
//     const res = await api.post(
//       "/api/method/fbts.api.flamingoApi.create_leave_application",
//       { data: JSON.stringify(payload) }
//     );
//     return res.data.message || {};
//   } catch (error) {
//     console.error('Error creating leave application:', error);
//     throw error;
//   }
// };

// // Get monthly attendance/holidays
// export const fetchMonthlyAttendance = async (employeeId, month) => {
//   try {
//     const res = await api.post(
//       "/api/method/fbts.api.monthly.get_employee_holiday_names",
//       {
//         employee: employeeId,
//         month: month.toLowerCase()
//       }
//     );
//     return res.data.message || {};
//   } catch (error) {
//     console.error('Error fetching monthly attendance:', error);
//     throw error;
//   }
// };

// // Get employee leave list (for individual employee)
// export const fetchEmployeeLeaveList = async (employeeId) => {
//   try {
//     console.log('Fetching employee leave list for:', employeeId);
    
//     // Try GET request first
//     const res = await api.get(
//       `/api/method/fbts.api.leave_request.get_emp_leave_list?employee=${employeeId}`
//     );
    
//     console.log('Employee leave list response:', res.data);
//     return res.data.message || [];
    
//   } catch (getError) {
//     console.log('GET request failed, trying POST:', getError.message);
    
//     try {
//       const res = await api.post(
//         "/api/method/fbts.api.leave_request.get_emp_leave_list",
//         { employee: employeeId }
//       );
      
//       console.log('POST fallback successful:', res.data);
//       return res.data.message || [];
      
//     } catch (postError) {
//       console.error('Both GET and POST requests failed for employee leave list:', {
//         getError: getError.message,
//         postError: postError.message,
//         employeeId
//       });
//       throw postError;
//     }
//   }
// };

// // Get team leave requests (for managers with leave_approver parameter)
// export const fetchTeamLeaveRequests = async (leaveApprover = "abdul@gmail.com") => {
//   try {
//     console.log('Fetching team leave requests for approver:', leaveApprover);
    
//     const res = await api.post(
//       "/api/method/fbts.api.leave_request.get_leave_applications",
//       { leave_approver: leaveApprover }
//     );
    
//     console.log('Team leave requests response:', res.data);
//     return res.data.message || [];
    
//   } catch (error) {
//     console.error('Error fetching team leave requests:', {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data,
//       approver: leaveApprover
//     });
//     throw error;
//   }
// };

// // Get current user email for leave approver
// export const getCurrentUserEmail = () => {
//   return localStorage.getItem('user_email') || 
//          localStorage.getItem('email') || 
//          localStorage.getItem('username') || 
//          "abdul@gmail.com";
// };

// // Enhanced team leave requests with dynamic approver detection
// export const fetchTeamLeaveRequestsForCurrentUser = async () => {
//   const currentUserEmail = getCurrentUserEmail();
//   return fetchTeamLeaveRequests(currentUserEmail);
// };

// // Debug function to test API connectivity
// export const testAPIConnectivity = async () => {
//   const results = {};
  
//   try {
//     // Test birthday API (guest endpoint)
//     console.log('Testing birthday API...');
//     const birthdayResult = await fetchTodayBirthdays();
//     results.birthday = { success: true, data: birthdayResult };
//   } catch (error) {
//     results.birthday = { success: false, error: error.message };
//   }
  
//   try {
//     // Test leave balance API
//     const employeeId = localStorage.getItem('employee_id') || 'FI-00001';
//     console.log('Testing leave balance API...');
//     const balanceResult = await fetchLeaveBalance(employeeId);
//     results.leaveBalance = { success: true, data: balanceResult };
//   } catch (error) {
//     results.leaveBalance = { success: false, error: error.message };
//   }
  
//   return results;
// };
















import api from "../../api"; 
// Get last 10 attendance records
export const fetchAttendanceRecords = async (employeeId) => {
  try {
    const result = await api.getLastTenAttendanceRecords(employeeId);
    return result || [];
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    throw error;
  }
};
 
// Get employee-wise holidays
export const fetchHolidayList = async (employeeId) => {
  try {
    const result = await api.getEmployeeHolidays(employeeId);
    const data = result || [];
    return Array.isArray(data) && data.length
      ? data[0].holidays || []
      : [];
  } catch (error) {
    console.error('Error fetching holiday list:', error);
    throw error;
  }
};
 
// Get today's birthdays
export const fetchTodayBirthdays = async () => {
  try {
    const result = await api.getTodayBirthdays();
    const msg = result || {};
    return {
      employees: msg.employees || [],
      count: msg.count || 0,
    };
  } catch (error) {
    console.error('Error fetching today birthdays:', error);
    throw error;
  }
};
 
// Get leave balance
export const fetchLeaveBalance = async (employeeId) => {
  try {
    const result = await api.getEmployeeLeaveBalance(employeeId);
    return result || {};
  } catch (error) {
    console.error('Error fetching leave balance:', error);
    throw error;
  }
};
 
// Create leave application - ENHANCED VERSION WITH DETAILED LOGGING
export const createLeaveApplication = async (payload) => {
  try {
    console.log('=== CREATE LEAVE APPLICATION API CALL START ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Payload received:', payload);
    console.log('Employee ID:', payload.employee);
    console.log('API endpoint: /api/method/fbts.api.flamingoApi.create_leave_application');
   
    // Validate payload before sending
    const requiredFields = ['employee', 'leave_type', 'from_date', 'to_date', 'description'];
    const missingFields = requiredFields.filter(field => !payload[field]);
   
    if (missingFields.length > 0) {
      console.error('❌ Payload validation failed - missing fields:', missingFields);
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
   
    // Ensure no_of_days is a number
    if (payload.no_of_days) {
      const originalNoOfDays = payload.no_of_days;
      payload.no_of_days = parseInt(payload.no_of_days) || 1;
      console.log(`Converted no_of_days from "${originalNoOfDays}" to ${payload.no_of_days}`);
    } else {
      payload.no_of_days = 1;
      console.log('Set default no_of_days to 1');
    }
   
    // Validate dates
    const fromDate = new Date(payload.from_date);
    const toDate = new Date(payload.to_date);
   
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      console.error('❌ Invalid date format detected');
      throw new Error('Invalid date format in from_date or to_date');
    }
   
    if (fromDate > toDate) {
      console.error('❌ From date is after to date');
      throw new Error('from_date cannot be after to_date');
    }
   
    console.log('✅ Payload validation passed');
    console.log('Validated payload:', payload);
   
    console.log('🚀 Making API call...');
    console.log('Request data being sent:', payload);
   
    const apiResponse = await api.createLeaveApplication(payload);
   
    console.log('📥 API response received:', apiResponse);
   
    // Process response - frappe-js-sdk returns data directly
    const result = apiResponse || {};
    console.log('📋 Processed result:', result);
   
    // Check for errors in response
    if (result.error || result.exc) {
      console.error('❌ API returned error in response:', {
        error: result.error,
        exc: result.exc,
        message: result.message
      });
      throw new Error(result.message || result.error || 'API returned error');
    }
   
    console.log('🎉 Leave application API call completed successfully');
    console.log('=== CREATE LEAVE APPLICATION API CALL END ===');
   
    return result;
   
  } catch (error) {
    console.log('=== CREATE LEAVE APPLICATION ERROR START ===');
    console.log('❌ Error creating leave application');
    console.log('Error type:', error.constructor.name);
    console.log('Error message:', error.message);
    console.log('Error stack:', error.stack);
   
    if (error.response) {
      console.log('📥 Error response details:');
      console.log('  Status:', error.response.status);
      console.log('  Status Text:', error.response.statusText);
      console.log('  Headers:', error.response.headers);
      console.log('  Data:', error.response.data);
     
      // Try to extract meaningful error message from response
      let errorMessage = error.message;
      if (error.response.data) {
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      }
     
      console.log('📝 Extracted error message:', errorMessage);
     
      // Create enhanced error
      const enhancedError = new Error(errorMessage);
      enhancedError.status = error.response.status;
      enhancedError.response = error.response;
      enhancedError.originalError = error;
     
      console.log('=== CREATE LEAVE APPLICATION ERROR END ===');
      throw enhancedError;
     
    } else if (error.request) {
      console.log('📤 Request was made but no response received:');
      console.log('  Request:', error.request);
      console.log('  Possible network issue or server down');
     
    } else {
      console.log('⚙️ Error in request setup:', error.message);
    }
   
    console.log('🔍 Failed payload for debugging:', payload);
    console.log('=== CREATE LEAVE APPLICATION ERROR END ===');
    throw error;
  }
};
 
// Get monthly attendance/holidays
export const fetchMonthlyAttendance = async (employeeId, month) => {
  try {
    const result = await api.post(
      "fbts.api.monthly.get_employee_holiday_names",
      {
        employee: employeeId,
        month: month.toLowerCase()
      }
    );
    return result || {};
  } catch (error) {
    console.error('Error fetching monthly attendance:', error);
    throw error;
  }
};
 
// Get daily attendance for a specific date
export const fetchDailyAttendance = async (employeeId, date) => {
  try {
    console.log('Fetching daily attendance for employee:', employeeId, 'Date:', date);
    const result = await api.get(
     "fbts.api.monthly.get_employee_holiday_names",
      {
        employee_id: employeeId,
        date: date
      }
    );
    console.log('Daily attendance response:', result);
    return result || {};
  } catch (error) {
    console.error('Error fetching daily attendance:', error);
    throw error;
  }
};


// Get employee leave list (for individual employee)
export const fetchEmployeeLeaveList = async (employeeId) => {
  try {
    console.log('Fetching employee leave list for:', employeeId);
   
    const result = await api.getEmployeeLeaveList(employeeId);
   
    console.log('Employee leave list response:', result);
    return result || [];
     
  } catch (error) {
    console.error('Error fetching employee leave list:', error);
    throw error;
  }
};
 
// Get team leave requests (for managers with leave_approver parameter)
export const fetchTeamLeaveRequests = async (leaveApprover = "abdul@gmail.com") => {
  try {
    console.log('Fetching team leave requests for approver:', leaveApprover);
   
    const res = await api.post(
      "/api/method/fbts.api.leave_request.get_leave_applications",
      { leave_approver: leaveApprover }
    );
   
    console.log('Team leave requests response:', res.data);
    return res.data.message || [];
   
  } catch (error) {
    console.error('Error fetching team leave requests:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      approver: leaveApprover
    });
    throw error;
  }
};
 
// Get current user email for leave approver
export const getCurrentUserEmail = () => {
  return localStorage.getItem('user_email') ||
         localStorage.getItem('email') ||
         localStorage.getItem('username') ||
         "abdul@gmail.com";
};
 
// Enhanced team leave requests with dynamic approver detection
export const fetchTeamLeaveRequestsForCurrentUser = async () => {
  const currentUserEmail = getCurrentUserEmail();
  return fetchTeamLeaveRequests(currentUserEmail);
};
 
// Debug function to test API connectivity
export const testAPIConnectivity = async () => {
  console.log('=== API CONNECTIVITY TEST START ===');
  const results = {};
 
  try {
    // Test birthday API (guest endpoint)
    console.log('🧪 Testing birthday API...');
    const birthdayResult = await fetchTodayBirthdays();
    results.birthday = { success: true, data: birthdayResult };
    console.log('✅ Birthday API test successful');
  } catch (error) {
    console.log('❌ Birthday API test failed:', error.message);
    results.birthday = { success: false, error: error.message };
  }
 
  try {
    // Test leave balance API
    const employeeId = localStorage.getItem('employee_id') || 'FI-00001';
    console.log('🧪 Testing leave balance API for employee:', employeeId);
    const balanceResult = await fetchLeaveBalance(employeeId);
    results.leaveBalance = { success: true, data: balanceResult };
    console.log('✅ Leave balance API test successful');
  } catch (error) {
    console.log('❌ Leave balance API test failed:', error.message);
    results.leaveBalance = { success: false, error: error.message };
  }
 
  try {
    // Test create leave application with dummy data
    const employeeId = localStorage.getItem('employee_id');
    if (employeeId) {
      console.log('🧪 Testing create leave application API...');
      console.log('⚠️ NOTE: This will create an actual leave application for testing');
     
      const testPayload = {
        employee: employeeId,
        leave_type: "Annual Leave",
        from_date: "2024-12-01",
        to_date: "2024-12-01",
        description: "API connectivity test - please ignore this leave request",
        no_of_days: 1,
      };
     
      // Uncomment the line below to actually test the create leave API
      // const leaveResult = await createLeaveApplication(testPayload);
      // results.createLeave = { success: true, data: leaveResult };
     
      results.createLeave = {
        success: false,
        error: "Test skipped to avoid creating actual leave request",
        note: "Uncomment the test in dashboardApi.js to run this test"
      };
      console.log('⚠️ Create leave API test skipped to avoid creating actual leave');
    } else {
      results.createLeave = { success: false, error: "No employee_id found in localStorage" };
      console.log('❌ Create leave API test failed: No employee_id');
    }
  } catch (error) {
    console.log('❌ Create leave API test failed:', error.message);
    results.createLeave = { success: false, error: error.message };
  }
 
  console.log('📋 API connectivity test results:', results);
  console.log('=== API CONNECTIVITY TEST END ===');
  return results;
};
 
// Helper function to validate leave application payload
export const validateLeavePayload = (payload) => {
  const errors = [];
  const requiredFields = ['employee', 'leave_type', 'from_date', 'to_date', 'description'];
 
  // Check required fields
  requiredFields.forEach(field => {
    if (!payload[field]) {
      errors.push(`${field} is required`);
    }
  });
 
  // Validate dates
  if (payload.from_date && payload.to_date) {
    const fromDate = new Date(payload.from_date);
    const toDate = new Date(payload.to_date);
   
    if (isNaN(fromDate.getTime())) {
      errors.push('from_date is not a valid date');
    }
   
    if (isNaN(toDate.getTime())) {
      errors.push('to_date is not a valid date');
    }
   
    if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime()) && fromDate > toDate) {
      errors.push('from_date cannot be after to_date');
    }
  }
 
  // Validate description length
  if (payload.description && payload.description.length < 10) {
    errors.push('description must be at least 10 characters long');
  }
 
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};



// Add these functions to your dashboardApi.jsx file
export const generateOTP = async (emailId) => {
  try {
    const result = await api.post(
      "fbts.api.auth.generate_otp",
      { email_id: emailId }
    );
    return result;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};

export const validateOTP = async (emailId, otp) => {
  try {
    const result = await api.post(
      "fbts.api.auth.validate_otp",
      { 
        email_id: emailId,
        otp: otp 
      }
    );
    return result;
  } catch (error) {
    console.error('Error validating OTP:', error);
    throw error;
  }
};



// Add this function to your existing dashboardApi.jsx file
export const resetPassword = async (emailId, newPassword) => {
  try {
    console.log('Resetting password for email:', emailId);
    
    const result = await api.post(
      "fbts.api.auth.reset_password",
      { 
        email_id: emailId,
        new_password: newPassword 
      }
    );
    
    console.log('Password reset response:', result);
    return result;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};