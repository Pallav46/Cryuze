import { motion } from 'framer-motion'
import React from 'react'

function Marquee() {
  return (
    <div data-scroll data-scroll-section data-scroll-speed="0.1" className='rounded-tl-3xl rounded-tr-3xl w-full py-10 bg-white text-black'>
      <div className='text border-t-2 border-b-2 border-zinc-900 flex whitespace-nowrap overflow-hidden'>
        <motion.h1 initial={{x: 0}} animate={{x: "-100%"}} transition={{ease: "linear", repeat: Infinity, duration: 8}} className='uppercase text-[12vw] leading-none font-bold px-10'>Where Convenience Meets Quality</motion.h1>
        <motion.h1 initial={{x: 0}} animate={{x: "-100%"}} transition={{ease: "linear", repeat: Infinity, duration: 8}} className='uppercase text-[12vw] leading-none font-bold'>Where Convenience Meets Quality</motion.h1>
      </div>
    </div>
  )
}

export default Marquee
