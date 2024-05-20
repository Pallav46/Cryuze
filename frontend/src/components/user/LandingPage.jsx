// import React from 'react'; // Uncomment this line to import React
import Cards from './Cards';
import CarouselComponent from './Carousal';

function LandingPage() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.3" className='w-screen min-h-screen bg-zinc-900 pt-1 pl-1'>
      <div className='textstructure mt-[5vw] text-8xl ml-[10vw]'>
        {["Services at your", "Doorstep"].map((item, index)=>{
            return <div key={index} className='masker'> {/* Add key prop */}
            <h1 className='uppercase font-semibold  tracking-tighter'>{item}</h1>
            </div>
        })}
        <div className='flex justify-between'>
          <Cards key="cards" /> {/* Add key prop */}
          <CarouselComponent key="carousel" /> {/* Add key prop */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
