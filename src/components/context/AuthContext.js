// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check auth status when app loads
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  };

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
    navigate('/login');
  };

  const hasRole = (requiredRole) => {
    if (!user || !user.role) return false;
    return user.role === requiredRole;
  };

  // Check if user has any of the required roles
  const hasAnyRole = (requiredRoles) => {
    if (!user || !user.role) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        hasRole,
        hasAnyRole,
        checkAuthStatus
      }}
    >
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