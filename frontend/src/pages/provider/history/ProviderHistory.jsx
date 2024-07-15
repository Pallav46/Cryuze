import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/provider/Sidebar';
import DarkMode from '../../../components/provider/DarkMode';
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
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-4 flex-1 overflow-y-auto dark:bg-gray-800">
        <DarkMode />
        <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-400">Service History</h2>
          {history.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">No service history available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((request) => (
                <div
                  key={request._id}
                  className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition transform hover:scale-105 hover:shadow-xl"
                >
                  <p className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">{request.subCategory.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{new Date(request.createdAt).toLocaleDateString()}</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-200">{request.subCategory.description}</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status: <span className={`font-bold ${request.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>{request.status}</span></p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Customer: <span className="font-bold text-gray-700 dark:text-gray-200">{request.customer.name}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderHistory;
