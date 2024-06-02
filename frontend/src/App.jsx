// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LocomotiveScroll from 'locomotive-scroll'

import { useAuthContext } from './context/AuthContext';

import Login from './pages/user/login/Login';
import Service from './pages/user/service/Service'; // Import the Service component
import Home from './pages/user/home/Home';
import ProviderLogin from './pages/provider/login/ProviderLogin';
import ProviderSignup from './pages/provider/signup/ProviderSignup';
import ProviderHome from './pages/provider/home/ProviderHome';
import ProviderEditservice from './pages/provider/home/ProviderEditservice';
import ProviderChatt from './pages/provider/home/ProviderChatt';
import Signup  from './pages/user/signup/Signup';
// import Logout from './pages/user/logout/Logout';
import BuyService from './pages/user/service/BuyService';
import ChattService from './pages/user/service/ChattService';
import Profile from './pages/user/service/Profile';
import Messages from './components/provider/Messages';
import ChatSkleton from './pages/user/chat/ChatSkleton';
import Chatting from './pages/user/chat/Chatting';
import Admindash from './pages/admin/Admindash';
import AddProduct from './pages/admin/Adminaddservice';


function App() {
  new LocomotiveScroll();

	const { authUser } = useAuthContext();
  // console.log(authUser.user._id);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={authUser ? <ChatSkleton /> : <Navigate to={'/login'} />} />
        <Route path='/chat/:providerId' element={authUser ? <Chatting /> : <Navigate to={'/login'} />} />
        <Route path='/service/:id' element={<Service />} />
        <Route path='/service/:id/buy/:subcatId' element={authUser ? <BuyService /> : <Navigate to={'/login'} />} />
        <Route path='/service/:id/buy/:subcatId/chat/:providerId'  element={authUser ? <ChattService /> : <Navigate to={'/login'} />} />
        <Route path='/service/:id/buy/:subcatId/profile/:providerId'  element={authUser ? <Profile /> : <Navigate to={'/login'} />} />
        {/* <Route path='/logout' element={<Logout />} /> */}
        <Route path='/register' element={<Signup />} />
        <Route path='/providers/login' element={<ProviderLogin />} />
        <Route path='/providers/register' element={<ProviderSignup />} />
        <Route path='/providers/dashboard' element={<ProviderHome />} />
        <Route path='/providers/services' element={<ProviderEditservice />} />
        <Route path='/providers/chat' element={<ProviderChatt />} />
        <Route path='/providers/chat/:customerId' element={<Messages />} />

        {/* Admin routes */}
        <Route path='/admin' element={<Admindash />} />
        <Route path='/add-product' element={<AddProduct />} />

      </Routes>
      <Toaster />
    </>
  );
}

export default App;
