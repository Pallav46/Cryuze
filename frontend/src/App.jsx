import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LocomotiveScroll from 'locomotive-scroll'

import { useAuthContext } from './context/AuthContext';

import Login from './pages/user/login/Login';
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
import Logout from './components/user/auth/Logout';
import Subcategories from './pages/user/Subcategories/Subcategories';
import MyOrders from './pages/user/order/MyOrders';
import AllOrders from './pages/user/order/AllOrders';
import MyWork from './pages/provider/work/MyWork';
import Work from './pages/provider/work/Work';
import Order from './pages/user/order/Order';
import PaymentSuccess from './pages/user/payment/PaymentSuccess';
import History from './pages/user/order/History';


function App() {
  new LocomotiveScroll();

	const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/myOrders' element={<MyOrders />} />
        <Route path='/allOrders' element={<AllOrders />} />
        <Route path='/order/:orderId' element={<Order />} />
        <Route path='/history' element={<History />} />
        <Route path='/chat' element={authUser ? <ChatSkleton /> : <Navigate to={'/login'} />} />
        <Route path='/chat/:providerId' element={authUser ? <Chatting /> : <Navigate to={'/login'} />} />
        {/* <Route path='/service/:id' element={<Service />} /> */}
        <Route path='/service/:id' element={<Subcategories />} />
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
        <Route path='/providers/myWork' element={<MyWork />} />
        <Route path='/providers/work/:workId' element={<Work />} />
        <Route path='/providers/chat/:customerId' element={<Messages />} />

        {/* Admin routes */}
        <Route path='/admin' element={<Admindash />} />
        <Route path='/add-product' element={<AddProduct />} />

        {/* Payment */}
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />

      </Routes>
      <Toaster />
    </>
  );
}

export default App;
