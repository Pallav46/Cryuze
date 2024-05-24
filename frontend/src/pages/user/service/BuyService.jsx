import { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import queryString from "query-string"; 
import useUserNearby from "../../../hooks/user/useUserNearby";
import useConversation from "../../../zustand/useConversation";

const BuyService = () => {
  const location = useLocation();
  const { id, subcatId } = useParams(); 
  const navigate = useNavigate(); 
  const { setSelectedConversation } = useConversation();
  const { lng, lat } = queryString.parse(location.search);
  const { isLoading, error, nearbyServiceProviders } = useUserNearby(id, subcatId, lng, lat);

  const handleViewProfile = (providerId) => {
    navigate(`/service/${id}/buy/${subcatId}/profile/${providerId}`);
  };

  const handleChat = async (providerId) => {
    try {
      navigate(`/service/${id}/buy/${subcatId}/chat/${providerId}`);
    } catch (error) {
      console.error("Error fetching provider:", error);
    }
  };

  useEffect(() => {
    // Ensure any cleanup is done here
    return () => {
      // Cleanup if necessary
    };
  }, []); // Ensure this effect runs only once

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
                    onClick={() => {
                      handleChat(provider._id);
                      setSelectedConversation(provider);
                    }}
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
