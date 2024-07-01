import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetOrder from "../../../hooks/user/useGetOrder";
import Logo from "../../../../src/assets/website/logo.jpg";
import axios from "axios";

const Order = () => {
  const { orderId } = useParams();
  const { data, error, loading } = useGetOrder(orderId);
  const [showBillPopover, setShowBillPopover] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-slate-800">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (error || !data || !data.success || !data.data) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> Failed to fetch order details.
      </div>
    );
  }

  const { createdAt, serviceProvider, status, subCategory, updatedAt, bill } = data.data;

  const handleViewBill = () => {
    setShowBillPopover(true);
  };

  const handleClosePopover = () => {
    setShowBillPopover(false);
  };

  const handlePayUsingCash = async () => {
    console.log("Pay using cash");
  };

  const handlePayUsingRazorpay = async (e) => {
    const amount = totalAmount;

    try {
      const { data: { key } } = await axios.get("/api/v1/pay/getKey");
      const { data: { order } } = await axios.post("/api/v1/pay/checkout", { amount, orderId });

      var options = {
        key,
        amount,
        currency: "INR",
        name: "X Website",
        description: "Test Transaction",
        image: Logo,
        order_id: order.id,
        handler: async function (response) {
          const body = { ...response };

          try {
            const validateRes = await fetch("/api/v1/pay/paymentverification", {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const jsonRes = await validateRes.json();
            console.log(jsonRes);

            if (jsonRes.msg === "success") {
              navigate(`/paymentsuccess?reference=${jsonRes.paymentId}`);
            } else {
              alert("Payment verification failed!");
            }
          } catch (error) {
            console.error("Error during payment verification:", error);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "Web Dev Matrix",
          email: "webdevmatrix@example.com",
          contact: "9000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    } catch (error) {
      console.error("Error during Razorpay payment:", error);
      alert("Error during payment!");
    }

    e.preventDefault();
  };

  const totalAmount = (bill?.subcategoryCharge || 0) + (bill?.serviceCharge || 0) + (bill?.additionalCharges?.reduce((acc, charge) => acc + charge.price, 0) || 0);

  return (
    <div className="max-w-4xl mx-auto py-8 dark:bg-slate-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Order Details</h1>

      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">SubCategory</h2>
        <p className="mb-2">Name: {subCategory?.name}</p>
        <p className="mb-2">Description: {subCategory?.description}</p>
        <p>Price: ${subCategory?.price}</p>
      </div>

      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Service Provider</h2>
        <p className="mb-2">Name: {serviceProvider?.name}</p>
        <p className="mb-2">Email: {serviceProvider?.email}</p>
        <p>Phone Number: {serviceProvider?.phoneNumber}</p>
      </div>

      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Order Status</h2>
        <p>Status: <span className={`font-semibold ${status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>{status}</span></p>
      </div>

      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Dates</h2>
        <p className="mb-2">Created At: {new Date(createdAt).toLocaleString()}</p>
        <p>Updated At: {new Date(updatedAt).toLocaleString()}</p>
      </div>

      <div className="flex justify-end space-x-4">
        {bill && (
          <button
            onClick={handleViewBill}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            View Bill
          </button>
        )}
      </div>

      {showBillPopover && bill && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-xl font-bold mb-4">Bill Details</h2>
                <p>Subcategory Charge: ${bill.subcategoryCharge}</p>
                <p>Service Charge: ${bill.serviceCharge}</p>
                {bill.additionalCharges.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Additional Charges:</h3>
                    {bill.additionalCharges.map((charge, index) => (
                      <p key={index}>{charge.name}: ${charge.price}</p>
                    ))}
                  </div>
                )}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-lg font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handlePayUsingCash}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Pay Using Cash
                </button>
                <button
                  id="rzp-button1"
                  onClick={handlePayUsingRazorpay}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Pay Using Razorpay
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClosePopover}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
