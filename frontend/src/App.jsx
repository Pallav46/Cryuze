import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useAuthContext } from './context/AuthContext';
import { useAuth } from './context/ProviderAuthContext';

import Login from './pages/user/login/Login';
import Home from './pages/user/home/Home';
import ProviderLogin from './pages/provider/login/ProviderLogin';
import ProviderSignup from './pages/provider/signup/ProviderSignup';
import ProviderHome from './pages/provider/home/ProviderHome';
import ProviderEditservice from './pages/provider/home/ProviderEditservice';
import ProviderChatt from './pages/provider/home/ProviderChatt';
import Providernoti from './pages/provider/home/Providernoti';
import Signup from './pages/user/signup/Signup';
import BuyService from './pages/user/service/BuyService';
import ChattService from './pages/user/service/ChattService';
import Profile from './pages/user/service/Profile';
import Messages from './components/provider/Messages';
import ChatSkleton from './pages/user/chat/ChatSkleton';
import Chatting from './pages/user/chat/Chatting';
import Admindash from './pages/admin/Admindash';
import Allservices from './pages/admin/Allservices';
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
import AdminEditService from './pages/admin/Admineditservice';
import ChatSkletonProvider from './components/provider/ChatSkletonProvider';
import Chattingprovider from './components/provider/Chattingprovider.jsx';

function App() {
  const { authUser } = useAuthContext();
  const { authToken } = useAuth();

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
  
        <Route path='/chat' element={authUser ? <ChatSkleton /> : <Navigate to='/login' />} />
        <Route path='/chat/:providerId' element={authUser ? <Chatting /> : <Navigate to='/login' />} />
        <Route path='/service/:id' element={<Subcategories />} />
        <Route path='/service/:id/buy/:subcatId' element={authUser ? <BuyService /> : <Navigate to='/login' />} />
        <Route path='/service/:id/buy/:subcatId/chat/:providerId'  element={authUser ? <ChattService /> : <Navigate to='/login' />} />
        <Route path='/service/:id/buy/:subcatId/profile/:providerId'  element={authUser ? <Profile /> : <Navigate to='/login' />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/providers/login' element={<ProviderLogin />} />
        <Route path='/providers/register' element={<ProviderSignup />} />
        
        <Route path='/providers/dashboard' element={authToken ? <ProviderHome /> : <Navigate to='/providers/login' />} />
        <Route path='/providers/services' element={authToken ? <ProviderEditservice /> : <Navigate to='/providers/login' />} />
        <Route path='/providers/chat' element={authToken ? <ChatSkletonProvider /> : <Navigate to='/providers/login' />} />
        <Route path='/providers/myWork' element={authToken ? <MyWork /> : <Navigate to='/providers/login' />} />
        <Route path='/providers/work/:workId' element={authToken ? <Work /> : <Navigate to='/providers/login' />} />
        <Route path='/providers/chat/:customerId' element={authToken ? <Chattingprovider /> : <Navigate to='/providers/login' />} />
        <Route path='/providers/notifi' element={authToken ? <Providernoti /> : <Navigate to='/providers/login' />} />
        
        {/* Admin routes */}
        <Route path='/admin' element={<Admindash />} />
        <Route path='/admin/allservices' element={<Allservices />} />
        <Route path='/admin/editservices' element={<AdminEditService />} />
        <Route path='/add-product' element={<AddProduct />} />

        {/* Payment */}
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
