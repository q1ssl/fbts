import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/flamingo-logo.png";
import "./LoginPage.css";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, loading, error, isAuthenticated, clearError } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const result = await login(username, password);
    
    if (!result.success) {
      // Error is already handled by the auth context
      console.error('Login failed:', result.message);
    }
    // Success case is handled by auth context and redirect below
  };

  // Clear error when inputs change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error && clearError) {
      clearError();
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error && clearError) {
      clearError();
    }
  };

  // Redirect to dashboard if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="log-container">
      <div className="log-left">
        <div className="log-logo-wrapper">
          <img src={logo} alt="Flamingo Logo" />
        </div>
      </div>

      <div className="log-right">
        <div className="log-form-box">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            {error && <div className="log-error-msg">{error}</div>}

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              className="log-input-field"
              required
            />

            <div className="log-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="log-input-field"
                required
              />
              <button
                type="button"
                className="log-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="log-btn-flex">
              <button
                type="submit"
                disabled={loading}
                className="log-login-button"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="log-links">
              <Link to="/forgetpassword">Forget Password</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;