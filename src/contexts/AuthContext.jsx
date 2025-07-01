import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api`;

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token is invalid
        logout();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login with API URL:', `${API_BASE_URL}/auth/login`);
      
      // For demo purposes, if using demo credentials, simulate successful login
      if (email === 'demo@vascularexam.ai' && password === 'Demo123456') {
        console.log('Demo login detected, simulating successful authentication');
        const mockUser = {
          id: 1,
          email: 'demo@vascularexam.ai',
          firstName: 'Demo',
          lastName: 'User',
          username: 'demouser',
          isAdmin: false
        };
        const mockToken = 'demo-jwt-token-' + Date.now();
        
        setToken(mockToken);
        setUser(mockUser);
        localStorage.setItem('token', mockToken);
        return { success: true };
      }
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Login failed:', errorData);
        return { success: false, error: errorData.error || `Server error: ${response.status}` };
      }

      const data = await response.json();
      console.log('Login successful:', data);

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      return { success: true };
    } catch (error) {
      console.error('Login network error:', error);
      
      // Fallback for demo credentials if network fails
      if (email === 'demo@vascularexam.ai' && password === 'Demo123456') {
        console.log('Network failed, using demo fallback');
        const mockUser = {
          id: 1,
          email: 'demo@vascularexam.ai',
          firstName: 'Demo',
          lastName: 'User',
          username: 'demouser',
          isAdmin: false
        };
        const mockToken = 'demo-jwt-token-' + Date.now();
        
        setToken(mockToken);
        setUser(mockUser);
        localStorage.setItem('token', mockToken);
        return { success: true };
      }
      
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    API_BASE_URL,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

