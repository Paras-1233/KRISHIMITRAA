// src/data/productData.js

// Assume images are moved to a public/images/products/ directory for React
export const productData = [
  // Cereals
  { 
    category: 'cereals', 
    name: 'Bajra', 
    description: 'Nutritious millet cereal rich in fiber and minerals.', 
    price: '₹599', // Updated price
    usage: 'Used in porridge, roti, and healthy snacks.', 
    image: '/images/products/bajri.jpg',
    deliveryDate: 'Wednesday, 13 August',
    seller: 'ALIM ENTERPRISES',
    location: 'Mumbai 400017'
  },
  { 
    category: 'cereals', 
    name: 'Rice', 
    description: 'Premium basmati rice, aged for rich aroma.', 
    price: '₹90/kg', 
    usage: 'Used in biryani and pulao.', 
    image: '/images/products/rice.jpg',
    deliveryDate: 'Thursday, 14 August',
    seller: 'KrishiMitra Seller',
    location: 'Pune 411001'
  },
  { category: 'cereals', name: 'Jowar', description: 'High-fiber sorghum grain.', price: '₹35/kg', usage: 'Used in making bhakri.', image: '/images/products/jowar.jpg' },
  { category: 'cereals', name: 'Maize', description: 'Fresh yellow corn.', price: '₹25/kg', usage: 'Used in livestock feed and snacks.', image: '/images/products/maize.jpg' },
  { category: 'cereals', name: 'Finger Millet', description: 'Rich in calcium.', price: '₹50/kg', usage: 'Used in healthy porridges.', image: '/images/products/ragi.jpg' },
  { category: 'cereals', name: 'Barley', description: 'Whole barley grain.', price: '₹45/kg', usage: 'Used in soups and beverages.', image: '/images/products/barley.jpg' },

  // Grains
  { category: 'grains', name: 'Wheat', description: 'Golden wheat from Punjab.', price: '₹30/kg', usage: 'Used in making bread and flour.', image: '/images/products/wheat.png' },
  // ... add all other products from product.html here with updated image paths ...
  
  // Example for Fertilizers
  { category: 'fertilizers', name: 'Urea', description: 'Nitrogen-rich fertilizer.', price: '₹300/50kg bag', usage: 'Used for fast crop growth.', image: '/images/products/urea.png' },
];

export const categories = [
  'cereals', 'grains', 'farming-equipment', 'fertilizers', 'seeds', 'pesticides', 'irrigation-tools', 'soil-enhancers'
];