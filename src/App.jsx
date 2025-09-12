import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import SellerDashboard from './features/seller/SellerDashboard';
import BuyerDashboard from './features/buyer/BuyerDashboard';
import LoginPage from './features/auth/Login';

const App = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = React.useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => {
    setShowLogin(false);
    // Optionally navigate somewhere else after closing login modal if needed
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home openLogin={openLogin} />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        {/* Instead of rendering login page as route, render home or something else */}
      </Routes>

      {/* Render login as modal, conditionally */}
      {showLogin && <LoginPage onClose={closeLogin} />}
    </>
  );
};

export default App;
