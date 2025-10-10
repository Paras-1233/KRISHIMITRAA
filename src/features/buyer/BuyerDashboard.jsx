import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout"; // adjust path if needed
import {
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

const BASE_URL = "http://localhost:5000";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [descToggles, setDescToggles] = useState({});

  const categories = [
    "all",
    "Tools",
    "Seeds",
    "Fertilizers",
    "Machinery",
    "Cereals",
    "Grains",
    "Pesticides",
    "Vegetables",
  ];

  const buyer = JSON.parse(localStorage.getItem("loggedInBuyer"));
  const buyerId = buyer?._id;

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch cart
  const fetchCart = async () => {
    if (!buyerId) return;
    try {
      const res = await fetch(`${BASE_URL}/api/cart/${buyerId}`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data.filter((item) => item.product));
    } catch (err) {
      console.error(err);
    }
  };

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2000);
  };

  // Add to cart with stock check
  const addToCart = async (product) => {
    if (!buyerId) {
      navigate("/login");
      return;
    }
    if (!product.available) {
      showToast("Product is unavailable!", "error");
      return;
    }

    const existingItem = cart.find((item) => item.product._id === product._id);
    const currentQtyInCart = existingItem ? existingItem.quantity : 0;

    if (currentQtyInCart + 1 > product.quantity) {
      showToast(`Only ${product.quantity} units available!`, "error");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/cart/${buyerId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          quantity: currentQtyInCart + 1,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      const updatedCart = await res.json();
      setCart(updatedCart.filter((item) => item.product));
      showToast(`${product.name} added to cart!`, "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to add product.", "error");
    }
  };

  // Update cart quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const res = await fetch(`${BASE_URL}/api/cart/${buyerId}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      const updatedCart = await res.json();
      setCart(updatedCart.filter((item) => item.product));
    } catch (err) {
      console.error(err);
      showToast("Failed to update quantity", "error");
    }
  };

  // Remove from cart
  const removeFromCart = async (productId, productName) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cart/${buyerId}/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove from cart");
      const updatedCart = await res.json();
      setCart(updatedCart.filter((item) => item.product));
      showToast(`${productName} removed from cart!`, "error");
    } catch (err) {
      console.error(err);
      showToast("Failed to remove product.", "error");
    }
  };

  // Calculate total
  const calculateTotal = () =>
    cart.reduce(
      (total, item) => total + item.quantity * (item.product.price ?? 0),
      0
    );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInBuyer");
    navigate("/");
  };

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Fetch data on mount
  useEffect(() => {
    if (!buyerId) {
      navigate("/login");
      return;
    }
    fetchProducts();
    fetchCart();
  }, [buyerId, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-12"
        } bg-white border-r border-gray-200 shadow-lg p-2`}
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
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${
                activeTab === "dashboard"
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${
                activeTab === "products"
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <ShoppingCart size={18} /> Products
            </button>
            <button
              onClick={() => setActiveTab("cart")}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${
                activeTab === "cart"
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <ShoppingCart size={18} /> Cart ({cart.length})
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg ${
                activeTab === "profile"
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <User size={18} /> Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        {/* Toast */}
        {toast.message && (
          <div
            className={`fixed top-4 right-4 px-4 py-2 rounded shadow z-50 ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.message}
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-700">🛒 Buyer Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome, {buyer?.name || "Buyer"}</p>
        </div>

        {/* Dashboard Stats */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
              <h3 className="text-sm text-gray-500">Cart Items</h3>
              <p className="text-2xl font-bold text-green-700">{cart.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
              <h3 className="text-sm text-gray-500">Total Products</h3>
              <p className="text-2xl font-bold text-blue-700">{products.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-500">
              <h3 className="text-sm text-gray-500">Categories</h3>
              <p className="text-2xl font-bold text-yellow-700">
                {categories.length - 1}
              </p>
            </div>
          </div>
        )}

        {/* Products Tab */}
       
{activeTab === "products" && (
  <div className="bg-white p-6 rounded-xl shadow">
    <div className="mb-6 flex gap-4">
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "all" ? "All Categories" : cat}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => {
        const isExpanded = descToggles[product._id] || false;

        return (
          <div
            key={product._id}
            className={`bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition relative ${
              !product.available ? "opacity-50" : ""
            }`}
          >
            <img
              src={
                product.image
                  ? `${BASE_URL}${product.image}`
                  : "/images/products/placeholder.svg"
              }
              alt={product.name}
              className="w-full h-48 mb-4 overflow-hidden rounded-t-lg object-contain bg-gray-100"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

              <p className="text-gray-600 text-sm mb-2">
                {isExpanded
                  ? product.description
                  : product.description.length > 80
                  ? product.description.substring(0, 80) + "..."
                  : product.description}
                {product.description.length > 80 && (
                  <span
                    onClick={() =>
                      setDescToggles((prev) => ({
                        ...prev,
                        [product._id]: !prev[product._id],
                      }))
                    }
                    className="text-green-600 cursor-pointer ml-1"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </span>
                )}
              </p>

              <p className="text-green-600 font-bold text-lg">
                ₹{product.price} {product.unit ? `per ${product.unit}` : ""}
              </p>
              <p className="text-sm text-gray-600">Stock: {product.quantity}</p>
              <button
                disabled={!product.available}
                onClick={() => addToCart(product)}
                className={`w-full mt-3 py-2 rounded ${
                  product.available
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-400 cursor-not-allowed text-gray-200"
                }`}
              >
                {product.available ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}

        {/* Cart / Checkout */}
        {activeTab === "cart" && (
          <Checkout
            cart={cart}
            setCart={setCart}
            buyerId={buyerId}
            showToast={showToast}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            calculateTotal={calculateTotal}
          />
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Profile</h2>
            <p className="text-gray-600">
              Name: {buyer?.name} <br /> Email: {buyer?.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
