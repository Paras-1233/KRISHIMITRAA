import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">🌾 KRISHIMITRA</h2>
          <p className="mt-3 text-gray-200 text-sm">
            Connecting Farmers & Buyers with Trust.  
            Buy & Sell agricultural products easily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-yellow-300">Home</a></li>
            <li><a href="/categories" className="hover:text-yellow-300">Shop by Category</a></li>
            <li><a href="/featured" className="hover:text-yellow-300">Featured Products</a></li>
            <li><a href="/about" className="hover:text-yellow-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-yellow-300">Contact</a></li>
          </ul>
        </div>

        {/* For Users */}
        <div>
          <h3 className="text-lg font-semibold mb-3">For Users</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/buyer-guide" className="hover:text-yellow-300">Buyer Guide</a></li>
            <li><a href="/seller-guide" className="hover:text-yellow-300">Seller Guide</a></li>
            <li><a href="/faq" className="hover:text-yellow-300">FAQs</a></li>
            <li><a href="/support" className="hover:text-yellow-300">Support</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">📍 Ratnagiri, Maharashtra, India</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">📧 support@krishimitra.com</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-yellow-300"><Facebook /></a>
            <a href="#" className="hover:text-yellow-300"><Instagram /></a>
            <a href="#" className="hover:text-yellow-300"><Twitter /></a>
            <a href="#" className="hover:text-yellow-300"><Linkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-10 border-t border-green-600 pt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} KRISHIMITRA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
