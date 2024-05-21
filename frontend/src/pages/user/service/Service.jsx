import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetService from '../../../hooks/useGetService';

const Service = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: serviceData, loading, error } = useGetService(id);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  useEffect(() => {
    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []); // Run only once on component mount

  const handleBuyClick = (subcatId) => {
    if (coordinates.lat !== null && coordinates.lng !== null) {
      navigate(`/service/${id}/buy/${subcatId}/?lng=${coordinates.lng}&lat=${coordinates.lat}`);
    } else {
      // Handle case when geolocation is not available
      console.error("Geolocation not available yet.");
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-gray-100 text-lg font-medium text-gray-700">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen bg-gray-100 text-lg font-medium text-red-600">Error: {error.message}</div>;

  const { category, description, name, priceRange, subCategories } = serviceData.data;

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-gray-800">{name}</h2>
      <p className="text-lg mb-4"><span className="font-semibold text-gray-600">Description:</span> {description}</p>
      <p className="text-lg mb-4"><span className="font-semibold text-gray-600">Category:</span> {category}</p>
      <p className="text-lg mb-6"><span className="font-semibold text-gray-600">Price Range:</span> {priceRange}</p>
      <h3 className="text-3xl font-bold mb-4 text-gray-700">Subcategories:</h3>
      <ul className="space-y-6">
        {subCategories.map(subCategory => (
          <li key={subCategory._id} className="border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <p className="text-2xl font-semibold mb-2 text-gray-800">{subCategory.name}</p>
            <p className="mb-2"><span className="font-medium text-gray-600">Description:</span> {subCategory.description}</p>
            <p className="mb-4"><span className="font-medium text-gray-600">Price:</span> ${subCategory.price}</p>
            <button 
              onClick={() => handleBuyClick(subCategory._id)} 
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
            > Buy </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Service;
