import { useEffect, useState } from "react";

const useGetMessages = (providerId) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted

        const fetchMessages = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/v1/chatt/${providerId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch messages: ${response.statusText}`);
                }
                const result = await response.json();
                if (isMounted) {
                    setData(result);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchMessages();

        return () => {
            isMounted = false; // Cleanup function to set isMounted to false
        };
    }, [providerId]);

    return { data, error, loading };
};

export default useGetMessages;
