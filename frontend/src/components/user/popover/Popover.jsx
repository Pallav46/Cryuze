import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import useSendNotification from '../../../hooks/user/useSendNotification';

const Popover = ({ onClose, productData, serviceProviderIds }) => {
  const [expectedAmount, setExpectedAmount] = useState('');
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const data = productData;
  const {id} = useParams;
  const {sendNotification} = useSendNotification();
  console.log(data);
  console.log(serviceProviderIds);
  if (!data) {
    return null;
  }
  
  const{name, description, price, _id} = data
  const handleConfirm = async () => {
    if (!authUser) {
      toast.error("Please log in first.");
      return navigate("/login");
    }
    await sendNotification({serviceProviderIds, message: expectedAmount, serviceId: id, subcatId: _id})
    navigate("/myOrders")
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-120 dark:bg-gray-800">
        <button onClick={onClose} className="absolute top-2 right-2 text-black dark:text-red-500">
          <FaTimes />
        </button>
        <div className="flex justify-between mb-4">
          <h2 className='text-black dark:text-white font-semibold tracking-widest text-xl uppercase sm:text-2xl'>X Company</h2>
          <p className="text-gray-500 dark:text-gray-300">{new Date().toLocaleDateString()}</p>
        </div>
        <hr className="my-2" />
        <h3 className="text-lg font-semibold mb-2">Product Details:</h3>
        <div className="flex justify-between mb-2">
          <p>{name}</p>
          <p>${price}</p>
        </div>
        <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">{description}</p>
        <hr className="my-2" />
        <div className="flex justify-between mb-2">
          <p>Fixed Service Price</p>
          <p>${50}</p> {/* Example fixed service price */}
        </div>
        <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">Lorem ipsum dolor sit amet.</p>
        <hr className="my-2" />
        <div className="flex justify-between">
          <p className="font-semibold">Total:</p>
          <p className="font-semibold">${price + 50}</p> {/* Example total calculation */}
        </div>
        <div className="flex justify-between mb-2 mt-10">
          <p className='text-sm w-[40%] text-gray-500 dark:text-gray-400'>Enter your anticipated amount:</p>
          <input
            type="text"
            placeholder="Optional"
            value={expectedAmount}
            onChange={e => setExpectedAmount(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <hr className="my-2" />
        <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-5">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Popover;
