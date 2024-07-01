import React from 'react';
import { Link } from 'react-router-dom';
import useGetAllOrders from '../../../hooks/user/useGetAllOrders';
import Navbar from '../../../components/user/navbar/Navbar';
import Footer from '../../../components/user/footer/Footer';

const AllOrders = () => {
    const { data, error, loading } = useGetAllOrders();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen dark:bg-slate-800">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen dark:bg-slate-800">
                <div className="text-red-500 text-xl">Error: {error.message}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col dark:bg-slate-800 dark:text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">All Orders</h1>
                {data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-56">
                        {data.map((order) => (
                            <Link key={order._id} to={`/order/${order._id}`}>
                                <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl">
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{order.subCategory.name}</h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Customer:</strong> {order.customer}</p>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Service Provider:</strong> {order.serviceProvider.name}</p>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Status:</strong> <span className={`font-semibold ${order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>{order.status}</span></p>
                                        <p className="text-gray-600 dark:text-gray-300"><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xl mt-8 text-gray-900 dark:text-white">No orders available</div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AllOrders;
