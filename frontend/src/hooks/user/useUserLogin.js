import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUserLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Access the navigate function

  const login = async ({ email, password }) => {
    const success = handleInputErrors({ email, password });
    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Login successful!");
        navigate("/"); // Navigate to the Home route
      } else {
        toast.error(data.error.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useUserLogin;

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