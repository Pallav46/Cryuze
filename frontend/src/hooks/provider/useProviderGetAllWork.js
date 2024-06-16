import { useEffect, useState } from "react";

const useProviderGetAllWork = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllWork = async () => {
            try {
                const response = await fetch('/api/v1/providers/myWork');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.data); // Assuming the API returns data as an array
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllWork();
    }, []);

    console.log(data, error, loading); // Optional: Log state for debugging

    return { data, error, loading };
};

export default useProviderGetAllWork;
