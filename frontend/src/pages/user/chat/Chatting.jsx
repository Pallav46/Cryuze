import React from 'react';
import Conversations from './Conversations';
import Messages from './Messages';

const Chatting = () => {
    
  return (
    <div className="flex h-screen">
      {/* Conversations Sidebar */}
      <div className="bg-gray-100 w-1/4 border-r border-gray-300 overflow-y-auto">
        <Conversations />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-300 py-3 px-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Selected conversation name</h3>
          <div className="flex items-center space-x-2">
            {/* Additional header controls */}
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-gray-100 overflow-y-auto p-4">
          <Messages />
        </div> 

        {/* Input Container */}
        
      </div>
    </div>
  );
};

export default Chatting;