import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

export const ProviderAuthContext = createContext(); // Update context name

export const useProviderAuthContext = () => { // Update hook name
  return useContext(ProviderAuthContext);
};

export const ProviderAuthContextProvider = ({ children }) => { // Update provider name
  const [authProvider, setAuthProvider] = useState(JSON.parse(localStorage.getItem("x-provider")) || null);

  return <ProviderAuthContext.Provider value={{ authProvider, setAuthProvider }}>{children}</ProviderAuthContext.Provider>;
};

ProviderAuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
