import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingPopover = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit({ rating, review });
      onClose();
    } else {
      alert('Please provide a star rating.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 sm:w-2/3 lg:w-1/3 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Rate the Work</h2>
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={30}
              className={`cursor-pointer ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => handleRatingClick(i + 1)}
            />
          ))}
        </div>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-600 dark:border-gray-500 text-gray-900 dark:text-white"
          placeholder="Optional review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingPopover;
