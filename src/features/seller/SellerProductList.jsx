import React from 'react';
import { Link } from 'react-router-dom';

const SellerProductList = ({ products, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between items-center transition-all transform hover:scale-105 hover:shadow-xl"
        >
          {/* Product Image */}
          <div className="w-full h-48 mb-4 overflow-hidden rounded-xl">
            <img
              src={product.image || '/path/to/default-image.jpg'} // Fallback image
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-700 mb-2">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
            <p className="text-lg font-bold text-green-600">₹{product.price}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-between w-full">
            {/* View Product Detail */}
            <Link
              to={`/product/${product.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all"
            >
              View Details
            </Link>

            {/* Delete Product Button */}
            <button
              onClick={() => onDelete(product.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerProductList;