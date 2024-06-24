// import React from 'react';
import Conversationspro from '../../../components/provider/Conversationspro';
// import Messages from './Messages';

const ChatSkleton = () => {
  return (
    <div className="flex h-screen">
      {/* Conversations Sidebar */}
      <div className="bg-gray-100 w-1/4 border-r border-gray-300 overflow-y-auto">
        <Conversationspro />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-300 py-3 px-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Welcome...</h3>
          <div className="flex items-center space-x-2">
            {/* Additional header controls */}
          </div>
        </div>

        {/* Messages Container
        <div className="flex-1 bg-gray-100 overflow-y-auto p-4">
          <Messages />
        </div> */}

        {/* Input Container */}
        {/* <div className="bg-white border-t border-gray-300 py-3 px-4 flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none">
            Send
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ChatSkleton;