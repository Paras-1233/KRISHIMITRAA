// src/context/CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  const saveCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const addToCart = (item) => {
    const exists = cart.find(i => i.id === item.id);
    if (!exists) {
      saveCart([...cart, { ...item, quantity: 1 }]);
    } else {
      saveCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    }
  };

  const removeFromCart = (id) => {
    saveCart(cart.filter(i => i.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    saveCart(cart.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => saveCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
