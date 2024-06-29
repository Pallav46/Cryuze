import { useEffect, useState } from "react";

const useGetOrder = (orderId) => {
    const [data, setData] = useState(null); // Adjusted initial state to null
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWork = async () => {
            try {
                const response = await fetch(`/api/v1/order/${orderId}`);
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

        fetchWork();
    }, [orderId]); // Adjusted dependency to orderId
    console.log(data, error, loading);
    return { data, error, loading };
};

export default useGetOrder;
