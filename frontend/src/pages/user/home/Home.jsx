// import React from 'react'
import FooterComponent from '../../../components/user/FooterComponent'
import LandingPage from '../../../components/user/LandingPage'
import Marquee from '../../../components/user/Marquee'
import Services from '../../../components/user/Services'
import Navbar from '../../../components/user/Navbar'

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