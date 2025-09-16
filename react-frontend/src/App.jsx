import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./Components/Login/Login";
import "./index.css";
import MainLayout from "./Components/Layout/MainLayout";
import ForgetPassword from "./Components/Login/ForgetPassword";
import ApiTest from "./Components/Test/ApiTest";
import EmployeeDataExample from "./Components/Examples/EmployeeDataExample";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login page */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />

          {/* API Test page */}
          <Route path="/test" element={<ApiTest />} />

          {/* Employee Data Example - Frappe DocType Guide */}
          <Route path="/examples/employee-data" element={<EmployeeDataExample />} />

          {/* All dashboard routes */}
          <Route path="/dashboard/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

