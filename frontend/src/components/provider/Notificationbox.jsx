import { useState } from 'react';

const Notificationbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotificationBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        className="relative focus:outline-none"
        onClick={toggleNotificationBox}
      >
        <svg
          className="w-6 h-6 text-gray-600"
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
        {/* {messages.length > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
        )} */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-2">
            {/* {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className="p-2 border-b border-gray-200 hover:bg-blue-100">
                  {message.user}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-600">No new messages</div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notificationbox;
