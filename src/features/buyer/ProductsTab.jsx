// ProductsTab.jsx
import React, { useState } from "react";
import { BASE_URL } from "../constants"; // define BASE_URL in a separate file or replace here
import { Search } from "lucide-react";

const ProductsTab = ({
  products,
  cart,
  addToCart,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories = [
    "all",
    "Tools",
    "Seeds",
    "Fertilizers",
    "Machinery",
    "Cereals",
    "Grains",
    "Pesticides",
    "Vegetables",
  ],
}) => {
  const [expandedDesc, setExpandedDesc] = useState({});

  const toggleDescription = (id) => {
    setExpandedDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* Search & Category Filter */}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isExpanded = expandedDesc[product._id];
          const desc = product.description || "";
          const shortDesc = desc.length > 100 ? desc.slice(0, 100) + "..." : desc;

          return (
            <div
              key={product._id}
              className={`bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition relative ${
                !product.available ? "opacity-50" : ""
              } flex flex-col`}
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
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 flex-1">
                  {isExpanded ? desc : shortDesc}
                  {desc.length > 100 && (
                    <button
                      onClick={() => toggleDescription(product._id)}
                      className="ml-1 text-blue-600 hover:underline text-sm"
                    >
                      {isExpanded ? "Less" : "More"}
                    </button>
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
  );
};

export default ProductsTab;
