import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';

function Services({ serviceGroup = [] }) {
  const navigate = useNavigate();

  const handleButtonClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className='py-8 dark:bg-gray-800'>
      <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'>
            <div>
              <div className='mb-4'>
                <p className='mb-[2px] font-semibold text-gray-400'>Male</p>
                <p className='text-2xl font-semibold mb-[2px]'>Salon</p>
                <Button text="Browse" bgColor={"bg-zinc-900"} textColor={"text-white"} />
              </div>
            </div>
            <img src='' className='w-[320px] absolute bottom-0' />
          </div>
          <div className='py-10 pl-5 bg-gradient-to-br from-[#fdc62e] to-[#fdc63e]/90 text-white rounded-3xl relative h-[320px] flex items-end'>
            <div>
              <div className='mb-4'>
                <p className='mb-[2px] font-semibold text-gray-400'>Male</p>
                <p className='text-2xl font-semibold mb-[2px]'>Salon</p>
                <Button text="Browse" bgColor={"bg-white"} textColor={"text-[#fdc63e]"} />
              </div>
            </div>
            <img src='' className='w-[320px] absolute bottom-0 -right-4 lg:top-[40px]' />
          </div>
          <div className='col-span-2 py-10 pl-5 bg-gradient-to-br from-red-300 to-red-500/90 text-white rounded-3xl relative h-[320px] flex items-end'>
            <div>
              <div className='mb-4'>
                <p className=' text-gray-50 font-semibold'>Male</p>
                <p className='text-2xl font-semibold mb-[2px]'>Salon</p>
                <Button text="Browse" bgColor={"bg-white"} textColor={"text-red-300"} />
              </div>
            </div>
            <img src='' className='w-[250px] absolute top-1/2 -translate-y-1/2 -right-0' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
