import React, { useState } from "react";
import { Minus, Plus, Trash2, CreditCard, X } from "lucide-react";

const Checkout = ({ cart, setCart, buyerId, showToast }) => {
  const BASE_URL = "http://localhost:5000";
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Update quantity in cart with stock check
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

  // Remove from cart
  const removeFromCart = async (productId, productName) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cart/${buyerId}/${productId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove from cart");
      const updatedCart = await res.json();
      setCart(updatedCart.filter(item => item.product));
      showToast(`${productName} removed from cart!`, "error");
    } catch (err) {
      console.error(err);
      showToast("Failed to remove product.", "error");
    }
  };

  // Calculate total
  const calculateTotal = () =>
    cart.filter(item => item.product).reduce((total, item) => total + item.quantity * (item.product.price ?? 0), 0);

  // Place order & update stock
  const placeOrder = async () => {
    setShowConfirm(false);
    setLoading(true);
    try {
      const orderItems = cart.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const totalAmount = calculateTotal();

      // Create order
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyer: buyerId, items: orderItems, totalAmount }),
      });
      if (!res.ok) throw new Error("Failed to place order");

      // **Update product inventory in backend**
      await Promise.all(orderItems.map(item =>
        fetch(`${BASE_URL}/api/products/${item.product}/update-stock`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantitySold: item.quantity }),
        })
      ));

      // Clear cart
      await fetch(`${BASE_URL}/api/cart/${buyerId}/clear`, { method: "DELETE" });
      setCart([]);
      showToast("Order placed successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Checkout</h2>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow relative">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Checkout</h2>

      <div className="space-y-4">
        {cart.filter(item => item.product).map(item => {
          const prod = item.product;
          return (
            <div key={prod._id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={prod.image ? `${BASE_URL}${prod.image}` : "/images/products/placeholder.svg"}
                  alt={prod.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{prod.name}</h3>
                  <p className="text-gray-500">₹{prod.price}</p>
                  <p className="text-sm text-gray-500">Available: {prod.quantity}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
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
                    item.quantity >= prod.quantity ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
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

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total:</span>
          <span>₹{calculateTotal()}</span>
        </div>

        <button
          onClick={() => setShowConfirm(true)}
          disabled={loading}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <CreditCard size={20} /> {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative shadow-lg">
            <button onClick={() => setShowConfirm(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Confirm Order</h3>
            <p className="mb-6">Are you sure you want to place this order?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">No</button>
              <button onClick={placeOrder} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
