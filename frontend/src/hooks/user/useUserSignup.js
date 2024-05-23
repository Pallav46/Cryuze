import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const useUserSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();


  const signup = async ({
    name,
    email,
    password,
    phoneNumber
  }) => {
    const success = handleInputErrors({
      name,
      email,
      password,
      phoneNumber,
    });
    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber
        }),
      });
      const data = await response.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("x-user", JSON.stringify(data));
			setAuthUser(data);
      toast.success("Signup Successful");
      navigate("/")
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useUserSignup;

function handleInputErrors({ name, email, password, phoneNumber }) {
  if (
    !name ||
    !email ||
    !password ||
    !phoneNumber
  ) {
    toast.error("Please fill in all required fields");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long");
    return false;
  }

  return true;
}
