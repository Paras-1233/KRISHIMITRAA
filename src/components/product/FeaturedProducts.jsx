import React from "react";
import ProductCard from "./ProductCard";
import { assets } from "../../assets/assets"; // make sure path is correct



const featuredProducts = [
  { id: 1, name: "Apple", category: "Fruits & Vegetables", availability: "Available now", price: "₹120/kg", image: assets.apple },
  { id: 2, name: "Carrot", category: "Fruits & Vegetables", availability: "Available now", price: "₹40/kg", image: assets.carrot },
  { id: 3, name: "Tomato", category: "Fruits & Vegetables", availability: "Available now", price: "₹50/kg", image: assets.tomato },
  { id: 4, name: "Wheat", category: "Grains & Cereals", availability: "Available now", price: "₹35/kg", image: assets.wheat },
  { id: 5, name: "Rice", category: "Grains & Cereals", availability: "Available now", price: "₹40/kg", image: assets.rice },
  { id: 6, name: "Milk", category: "Dairy", availability: "Available now", price: "₹50/L", image: assets.milk },
  { id: 7, name: "Curd", category: "Dairy", availability: "Available now", price: "₹60/kg", image: assets.curd },
  { id: 8, name: "Wheat Seeds", category: "Seeds & Fertilizers", availability: "Available now", price: "₹200/kg", image: assets.seeds },
  { id: 9, name: "Organic Fertilizer", category: "Seeds & Fertilizers", availability: "Available now", price: "₹350/bag", image: assets.fertilizer },
  { id: 10, name: "Tractor", category: "Tools & Equipment", availability: "Available now", price: "₹4,50,000", image: assets.tractor },
  { id: 11, name: "Hand Hoe", category: "Tools & Equipment", availability: "Available now", price: "₹150", image: assets.handhoe },
  { id: 12, name: "Sprayer", category: "Tools & Equipment", availability: "Available now", price: "₹1,200", image: assets.sprayer },
];

const FeaturedProducts = ({ searchQuery = "", selectedCategory = "" }) => {
  const filteredProducts = featuredProducts.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery) &&
      (product.category === selectedCategory || !selectedCategory)
  );

  let headline = "🌟 Featured Products";
  if (selectedCategory && !searchQuery) {
    headline = `Results for "${selectedCategory}"`;
  } else if (searchQuery && !selectedCategory) {
    headline = `Search results for "${searchQuery}"`;
  } else if (searchQuery && selectedCategory) {
    headline = `Results for "${searchQuery}" in "${selectedCategory}"`;
  }

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          {headline}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
