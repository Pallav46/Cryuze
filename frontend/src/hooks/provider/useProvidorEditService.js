import { useState } from 'react';

const useProviderEditService = (initialServices) => {
  const [services, setServices] = useState(initialServices);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceClick = (serviceId) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(serviceId)
        ? prevSelectedServices.filter((id) => id !== serviceId)
        : [...prevSelectedServices, serviceId]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/me/updateService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ services: selectedServices }),
      });

      if (!response.ok) {
        throw new Error('Failed to update services');
      }

      console.log('Services updated successfully!');
      // Reset selected services after submission
      setSelectedServices([]);
    } catch (error) {
      console.error('Error updating services:', error);
    }
  };

  return {
    services,
    selectedServices,
    handleServiceClick,
    handleSubmit,
  };
};

export default useProviderEditService;
