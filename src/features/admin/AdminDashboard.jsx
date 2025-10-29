import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import AdminProductList from './AdminProductList';
import AdminProfile from './AdminProfile';
import AdminAnalytics from './AdminAnalytics';
import AdminUserManagement from './AdminUserManagement';
import Inventory from './Inventory'; 
import {
  Boxes,
  LogOut,
  User,
  PlusSquare,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Archive,
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const BASE_URL = 'http://localhost:5000';

  // Check admin login
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) navigate('/');
  }, [navigate]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const handleAddProduct = async (newProduct) => {
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      const res = await fetch(`${BASE_URL}/api/products`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to add/reactivate product');
      await fetchProducts();
      setActiveTab('dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  // Mark product unavailable
  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: false }),
      });
      if (!res.ok) throw new Error('Failed to mark product unavailable');

      // Update local state
      setProducts(prev =>
        prev.map(p => (p._id === productId ? { ...p, available: false } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Update product after edit
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/');
  };

  // Sidebar menu items
  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, tab: 'dashboard' },
    { label: 'Add Product', icon: <PlusSquare size={18} />, tab: 'add' },
    { label: 'Inventory', icon: <Archive size={18} />, tab: 'inventory' },
    { label: 'Profile', icon: <User size={18} />, tab: 'profile' },
    { label: 'Analytics', icon: <Boxes size={18} />, tab: 'analytics' },
    { label: 'Users', icon: <User size={18} />, tab: 'users' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7fdf7]">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-12'} bg-white border-r border-gray-200 shadow-lg p-2`}>
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
            {menuItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${
                  activeTab === item.tab ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50">
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
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

        {/* Render Tabs */}
        {activeTab === 'dashboard' && (
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-2xl text-green-800 font-semibold mb-4">🛒 Your Products</h2>
            {products.length === 0 ? (
              <p className="text-gray-500">No products yet.</p>
            ) : (
              <AdminProductList
                products={products}
                onDelete={handleDeleteProduct}
                onUpdate={handleUpdateProduct}
              />
            )}
          </div>
        )}

        {activeTab === 'add' && <AddProduct onAdd={handleAddProduct} />}
        {activeTab === 'profile' && <AdminProfile />}
        {activeTab === 'analytics' && <AdminAnalytics />}
        {activeTab === 'users' && <AdminUserManagement />}
        {activeTab === 'inventory' && <Inventory refreshTrigger={products} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
