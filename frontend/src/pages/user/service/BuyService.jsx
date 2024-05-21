import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string"; // Importing query-string library to parse query parameters
import useUserNearby from "../../../hooks/user/useUserNearby";

const BuyService = () => {
  const location = useLocation();
  const { id, subcatId } = useParams(); // Extracting other parameters from the URL path

  // Parsing query parameters to get lng and lat
  const { lng, lat } = queryString.parse(location.search);

  const { isLoading, error, nearbyServiceProviders } = useUserNearby(id, subcatId, lng, lat);

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
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4">
                    View Profile
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                    Chat
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
