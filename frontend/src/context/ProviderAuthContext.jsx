import { createContext, useState, useContext, useEffect } from 'react';
import ms from 'ms'; // Make sure to install this package

// Create a Context for the auth
const AuthContext = createContext();

// Custom hook to consume the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  // Initialize authToken from localStorage with expiration check
  const [authToken, setAuthToken] = useState(() => {
    const saved = localStorage.getItem("x-provider");
    if (saved) {
      const { token, expiry } = JSON.parse(saved);
      if (expiry > Date.now()) {
        return token;
      } else {
        localStorage.removeItem("x-provider");
      }
    }
    return null;
  });

  // Update localStorage when authToken changes
  useEffect(() => {
    if (authToken) {
      const expiry = Date.now() + ms('1d');  // Token expires in 1 day
      localStorage.setItem("x-provider", JSON.stringify({ token: authToken, expiry }));
    } else {
      localStorage.removeItem("x-provider");
    }
  }, [authToken]);

  // Logout function
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("x-provider");
  };

  // Check if the token is expired
  const isTokenExpired = () => {
    const saved = localStorage.getItem("x-provider");
    if (saved) {
      const { expiry } = JSON.parse(saved);
      return expiry <= Date.now();
    }
    return true;
  };

  // Automatically log out if the token is expired
  useEffect(() => {
    if (authToken && isTokenExpired()) {
      logout();
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
