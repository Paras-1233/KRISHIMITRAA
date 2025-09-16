import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={product.image} // Use resized images
          alt={product.name}
          loading="lazy"   // lazy load
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-green-700">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.availability}</p>
        <p className="text-green-700 font-bold mt-1">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
