import React, { useState } from 'react';

const AddProduct = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState('unit'); // 'unit' or 'kg'
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    // Crops & Produce
    'Cereals',
    'Grains',
    'Vegetables',
    'Fruits',
    'Pulses',
    'Spices',
    'Herbs',

    // Inputs
    'Seeds',
    'Fertilizers',
    'Pesticides',
    'Organic Inputs',
    'Plant Growth Supplements',

    // Tools & Machinery
    'Hand Tools',
    'Irrigation Tools',
    'Tractors & Machinery',
    'Harvesting Equipment',
    'Sprayers & Pumps',

    // Livestock & Related
    'Animal Feed',
    'Livestock Care',

    // Others
    'Agri Technology',
    'Soil & Water Testing Kits',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !priceType) return;

    setLoading(true);
    await onAdd({ name, price, priceType, category, description, quantity, image });
    setLoading(false);

    // Clear form
    setName('');
    setPrice('');
    setPriceType('unit');
    setCategory('');
    setDescription('');
    setQuantity(0);
    setImage(null);
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 shadow-2xl rounded-3xl p-8 max-w-3xl mx-auto mt-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          {/* Price Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price Type</label>
            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="unit">Per Unit</option>
              <option value="kg">Per Kg</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder={priceType === 'kg' ? 'Enter quantity in kg' : 'Enter quantity in units'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              min={0}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-bold text-white transition ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
