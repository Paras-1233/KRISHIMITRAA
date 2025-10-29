import React, { useState } from "react";
import Header from "../components/layout/Header";
import ReactPlayer from "react-player";
import BuyerSignup from "../features/Auth/BuyerSignup";

import LoginPage from "../features/Auth/Login";
import FeaturedProducts from "../components/product/FeaturedProducts";
import Categories from "../components/layout/Categories";

// import Contact from "../components/layout/Contact";
import BrowseProducts from "../components/product/BrowseProducts";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedForm, setSelectedForm] = useState(null); // buyer | seller | login
  const [searchQuery, setSearchQuery] = useState(""); // search term
  const [selectedCategory, setSelectedCategory] = useState(""); // selected category
  const navigate =useNavigate()

  const handleClose = () => setSelectedForm(null); // Close any modal

  return (
    <div className="min-h-screen flex flex-col relative bg-gray-50">
      {/* Header */}
     

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row flex-1 px-6 md:px-16 py-20 text-white relative bg-green-700">
        {/* Left Section */}
        <div className="relative z-10 md:w-1/2 flex flex-col justify-between gap-6 p-6">
          <div className="flex-1 flex flex-col justify-center gap-6">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-snug drop-shadow-lg">
              🌾 Welcome to <span className="text-green-400">KRISHIMITRA</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed">
              Empowering Farmers, Connecting Markets. Access tools, government
              schemes, and buyers directly to grow more efficiently and
              profitably.
            </p>
          </div>

          {/* Video */}
          <div className="mt-6 max-w-lg">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=Z6O3VGqSA-8"
              controls
              width="100%"
              height="240px"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="relative z-10 md:w-1/2 flex flex-col gap-8 mt-10 md:mt-0">
          {/* Government Scheme Card */}
          <div className="backdrop-blur-md bg-green-900/70 border border-green-500/40 shadow-lg rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-4 text-green-100">
              📢 Explore Government Schemes
            </h3>
            <p className="mb-4 text-green-50">
              Stay informed about the latest subsidies, policies, and
              agricultural support programs.
            </p>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
              onClick={() => navigate("/gov-schemes")}
            >
              View Schemes
            </button>
          </div>

          {/* Signup & Login Card */}
          <div className="backdrop-blur-md bg-green-800/70 border border-green-500/40 shadow-lg rounded-xl p-8 flex-1 flex flex-col justify-center items-center">
            <h3 className="text-2xl font-semibold mb-6 text-center text-green-100">
              🚜 Get Started
            </h3>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <button
                className="bg-green-300 text-green-900 font-medium px-6 py-2 rounded-lg hover:bg-green-200 transition"
                onClick={() => setSelectedForm("buyer")}
              >
                Become a Buyer
              </button>
             
            </div>
          </div>
        </div>
      </div>

      {/* Modal Section */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
          <button
            onClick={handleClose}
            className="absolute top-6 right-8 text-4xl text-white hover:text-red-400 transition"
          >
            &times;
          </button>

          {selectedForm === "buyer" && (
            <BuyerSignup
              onClose={handleClose}
              onLoginClick={() => setSelectedForm("login")}
            />
          )}
          {selectedForm === "seller" && (
            <SellerSignup
              onClose={handleClose}
              onLoginClick={() => setSelectedForm("login")}
            />
          )}
          {selectedForm === "login" && <LoginPage onClose={handleClose} />}
        </div>
      )}

      {/* Browse Products */}
      <BrowseProducts
        onCategorySelect={(category) => setSelectedCategory(category)}
        onSearch={(query) => setSearchQuery(query)}
      />

      {/* Featured Products filtered */}
      <FeaturedProducts
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />

      <Categories
        selectedCategory={selectedCategory}
        onCategoryClick={(cat) => setSelectedCategory(cat)}
      />
      {/* <Contact /> */}
   
    </div>
  );
};

export default Home;
