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
    <div>
      <h1 className="text-2xl font-bold mb-4">Nearby Service Providers</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {nearbyServiceProviders && (
        <ul>
          {nearbyServiceProviders.map(provider => (
            <li key={provider._id} className="mb-4">
              <p className="font-semibold">Name: {provider.name}</p>
              <p>Email: {provider.email}</p>
              <p>Phone Number: {provider.phoneNumber}</p>
              <p>Distance: {provider.distance.toFixed(2)} km</p>
              <div className="mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                  View Profile
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded">
                  Chat
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuyService;
