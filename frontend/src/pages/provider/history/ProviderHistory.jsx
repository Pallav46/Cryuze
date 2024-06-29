import { useEffect, useState } from 'react';
import axios from 'axios';

const ProviderHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('x-provider'); // Assuming the token is stored in localStorage
        const response = await axios.get('/api/v1/providers/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data.serviceRequests);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Service History</h2>
      {history.length === 0 ? (
        <p className="text-gray-600">No service history available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((request) => (
            <div key={request._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">{request.subCategory.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(request.createdAt).toLocaleDateString()}</p>
              <p className="mt-2">{request.subCategory.description}</p>
              {/* Additional details you might want to display */}
              <p>Status: {request.status}</p>
              <p>Customer: {request.customer.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderHistory;
