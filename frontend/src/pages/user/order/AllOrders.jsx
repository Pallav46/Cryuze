import React from 'react';
import { Link } from 'react-router-dom';
import useGetAllOrders from '../../../hooks/user/useGetAllOrders';
import Navbar from '../../../components/user/navbar/Navbar';
import Footer from '../../../components/user/footer/Footer';

const AllOrders = () => {
    const { data, error, loading } = useGetAllOrders();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-xl">Error: {error.message}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col dark:bg-slate-800 dark:text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>
                {data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((order) => (
                            <Link key={order._id} to={`/order/${order._id}`}>
                                <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold mb-2">{order.subCategory.name}</h2>
                                        <p className="text-gray-500 dark:text-gray-300 mb-2"><strong>Customer:</strong> {order.customer}</p>
                                        <p className="text-gray-500 dark:text-gray-300 mb-2"><strong>Service Provider:</strong> {order.serviceProvider.name}</p>
                                        <p className="text-gray-500 dark:text-gray-300 mb-2"><strong>Status:</strong> {order.status}</p>
                                        <p className="text-gray-500 dark:text-gray-300 mb-2"><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl mt-8">No orders available</div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AllOrders;
