import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faPlus, faComments, faSignOutAlt, faNavicon, faEdit, faWarehouse, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FaRegLightbulb, FaLightbulb } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white flex flex-col dark:bg-gray-900">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Service Provider</h2>
      </div>
      <ul className="flex-grow">
        <li className={`px-6 py-2 hover:bg-blue-700 dark:hover:bg-gray-800 dark:hover:rounded-l-xl  ${isActive("/providers/dashboard") ? "bg-blue-700 dark:bg-gray-800 rounded-l-xl" : ""}`}>
          <Link to="/providers/dashboard" className="flex items-center">
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
            Dashboard
          </Link>
        </li>
        <li className={`px-6 py-2 hover:bg-blue-700 dark:hover:bg-gray-800  dark:hover:rounded-l-xl ${isActive("/providers/services") ? "bg-blue-700 dark:bg-gray-800 rounded-l-xl" : ""}`}>
          <Link to="/providers/services" className="flex items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-3" />
            Add Service
          </Link>
        </li>
        <li className={`px-6 py-2 hover:bg-blue-700 dark:hover:bg-gray-800 dark:hover:rounded-l-xl ${isActive("/providers/chat") ? "bg-blue-700 dark:bg-gray-800 rounded-l-xl" : ""}`}>
          <Link to="/providers/chat" className="flex items-center">
            <FontAwesomeIcon icon={faComments} className="mr-3" />
            Chat
          </Link>
        </li>
        <li className={`px-6 py-2 hover:bg-blue-700 dark:hover:bg-gray-800 dark:hover:rounded-l-xl ${isActive("/providers/notifi") ? "bg-blue-700 dark:bg-gray-800 rounded-l-xl" : ""}`}>
          <Link to="/providers/notifi" className="flex items-center">
            <FontAwesomeIcon icon={faNavicon} className="mr-3" />
            Notification
          </Link>
        </li>
        <li className={`px-6 py-2 hover:bg-blue-700 dark:hover:bg-gray-800 dark:hover:rounded-l-xl ${isActive("/providers/myWork") ? "bg-blue-700 dark:bg-gray-800 rounded-l-xl" : ""}`}>
          <Link to="/providers/myWork" className="flex items-center">
            <FontAwesomeIcon icon={faWarehouse} className="mr-3" />
            My Work
          </Link>
        </li>
        <li className={`px-6 py-2 hover:bg-blue-700 dark:hover:bg-gray-800 dark:hover:rounded-l-xl ${isActive("/providers/history") ? "bg-blue-700 dark:bg-gray-800 rounded-l-xl" : ""}`}>
          <Link to="/providers/history" className="flex items-center">
            <FontAwesomeIcon icon={faHistory} className="mr-3" />
            History
          </Link>
        </li>
        <li className={`px-6 py-2 hover:bg-blue-700 dark:hover:bg-gray-800 dark:hover:rounded-l-xl ${isActive("/providers/myprofile") ? "bg-blue-700 dark:bg-gray-800 rounded-l-xl" : ""}`}>
          <Link to="/providers/myprofile" className="flex items-center">
            <FontAwesomeIcon icon={faComments} className="mr-3" />
            My Profile
          </Link>
        </li>
        <li className={`px-6 py-2 hover:bg-blue-700 dark:hover:bg-gray-800 dark:hover:rounded-l-xl ${isActive("/providers/edit") ? "bg-blue-700 dark:bg-gray-800 rounded-l-xl" : ""}`}>
          <Link to="/providers/edit" className="flex items-center">
            <FontAwesomeIcon icon={faEdit} className="mr-3" />
            Edit Profile
          </Link>
        </li>
        <li className={`px-6 py-2 hover:bg-blue-700 dark:hover:bg-gray-800 dark:hover:rounded-l-xl ${isActive("/providers/logout") ? "bg-blue-700 dark:bg-gray-800 rounded-l-xl" : ""}`}>
          <Link to="/providers/logout" className="flex items-center">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
            Logout
          </Link>
        </li>
      </ul>
      <div className="px-6 py-4 border-t border-blue-800 dark:border-gray-700">
        <p className="text-sm text-blue-300 dark:text-gray-400">&copy; 2024 Service Provider</p>
      </div>
    </div>
  );
};

export default Sidebar;
