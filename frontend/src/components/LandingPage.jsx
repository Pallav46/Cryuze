
import React from 'react'
import Cards from './Cards'
import CarouselComponent from './Carousal'



function LandingPage() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.3" className='w-screen min-h-screen bg-zinc-900 pt-1 pl-1'>
      <div className='textstructure mt-[5vw] text-8xl ml-[10vw]'>
        {["Services at your", "Doorstep"].map((item, index)=>{
            return <div className='masker'>
            <h1 className='uppercase font-semibold  tracking-tighter'>{item}</h1>
            </div>
        })}
        <div className='flex justify-between'>
          <Cards/>
          <CarouselComponent/>
          
        </div>
        
      </div>
    </div>
  )
}

export default LandingPage
