import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const portfolioId = localStorage.getItem('portfolioId');
        
        if (token && email) {
          // Create user object based on email
          const userData = {
            email: email,
            ownerId: email, // Use email as ownerId for portfolio fetching
            role: email === 'admin@test.com' ? 'admin' : 'customer',
            portfolioId: portfolioId
          };
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Simple validation for demo credentials
      if (email === 'admin@test.com' && password === 'Admin@123') {
        const userData = {
          email: email,
          ownerId: email,
          role: 'admin',
          portfolioId: 'admin@test.com'
        };
        
        localStorage.setItem('token', 'demo-token-admin');
        localStorage.setItem('email', email);
        localStorage.setItem('portfolioId', 'admin@test.com');
        
        setUser(userData);
        return { success: true, user: userData };
      } else if (email === 'cust@test.com' && password === 'Cust@123') {
        const userData = {
          email: email,
          ownerId: email,
          role: 'customer',
          portfolioId: 'cust@test.com'
        };
        
        localStorage.setItem('token', 'demo-token-customer');
        localStorage.setItem('email', email);
        localStorage.setItem('portfolioId', 'cust@test.com');
        
        setUser(userData);
        return { success: true, user: userData };
      } else {
        return { 
          success: false, 
          error: 'Invalid credentials. Please use the demo credentials provided.' 
        };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('portfolioId');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
