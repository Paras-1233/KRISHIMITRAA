import React from "react";
import ProductCard from "./ProductCard";

const featuredProducts = [
  { id: 1, name: "Apple", category: "Fruits & Vegetables", availability: "Available now", price: "₹120/kg", image: "/images/apple.jpg" },
  { id: 2, name: "Carrot", category: "Fruits & Vegetables", availability: "Available now", price: "₹40/kg", image: "/images/carrot.jpg" },
  { id: 3, name: "Tomato", category: "Fruits & Vegetables", availability: "Available now", price: "₹50/kg", image: "/images/tomato.jpg" },
  { id: 4, name: "Wheat", category: "Grains & Cereals", availability: "Available now", price: "₹35/kg", image: "/images/wheat.jpg" },
  { id: 5, name: "Rice", category: "Grains & Cereals", availability: "Available now", price: "₹40/kg", image: "/images/rice.jpg" },
  { id: 6, name: "Milk", category: "Dairy", availability: "Available now", price: "₹50/L", image: "/images/milk.jpg" },
  { id: 7, name: "Curd", category: "Dairy", availability: "Available now", price: "₹60/kg", image: "/images/curd.jpg" },
  { id: 8, name: "Wheat Seeds", category: "Seeds & Fertilizers", availability: "Available now", price: "₹200/kg", image: "/images/seeds.jpg" },
  { id: 9, name: "Organic Fertilizer", category: "Seeds & Fertilizers", availability: "Available now", price: "₹350/bag", image: "/images/fertilizer.jpg" },
  { id: 10, name: "Tractor", category: "Tools & Equipment", availability: "Available now", price: "₹4,50,000", image: "/images/tractor.jpg" },
  { id: 11, name: "Hand Hoe", category: "Tools & Equipment", availability: "Available now", price: "₹150", image: "/images/hoe.jpg" },
  { id: 12, name: "Sprayer", category: "Tools & Equipment", availability: "Available now", price: "₹1,200", image: "/images/sprayer.jpg" },
];



const FeaturedProducts = ({ searchQuery = "", selectedCategory = "" }) => {
  // Filter products by search and category
  const filteredProducts = featuredProducts.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery) &&
      (product.category === selectedCategory || !selectedCategory)
  );

  // Determine headline dynamically
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
