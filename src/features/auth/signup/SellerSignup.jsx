import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellerSignup = ({ onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    sellerName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    address: '',
    postalCode: '',
    aadhar: '',
    pan: '',
    ifsc: '',
    bankAccount: '',
    termsAccepted: false,
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

    if (!formData.termsAccepted) {
      alert('Please accept the Terms and Conditions.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const seller = {
      ...formData,
      role: 'seller',
      profileComplete: true,
    };

    // Store seller data in localStorage
    localStorage.setItem('seller', JSON.stringify(seller));

    alert('Seller account created!');
    onClose(); // Close modal
    onLoginClick(); // Open login modal (if applicable)

    // Redirect to Seller Dashboard after successful signup
    navigate('/seller-dashboard');
  };

  return (
    <div className="relative p-6 max-w-3xl mx-auto mt-10 bg-white rounded shadow">
      <div className="absolute top-4 right-4 text-4xl text-gray-700 cursor-pointer hover:text-gray-500">
        <button onClick={onClose}>&times;</button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Seller Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Email */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="sellerName"
            value={formData.sellerName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Email"
            required
          />
        </div>

        {/* Mobile and Address */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Mobile Number"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Address"
            required
          />
        </div>

        {/* Postal Code and Aadhar */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Postal Code"
            required
          />
          <input
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Aadhar Number"
            required
          />
        </div>

        {/* PAN and IFSC */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            className="w-full p-2 border rounded uppercase"
            placeholder="PAN Card"
            required
          />
          <input
            type="text"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleChange}
            className="w-full p-2 border rounded uppercase"
            placeholder="IFSC Code"
            required
          />
        </div>

        {/* Bank Account and Password */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Bank Account Number"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Password"
            required
          />
        </div>

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Confirm Password"
          required
        />

        {/* Terms and Conditions */}
        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm text-gray-700">
            I accept the{' '}
            <span className="text-green-700 font-semibold">Terms & Conditions</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition"
        >
          Create Seller Account
        </button>

        {/* Already have an account */}
        <p className="text-center text-sm mt-4 text-gray-700">
          Already have an account?{' '}
          <span
            onClick={() => {
              onClose();       // ✅ Close current modal
              onLoginClick();  // ✅ Open login modal
            }}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Log in here
          </span>
        </p>
      </form>
    </div>
  );
};

export default SellerSignup;
