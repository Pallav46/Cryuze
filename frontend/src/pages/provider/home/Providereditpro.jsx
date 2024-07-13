import React, { useEffect } from 'react';
import Sidebar from '../../../components/provider/Sidebar';
import DarkMode from '../../../components/provider/DarkMode';

const ProviderEditPro = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <div className="p-4 flex-1">
        <DarkMode />
        <div className="max-w-4xl mt-10 mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Edit Profile</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-input mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-input mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="form-input mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-input mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">City</label>
              <input
                type="text"
                name="city"
                id="city"
                className="form-input mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">State</label>
              <input
                type="text"
                name="state"
                id="state"
                className="form-input mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                className="form-input mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProviderEditPro;
