import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const useUserLogout = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  useEffect(() => {
    const fetchLogout = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/v1/logout");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
        localStorage.removeItem("x-user");
        setAuthUser(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogout();
  }, [setAuthUser]);

  return { data, error, loading };
};

export default useUserLogout;