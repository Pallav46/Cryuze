import React from 'react';

const FixedCard = ({ isOpen, data, onSubCardClick }) => (
  <div
    className={`fixed left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-600 shadow-md rounded-lg p-6 w-64 transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    <h2 className="text-2xl font-bold mb-4 dark:text-white">lorem ipsum</h2>
    <div className="grid grid-cols-2 gap-4">
      {data.map(item => (
        <div
          key={item.id}
          className="flex flex-col items-center space-y-2 cursor-pointer hover:bg-[#f42c37] p-2 rounded-lg"
          onClick={() => onSubCardClick(item.id)}
        >
          <img src={"https://via.placeholder.com/100"} alt={item.title} className="w-12 h-12 object-cover rounded-full" />
          <span className='font-semibold'>{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default FixedCard;
