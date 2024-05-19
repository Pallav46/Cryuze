import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Sidebar from '../../../components/provider/Sidebar';
import useGetServices from '../../../hooks/useGetServices';
import toast from 'react-hot-toast';

const ProviderEditservice = () => {
  const navigate = useNavigate();
  const { data: services, loading, error } = useGetServices();
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceClick = (serviceId) => {
    setSelectedServices(prevServicesId =>
      prevServicesId.includes(serviceId)
        ? prevServicesId.filter(_id => _id !== serviceId)
        : [...prevServicesId, serviceId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/v1/providers/me/updateService', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ services: selectedServices })
        });
  
        if (!response.ok) {
          throw new Error('Failed to update services');
        }
  
        toast.success('Services updated successfully!');
        navigate('/providers/dashboard');
    } catch (error) {
        toast.error('Error updating services: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading services: {error.message}</div>;

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
          <h2 className="text-3xl font-bold mb-4">Edit Services</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-screen-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.map(service => (
                <div
                  key={service._id}
                  className={`rounded-lg overflow-hidden shadow-md border border-gray-200 cursor-pointer ${selectedServices.includes(service._id) ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
                  onClick={() => handleServiceClick(service._id)}
                >
                  <div className="bg-cover bg-center h-48" style={{ backgroundImage: `url(${service.image})` }}></div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                    <p className="text-gray-500">{service.description}</p>
                    <p className="text-gray-700">{service.priceRange}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProviderEditservice;
