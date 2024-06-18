import React from 'react'
import Sidebar from '../../../components/provider/Sidebar';
const Providernoti = () => {
  return (
    <>
    <div className="flex min-h-screen bg-gray-100">
<Sidebar />
    <div className="flex-grow p-6">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Notifications</h2>
        <ul className="list-none grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 gap-6">
          <li className="group transform transition duration-500 hover:scale-105">
            <div className="p-6 bg-white rounded-lg shadow-lg group-hover:shadow-2xl transition duration-500">
              <div className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition duration-500">
                User 1
              </div>
              <div className="text-gray-600 group-hover:text-gray-800 transition duration-500">
                Notification Description
              </div>
            </div>
          </li>
          <li className="group transform transition duration-500 hover:scale-105">
            <div className="p-6 bg-white rounded-lg shadow-lg group-hover:shadow-2xl transition duration-500">
              <div className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition duration-500">
                User 2
              </div>
              <div className="text-gray-600 group-hover:text-gray-800 transition duration-500">
                Notification Description
              </div>
            </div>
          </li>
          <li className="group transform transition duration-500 hover:scale-105">
            <div className="p-6 bg-white rounded-lg shadow-lg group-hover:shadow-2xl transition duration-500">
              <div className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition duration-500">
                User 3
              </div>
              <div className="text-gray-600 group-hover:text-gray-800 transition duration-500">
                Notification Description
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </div>
  
    </>
  )
}

export default Providernoti;