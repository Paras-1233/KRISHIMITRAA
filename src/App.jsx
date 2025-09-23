// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

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

const App = () => {
  // State for the login modal
  const [showLogin, setShowLogin] = useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  return (
    <>
    <Header onLoginClick={openLogin} /> 
  
      <Routes>
        {/* The Home route passes the function to open the login modal */}
        <Route path="/" element={<Home openLogin={openLogin} />} />

        {/* Routes for existing dashboards */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />

        {/* Routes for the new product pages */}
        <Route path="/all-products" element={<ProductListPage />} />
        <Route path="/products" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
            <Route path="/Contact" element={<Contact/>} />

        {/* A catch-all route for any undefined paths (404 Page) */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* This renders the login page as a modal only when showLogin is true */}
      {showLogin && <LoginPage onClose={closeLogin} />}
      <Footer/>
    </>
  );
};

export default App;