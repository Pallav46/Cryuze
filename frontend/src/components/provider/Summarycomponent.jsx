// import React from 'react';

const Summarycomponent = ({ services, earnings, orders }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-around items-center">
      <div className="flex items-center">
        <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 2H6a1 1 0 01-1-1V6a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1z" />
        </svg>
        <span className="text-gray-700">Services: {services}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l1.05-2.1A1 1 0 014 7h16a1 1 0 01.95 1.4L19 10M4 10l-1.05 2.1A1 1 0 004 14h16a1 1 0 00.95-1.4L20 10M9 21l3-6 3 6H9z" />
        </svg>
        <span className="text-gray-700">Earnings: ${earnings}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <span className="text-gray-700">Orders: {orders}</span>
      </div>
    </div>
  );
};

export default Summarycomponent;
