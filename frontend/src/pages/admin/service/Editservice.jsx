import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Adminside.jsx';
const Editservice = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({ name: '', priceRange: '' });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/service/${serviceId}`, service);
      navigate('/admin/allservices');
    } catch (error) {
        alert(error)
      console.error('Error updating service:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
    <Sidebar />
     <div className="p-4 flex-1">
    <div className="max-w-4xl mt-10 mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={service.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price Range</label>
          <input
            type="text"
            name="priceRange"
            value={service.priceRange}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Service
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Editservice;
