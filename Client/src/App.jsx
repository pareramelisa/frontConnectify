import './App.css';
import { useSelector} from 'react-redux'; 
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/NavPreview';
import Landing from './components/Landing/Landing';
import {
  Home,
  LoginClient,
  RegistrationClient,
  DetailExpertAds,
  BuyPage,
  SuccessPay,
  AccountClient,
  PurchasesHistory,
  Favorites,
  LoginExpert,
  RegistrationExpert,
  ProfileExpertCreate,
  AdsCreate,
  AdsEdit,
  ProfileExpert,
  ProfileExpertEdit,
  LoginAdmin,
  Dashboard
} from "./views/indexViews";

function App() {
  const userRole = useSelector((state) => state.usersLogin.user); 
  const location = useLocation();
  const isLandingPage = location.pathname === '/'; 


  const roleRoutes = {
    client: (
      <>
        <Route path="/client/favorites" element={<Favorites />} />
        <Route path="/client/detail/:profesional_id" element={<DetailExpertAds />} />
        <Route path="/client/buyPage/:profesional_id" element={<BuyPage />} />
        <Route path="/client/successPay" element={<SuccessPay />} />
        <Route path="/client/account" element={<AccountClient />} />
        <Route path="/client/purchases" element={<PurchasesHistory />} />
      </>
    ),
    expert: (
      <>
        <Route path="/professional/profileCreate" element={<ProfileExpertCreate />} />
        <Route path="/professional/adsCreate" element={<AdsCreate />} />
        <Route path="/professional/adsEdit/:ad_id" element={<AdsEdit />} />
        <Route path="/professional/profile" element={<ProfileExpert />} />
        <Route path="/professional/profileEdit" element={<ProfileExpertEdit />} />
      </>
    ),
    admin: (
      <>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </>
    )
  };

  // Comprueba si estás en la página de inicio

  return (
    <>
      {isLandingPage ? null : <Navbar role={userRole} />}
      <div className="App">
        <Routes>
          <Route path="/" element={Landing} />
          <Route path="/home" element={<Home />} />
          <Route path="/client/login" element={<LoginClient />} />
          <Route path="/client/registration" element={<RegistrationClient />} />
          <Route path="/professional/login" element={<LoginExpert />} />
          <Route path="/professional/registration" element={<RegistrationExpert />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          {roleRoutes[userRole]}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
