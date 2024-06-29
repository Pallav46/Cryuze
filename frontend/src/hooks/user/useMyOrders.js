import { useEffect, useState, useCallback } from "react";

const useMyOrders = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchService = useCallback(async () => {
        setLoading(true); // Ensure loading state is set when refetching
        try {
            const response = await fetch(`/api/v1/myOrders`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []); // Empty dependency array ensures the function is stable

    useEffect(() => {
        fetchService();
    }, [fetchService]);

    console.log(data, error, loading);
    return { data, error, loading, refetch: fetchService };
};

export default useMyOrders;
