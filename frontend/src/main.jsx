import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { AuthProvider } from "./context/ProviderAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
