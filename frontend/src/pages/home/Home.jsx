// import React from 'react'
import FooterComponent from '../../components/FooterComponent'
import LandingPage from '../../components/LandingPage'
import Marquee from '../../components/Marquee'
import Services from '../../components/Services'
import Navbar from '../../components/Navbar'

const Home = () => {

  return (
    <div className='w-full min-h-screen text-white'>
        <Navbar/>
        <LandingPage/>
        <Marquee/>
        <Services/>
        <FooterComponent/>
    </div>
  )
}

export default Home