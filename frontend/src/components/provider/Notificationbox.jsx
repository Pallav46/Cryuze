import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProviderGetNotification from '../../hooks/provider/useProviderGetNotification';
import useProviderConfirmation from '../../hooks/provider/useProviderConfirmation';
import io from "socket.io-client";
import { useAuth } from "../../context/ProviderAuthContext";

const Notificationbox = () => {
  const { authToken } = useAuth();
  const { _id } = authToken.user;
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(false);
  const { data, error, loading } = useProviderGetNotification();
  const { askForConfirmation } = useProviderConfirmation();
  const navigate = useNavigate();

  // const socket = useMemo(() => {
  //   const socketInstance = io("http://localhost:3030", {
  //     query: { userId: _id }
  //   });
  //   return socketInstance;
  // }, [_id]);

  const socket = useMemo(() => {
    const socketInstance = io("https://x-website.onrender.com", {
      query: { userId: _id }
    });
    return socketInstance;
  }, [_id]);

  useEffect(() => {
    if (data && data.notifications) {
      setNotifications(data.notifications);
    }
  }, [data]);

  useEffect(() => {
    socket.on("notification", (msg) => {
      console.log("Received notification:", msg);
      setNotifications((prevNotifications) => [msg, ...prevNotifications]);
      setNewNotification(true);
    });

    return () => {
      // Cleanup on component unmount
      socket.disconnect();
    };
  }, [socket]);

  const toggleNotificationBox = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    if (!isOpen) {
      setNewNotification(false);
    }
  };

  const handleChatClick = (customerId) => {
    navigate(`/providers/chat/${customerId}`);
  };

  const handleConfirmationClick = async (customerId, subcatId) => {
    askForConfirmation({customerId, subcatId});
  };

  const handleReadMoreClick = () => {
    navigate('/providers/notifi');
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        className="relative focus:outline-none text-gray-600 hover:text-gray-800 transition duration-300"
        onClick={toggleNotificationBox}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.002 7.002 0 00-5-6.708V4a3 3 0 10-6 0v.292A7.002 7.002 0 002 11v3.159c0 .538-.214 1.055-.595 1.436L0 17h5m10 0a3.5 3.5 0 11-7 0m7 0H5"
          ></path>
        </svg>
        {newNotification && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-md">
          <div className="p-4">
            {loading ? (
              <div className="text-gray-600 text-sm">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-sm">Error: {error.message}</div>
            ) : notifications.length === 0 ? (
              <div className="text-gray-600 text-sm">No new notifications</div>
            ) : (
              <div>
                {notifications.reverse().slice(0, 3).map((notification, index) => (
                  <div key={index} className="p-2 border-b border-gray-200 hover:bg-gray-100 last:border-b-0 transition duration-300">
                    <div className="text-sm font-medium text-gray-800">{notification.sender.name}</div>
                    <div className="text-xs text-gray-600">{notification.sender.email}</div>
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Subcategory:</span>{' '}
                      {notification.subcategory.name}
                    </div>
                    <div className="text-sm text-gray-700">
                      {(<span className="font-medium">Original price:₹{notification.subcategory.price }</span>)}
                    </div>
                    <div className="text-sm text-gray-700">
                      {(<span className="font-medium">Asked price:₹{notification.message ||  'N/A'}</span>)}
                    </div>
                    <button
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() => handleChatClick(notification.sender._id)}
                    >
                      Chat
                    </button>
                    <button
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() => handleConfirmationClick(notification.sender._id, notification.subcategory._id)}
                    >
                      Ask for Confirmation
                    </button>
                  </div>
                ))}
                {notifications.length > 3 && (
                  <div className="text-center mt-2">
                    <button
                      className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                      onClick={handleReadMoreClick}
                    >
                      Read More
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notificationbox;
