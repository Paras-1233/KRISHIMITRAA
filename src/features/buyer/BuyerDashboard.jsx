import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productData } from '../../data/productData';
import {
  ShoppingCart, User, LogOut, Search,
  LayoutDashboard, ChevronLeft, ChevronRight
} from 'lucide-react';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const buyer = JSON.parse(localStorage.getItem('loggedInBuyer'));
    if (!buyer) navigate('/');

    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, [navigate]);

  const categories = ['all', 'cereals', 'grains', 'farming-equipment', 'fertilizers', 'seeds', 'pesticides', 'irrigation-tools', 'soil-enhancers'];

  const filteredProducts = productData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const newCart = [...cart, { ...product, id: Date.now() }];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInBuyer');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-12'} bg-white border-r border-gray-200 shadow-lg p-2`}>
        <div className="flex justify-end">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 text-gray-600 hover:text-green-600">
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {sidebarOpen && (
          <div className="space-y-4 mt-4">
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${activeTab === 'dashboard' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}>
              <LayoutDashboard size={18} /> Dashboard
            </button>

            <button onClick={() => setActiveTab('products')} className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${activeTab === 'products' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}>
              <ShoppingCart size={18} /> Products
            </button>

            <button onClick={() => navigate('/cart')} className="flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg hover:bg-gray-100">
              <ShoppingCart size={18} /> Cart ({cart.length})
            </button>

            <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${activeTab === 'profile' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}>
              <User size={18} /> Profile
            </button>

            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50">
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-700">🛒 Buyer Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your shopping panel</p>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
              <h3 className="text-sm text-gray-500">Cart Items</h3>
              <p className="text-2xl font-bold text-green-700">{cart.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
              <h3 className="text-sm text-gray-500">Total Products</h3>
              <p className="text-2xl font-bold text-blue-700">{productData.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-500">
              <h3 className="text-sm text-gray-500">Categories</h3>
              <p className="text-2xl font-bold text-yellow-700">{categories.length - 1}</p>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="mb-6 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" onError={(e) => e.target.src = '/images/products/placeholder.svg'} />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <p className="text-green-600 font-bold text-lg">{product.price}</p>
                    <button onClick={() => addToCart(product)} className="w-full mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Profile</h2>
            <p className="text-gray-600">Profile management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
