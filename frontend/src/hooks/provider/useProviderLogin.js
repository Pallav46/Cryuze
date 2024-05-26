import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../../context/ProviderAuthContext";

function handleInputErrors({ email, password }) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long");
    return false;
  }
  return true;
}

const useProviderLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Access the navigate function
  const { setAuthToken } = useAuth();

  const login = async ({ email, password }) => {
    const success = handleInputErrors({ email, password });
    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("/api/v1/providers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("x-provider", JSON.stringify(data));
			setAuthToken(data);
      toast.success("Login Successful");
      navigate("/providers/dashboard")
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useProviderLogin;
