import React from "react";
import { Link } from "react-router-dom";

// Header.jsx
const Header = ({ onLoginClick }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f0fdf4]/80 backdrop-blur-md text-[#14532d] shadow-sm border-b border-[#d1fae5]/50">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group transition-colors">
          <h1 className="text-2xl font-extrabold tracking-wide group-hover:text-[#065f46] transition-colors">
            KRISHIMITRA
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium">
          <Link to="/" className="hover:text-[#065f46] transition-colors duration-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-[#065f46] transition-colors duration-200">
            About
          </Link>
          <Link to="/Contact" className="hover:text-[#065f46] transition-colors duration-200">
            Contact
          </Link>

          {/* Login Button */}
          <button
            onClick={onLoginClick}
            className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-semibold shadow-md hover:from-[#16a34a] hover:to-[#15803d] transition-all duration-200"
          >
            Login
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
