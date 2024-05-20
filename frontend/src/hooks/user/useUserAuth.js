import { useEffect, useState } from "react";

const useUserAuth = () => {
    const [data, setData] = useState(null); // Adjusted initial state to null
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`/api/v1/isAuthenticated`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log(result);
                setData(result); // Setting the entire result as data

            } catch (error) {
                setError(error.message); // Set error message
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, []); // Removed serviceId from the dependency array

    return { data, error, loading };
};

export default useUserAuth;
