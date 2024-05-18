import React from 'react'
import { Card } from "flowbite-react";

function Services() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.1" className='w-full py-20 bg-zinc-900 rounded-tl-3xl rounded-tr-3xl p-[10vw]'>

        {/* Most Booked Services */}
        <h1 className='uppercase text-[3vw] font-semibold'>Most Booked Services</h1>
        <div className='flex mt-[2vw] gap-5'>
            <Card
        className="max-w-sm w-[40%]"
        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
        imgSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        >
        <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            HelloWorld1!
            </h5>
        </a>
        <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            </Card>
            <Card
        className="max-w-sm w-[40%]"
        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
        imgSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        >
        <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            HelloWorld1!
            </h5>
        </a>
        <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            </Card>
            <Card
        className="max-w-sm w-[40%]"
        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
        imgSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        >
        <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            HelloWorld1!
            </h5>
        </a>
        <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            </Card>
            <Card
        className="max-w-sm w-[40%]"
        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
        imgSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        >
        <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            HelloWorld1!
            </h5>
        </a>
        <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            </Card>
        </div>

        {/* Salon for Woman */}
        <h1 className='uppercase text-[3vw] font-semibold mt-[10vw]'>Salon for Woman</h1>
        <div className='flex mt-[2vw] gap-5'>
        <Card
      className="max-w-sm w-[40%]"
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
      imgSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          HelloWorld1!
        </h5>
      </a>
      <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
    </Card>
        </div>

        {/* Appliances */}
        <h1 className='uppercase text-[3vw] font-semibold mt-[10vw]'>Appliances</h1>
        <div className='flex mt-[2vw] gap-5'>
        <Card
      className="max-w-sm w-[40%]"
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
      imgSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          HelloWorld1!
        </h5>
      </a>
      <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
    </Card>
        </div> 
    </div>
    
  )
}

export default Services
