import { useState, useEffect } from 'react';

const useUserChatt = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate fetching data from an API
        const response = await fetch('/api/v1/chats');
        if (!response.ok) {
          throw new Error('Failed to fetch chat data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, isLoading };
};

export default useUserChatt;
