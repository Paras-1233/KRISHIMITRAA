// src/pages/ProductListPage.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { productData, categories } from '../data/productData'; // Import data

import Footer from '../components/layout/Footer';

// Helper to format category names for display
const formatCategoryName = (name) => {
  return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const ProductListPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories(prev =>
      checked ? [...prev, value] : prev.filter(cat => cat !== value)
    );
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return productData;
    }
    return productData.filter(p => selectedCategories.includes(p.category));
  }, [selectedCategories]);

  return (
    <>
      
      <div className="bg-green-50">
        <section className="text-center py-10 px-4 animate-fadeInUp">
          <h2 className="text-3xl font-bold text-green-700 mb-2">🛍️ Product Listings</h2>
          <p className="text-gray-600">Filter and explore our full range of agricultural products.</p>
        </section>

        <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <aside className="bg-white p-4 rounded-xl shadow-md h-fit sticky top-24 md:col-span-1">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Filter by Category:</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="block">
                  <input
                    type="checkbox"
                    value={category}
                    className="mr-2"
                    onChange={handleFilterChange}
                  />
                  {formatCategoryName(category)}
                </label>
              ))}
            </div>
          </aside>

          {/* Product Grid */}
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:col-span-3">
            {filteredProducts.map(product => (
              <div key={product.name} className="card bg-white p-4 rounded-xl shadow animate-fadeInUp">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
                <h3 className="text-xl font-semibold mt-3">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                {/* Use React Router's Link component for navigation */}
                <Link to={`/products?name=${encodeURIComponent(product.name)}`}>
                  <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
                    Explore
                  </button>
                </Link>
              </div>
            ))}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductListPage;