import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserManagement = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  // Fetch buyers from backend
  const fetchBuyers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setBuyers(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching buyers:', err);
      setLoading(false);
    }
  };

  // Delete buyer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      setBuyers(buyers.filter((b) => b._id !== id));
      setShowModal(false);
      setSelectedBuyer(null);
    } catch (err) {
      console.error('Error deleting buyer:', err);
    }
  };

  // Open confirmation modal
  const confirmDelete = (buyer) => {
    setSelectedBuyer(buyer);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedBuyer(null);
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  if (loading) return <p>Loading buyers...</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow relative">
      <h2 className="text-2xl text-green-800 font-semibold mb-4">👥 Buyers</h2>
      {buyers.length === 0 ? (
        <p className="text-gray-500">No buyers found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-green-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((b) => (
              <tr key={b._id}>
                <td className="p-2 border">{b.name}</td>
                <td className="p-2 border">{b.email}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => confirmDelete(b)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Modal */}
      {showModal && selectedBuyer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">
              Are you sure you want to delete <strong>{selectedBuyer.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedBuyer._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
