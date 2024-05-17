// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import { Toaster } from 'react-hot-toast';
import Login from './pages/login/Login';
import Service from './pages/service/Service'; // Import the Service component
import LocomotiveScroll from 'locomotive-scroll'


function App() {
  new LocomotiveScroll();
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/service/:id' element={<Service />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
