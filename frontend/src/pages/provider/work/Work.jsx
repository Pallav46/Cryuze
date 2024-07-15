import { useParams } from "react-router-dom";
import useProviderGetWork from "../../../hooks/provider/useProviderGetWork";
import useSendBill from "../../../hooks/provider/useSendBill";
import { useState } from "react";
import DarkMode from "../../../components/provider/DarkMode";
import Sidebar from "../../../components/provider/Sidebar";

const Work = () => {
  const { workId } = useParams();
  const { data: responseData, error, loading } = useProviderGetWork(workId);
  const { sendBill } = useSendBill();

  const [showBillForm, setShowBillForm] = useState(false);
  const [additionalCharges, setAdditionalCharges] = useState([]);
  const [subcategoryCharge, setSubcategoryCharge] = useState(0);

  const handleAddAdditionalCharge = () => {
    setAdditionalCharges([...additionalCharges, { name: "", price: 0 }]);
  };

  const handleAdditionalChargeChange = (index, field, value) => {
    const updatedCharges = additionalCharges.map((charge, i) =>
      i === index ? { ...charge, [field]: value } : charge
    );
    setAdditionalCharges(updatedCharges);
  };
  const calculateSubtotal = () => {
    const subtotal = additionalCharges.reduce((total, charge) => total + parseFloat(charge.price || 0), 0);
    return subtotal + subcategoryCharge + 50; // assuming Platform Charge is $50
  };
  const handleSubmitBill = async (e) => {
    e.preventDefault();

    const serviceCharge = 50;

    const additionalChargesToSend = additionalCharges.map((charge) => ({
      name: charge.name,
      price: parseFloat(charge.price || 0),
    }));

    await sendBill({
      serviceRequestId: responseData.data._id,
      subcategoryCharge,
      serviceCharge,
      additionalCharges: additionalChargesToSend,
    });

    setShowBillForm(false);
    setAdditionalCharges([]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
        <strong>Error:</strong> {error.message}
      </div>
    );
  }

  if (!responseData || !responseData.data) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded" role="alert">
        No data found.
      </div>
    );
  }

  const { customer, subCategory, status, createdAt, updatedAt } = responseData.data;

  const {
    name: subCategoryName,
    description: subCategoryDescription,
    price: subCategoryPrice,
  } = subCategory || {};

  const {
    avatar,
    name: customerName,
    email: customerEmail,
    phoneNumber: customerPhoneNumber,
  } = customer || {};

  const handleMakeBill = () => {
    setSubcategoryCharge(subCategoryPrice || 0);
    setShowBillForm(true);
  };

  return (
    <>
    <div className="flex dark:bg-gray-800 ">
    <Sidebar/>
    <div className="max-w-4xl mx-auto py-8">
      <DarkMode />
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Work Details</h1>
      <div className="dark:bg-gray-700 bg-white shadow-md rounded-md p-6 mb-6 flex justify-between items-start dark:text-gray-300">
        {customer && (
          <div className="w-1/2 pr-4">
            <h2 className="text-xl font-bold mb-4">Customer</h2>
            {avatar && (
              <img
                src={avatar.url}
                alt="Customer Avatar"
                className="w-16 h-16 rounded-full mb-4"
              />
            )}
            <p className="mb-2"><strong>Name:</strong> {customerName}</p>
            <p className="mb-2"><strong>Email:</strong> {customerEmail}</p>
            <p><strong>Phone Number:</strong> {customerPhoneNumber}</p>
          </div>
        )}
        {subCategory && (
          <div className="w-1/2 pl-4 dark:text-gray-300">
            <h2 className="text-xl font-bold mb-4">SubCategory</h2>
            <p className="mb-2"><strong>Name:</strong> {subCategoryName}</p>
            <p className="mb-2"><strong>Description:</strong> {subCategoryDescription}</p>
            <p><strong>Price:</strong> ${subCategoryPrice}</p>
          </div>
        )}
      </div>
      <div className="bg-white shadow-md rounded-md p-6 mb-6 dark:bg-gray-700 dark:text-gray-300"  >
        <h2 className="text-xl font-bold mb-4">Work Status</h2>
        <p className="dark:text-green"><strong className="dark:text-green">Status:</strong> {status}</p>
      </div>
      <div className="bg-white shadow-md rounded-md p-6 mb-6 dark:bg-gray-700 dark:text-gray-300">
        <h2 className="text-xl font-bold mb-4">Dates</h2>
        <p className="mb-2"><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}</p>
      </div>
      <div className="flex justify-end space-x-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Work Done
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleMakeBill}
        >
          Make Invoice
        </button>
      </div>

      {showBillForm && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <form onSubmit={handleSubmitBill}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Create Invoice
                    </h3>
                    <div className="mt-4">
                    <table className="w-full divide-y divide-gray-200">
  <thead>
    <tr>
      <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
        Item
      </th>
      <th className="px-6 py-3 bg-green-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
        Price
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-300">
    <tr>
      <td className=" bg-blue-50 whitespace-nowrap border-x-0 border-t-0 border-blue-300 px-3 py-2 w-1/2">
        SubCategory Price
      </td>
      <td className=" bg-green-50 whitespace-nowrap border-x-0 border-t-0 border-green-300 px-3 py-2 w-1/2">
        ₹{subCategoryPrice}
      </td>
    </tr>
    <tr>
      <td className=" bg-blue-50 whitespace-nowrap border-x-0 border-t-0 border-blue-300 px-3 py-2 w-1/2">
        Platform Charge
      </td>
      <td className=" bg-green-50 whitespace-nowrap border-x-0 border-t-0 border-green-300 px-3 py-2 w-1/2">
        ₹50
      </td>
    </tr>
    {additionalCharges.map((charge, index) => (
      <tr key={index}>
        <td className="px-6 py-3 bg-blue-50 whitespace-nowrap w-1/2">
          <input
            type="text"
            placeholder="Item Name"
            value={charge.name}
            onChange={(e) =>
              handleAdditionalChargeChange(index, "name", e.target.value)
            }
            className="border-x-0 border-t-0 border-blue-300 px-3 py-2 w-full mt-1"
          />
        </td>
        <td className="px-6 py-3 bg-green-50 whitespace-nowrap w-1/2">
          <input
            type="number"
            placeholder="Price"
            value={charge.price}
            onChange={(e) =>
              handleAdditionalChargeChange(index, "price", e.target.value)
            }
            className="border-x-0 border-t-0 border-green-300 px-3 py-2 w-full mt-1"
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>

                      <button
                        type="button"
                        onClick={handleAddAdditionalCharge}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Additional Item
                      </button>
                      <div className="mt-4">
                        <h4 className="text-lg leading-6 font-medium text-gray-900">Subtotal: ${calculateSubtotal()}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit Bill
                </button>
                <button
                  type="button"
                  onClick={() => setShowBillForm(false)}
                  className="mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      
      )}
    </div>
    </div>
    </>
  );
};

export default Work;
