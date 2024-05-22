import React from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import queryString from "query-string"; // Importing query-string library to parse query parameters
import useUserNearby from "../../../hooks/user/useUserNearby";

const BuyService = () => {
  const location = useLocation();
  const { id, subcatId } = useParams(); // Extracting other parameters from the URL path
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Parsing query parameters to get lng and lat
  const { lng, lat } = queryString.parse(location.search);

  const { isLoading, error, nearbyServiceProviders } = useUserNearby(id, subcatId, lng, lat);

  const handleViewProfile = (providerId) => {
    navigate(`/service/${id}/buy/${subcatId}/profile/${providerId}`);
  };

  const handleChat = (providerId) => {
    navigate(`/service/${id}/buy/${subcatId}/chat/${providerId}`);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Nearby Service Providers</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {nearbyServiceProviders && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nearbyServiceProviders.map(provider => (
            <li key={provider._id} className="border rounded-lg overflow-hidden bg-white shadow-md">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{provider.name}</h2>
                <p className="text-gray-700 mb-2">Email: {provider.email}</p>
                <p className="text-gray-700 mb-2">Phone Number: {provider.phoneNumber}</p>
                <p className="text-gray-700 mb-4">Distance: {provider.distance.toFixed(2)} km</p>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleViewProfile(provider._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleChat(provider._id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-4"
                  >
                    Chat
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4">
                    Confirm
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuyService;
