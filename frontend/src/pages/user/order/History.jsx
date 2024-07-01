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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center mt-5 dark:text-white">History</h1>
        {history.length > 0 ? (
          <ul className="space-y-4 bg-gray-100 dark:bg-gray-600 p-5 rounded-md shadow-md mb-56">
            {history.map((request) => (
              <li key={request._id} className="bg-white shadow-md rounded-md p-6 dark:bg-gray-800 dark:text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Service Request</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    request.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-green-300 text-green-700'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <p className='dark:text-gray-400'><strong className='dark:text-gray-200'>Service:</strong> {request.subCategory.name || request.subCategory}</p>
                <p className='dark:text-gray-400'><strong className='dark:text-gray-200'>Provider:</strong> {request.serviceProvider.name}</p>
                <p className='dark:text-gray-400'><strong className='dark:text-gray-200'>Date:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                {request.bill && (
                  <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2 dark:text-white">Bill Details</h3>
                    <div className="bg-gray-50 p-4 rounded-md dark:bg-gray-700">
                      <p><strong className='dark:text-gray-200'>Subcategory Charge:</strong> ${request.bill.subcategoryCharge}</p>
                      <p><strong className='dark:text-gray-200'>Service Charge:</strong> ${request.bill.serviceCharge}</p>
                      <p><strong className='dark:text-gray-200'>Additional Charges:</strong></p>
                      <ul className="list-disc list-inside dark:text-white ml-4">
                        {request.bill.additionalCharges.map((charge, index) => (
                          <li key={index}>{charge.name}: ${charge.price}</li>
                        ))}
                      </ul>
                      <p className="mt-4 dark:text-white"><strong>Total Amount Paid:</strong> ${calculateTotalAmountPaid(request.bill)}</p>
                      <p className="text-green-500 font-bold">Payment Successful</p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mb-[10vh]">No history available</p>
        )}
      </div>
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
