import { useState, useCallback } from "react";
import { useAuth } from "../../context/ProviderAuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useProviderLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();

  // Use useCallback to memoize the logout function and avoid unnecessary re-renders
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/providers/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        // Fetch API does not throw errors for non-2xx responses, handle them manually
        const data = await res.json();
        throw new Error(data.error || "Logout failed");
      }

      // Clear local storage and update context
      localStorage.removeItem("x-provider");
      setAuthToken(null);

      // Show success message
      toast.success("Logout successfully");

      // Redirect to the home page or login page
      navigate("/");
    } catch (error) {
      // Show error message
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [navigate, setAuthToken]);

  return { loading, logout };
};

export default useProviderLogout;
