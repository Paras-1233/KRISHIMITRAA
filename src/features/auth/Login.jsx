import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }

    // Admin default credentials
    if (username.toLowerCase() === 'admin' && password === 'admin') {
      localStorage.setItem('loggedInAdmin', 'true');
      alert('Login successful (Admin)!');
      navigate('/admin-dashboard');
      onClose();
      return;
    }

    const buyers = JSON.parse(localStorage.getItem('buyers')) || [];
    const sellers = JSON.parse(localStorage.getItem('sellers')) || [];

    const buyer = buyers.find(
      (b) => b.email.toLowerCase() === username.toLowerCase() && b.password === password
    );

    const seller = sellers.find(
      (s) => s.email.toLowerCase() === username.toLowerCase() && s.password === password
    );

    if (buyer) {
      localStorage.setItem('loggedInBuyer', JSON.stringify(buyer));
      alert('Login successful (Buyer)!');
      navigate('/buyer-dashboard'); // ✅ Navigate first
      onClose(); // ✅ Then close
    } else if (admin) {
      // Legacy seller login path retained for compatibility; now treated as Admin
      localStorage.setItem('loggedInAdmin', 'true');
      alert('Login successful (Admin)!');
      navigate('/admin-dashboard'); // ✅ Navigate first
      onClose(); // ✅ Then close
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-red-600"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-green-700 text-center mb-4">
          Login to Your Account
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Email"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
