import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useUserLogout = () => {
    const [data, setData] = useState(null); // Changed initial state to null
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch('/api/v1/logout');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result); // Set data to the entire result
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, []);

    return { data, error, loading };
};

export default useUserLogout;
