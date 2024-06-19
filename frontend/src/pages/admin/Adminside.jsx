import React from 'react';
import { Link } from 'react-router-dom';
import AddProduct from './Adminaddservice';

const Adminside = () => {
    return (
        <div className="w-64 h-full bg-gray-800 text-white">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <nav className="p-4">
                <ul>
                    <li className="mb-2">
                        <Link to="/" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/admin/allservices" className="block p-2 rounded hover:bg-gray-700">All Services</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/add-product" className="block p-2 rounded hover:bg-gray-700">Add New Services</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Adminside;
