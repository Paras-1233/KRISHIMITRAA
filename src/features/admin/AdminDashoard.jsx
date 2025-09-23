import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import AdminProductList from './AdminProductList';
import AdminProfile from './AdminProfile';
import AdminAnalytics from './AdminAnalytics';

import {
  Boxes, LogOut, User, PlusSquare,
  LayoutDashboard, ChevronLeft, ChevronRight
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem('adminProducts')) || [];
  });

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('loggedInAdmin') === 'true';
    if (!isAdminLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
    localStorage.setItem('allProducts', JSON.stringify([...allProducts, newProduct]));
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);

    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
    const updatedAllProducts = allProducts.filter((p) => p.id !== productId);
    localStorage.setItem('allProducts', JSON.stringify(updatedAllProducts));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInAdmin');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#f7fdf7]">
      <div
        className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-12'} bg-white border-r border-gray-200 shadow-lg p-2`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 text-gray-600 hover:text-green-600"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {sidebarOpen && (
          <div className="space-y-4 mt-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${
                activeTab === 'dashboard' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('add')}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${
                activeTab === 'add' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
              }`}
            >
              <PlusSquare size={18} />
              Add Product
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${
                activeTab === 'profile' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
              }`}
            >
              <User size={18} />
              Profile
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${
                activeTab === 'analytics' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
              }`}
            >
              <Boxes size={18} />
              Analytics
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 p-6">
        {activeTab === 'analytics' && <AdminAnalytics />}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-700">🌾 Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your management panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
            <h3 className="text-sm text-gray-500">Total Products</h3>
            <p className="text-2xl font-bold text-green-700">{products.length}</p>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-2xl text-green-800 font-semibold mb-4">🛒 Your Products</h2>
            {products.length === 0 ? (
              <p className="text-gray-500">You haven’t listed any products yet.</p>
            ) : (
              <AdminProductList products={products} onDelete={handleDeleteProduct} />
            )}
          </div>
        )}

        {activeTab === 'add' && <AddProduct onAdd={handleAddProduct} />}
        {activeTab === 'profile' && <AdminProfile />}
      </div>
    </div>
  );
};

export default AdminDashboard;


