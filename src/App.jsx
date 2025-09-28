import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import all necessary pages and components
import Home from './pages/Home';
import AdminDashboard from './features/Admin/AdminDashoard';
import BuyerDashboard from './features/buyer/BuyerDashboard';
import LoginPage from './features/auth/Login';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CardPage';
import NotFound from './pages/NotFound';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Contact from './pages/Contact';
import BuyerSignup from './features/auth/BuyerSignup';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  // Handle login redirection
  const handleLoginRedirect = (path) => {
    closeLogin();
    navigate(path); // Navigate immediately after modal closes
  };

  return (
    <>
      <Header onLoginClick={openLogin} />

      <Routes>
        <Route path="/" element={<Home openLogin={openLogin} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/all-products" element={<ProductListPage />} />
        <Route path="/products" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<BuyerSignup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Login modal */}
      {showLogin && <LoginPage onClose={handleLoginRedirect} />}

      <Footer />
    </>
  );
};

export default App;
