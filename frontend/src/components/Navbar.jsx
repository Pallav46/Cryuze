import React from 'react';
import Button from './Button';
import Location from './Location';
import Search from './Search';

function Navbar() {
  return (
    <div className='nav w-full bg-white px-[2rem] py-[1rem] flex gap-[20%] fixed z-50'>
      <div className='logo'>
        <img 
          src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_144,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg" 
          alt="Urban Company logo" 
          style={{ 
            objectFit: 'contain', 
            // height: '30%', 
            width: '12rem', 
            // aspectRatio: '3 / 1' 
          }} 
          loading="eager" 
          fetchpriority="high" 
          srcSet="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_144,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg 1x, https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_144,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg 2x, https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_144,dpr_3,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg 3x, https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_144,dpr_4,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg 4x"
        />
      </div>
      <div className='locandsea flex gap-5' style={{ width: '60%' }}>
        <div className='location w-[50%] h-8 bg-white'>
            <Location/>
        </div>
        <div className='search w-[50%] h-8 bg-white'>
            <Search/>
        </div>
      </div>
        <div className='button w-[10%] h-5 text-center'>
            <Button/>
        </div>
    </div>
  );
}

export default Navbar;
