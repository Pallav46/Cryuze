import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';

function Services({ serviceGroup = [] }) {
  const navigate = useNavigate();

  const handleButtonClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className='py-8'>
      <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {serviceGroup.map((service, index) => (
            <div 
              key={index} 
              className={`py-10 pl-5 ${index % 3 === 0 ? 'bg-gradient-to-br from-black/90 to-black/70' : index % 3 === 1 ? 'bg-gradient-to-br from-[#fdc62e] to-[#fdc63e]/90' : 'col-span-2 bg-gradient-to-br from-red-300 to-red-500/90'} text-white rounded-3xl relative h-[320px] flex items-end`}>
              <div>
                <div className='mb-4'>
                  <p className='mb-[2px] font-semibold text-gray-400'>{service.category}</p>
                  <p className='text-2xl font-semibold mb-[2px]'>{service.name}</p>
                  <Button 
                    handler={() => handleButtonClick(service._id)} 
                    text="Browse" 
                    bgColor={index % 3 === 0 ? 'bg-zinc-900' : 'bg-white'} 
                    textColor={index % 3 === 0 ? 'text-white' : index % 3 === 1 ? 'text-[#fdc63e]' : 'text-red-300'} 
                  />
                </div>
              </div>
              <img 
                src={service.imageUrl} 
                className={`w-[320px] absolute bottom-0 ${index % 3 === 1 ? '-right-4 lg:top-[40px]' : index % 3 === 2 ? 'top-1/2 -translate-y-1/2 -right-0' : ''}`} 
                alt={service.name} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
