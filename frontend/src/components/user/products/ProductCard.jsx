import  { useState } from 'react';
import Button from '../../Button';
import { FaStar } from "react-icons/fa";
import Popover from '../popover/Popover';
import toast from 'react-hot-toast'; // Assuming you use toast for notifications

function ProductCard({ data, serviceProviderIds}) {
  const [showPopover, setShowPopover] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleBuyNowClick = () => {
    setSelectedProductId(data.id);
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };


  // Example function for sending notifications

  return (
    <div className="relative flex flex-col lg:flex-row bg-white dark:bg-gray-600 shadow-md rounded-lg p-6 mb-4">
      <div className="flex-1 flex-col">
        <h1 id={`product-${data.id}`} className="text-2xl font-bold mb-4">{data.name}</h1>
        <p className='text-md font-semibold text-gray-500 dark:text-gray-300'>{data.description}</p>
        <div className='flex items-center mt-2'>
          <FaStar className='h-5 text-yellow-400 dark:text-yellow-400' />
          <span className='text-md font-semibold text-gray-500 dark:text-yellow-400 ml-1'>{data.rating}</span>
        </div>
        <h2 className='text-md font-bold text-black mt-2'>Starts from ${data.price}</h2>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <div>
          <img src={"https://via.placeholder.com/100"} alt={data.title} className="object-cover rounded-lg" />
          <div className='mt-4'>
            <Button text="Buy Now" bgColor="bg-blue-800" textColor="text-white" handler={handleBuyNowClick} />
          </div>
        </div>
      </div>
      {showPopover && (
        <Popover onClose={handleClosePopover} productData={data} serviceProviderIds={serviceProviderIds}/>
      )}
    </div>
  );
}

export default ProductCard;
