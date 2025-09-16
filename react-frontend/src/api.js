import { FrappeApp } from 'frappe-js-sdk';

// Initialize Frappe App with cookie-based authentication for SSO
const frappe = new FrappeApp("http://localhost:8000", {
  useToken: false, // Use cookie-based authentication for SSO
  type: "token"    // This won't be used since useToken is false
});

// API service class that wraps frappe-js-sdk
class ApiService {
  constructor() {
    this.frappe = frappe;
    this.auth = frappe.auth();
    this.db = frappe.db();
    this.call = frappe.call();
    this.file = frappe.file();
  }

  // Authentication methods
  async login(username, password) {
    try {
      console.log('🔐 Attempting login with frappe-js-sdk (cookie-based)...');
      const response = await this.auth.loginWithUsernamePassword({ 
        username, 
        password 
      });
      
      console.log('✅ Login response:', response);
      
      // With cookie-based auth, no need to manually store tokens
      // The session cookie will be automatically handled by the browser
      // Store user info for the frontend
      if (response && response.full_name) {
        localStorage.setItem('user_logged_in', 'true');
        localStorage.setItem('employee_name', response.full_name);
        localStorage.setItem('employee_id', response.employee_id || response.name);
        localStorage.setItem('username', username);
      }
      
      return response;
    } catch (error) {
      console.error('🚨 Login error:', error);
      throw error;
    }
  }

  async logout() {
    try {
      console.log('🔴 Logging out from Frappe backend...');
      await this.auth.logout();
      
      // Clear frontend user info
      localStorage.removeItem('user_logged_in');
      localStorage.removeItem('employee_name');
      localStorage.removeItem('employee_id');
      localStorage.removeItem('username');
      // Remove legacy token if it exists
      localStorage.removeItem('access_token');
      
      console.log('✅ Logout successful - session cleared from both frontend and backend');
      return { success: true };
    } catch (error) {
      // Clear frontend state even if API logout fails
      localStorage.removeItem('user_logged_in');
      localStorage.removeItem('employee_name');
      localStorage.removeItem('employee_id');
      localStorage.removeItem('username');
      localStorage.removeItem('access_token');
      
      console.warn('⚠️ API logout failed, but cleared frontend state:', error.message);
      throw error;
    }
  }

  async getLoggedInUser() {
    try {
      return await this.auth.getLoggedInUser();
    } catch (error) {
      console.error('Error getting logged in user:', error);
      throw error;
    }
  }

  async forgetPassword(email) {
    try {
      return await this.auth.forgetPassword(email);
    } catch (error) {
      console.error('Error in forget password:', error);
      throw error;
    }
  }

  // Database methods
  async getDoc(doctype, name) {
    try {
      return await this.db.getDoc(doctype, name);
    } catch (error) {
      console.error(`Error fetching document ${doctype}/${name}:`, error);
      throw error;
    }
  }

  async getDocList(doctype, options = {}) {
    try {
      return await this.db.getDocList(doctype, options);
    } catch (error) {
      console.error(`Error fetching document list for ${doctype}:`, error);
      throw error;
    }
  }

  async createDoc(doctype, data) {
    try {
      return await this.db.createDoc(doctype, data);
    } catch (error) {
      console.error(`Error creating document for ${doctype}:`, error);
      throw error;
    }
  }

  async updateDoc(doctype, name, data) {
    try {
      return await this.db.updateDoc(doctype, name, data);
    } catch (error) {
      console.error(`Error updating document ${doctype}/${name}:`, error);
      throw error;
    }
  }

  async deleteDoc(doctype, name) {
    try {
      return await this.db.deleteDoc(doctype, name);
    } catch (error) {
      console.error(`Error deleting document ${doctype}/${name}:`, error);
      throw error;
    }
  }

  async getCount(doctype, filters = [], cache = false, debug = false) {
    try {
      return await this.db.getCount(doctype, filters, cache, debug);
    } catch (error) {
      console.error(`Error getting count for ${doctype}:`, error);
      throw error;
    }
  }

  async getValue(doctype, fieldname, filters = []) {
    try {
      return await this.db.getValue(doctype, fieldname, filters);
    } catch (error) {
      console.error(`Error getting value for ${doctype}.${fieldname}:`, error);
      throw error;
    }
  }

  async setValue(doctype, name, fieldname, value) {
    try {
      return await this.db.setValue(doctype, name, fieldname, value);
    } catch (error) {
      console.error(`Error setting value for ${doctype}/${name}.${fieldname}:`, error);
      throw error;
    }
  }

  // API call methods
  async get(method, params = {}) {
    try {
      return await this.call.get(method, params);
    } catch (error) {
      console.error(`Error in GET request to ${method}:`, error);
      throw error;
    }
  }

  async post(method, params = {}) {
    try {
      return await this.call.post(method, params);
    } catch (error) {
      console.error(`Error in POST request to ${method}:`, error);
      throw error;
    }
  }

  async put(method, params = {}) {
    try {
      return await this.call.put(method, params);
    } catch (error) {
      console.error(`Error in PUT request to ${method}:`, error);
      throw error;
    }
  }

  async delete(method, params = {}) {
    try {
      return await this.call.delete(method, params);
    } catch (error) {
      console.error(`Error in DELETE request to ${method}:`, error);
      throw error;
    }
  }

  // File upload method
  async uploadFile(file, fileArgs = {}, onProgress = null) {
    try {
      return await this.file.uploadFile(file, fileArgs, onProgress);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Custom API methods for your application
  async getLastTenAttendanceRecords(employee) {
    return this.get('fbts.api.work_duration.get_last_10_attendance_records', { employee });
  }

  async getLastCheckinInfo(employee) {
    return this.get('fbts.api.get_last_checkin_info', { employee });
  }

  async createCheckin(employee, latitude = 22.5738752, longitude = 88.3785728) {
    return this.post('fbts.api.flamingoApi.create_checkin', {
      employee,
      latitude,
      longitude
    });
  }

  async getEmployeeHolidays(employee) {
    return this.get('fbts.api.holiday.get_employee_wise_holidays', { employee });
  }

  async getEmployeeLeaveBalance(employee) {
    return this.get('fbts.api.leave_balance.get_employee_leave_balance', { employee });
  }

  async getTodayBirthdays() {
    return this.get('fbts.api.birthday.get_today_birthdays');
  }

  async createLeaveApplication(data) {
    return this.post('fbts.api.flamingoApi.create_leave_application', data);
  }

  async getEmployeeSalarySlips(employee) {
    return this.get('fbts.api.flamingoApi.get_employee_salary_slips', { employee });
  }

  async getEmployeeLeaveList(employee) {
    return this.get('fbts.api.leave_request.get_emp_leave_list', { employee });
  }

  async getEmployees() {
    return this.get('fbts.api.flamingoApi.get_employees');
  }

  async getLeaveApplications() {
    return this.get('fbts.api.leave_request.get_leave_applications');
  }

  // Utility methods
  isAuthenticated() {
    return localStorage.getItem('user_logged_in') === 'true';
  }

  getCurrentUser() {
    return {
      user_logged_in: localStorage.getItem('user_logged_in'),
      employee_name: localStorage.getItem('employee_name'),
      employee_id: localStorage.getItem('employee_id'),
      username: localStorage.getItem('username')
    };
  }
}

// Create and export the service instance
const api = new ApiService();
export default api;

// Also export the raw frappe instance for advanced usage
export { frappe };
