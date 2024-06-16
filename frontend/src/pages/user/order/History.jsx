import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('x-user'); // Assuming the token is stored in localStorage
        const response = await axios.get('/api/v1/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setHistory(response.data.serviceRequests);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">History</h1>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((request) => (
            <li key={request._id} className="bg-white shadow-md rounded-md p-6">
              <h2 className="text-xl font-bold mb-2">Service Request</h2>
              <p><strong>Service:</strong> {request.subCategory.name || request.subCategory}</p>
              <p><strong>Provider:</strong> {request.serviceProvider.name}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Date:</strong> {new Date(request.createdAt).toLocaleString()}</p>
              {request.bill && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Bill Details</h3>
                  <p><strong>Subcategory Charge:</strong> ${request.bill.subcategoryCharge}</p>
                  <p><strong>Service Charge:</strong> ${request.bill.serviceCharge}</p>
                  <p><strong>Additional Charges:</strong></p>
                  <ul className="list-disc list-inside">
                    {request.bill.additionalCharges.map((charge, index) => (
                      <li key={index}>{charge.name}: ${charge.price}</li>
                    ))}
                  </ul>
                  <p className="mt-4"><strong>Total Amount Paid:</strong> ${calculateTotalAmountPaid(request.bill)}</p>
                  <p className="text-green-500 font-bold">Payment Successful</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No history available</p>
      )}
    </div>
  );
};

// Function to calculate total amount paid
const calculateTotalAmountPaid = (bill) => {
  let total = bill.subcategoryCharge + bill.serviceCharge;
  if (bill.additionalCharges && bill.additionalCharges.length > 0) {
    total += bill.additionalCharges.reduce((acc, charge) => acc + charge.price, 0);
  }
  return total;
};

export default History;
