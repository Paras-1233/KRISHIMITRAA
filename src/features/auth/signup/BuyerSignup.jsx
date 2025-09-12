import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BuyerSignup = ({ onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    aadhar: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreed) return alert("Please accept the terms.");
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");
    if (!/^\d{10}$/.test(formData.phone)) return alert("Invalid mobile number.");
    if (!/^\d{12}$/.test(formData.aadhar)) return alert("Invalid Aadhar number.");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return alert("Invalid email.");

    const buyer = {
      ...formData,
      role: 'buyer',
    };

    // Store the buyer data in localStorage
    localStorage.setItem('buyer', JSON.stringify(buyer));

    alert("Buyer account created!");

    // Close signup modal
    onClose();

    // Navigate to the Buyer Dashboard
    navigate('/buyer-dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-red-600">
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-green-700 text-center mb-4">Buyer Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input type="tel" name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input type="text" name="aadhar" placeholder="Aadhar Number" value={formData.aadhar} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

          <label className="flex items-center text-sm">
            <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} className="mr-2" />
            I agree to the <a href="#" className="ml-1 text-green-700 underline">Terms & Conditions</a>
          </label>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Create Account</button>

          <p className="text-sm text-center mt-2">
            Already have an account?{' '}
            <span onClick={() => { onClose(); onLoginClick(); }} className="text-green-700 font-medium hover:underline cursor-pointer">
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default BuyerSignup;
