import React from 'react'

function Banner({data}) {
  return (
    <>
    <div className='mini-h-[550px] flex justify-center items-center py-12'>
      <div className='container'>
        <div style={{backgroundColor: data.bgColor}} className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl'>
            <div className='p-6 sm:p-8'>
                <p className='text-sm'>{data.discount}</p>
                <h1 className='uppercase text-4xl lg:text-7xl font-bold'>{data.title}</h1>
            </div>
            <div className='flex h-full items-center'>
                <img src='' className='scale-125 w-[250px] md:w-[340px] mx-auto drop-shadow-2xl object-cover'/>
            </div>
            <div className='felx flex-col justify-center gap-4 p-6 sm:p-8'>
                <p className='font-bold text-xl'>{data.title2}</p>
                <p className='text-3xl sm:text-5xl font-bold'>{data.title3}</p>
                <p className='text-xl tracking-wide leading-5'>{data.title4}</p>
            </div>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Banner
