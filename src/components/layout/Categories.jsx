import React from "react";
import tractorImg from "../../assets/images/tractor.jpg"; // ✅ Import image

const categories = [
  {
    id: 1,
    name: "Tractors",
    image: tractorImg,
  },
  {
    id: 2,
    name: "Seeds",
    image:tractorImg  // smaller placeholder
  },
  {
    id: 3,
    name: "Tools",
    image: tractorImg
  },
  {
    id: 4,
    name: "Fertilizers",
    image: tractorImg
  },
];

const Categories = () => {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          🛍️ Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-50 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-16 h-16 object-cover rounded-full mb-3"
              />
              <h3 className="text-sm font-medium text-gray-700">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
