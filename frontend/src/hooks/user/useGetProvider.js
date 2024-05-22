import { useEffect, useState } from "react";

const useGetProvider = (providerId) => {
    const [data, setData] = useState(null) // Adjusted initial state to an empty object
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const response = await fetch(`/api/v1/providers/${providerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result); // Setting the entire result as data
            } catch (error) {
                console.log(error.message);
                setError(error.message); // Set error message instead of the error object
            } finally {
                setLoading(false);
            }
        };

        fetchProvider();
    }, [providerId]);

    return { data, error, loading };
};

export default useGetProvider;
