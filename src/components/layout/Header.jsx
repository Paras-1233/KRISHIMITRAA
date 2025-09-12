import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="w-full z-50 bg-[#f0fdf4] text-[#14532d] py-4 px-8 flex justify-between items-center shadow-md border-b border-[#d1fae5]">
      <Link to="/" className="flex items-center gap-3 hover:text-[#065f46] transition">
        {/* <img src={leaf} alt="Leaf Icon" className="h-8 w-8 object-contain" /> */}
        <h1 className="text-2xl font-extrabold tracking-wide">KRISHIMITRA</h1>
      </Link>

      <nav className="space-x-6 text-lg font-medium">
        <Link to="/" className="hover:text-[#065f46] transition">Home</Link>
        <Link to="/about" className="hover:text-[#065f46] transition">About</Link>
        <Link to="/contact" className="hover:text-[#065f46] transition">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;