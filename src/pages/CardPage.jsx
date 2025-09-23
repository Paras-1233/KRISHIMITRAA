import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { ShoppingCart, Trash2, Plus, Minus, CreditCard, ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Load cart from localStorage or initialize empty
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    
    // Initialize quantities
    const initialQuantities = {};
    savedCart.forEach(item => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Remove from quantities
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[itemId];
      return newQuantities;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      const quantity = quantities[item.id] || 1;
      return total + (price * quantity);
    }, 0);
  };

  const handleBuyNow = () => {
    // For now, just show an alert. In a real app, this would redirect to checkout
    alert('Redirecting to checkout... (This will be implemented in the backend)');
  };

  const goBack = () => {
    navigate(-1);
  };

  if (cart.length === 0) {
    return (
      <>
      
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <ShoppingCart size={64} className="mx-auto text-gray-400 mb-6" />
              <h2 className="text-3xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-8">Add some products to get started!</p>
              <button
                onClick={() => navigate('/all-products')}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      
      </>
    );
  }

  return (
    <>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            </div>
            <div className="text-sm text-gray-500">
              {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = '/images/products/placeholder.svg';
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <p className="text-green-600 font-bold text-lg">{item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">
                          {quantities[item.id] || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition p-2"
                        title="Remove from cart"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => {
                    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
                    const quantity = quantities[item.id] || 1;
                    const itemTotal = price * quantity;
                    
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} x{quantity}</span>
                        <span className="font-medium">₹{itemTotal.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2 mb-4"
                >
                  <CreditCard size={20} />
                  Buy Now
                </button>

                <button
                  onClick={() => navigate('/all-products')}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default CartPage;
