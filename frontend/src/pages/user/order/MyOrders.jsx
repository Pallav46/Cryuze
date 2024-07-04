import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { IoMdClose } from 'react-icons/io';
import useMyOrders from '../../../hooks/user/useMyOrders';
import useConfirmProvider from '../../../hooks/user/useConfirmProvider';
import Navbar from '../../../components/user/navbar/Navbar';
import Footer from '../../../components/user/footer/Footer';
import toast from 'react-hot-toast';
import Chatting from '../chat/Chatting';

const MyOrders = () => {
    const { data, error, loading, refetch } = useMyOrders();
    const { confirmProvider, loading: confirmLoading } = useConfirmProvider();
    const navigate = useNavigate();
    const [isChatPopupOpen, setChatPopupOpen] = useState(false);

    const handleConfirm = async (confirmationId, providerId) => {
        await confirmProvider({ confirmationId, providerId });
        navigate("/allOrders");
    };

    const ChatPopup = ({ onClose }) => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-md shadow-lg w-[50%] transform transition-transform duration-300 ease-out scale-95">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    <IoMdClose className="text-2xl text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" />
                </button>
                <h2 className="text-xl mb-4">Chat</h2>
                    <Chatting/>
                <div className="overflow-y-auto max-h-96">
                    {/* Add your chat component or content here */}
                    {/* <p>Chat content goes here...</p> */}
                </div>
            </div>
        </div>
    );

    const handleDelete = async (orderId) => {
        try {
            const response = await fetch(`/api/v1/order/${orderId}`, { method: 'DELETE' });
            const result = await response.json();
    
            if (response.ok) {
                refetch();
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleChatClick = (e) => {
        e.preventDefault();
        setChatPopupOpen(true);
    };

    const handleClosePopup = () => {
        setChatPopupOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const { count, orders } = data;

    return (
        <div className='dark:bg-gray-800 dark:text-gray-300'>
            <Navbar />
            <div className='container flex-grow mb-[20vh]'>
                <h1 className="text-2xl font-bold mb-4 dark:text-white mt-4">My Orders</h1>
                <p className="mb-4">Total Orders: {count}</p>
                <div className="space-y-8 bg-slate-200 p-5 dark:bg-slate-600 rounded-md shadow-md">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white dark:text-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{order.subcategoryId.name}</h2>
                                    <p className="text-gray-500 mb-2">Customer ID: {order.customerId}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(order._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {order.recipients.map(recipient => (
                                    <div key={recipient.providerId._id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
                                        <p className="font-semibold">{recipient.providerId.name}</p>
                                        <p>Email: {recipient.providerId.email}</p>
                                        <div className="mt-2 flex justify-between">
                                            <button
                                                onClick={handleChatClick}
                                                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                                            >
                                                Chat
                                            </button>
                                            <Link to={`/provider/${recipient.providerId._id}`} className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                                View Profile
                                            </Link>
                                            <button
                                                onClick={() => handleConfirm(order._id, recipient.providerId._id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                                disabled={confirmLoading}
                                            >
                                                {confirmLoading ? 'Loading...' : 'Confirm'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
            {isChatPopupOpen && <ChatPopup onClose={handleClosePopup}/>}
        </div>
    );
};

export default MyOrders;
