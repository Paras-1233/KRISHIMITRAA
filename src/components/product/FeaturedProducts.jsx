import React from 'react';
import ProductCard from './ProductCard';

const featuredProducts = [
  { id: 1, name: 'Tractor', availability: 'Available now', price: '₹4,50,000', image: '/src/assets/images/tractor.jpg' },
  { id: 2, name: 'Tractor', availability: 'Available now', price: '₹4,50,000', image: '/src/assets/images/tractor.jpg' },
  { id: 3, name: 'Tractor', availability: 'Available now', price: '₹4,50,000', image: '/src/assets/images/tractor.jpg' },
  { id: 4, name: 'Tractor', availability: 'Available now', price: '₹4,50,000', image: '/src/assets/images/tractor.jpg' },
  { id: 5, name: 'Tractor', availability: 'Available now', price: '₹4,50,000', image: '/src/assets/images/tractor.jpg' },
  { id: 6, name: 'Tractor', availability: 'Available now', price: '₹4,50,000', image: '/src/assets/images/tractor.jpg' },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          🌟 Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
