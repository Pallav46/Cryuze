import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../service/Adminside.jsx';

const Allservices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the services from the API
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/v1/'); // Adjust the endpoint if necessary
        setServices(response.data.data); // Access the array within the 'data' property
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleEdit = (serviceId) => {
    navigate(`/admin/editservice/${serviceId}`);
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`/api/v1/services/${serviceId}`);
      setServices(services.filter(service => service.id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleView = (serviceId) => {
    navigate(`/admin/service/${serviceId}`);
  };

  return (
    <div className="flex h-screen">
    <Sidebar />
    <div className="p-4 flex-1">
    <div className="max-w-4xl mt-10 mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">All Services</h2>
      <ul className="space-y-4">
        {services.map(service => (
          <li key={service.id} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{service.name}</h3>
                <p className="text-gray-600">{service.priceRange}</p>
              </div>
              <div>
                <button
                  onClick={() => handleView(service._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
                >
                  View
                </button>
                <Link to={`/admin/editservice/${service._id}`}>
                  <button
                    onClick={() => handleEdit(service._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </Link>
                
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  );
};

export default Allservices;
