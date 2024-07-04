import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-700 h-screen p-6 shadow-lg">
      <ul className="space-y-4">
        <li>
          <Link to="/all-orders" className="text-gray-900 dark:text-gray-200 hover:text-blue-500">
            All Orders
          </Link>
        </li>
        <li>
          <Link to="/my-orders" className="text-gray-900 dark:text-gray-200 hover:text-blue-500">
            My Orders
          </Link>
        </li>
        <li>
          <Link to="/history" className="text-gray-900 dark:text-gray-200 hover:text-blue-500">
            History
          </Link>
        </li>
        <li>
          <Link to="/profile" className="text-gray-900 dark:text-gray-200 hover:text-blue-500">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
