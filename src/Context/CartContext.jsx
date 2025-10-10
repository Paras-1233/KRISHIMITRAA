import React, { createContext, useState, useEffect } from "react";

// Create Context
export const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [buyer, setBuyer] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("buyerToken") || "");
  const [cart, setCart] = useState([]);

  const BASE_URL = "http://localhost:5000";

  // Load buyer from localStorage if available
  useEffect(() => {
    if (token) {
      try {
        const savedBuyer = JSON.parse(localStorage.getItem("buyer"));
        if (savedBuyer) setBuyer(savedBuyer);
      } catch (err) {
        console.error("Error loading buyer:", err);
      }
    }
  }, [token]);

  // Save buyer and token to localStorage
  useEffect(() => {
    if (buyer && token) {
      localStorage.setItem("buyer", JSON.stringify(buyer));
      localStorage.setItem("buyerToken", token);
    } else {
      localStorage.removeItem("buyer");
      localStorage.removeItem("buyerToken");
    }
  }, [buyer, token]);

  // Fetch cart items
  const fetchCart = async () => {
    if (!buyer || !token) return;
    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    if (!buyer || !token) return;
    try {
      const res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      await fetchCart(); // refresh cart
    } catch (err) {
      console.error(err);
    }
  };

  // Update cart item quantity
  const updateCartQuantity = async (productId, quantity) => {
    if (!buyer || !token) return;
    try {
      const res = await fetch(`${BASE_URL}/api/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to update cart");
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    if (!buyer || !token) return;
    try {
      const res = await fetch(`${BASE_URL}/api/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error("Failed to remove from cart");
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        buyer,
        setBuyer,
        token,
        setToken,
        cart,
        fetchCart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
