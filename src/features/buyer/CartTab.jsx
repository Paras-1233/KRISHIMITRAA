import React, { useState } from "react";
import { Minus, Plus, Trash2, CreditCard } from "lucide-react";

const CartTab = ({ cart = [], setCart, buyerId, showToast }) => {
  const BASE_URL = "http://localhost:5000";

  const [expandedItems, setExpandedItems] = useState({}); // Track expanded description

  const toggleDescription = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateQuantity = async (productId, newQuantity, maxQuantity) => {
    if (newQuantity < 1 || newQuantity > maxQuantity) {
      showToast(`Cannot exceed available stock (${maxQuantity})`, "error");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/cart/${buyerId}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      const updatedCart = await res.json();
      setCart(updatedCart.filter(item => item.product));
    } catch (err) {
      console.error(err);
      showToast("Failed to update quantity", "error");
    }
  };

  const removeFromCart = async (productId, productName) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cart/${buyerId}/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove from cart");
      const updatedCart = await res.json();
      setCart(updatedCart.filter(item => item.product));
      showToast(`${productName} removed from cart!`, "error");
    } catch (err) {
      console.error(err);
      showToast("Failed to remove product.", "error");
    }
  };

  const calculateTotal = () =>
    cart
      .filter(item => item.product)
      .reduce((total, item) => total + item.quantity * (item.product.price ?? 0), 0);

  if (!cart.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Cart</h2>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cart.filter(item => item.product).map(item => {
          const prod = item.product;
          const isExpanded = expandedItems[prod._id] || false;
          const shortDesc = prod.description?.slice(0, 60);

          return (
            <div
              key={prod._id}
              className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg h-48"
            >
              {/* Image and Info */}
              <div className="flex items-center gap-4 md:flex-1">
                <img
                  src={prod.image ? `${BASE_URL}${prod.image}` : "/images/products/placeholder.svg"}
                  alt={prod.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex flex-col justify-between h-24">
                  <h3 className="font-semibold text-sm md:text-base">
                    {prod.name.length > 20 ? (
                      <span>
                        {isExpanded ? prod.name : prod.name.slice(0, 20) + "..."}
                        <button
                          onClick={() => toggleDescription(prod._id)}
                          className="text-blue-500 ml-1 text-xs"
                        >
                          {isExpanded ? "Less" : "More"}
                        </button>
                      </span>
                    ) : (
                      prod.name
                    )}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {prod.description.length > 60 ? (
                      <span>
                        {isExpanded ? prod.description : shortDesc + "..."}
                        <button
                          onClick={() => toggleDescription(prod._id)}
                          className="text-blue-500 ml-1 text-xs"
                        >
                          {isExpanded ? "Less" : "More"}
                        </button>
                      </span>
                    ) : (
                      prod.description
                    )}
                  </p>
                  <p className="text-gray-500 text-sm">Available: {prod.quantity}</p>
                  <p className="text-green-600 font-bold text-base">₹{prod.price}</p>
                </div>
              </div>

              {/* Quantity / Remove */}
              <div className="flex items-center gap-2 mt-3 md:mt-0">
                <button
                  onClick={() => updateQuantity(prod._id, item.quantity - 1, prod.quantity)}
                  className="p-2 bg-gray-200 rounded"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(prod._id, item.quantity + 1, prod.quantity)}
                  className={`p-2 rounded text-white ${
                    item.quantity >= prod.quantity
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={item.quantity >= prod.quantity}
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeFromCart(prod._id, prod.name)}
                  className="p-2 text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Total and Checkout */}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total:</span>
          <span>₹{calculateTotal()}</span>
        </div>
        <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2">
          <CreditCard size={20} /> Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTab;
