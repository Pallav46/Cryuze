import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useProviderChatt from '../../hooks/provider/useProviderChatt';
import Sidebar from './Sidebar';
// import { useNavigate } from 'react-router-dom';

const Conversationspro = () => {
  const { data: conversations, isLoading, error } = useProviderChatt();
  const navigate = useNavigate();
  const { providerId } = useParams();
  const chatEndRef = useRef(null);

  const handleConversationClick = (id) => {
    navigate(`${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className=" inline-block w-8 h-8 border-4 rounded-full text-blue-500"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          Error loading conversations: {error.message}
        </p>
      </div>
    );
  }

  return (
    
    <div className='flex '>
    <div className="p-4 w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6 mx-auto dark:text-white">Chat With</h1>
      {conversations && conversations.length > 0 ? (
        <ul className="">
          {conversations.map((conversation) => (
            <li
              key={conversation._id}
              className={`p-4 border rounded-lg shadow-md transition-shadow duration-200 cursor-pointer ${
                conversation._id === providerId
                  ? "border-blue-500 shadow-lg"
                  : "border-gray-300 hover:shadow-lg"
              }`}
              onClick={() => handleConversationClick(conversation._id)}
            >
              <div className="flex items-center">
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {conversation.name}
                  </h2>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No conversations found.</p>
      )}
    </div>
    </div>
  );
};

export default Conversationspro;
