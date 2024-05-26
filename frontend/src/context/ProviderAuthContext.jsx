import { createContext, useState, useContext } from 'react';

// Create a Context for the auth
const AuthContext = createContext();

// Custom hook to consume the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("x-provider")) || null);

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};


