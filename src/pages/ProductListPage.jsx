// src/pages/ProductListPage.jsx
import React, { useState, useEffect, useMemo, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "https://krishimitra-backend-zdwj.onrender.com";

const formatCategoryName = (name) =>
  name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const ProductListPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Load buyer
  useEffect(() => {
    const loggedInBuyer = JSON.parse(localStorage.getItem("loggedInBuyer"));
    if (!loggedInBuyer) return navigate("/");
    setBuyer(loggedInBuyer);
  }, [navigate]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories(prev =>
      checked ? [...prev, value] : prev.filter(c => c !== value)
    );
  };

  const filteredProducts = useMemo(() => {
    if (!selectedCategories.length) return products;
    return products.filter(p => selectedCategories.includes(p.category));
  }, [selectedCategories, products]);

  return (
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
            {categories.map(cat => (
              <label key={cat} className="block">
                <input type="checkbox" value={cat} className="mr-2" onChange={handleFilterChange} />
                {formatCategoryName(cat)}
              </label>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:col-span-3">
          {filteredProducts.map(product => (
            <div key={product._id} className="card bg-white p-4 rounded-xl shadow animate-fadeInUp">
              <img
                src={product.image ? `${BASE_URL}${product.image}` : "/images/products/placeholder.svg"}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-3">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">₹{product.price}</p>

              <div className="flex gap-2 mt-3">
                <Link to={`/products/${product._id}`} className="flex-1">
                  <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                    Explore
                  </button>
                </Link>
                <button
                  onClick={() => addToCart(product._id)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default ProductListPage;
