import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/provider/Sidebar';
import useProviderGetNotification from '../../../hooks/provider/useProviderGetNotification';
import useProviderConfirmation from '../../../hooks/provider/useProviderConfirmation';
import io from "socket.io-client";
import { useAuth } from "../../../context/ProviderAuthContext";

const Providernoti = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(false);
  const { data } = useProviderGetNotification();
  const { _id } = useAuth();
  const navigate = useNavigate();
  const { askForConfirmation } = useProviderConfirmation();

  const socket = useMemo(() => {
    return io("http:localhost:3030", {
      query: { userId: _id }
    });
  }, [_id]);

  // const socket = useMemo(() => {
  //   return io("https://x-website.onrender.com", {
  //     query: { userId: _id }
  //   });
  // }, [_id]);

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
      socket.disconnect();
    };
  }, [socket]);

  const handleChatClick = (customerId) => {
    navigate(`/providers/chat/${customerId}`);
  };

  const handleConfirmationClick = async (customerId, subcatId) => {
    askForConfirmation({customerId, subcatId});
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Notifications</h2>
          {notifications.length > 0 ? (
            <ul className="list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notifications.reverse().map((notification) => (
                <li key={notification._id} className="group transform transition duration-500 hover:scale-105">
                  <div className="p-6 bg-white rounded-lg shadow-lg group-hover:shadow-2xl transition duration-500">
                    <div className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition duration-500">
                      {notification.sender.name || 'Unknown Sender'}
                    </div>
                      {(<div className="text-gray-600 group-hover:text-gray-800 transition duration-500">
                    Original Price:₹ {notification.message}
                    </div>)}
                    {(<div className="text-gray-600 group-hover:text-gray-800 transition duration-500">
                    Asked price:₹ {notification.message ||  'N/A'}
                    </div>)}
                    <div className="text-sm text-gray-500 mt-2">
                      Subcategory: {notification.subcategory.name || 'N/A'}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={() => handleChatClick(notification.sender._id)}
                      >
                        Chat
                      </button>
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                        onClick={() => handleConfirmationClick(notification.sender._id, notification.subcategory._id)}
                      >
                        Ask for Confirmation
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No notifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Providernoti;