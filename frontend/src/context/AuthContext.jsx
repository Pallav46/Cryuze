import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ms from 'ms'; // Make sure to install this package if you haven't

export const AuthContext = createContext();

// Custom hook to consume the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem("x-user");
    if (saved) {
      const { data, expiry } = JSON.parse(saved);
      if (expiry > Date.now()) {
        return data;
      } else {
        localStorage.removeItem("x-user");
      }
    }
    return null;
  });

  // Update localStorage when authUser changes
  useEffect(() => {
    if (authUser) {
      // Set token expiration to 1 day
      const expiry = Date.now() + ms('1d');  // Expiry is set to 1 day from now
      localStorage.setItem("x-user", JSON.stringify({ data: authUser, expiry }));
    } else {
      localStorage.removeItem("x-user");
    }
  }, [authUser]);

  // Logout function
  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("x-user");
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
