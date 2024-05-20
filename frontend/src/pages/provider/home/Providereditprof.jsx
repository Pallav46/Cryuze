import React from 'react'
import Sidebar from '../../../components/provider/Sidebar';
const Providereditprof = () => {
  return (
    <>
    <div className="flex min-h-screen bg-gray-100">
<Sidebar />
    <div className="flex-grow p-6">
        <form className="bg-white p-8 rounded-lg shadow-md">

            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Edit Service</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Phone Number
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="description">
                    Description
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" />
           </div>
           </form>
           </div>
    </div>
  
    </>
  )
}

export default Providereditprof