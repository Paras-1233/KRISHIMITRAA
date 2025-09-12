// src/components/product/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  const {
    name = 'Unnamed Product',
    availability = 'Availability unknown',
    price = 'Price not available',
    image = '/placeholder.jpg', // use a local fallback if needed
  } = product || {};

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden border border-gray-200">
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover"
        onError={(e) => {
          e.target.src = '/placeholder.jpg'; // optional fallback
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{name}</h3>
        <p className="text-gray-500 text-sm mb-2">{availability}</p>
        <p className="text-green-600 font-bold">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
