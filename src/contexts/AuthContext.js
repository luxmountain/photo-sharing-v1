import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback(async (loginName, password) => {
    try {
      const response = await axios.post('/admin/login', { 
        login_name: loginName,
        password: password
      });
      setCurrentUser(response.data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.status === 400 
          ? 'Invalid login name or password' 
          : 'An error occurred during login' 
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post('/admin/logout');
      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to logout' };
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const response = await axios.post('/api/user', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Registration failed' 
      };
    }
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    register,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
