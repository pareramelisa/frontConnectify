import isoLogo from "./assets/logo.svg";
import connectifyLogo from "/connectify.svg";
import "./App.css";
import {
  Landing,
  Home,
  LoginClient,
  RegistrationClient,
  DetailExpertAds,
  BuyPage,
  SuccessPay,
  AccountClient,
  PurchasesHistory,
  Favorites,
} from "./views/indexViews";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/NavPreview";
import React from "react";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/"; // Comprueba si estás en la página de inicio

  return (
    <>
      {isLandingPage ? ( // Renderiza la barra de navegación solo si no estás en la página de inicio
        <>
          <img src={connectifyLogo} alt="Logo" className="logo" />
          <img src={isoLogo} alt="Logo" className="logo" />
        </>
      ) : (
        <Navbar />
      )}
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginClient />} />
          <Route path="/registrationClients" element={<RegistrationClient />} />
          <Route path="/detail/:profesional_id" element={<DetailExpertAds />} />
          <Route path="/buyPage/:profesional_id" element={<BuyPage />} />
          <Route path="/successPay" element={<SuccessPay />} />
          <Route path="/accountClient" element={<AccountClient />} />
          <Route path="/purchases" element={<PurchasesHistory />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
