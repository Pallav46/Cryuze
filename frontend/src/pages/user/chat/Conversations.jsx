// import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserChatt from "../../../hooks/user/useUserChatt";

const Conversations = () => {
  const { data: conversations, error, isLoading } = useUserChatt();
  const navigate = useNavigate();
  const { providerId } = useParams();

  const handleConversationClick = (id) => {
    navigate(`/chat/${id}`);
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
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
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conversations</h1>
      {conversations && conversations.length > 0 ? (
        <ul className="space-y-4">
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
                  <h2 className="text-xl font-semibold text-gray-800">
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
  );
};

export default Conversations;
