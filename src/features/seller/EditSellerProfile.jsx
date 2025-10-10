// import React, { useState } from 'react';

// const EditSellerProfile = ({ seller, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: seller.name || '',
//     email: seller.email || '',
//     phone: seller.phone || '',
//     shopName: seller.shopName || '',
//     address: seller.address || '',
//     username: seller.username || '',
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSave = () => {
//     // Update currentUser
//     localStorage.setItem('currentUser', JSON.stringify(formData));

//     // Update sellers array (optional but ideal)
//     const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
//     const updatedSellers = sellers.map((s) =>
//       s.username === seller.username ? { ...s, ...formData } : s
//     );
//     localStorage.setItem('sellers', JSON.stringify(updatedSellers));

//     onClose();
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4 text-green-700">✏️ Edit Profile</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//           <input
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             disabled // Typically username should not be editable
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//           <input
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//           <input
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
//           <input
//             name="shopName"
//             value={formData.shopName}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//           <input
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       </div>

//       <div className="flex gap-4 mt-6">
//         <button
//           onClick={handleSave}
//           className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
//         >
//           Save
//         </button>
//         <button
//           onClick={onClose}
//           className="px-5 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditSellerProfile;
