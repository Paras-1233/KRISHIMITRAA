import React, { useState } from "react";

const categories = [
  "Fruits & Vegetables",
  "Grains & Cereals",
  "Dairy",
  "Seeds & Fertilizers",
  "Tools & Equipment",
];

const BrowseProducts = ({ onCategorySelect, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger filtering in parent only when user clicks Search
    if (onSearch) onSearch(searchQuery);
    if (onCategorySelect) onCategorySelect(selectedCategory);
  };

  return (
    <section className="bg-[#f0fdf4] py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#14532d]">
          🛒 Browse Products
        </h2>

        {/* Search & Filter */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 border border-[#d1fae5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] bg-white text-[#14532d]"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-[#d1fae5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] bg-white text-[#14532d]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Search
          </button>
        </form>

        {/* Quick Category Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (onCategorySelect) onCategorySelect(cat);
              }}
              className={`px-4 py-2 rounded-full border font-medium transition ${
                selectedCategory === cat
                  ? "bg-[#14532d] text-white border-[#14532d]"
                  : "bg-white text-[#14532d] border-[#d1fae5] hover:bg-[#dcfce7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseProducts;
