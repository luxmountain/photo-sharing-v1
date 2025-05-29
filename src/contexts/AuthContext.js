import React, { createContext, useState, useContext, useCallback } from 'react';
import models from '../modelData/models';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback(async (loginName, password) => {
    try {
      const userData = await models.login(loginName, password);
      if (!userData) {
        return { success: false, error: 'Invalid login name or password' };
      }
      setCurrentUser(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An error occurred during login'
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const result = await models.logout();
      if (result?.success) {
        setCurrentUser(null);
        return { success: true };
      }
      return { success: false, error: 'Logout failed' };
    } catch (error) {
      return { success: false, error: 'Failed to logout' };
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const response = await models.register(userData);
      if (!response) throw new Error('Registration failed');
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Registration failed'
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
