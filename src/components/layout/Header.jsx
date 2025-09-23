import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full z-50 bg-[#f0fdf4]/80 backdrop-blur-md text-[#14532d] shadow-sm border-b border-[#d1fae5]/50">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group transition-colors">
          <h1 className="text-2xl font-extrabold tracking-wide group-hover:text-[#065f46] transition-colors">
            KRISHIMITRA
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium">
          <Link to="/" className="hover:text-[#065f46] transition-colors duration-200">Home</Link>
          <Link to="/about" className="hover:text-[#065f46] transition-colors duration-200">About</Link>
          <Link to="/Contact" className="hover:text-[#065f46] transition-colors duration-200">Contact</Link>
          <button
            onClick={onLoginClick}
            className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-semibold shadow-md hover:from-[#16a34a] hover:to-[#15803d] transition-all duration-200"
          >
            Login
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-[#f0fdf4]/90 backdrop-blur-md border-t border-[#d1fae5]/50">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-lg font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-[#065f46] transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#065f46] transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="hover:text-[#065f46] transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  onLoginClick();
                  setMenuOpen(false);
                }}
                className="w-full px-5 py-2 rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-semibold shadow-md hover:from-[#16a34a] hover:to-[#15803d] transition-all duration-200"
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
