// src/pages/ProductDetailPage.jsx
import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { productData } from '../data/productData';


import NotFound from './NotFound'; // Import your 404 component

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const productName = searchParams.get("name");

  const product = productData.find(p => p.name === productName);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newItem = { ...product, id: Date.now(), quantity };
    const updatedCart = [...cart, newItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  if (!product) {
    return <NotFound />; // Show a 404 page if product doesn't exist
  }

  return (
    <>
     
      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Image & description */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded" />
              <div>
                <h2 className="text-3xl font-bold text-green-700">{product.name}</h2>
                <p className="mt-3 text-gray-700">{product.description}</p>
                <p className="mt-2"><strong>Usage:</strong> {product.usage}</p>
              </div>
            </div>

            {/* Right: Purchase card */}
            <div className="border rounded-lg shadow p-4 space-y-3">
              <p className="text-2xl font-bold">{product.price}</p>
              {product.deliveryDate && <p className="text-sm">Delivery on <span className="font-semibold">{product.deliveryDate}</span></p>}
              {product.location && <p className="text-sm">Delivering to {product.location}</p>}
              
              <p className="text-green-700 font-semibold">In stock</p>
              <p className="text-sm"><strong>Ships from:</strong> KrishiMitra</p>
              {product.seller && <p className="text-sm"><strong>Sold by:</strong> {product.seller}</p>}

              <select 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border rounded p-2 w-full"
              >
                <option value={1}>Quantity: 1</option>
                <option value={2}>Quantity: 2</option>
                <option value={3}>Quantity: 3</option>
                <option value={4}>Quantity: 4</option>
                <option value={5}>Quantity: 5</option>
              </select>

              <button 
                onClick={addToCart}
                className="bg-yellow-400 w-full py-2 rounded hover:bg-yellow-500 font-medium"
              >
                Add to Cart
              </button>
              <button 
                onClick={buyNow}
                className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600 font-medium"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </main>
     
    </>
  );
};

export default ProductDetailPage;