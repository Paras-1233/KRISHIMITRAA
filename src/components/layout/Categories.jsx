import React from "react";

// Map categories to the featured images
const categories = [
  { id: 1, name: "Fruits & Vegetables", image: "/images/apple.jpg" },
  { id: 2, name: "Grains & Cereals", image: "/images/wheat.jpg" },
  { id: 3, name: "Dairy Products", image: "/images/milk.jpg" },
  { id: 4, name: "Seeds & Fertilizers", image: "/images/seeds.jpg" },
  { id: 5, name: "Tools & Equipment", image: "/images/tractor.jpg" },
];

const Categories = ({ selectedCategory, onCategoryClick }) => {
  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-8 text-center">
          🛍️ Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          {categories.map((category) => {
            const isActive = selectedCategory === category.name;
            return (
              <div
                key={category.id}
                onClick={() => onCategoryClick(category.name)}
                className={`bg-white rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition
                  ${isActive ? "bg-green-100 shadow-lg" : "hover:bg-green-50 hover:shadow-md"}`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-20 h-20 object-cover rounded-full mb-3"
                />
                <h3 className="text-sm md:text-base font-medium text-gray-800 text-center">
                  {category.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
