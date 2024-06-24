import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/user/navbar/Navbar';
import Footer from '../../../components/user/footer/Footer';

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
    <div className='dark:bg-slate-800 dark:text-white'>
      <Navbar/>
      <h1 className="text-3xl font-bold mb-6 text-center mt-5 dark:text-white">History</h1>
      {history.length > 0 ? (
        <ul className="space-y-4 container dark:bg-slate-700 mb-32 bg-slate-200 p-5 rounded-md shadow-md">
          {history.map((request) => (
            <li key={request._id} className="bg-white shadow-md rounded-md p-6 dark:bg-gray-800">
              <h2 className="text-xl font-bold mb-2 dark:text-white">Service Request</h2>
              <p className='dark:text-gray-400'><strong className='dark:text-gray-200'>Service:</strong> {request.subCategory.name || request.subCategory}</p>
              <p className='dark:text-gray-400'><strong className='dark:text-gray-200'>Provider:</strong> {request.serviceProvider.name}</p>
              <p className='dark:text-gray-400'><strong className='dark:text-gray-200'>Status:</strong> {request.status}</p>
              <p className='dark:text-gray-400'><strong className='dark:text-gray-200'>Date:</strong> {new Date(request.createdAt).toLocaleString()}</p>
              {request.bill && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2 dark:text-white">Bill Details</h3>
                  <p><strong className='dark:text-gray-200'>Subcategory Charge:</strong> ${request.bill.subcategoryCharge}</p>
                  <p><strong className='dark:text-gray-200'>Service Charge:</strong> ${request.bill.serviceCharge}</p>
                  <p><strong className='dark:text-gray-200'>Additional Charges:</strong></p>
                  <ul className="list-disc list-inside dark:text-white">
                    {request.bill.additionalCharges.map((charge, index) => (
                      <li key={index}>{charge.name}: ${charge.price}</li>
                    ))}
                  </ul>
                  <p className="mt-4 dark:text-white"><strong>Total Amount Paid:</strong> ${calculateTotalAmountPaid(request.bill)}</p>
                  <p className="text-green-500 font-bold">Payment Successful</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No history available</p>
      )}
      <Footer/>
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
