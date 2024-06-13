import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import useMyOrders from '../../../hooks/user/useMyOrders';
import useConfirmProvider from '../../../hooks/user/useConfirmProvider';

const MyOrders = () => {
    const { data, error, loading } = useMyOrders();
    const { confirmProvider, loading: confirmLoading } = useConfirmProvider();
    const navigate = useNavigate(); // useNavigate hook from react-router-dom

    const handleConfirm = async (confirmationId, providerId) => {
        await confirmProvider({ confirmationId, providerId });
        navigate("/allOrders"); // Navigate to '/allOrders' after confirmation
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const { count, orders } = data;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            <p className="mb-4">Total Orders: {count}</p>
            <div className="space-y-8">
                {orders.map(order => (
                    <div key={order._id} className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold mb-2">{order.subcategoryId.name}</h2>
                        <p className="text-gray-500 mb-2">Customer ID: {order.customerId}</p>
                        <div className="space-y-4">
                            {order.recipients.map(recipient => (
                                <div key={recipient.providerId._id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
                                    <p className="font-semibold">{recipient.providerId.name}</p>
                                    <p>Email: {recipient.providerId.email}</p>
                                    <div className="mt-2 flex justify-between">
                                        <Link to={`/chat/${recipient.providerId._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                            Chat
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
    );
};

export default MyOrders;
