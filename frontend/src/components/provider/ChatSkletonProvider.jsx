// import React from 'react';
import Conversationspro from './Conversationspro.jsx';
import Sidebar from './Sidebar.jsx';
import DarkMode from '../provider/DarkMode.jsx'
const ChatSkletonProvider = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
       <DarkMode /> 
      <div className="dark:bg-gray-800 bg-blue-100 w-full border-r border-gray-300 overflow-y-auto">
        <Conversationspro />
      </div>
      
    </div>
  );
};

export default ChatSkletonProvider;