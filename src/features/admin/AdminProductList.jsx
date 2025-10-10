import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const AdminProductList = ({ products, onDelete, onUpdate }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    availableStatus: '',
  });
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Notification state
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'

  useEffect(() => {
    let temp = [...products];
    if (filters.search) temp = temp.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.category) temp = temp.filter(p => p.category === filters.category);
    if (filters.minPrice) temp = temp.filter(p => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) temp = temp.filter(p => p.price <= Number(filters.maxPrice));
    if (filters.availableStatus === 'available') temp = temp.filter(p => p.available && p.quantity > 0);
    if (filters.availableStatus === 'unavailable') temp = temp.filter(p => !p.available || p.quantity <= 0);
    setFilteredProducts(temp);
  }, [filters, products]);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleReset = () => setFilters({ search: '', category: '', minPrice: '', maxPrice: '', availableStatus: '' });

  const showToast = (message, type = 'success', duration = 3000) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), duration);
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editProduct.name);
      formData.append('price', editProduct.price);
      formData.append('quantity', editProduct.quantity);
      formData.append('category', editProduct.category);
      formData.append('description', editProduct.description);
      if (editProduct.imageFile) formData.append('image', editProduct.imageFile);

      const res = await axios.put(`${BASE_URL}/api/products/${editProduct._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (onUpdate) onUpdate(res.data);
      setEditProduct(null);
      showToast('✅ Product updated successfully!', 'success');
    } catch (err) {
      console.error('Error updating product:', err);
      showToast('❌ Failed to update product.', 'error');
    }
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white z-50 transition-all ${
          toastType === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {toastMessage}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input type="text" name="search" placeholder="Search by name" value={filters.search} onChange={handleChange} className="border p-2 rounded flex-1 min-w-[150px]" />
        <select name="category" value={filters.category} onChange={handleChange} className="border p-2 rounded">
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} className="border p-2 rounded w-24" />
        <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} className="border p-2 rounded w-24" />
        <select name="availableStatus" value={filters.availableStatus} onChange={handleChange} className="border p-2 rounded">
          <option value="">Availability</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <button onClick={handleReset} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800">Reset Filters</button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product._id} className={`bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl ${!product.available || product.quantity <= 0 ? 'opacity-50' : ''}`}>
            <div className="w-full h-48 mb-4 overflow-hidden rounded-xl flex items-center justify-center bg-gray-100">
              <img src={product.image ? `${BASE_URL}${product.image}` : '/images/products/placeholder.svg'} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-green-700">{product.name}</h2>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-lg font-bold text-green-600 mt-1">₹{product.price} / {product.priceType || 'unit'}</p>
              <p className="text-sm text-gray-600 mt-1">Stock: <span className="font-semibold">{product.quantity}</span></p>
              {(!product.available || product.quantity <= 0) && <p className="text-red-600 font-semibold mt-1">Unavailable</p>}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setEditProduct(product)} className="w-1/2 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm font-semibold">Edit</button>
              <button onClick={() => setSelectedProduct(product._id)} className={`w-1/2 py-2 rounded-lg text-sm font-semibold transition ${product.available && product.quantity > 0 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}>
                {product.available && product.quantity > 0 ? 'Mark Unavailable' : 'Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Action</h2>
            <p className="text-gray-600 mt-2">Are you sure you want to mark this product as unavailable?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setSelectedProduct(null)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800">No</button>
              <button onClick={() => { onDelete(selectedProduct); setSelectedProduct(null); showToast('Product marked unavailable', 'success'); }} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white">Yes</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold text-gray-800">Edit Product</h2>
            <div className="space-y-3 mt-3">
              <input type="text" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} className="w-full border p-2 rounded" placeholder="Product Name" />
              <input type="number" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} className="w-full border p-2 rounded" placeholder="Price" />
              <input type="number" value={editProduct.quantity} onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })} className="w-full border p-2 rounded" placeholder="Quantity" />
              <input type="text" value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} className="w-full border p-2 rounded" placeholder="Category" />
              <textarea value={editProduct.description || ''} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} className="w-full border p-2 rounded" placeholder="Description" />
              <input type="file" onChange={(e) => setEditProduct({ ...editProduct, imageFile: e.target.files[0] })} className="w-full border p-2 rounded" />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setEditProduct(null)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductList;
