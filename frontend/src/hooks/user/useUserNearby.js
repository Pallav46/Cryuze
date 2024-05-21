import { useState, useEffect } from 'react';

const useUserNearby = (serviceId, subcatId, lng, lat) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nearbyServiceProviders, setNearbyServiceProviders] = useState([]);

  useEffect(() => {
    const fetchNearbyServiceProviders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/v1/service/${serviceId}/buy/${subcatId}/?lng=${lat}&lat=${lng}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setNearbyServiceProviders(result); 
        console.log(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearbyServiceProviders();
  }, [serviceId, subcatId, lng, lat]);

  return { isLoading, error, nearbyServiceProviders };
};

export default useUserNearby;
