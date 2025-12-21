import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// Auth context
const AuthContext = createContext();

// Auth actions
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  RESTORE_SESSION: 'RESTORE_SESSION',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null
      };
    
    case AUTH_ACTIONS.RESTORE_SESSION:
      return {
        ...state,
        loading: false,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        error: null
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Initial state
const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = () => {
      const isAuthenticated = api.isAuthenticated();
      const user = isAuthenticated ? api.getCurrentUser() : null;
      
      dispatch({
        type: AUTH_ACTIONS.RESTORE_SESSION,
        payload: {
          isAuthenticated,
          user
        }
      });
    };

    restoreSession();
  }, []);

  // Login function
  const login = async (username, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const result = await api.login(username, password);
      
      // frappe-js-sdk returns user data directly
      if (result && result.full_name) {
        const user = {
          username,
          employee_name: result.full_name,
          employee_id: result.employee_id || result.name,
          user_logged_in: true
        };
        
        // User data is already stored in localStorage by api.login()
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: user
        });
        
        return { success: true };
      } else {
        const errorMessage = 'Invalid login response';
        dispatch({
          type: AUTH_ACTIONS.LOGIN_FAILURE,
          payload: errorMessage
        });
        
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage
      });
      
      return { success: false, message: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.logout();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { success: true };
    } catch (error) {
      // Even if API logout fails, clear local state
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      console.warn('API logout failed, but clearing local state:', error.message);
      return { success: true }; // Return success because we cleared local state
    }
  };

  // Clear error function - memoized to prevent infinite loops
  const clearError = useCallback(() => {
    dispatch({
      type: AUTH_ACTIONS.CLEAR_ERROR
    });
  }, []);

  const value = {
    ...state,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// HOC for protected routes
export const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    return <Component {...props} />;
  };
};

export default AuthContext;