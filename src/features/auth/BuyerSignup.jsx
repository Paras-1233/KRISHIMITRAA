import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); // ✅ Success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validations
    if (!formData.agreed) return setError("Please accept the terms.");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match!");
    if (!/^\d{10}$/.test(formData.phone)) return setError("Invalid mobile number.");
    if (!/^\d{12}$/.test(formData.aadhar)) return setError("Invalid Aadhar number.");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return setError("Invalid email.");

    try {
      setLoading(true);
      setError('');
      setSuccessMsg('');

      const response = await axios.post('http://localhost:5000/api/buyers/signup', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        aadhar: formData.aadhar,
        password: formData.password,
      });

      // Save buyer info to localStorage
      localStorage.setItem('loggedInBuyer', JSON.stringify(response.data.data));

      // ✅ Show success message
      setSuccessMsg('Account created successfully! Redirecting to dashboard...');

      // Close signup modal after 1.5 seconds for smooth UX
      setTimeout(() => {
        if (onClose) onClose();
        navigate('/buyer-dashboard');
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-6 relative">
        <button
          onClick={() => onClose && onClose()}
          className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-red-600"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-green-700 text-center mb-4">
          Buyer Registration
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMsg && <p className="text-green-600 text-center mb-4">{successMsg}</p>}

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

          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-sm text-center mt-2">
            Already have an account?{' '}
            <span
              onClick={() => { onClose(); onLoginClick(); }}
              className="text-green-700 font-medium hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default BuyerSignup;
