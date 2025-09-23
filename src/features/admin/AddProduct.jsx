import React, { useState } from 'react';

const AddProduct = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null,
    category: 'Tools',
    description: '',
  });

  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, image } = formData;
    if (!name || !price || !image) {
      setError('Name, price, and image are required.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      image: URL.createObjectURL(formData.image),
    };

    onAdd(newProduct);

    setFormData({ name: '', price: '', image: null, category: 'Tools', description: '' });
    setPreviewUrl(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-green-700 border-b pb-2">Add a New Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-sm text-gray-700 mb-1">Product Name</label>
          <input type="text" name="name" placeholder="e.g., Tractor Tool Kit" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700 mb-1">Price (₹)</label>
          <input type="number" name="price" placeholder="e.g., 2999" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={formData.price} onChange={handleChange} />
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700 mb-1">Upload Image</label>
          <input type="file" name="image" accept="image/*" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
          {previewUrl && <img src={previewUrl} alt="Preview" className="w-28 h-28 mt-3 object-cover border rounded" />}
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700 mb-1">Category</label>
          <select name="category" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={formData.category} onChange={handleChange}>
            <option value="Tools">Tools</option>
            <option value="Seeds">Seeds</option>
            <option value="Fertilizers">Fertilizers</option>
            <option value="Machinery">Machinery</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-sm text-gray-700 mb-1">Description</label>
          <textarea name="description" rows="4" placeholder="Brief details about your product..." className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={formData.description} onChange={handleChange} />
        </div>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <div className="mt-6">
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition">+ Add Product</button>
      </div>
    </form>
  );
};

export default AddProduct;



