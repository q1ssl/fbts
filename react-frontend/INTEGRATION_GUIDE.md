# Frappe JS SDK Integration Guide

## 🎉 Integration Complete!

Your FBTS React frontend is now successfully integrated with your Frappe backend using the frappe-js-sdk! Here's what has been implemented:

## 📁 New File Structure

```
src/
├── services/
│   └── frappeApi.js          # Main API service using frappe-js-sdk
├── contexts/
│   └── AuthContext.jsx       # React context for authentication
├── config/
│   └── environment.js        # Environment configuration
└── Components/
    └── Examples/
        └── CheckinExample.jsx # Example component showing new API usage
```

## 🔧 Key Features Implemented

### 1. **Environment Configuration**
- **Development**: `http://localhost:8000` (your local Frappe server)
- **Production**: `https://fbts.flamingohrms.com`
- Automatically switches based on `import.meta.env.MODE`

### 2. **Centralized API Service** (`src/services/frappeApi.js`)
- ✅ **Authentication**: Login/logout with token management
- ✅ **Attendance**: Check-in/check-out, attendance records
- ✅ **Leave Management**: Create applications, get leave lists
- ✅ **Employee Data**: Leave balances, salary slips, holidays
- ✅ **Document Operations**: CRUD operations for any Frappe doctype
- ✅ **File Upload**: Support for uploading files to Frappe
- ✅ **Generic API Calls**: Call any Frappe method

### 3. **React Authentication Context** (`src/contexts/AuthContext.jsx`)
- 🔐 User session management
- 🔄 Automatic session restoration
- 🎯 Protected route wrapper
- 📱 Reactive authentication state

### 4. **Updated Components**
- ✅ Login component uses new authentication system
- ✅ App.jsx wrapped with AuthProvider
- ✅ Example component showing API migration pattern

## 🚀 How to Use the New API Service

### Basic Usage
```javascript
import apiService from '../services/frappeApi';

// Authentication
const result = await apiService.login(username, password);

// Check-in
const checkinResult = await apiService.createCheckin(employeeId);

// Get employee data
const leaveBalance = await apiService.getEmployeeLeaveBalance(employeeId);

// Generic API call
const customResult = await apiService.callApi('your.custom.method', {param: 'value'});
```

### Using Authentication Context
```javascript
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome {user.employee_name}!</div>;
};
```

## 📊 API Methods Available

### Authentication
- `login(username, password)` - Login user
- `logout()` - Logout user
- `isAuthenticated()` - Check auth status
- `getCurrentUser()` - Get user data

### Attendance & Check-in
- `createCheckin(employee, lat, lng)` - Create check-in/out
- `getLastCheckinInfo(employee)` - Get last check-in
- `getLastTenAttendanceRecords(employee)` - Get attendance history

### Leave Management
- `createLeaveApplication(data)` - Create leave application
- `getEmployeeLeaveList(employee)` - Get employee leaves
- `getEmployeeLeaveBalance(employee)` - Get leave balances

### Employee Data
- `getEmployeeSalarySlips(employee)` - Get salary slips
- `getEmployeeHolidays(employee)` - Get holidays
- `getTodayBirthdays()` - Get today's birthdays

### Document Operations (Frappe Core)
- `getDoc(doctype, name)` - Get single document
- `createDoc(doctype, data)` - Create document
- `updateDoc(doctype, name, data)` - Update document
- `deleteDoc(doctype, name)` - Delete document
- `getDocList(doctype, options)` - Get document list

### File Operations
- `uploadFile(file, doctype, docname, folder)` - Upload files

### Generic
- `callApi(method, args, httpMethod)` - Call any Frappe method

## 🔄 Migration Pattern

### Old Way (Direct Axios)
```javascript
// Old way
const response = await api.post("/api/method/fbts.api.flamingoApi.create_checkin", {
  employee: employeeId,
  latitude: lat,
  longitude: lng
});
```

### New Way (Frappe JS SDK)
```javascript
// New way
const result = await apiService.createCheckin(employeeId, lat, lng);
if (result.success) {
  console.log('Success:', result.data);
} else {
  console.error('Error:', result.message);
}
```

## 🌍 Environment Switching

### Development (Default)
- Uses `http://localhost:8000`
- Automatically detected when running `npm run dev`

### Production
- Uses `https://fbts.flamingohrms.com`
- Automatically used when building for production

### Manual Override
```javascript
import { config } from '../config/environment';
// Use config.development or config.production explicitly
```

## ✅ Benefits of This Integration

1. **🔒 Better Authentication**: Token-based auth with automatic renewal
2. **🏗️ Type Safety**: Structured responses with success/error handling
3. **🔄 Consistency**: All API calls follow the same pattern
4. **🎯 Error Handling**: Standardized error responses
5. **📱 React Integration**: Built-in hooks and context providers
6. **🚀 Future-Proof**: Easy to extend with new Frappe features
7. **🔧 Development**: Environment-aware configuration

## 🧪 Testing Your Integration

1. **Start Frappe Backend**: Make sure your Frappe server is running on `http://localhost:8000`
2. **Start React Frontend**: Already running on `http://localhost:5173`
3. **Test Login**: Use your Frappe credentials to login
4. **Test API Calls**: Check browser console for API responses

## 🔗 Next Steps

1. **Migrate Components**: Update your existing components to use the new API service
2. **Add Error Boundaries**: Implement React error boundaries for better UX
3. **Add Loading States**: Use the built-in loading states from the auth context
4. **Extend API Service**: Add more custom methods as needed
5. **Add Tests**: Write unit tests for your API service methods

Your integration is complete and ready for development! 🎉