import React, { useEffect, useState } from "react";
import { Edit2, Save, Trash2, X } from "lucide-react";

const BASE_URL = "http://localhost:5000";

const Inventory = ({ refreshTrigger, onProductDeleted }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2500);
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    const product = products.find(p => p._id === productId);
    if (!product) return showToast("Product not found", "error");
    if (quantity < 0) return showToast("Quantity cannot be negative", "error");

    try {
      const res = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantityChange: quantity - product.quantity }),
      });
      if (!res.ok) throw new Error("Failed to update quantity");

      const updatedProduct = await res.json();
      setProducts(products.map(p => (p._id === productId ? updatedProduct : p)));
      setEditProductId(null);
      showToast("Quantity updated successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to update quantity", "error");
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${productId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts(products.filter(p => p._id !== productId));
      if (onProductDeleted) onProductDeleted(productId);
      setConfirmDeleteId(null);
      showToast("Product permanently deleted");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete product", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {toast.message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow z-50 ${
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <h2 className="text-3xl font-bold text-green-700 mb-6">Inventory Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-green-100">
              <tr>
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Available</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className={`border-t ${!product.available ? "opacity-50" : ""}`}>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">
                    ₹{product.price}/{product.priceType || "unit"}
                  </td>
                  <td className="py-2 px-4">
                    {editProductId === product._id ? (
                      <input
                        type="number"
                        className="w-20 border rounded px-1 text-center"
                        value={newQuantity}
                        onChange={e => setNewQuantity(Number(e.target.value))}
                      />
                    ) : (
                      product.quantity
                    )}
                  </td>
                  <td className="py-2 px-4">{product.available ? "Yes" : "No"}</td>
                  <td className="py-2 px-4 flex gap-2">
                    {editProductId === product._id ? (
                      <button
                        onClick={() => updateQuantity(product._id, newQuantity)}
                        className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        <Save size={16} /> Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => { setEditProductId(product._id); setNewQuantity(product.quantity); }}
                          className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          disabled={!product.available}
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(product._id)}
                          className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative shadow-lg">
            <button onClick={() => setConfirmDeleteId(null)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Do you really want to permanently delete this product?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">No</button>
              <button onClick={() => deleteProduct(confirmDeleteId)} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
