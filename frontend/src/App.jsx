import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import { useAuth } from './context/ProviderAuthContext';
import ProviderHistory from './pages/provider/history/ProviderHistory';
import ProviderLogout from './pages/provider/login/ProviderLogout';

const Home = lazy(() => import('./pages/user/home/Home'));
const Login = lazy(() => import('./pages/user/login/Login'));
const Logout = lazy(() => import('./components/user/auth/Logout'));
const MyOrders = lazy(() => import('./pages/user/order/MyOrders'));
const AllOrders = lazy(() => import('./pages/user/order/AllOrders'));
const Order = lazy(() => import('./pages/user/order/Order'));
const History = lazy(() => import('./pages/user/order/History'));
const ChatSkleton = lazy(() => import('./pages/user/chat/ChatSkleton'));
const Chatting = lazy(() => import('./pages/user/chat/Chatting'));
const Subcategories = lazy(() => import('./pages/user/Subcategories/Subcategories'));
const BuyService = lazy(() => import('./pages/user/service/BuyService'));
const ChattService = lazy(() => import('./pages/user/service/ChattService'));
const Profile = lazy(() => import('./pages/user/service/Profile'));
const Signup = lazy(() => import('./pages/user/signup/Signup'));
const ProviderLogin = lazy(() => import('./pages/provider/login/ProviderLogin'));
const ProviderSignup = lazy(() => import('./pages/provider/signup/ProviderSignup'));
const ProviderHome = lazy(() => import('./pages/provider/home/ProviderHome'));
const ProviderEditservice = lazy(() => import('./pages/provider/home/ProviderEditservice'));
const ChatSkletonProvider = lazy(() => import('./components/provider/ChatSkletonProvider'));
const Chattingprovider = lazy(() => import('./components/provider/Chattingprovider'));
const Providernoti = lazy(() => import('./pages/provider/home/Providernoti'));
const Admindash = lazy(() => import('./pages/admin/Admindash'));
const Allservices = lazy(() => import('./pages/admin/Allservices'));
const AddProduct = lazy(() => import('./pages/admin/Adminaddservice'));
const AdminEditService = lazy(() => import('./pages/admin/Admineditservice'));
const PaymentSuccess = lazy(() => import('./pages/user/payment/PaymentSuccess'));
const Messages = lazy(() => import('./components/provider/Messages'));
const MyWork = lazy(() => import('./pages/provider/work/MyWork'));
const Work = lazy(() => import('./pages/provider/work/Work'));

const UserProfile = lazy(() => import('./pages/user/profile/UserProfile'))
const About = lazy(() => import('./pages/user/about/About'));


function App() {
  const { authUser } = useAuthContext();
  const { authToken } = useAuth();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/myOrders' element={<MyOrders />} />
          <Route path='/allOrders' element={<AllOrders />} />
          <Route path='/order/:orderId' element={<Order />} />
          <Route path='/history' element={<History />} />
          <Route path='/provider/:providerId' element={<Profile />} />

          <Route path='/profile' element={<UserProfile/>}/>
          <Route path='/about' element={<About/>} />

          <Route path='/chat' element={authUser ? <ChatSkleton /> : <Navigate to='/login' />} />
          <Route path='/chat/:providerId' element={authUser ? <Chatting /> : <Navigate to='/login' />} />
          <Route path='/service/:id' element={<Subcategories />} />
          <Route path='/service/:id/buy/:subcatId' element={authUser ? <BuyService /> : <Navigate to='/login' />} />
          <Route path='/service/:id/buy/:subcatId/chat/:providerId'  element={authUser ? <ChattService /> : <Navigate to='/login' />} />
          <Route path='/service/:id/buy/:subcatId/profile/:providerId'  element={authUser ? <Profile /> : <Navigate to='/login' />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/providers/login' element={<ProviderLogin />} />
          <Route path='/providers/logout' element={<ProviderLogout />} />
          <Route path='/providers/register' element={<ProviderSignup />} />

          <Route path='/providers/dashboard' element={authToken ? <ProviderHome /> : <Navigate to='/providers/login' />} />
          <Route path='/providers/services' element={authToken ? <ProviderEditservice /> : <Navigate to='/providers/login' />} />
          <Route path='/providers/chat' element={authToken ? <ChatSkletonProvider /> : <Navigate to='/providers/login' />} />
          <Route path='/providers/myWork' element={authToken ? <MyWork /> : <Navigate to='/providers/login' />} />
          <Route path='/providers/history' element={authToken ? <ProviderHistory /> : <Navigate to='/providers/login' />} />
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
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
