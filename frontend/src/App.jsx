// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LocomotiveScroll from 'locomotive-scroll'

import Login from './pages/user/login/Login';
import Service from './pages/user/service/Service'; // Import the Service component
import Home from './pages/user/home/Home';
import ProviderLogin from './pages/provider/login/ProviderLogin';
import ProviderSignup from './pages/provider/signup/ProviderSignup';
import ProviderHome from './pages/provider/home/ProviderHome';
import ProviderEditservice from './pages/provider/home/ProviderEditservice';
import ProviderChatt from './pages/provider/home/ProviderChatt';
import  Signup  from './pages/user/signup/Signup';
import Logout from './pages/user/logout/Logout';


function App() {
  new LocomotiveScroll();
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/service/:id' element={<Service />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/providers/login' element={<ProviderLogin />} />
        <Route path='/providers/register' element={<ProviderSignup />} />
        <Route path='/providers/dashboard' element={<ProviderHome />} />
        <Route path='/providers/services' element={<ProviderEditservice />} />
        <Route path='/providers/chatt' element={<ProviderChatt />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
