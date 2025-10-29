import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import all necessary pages and components
import Home from './Pages/home';
import AdminDashboard from './features/Admin/AdminDashboard';
import BuyerDashboard from './features/Buyer/BuyerDashboard';
import LoginPage from './features/Auth/Login';
import ProductListPage from './Pages/ProductListPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import CartPage from './Pages/CardPage';
import NotFound from './pages/NotFound';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Contact from './Pages/Contact';
import BuyerSignup from './features/Auth/BuyerSignup';
import GovSchemes from './Pages/GovScheme';
import About from './Pages/About';

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
        <Route path="/gov-schemes" element={<GovSchemes />} />
        <Route path='/about' element={<About/>} />
      </Routes>

      {/* Login modal */}
      {showLogin && <LoginPage onClose={handleLoginRedirect} />}

      <Footer />
    </>
  );
};

export default App;
