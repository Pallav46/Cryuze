import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/provider/Sidebar';
import useProviderServices from '../../../hooks/provider/useProviderServices';
import NotificationIcon from '../../../components/provider/Notificationbox.jsx';
import Summarycomponent from '../../../components/provider/Summarycomponent.jsx';
import DarkMode from '../../../components/provider/DarkMode.jsx';

const ProviderHome = () => {
  const { data, error, isLoading } = useProviderServices();
  const navigate = useNavigate();
  const messages = [
    { user: 'User 1' },
    { user: 'User 2' },
    { user: 'User 3' },
  ];

  useEffect(() => {
    if (error) {
      // navigate('/providers/login');
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <div className="flex-grow p-6">
        <DarkMode />
        <Summarycomponent />
        <NotificationIcon messages={messages} />
        <div className="flex-grow p-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
            <h2 className="text-4xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Your Services</h2>
            {data && data.length > 0 ? (
              <ul className="list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map(service => (
                  <li key={service._id} className="group transform transition duration-500 hover:scale-105">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg group-hover:shadow-2xl transition duration-500">
                      <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-indigo-600 transition duration-500">
                        {service.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition duration-500">
                        {service.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-600 dark:text-gray-400">No services found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderHome;
