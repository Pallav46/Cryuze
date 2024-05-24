// import React from 'react';
import useProviderChatt from '../../hooks/provider/useProviderChatt';
import { useNavigate } from 'react-router-dom';

const Conversations = () => {
  const { data: conversations, isLoading, error } = useProviderChatt();
    // console.log(conversations);
    const navigate = useNavigate();
  const handleChatClick = (conversationId) => {
    navigate(`/providers/chat/${conversationId}`)
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Conversations</h2>
      <ul className="space-y-2">
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 cursor-pointer flex justify-between items-center"
          >
            <span>{conversation.name}</span>
            <button
              onClick={() => handleChatClick(conversation._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversations;