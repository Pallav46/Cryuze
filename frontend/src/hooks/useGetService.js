import { useEffect, useState } from "react";

const useGetService = (serviceId) => {
    const [data, setData] = useState(null); // Adjusted initial state to null
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`/api/v1/service/${serviceId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result); // Setting the entire result as data
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [serviceId]); // Adjusted dependency to serviceId
    console.log(data, error, loading);
    return { data, error, loading };
};

export default useGetService;
