import React from 'react';
import { Link } from 'react-router-dom';
import useGetAllOrders from '../../../hooks/user/useGetAllOrders';

const AllOrders = () => {
    const { data, error, loading } = useGetAllOrders();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-8">All Orders</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.map((order) => (
                    <Link key={order._id} to={`/order/${order._id}`}>
                        <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{order.subCategory.name}</h2>
                                <p className="text-gray-500 mb-2">Customer: {order.customer}</p>
                                <p className="text-gray-500 mb-2">Service Provider: {order.serviceProvider.name}</p>
                                <p className="text-gray-500 mb-2">Status: {order.status}</p>
                                <p className="text-gray-500 mb-2">Created At: {new Date(order.createdAt).toLocaleString()}</p>
                                {/* Add more fields as needed */}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllOrders;
