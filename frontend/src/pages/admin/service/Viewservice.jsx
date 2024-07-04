import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Viewservice = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the service data based on the serviceId
    const fetchService = async () => {
      try {
        const response = await axios.get(`/api/v1/service/${serviceId}`);
        setService(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service:', error);
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="max-w-4xl mt-10 mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{service.name}</h2>
      <p className="text-gray-700 mb-4">Price Range: {service.priceRange}</p>
      <p className="text-gray-700">{service.description}</p>
      <button
        onClick={() => navigate('/admin/allservices')}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Back to All Services
      </button>
    </div>
  );
};

export default Viewservice;
