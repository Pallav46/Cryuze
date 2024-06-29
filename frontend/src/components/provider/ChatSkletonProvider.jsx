// import React from 'react';
import Conversationspro from './Conversationspro.jsx';
import Sidebar from './Sidebar.jsx';

// import Messages from './Messages';

const ChatSkletonProvider = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="bg-blue-100 w-full border-r border-gray-300 overflow-y-auto">
        <Conversationspro />
      </div>
      
    </div>
  );
};

export default ChatSkletonProvider;