import React from 'react';
import { FaSeedling, FaShieldAlt, FaMoneyBillWave, FaLeaf, FaWater, FaTractor } from 'react-icons/fa';

const govSchemes = [
  {
    id: 1,
    title: "PM Kisan Samman Nidhi",
    category: "Farmer",
    description: "Provides income support to small and marginal farmers.",
    link: "https://pmkisan.gov.in",
    icon: <FaMoneyBillWave className="text-green-600 w-8 h-8" />
  },
  {
    id: 2,
    title: "Soil Health Card Scheme",
    category: "Agriculture",
    description: "Encourages soil testing and improves soil fertility.",
    link: "https://soilhealth.dac.gov.in",
    icon: <FaSeedling className="text-green-600 w-8 h-8" />
  },
  {
    id: 3,
    title: "Pradhan Mantri Fasal Bima Yojana",
    category: "Insurance",
    description: "Crop insurance scheme to protect farmers from crop loss.",
    link: "https://pmfby.gov.in",
    icon: <FaShieldAlt className="text-green-600 w-8 h-8" />
  },
  {
    id: 4,
    title: "National Agriculture Market (eNAM)",
    category: "Market",
    description: "Online trading platform for agricultural commodities.",
    link: "https://www.enam.gov.in",
    icon: <FaTractor className="text-green-600 w-8 h-8" />
  },
  {
    id: 5,
    title: "Kisan Credit Card (KCC)",
    category: "Finance",
    description: "Provides farmers with short-term credit for agricultural needs.",
    link: "https://www.rbi.org.in",
    icon: <FaMoneyBillWave className="text-green-600 w-8 h-8" />
  },
  {
    id: 6,
    title: "Paramparagat Krishi Vikas Yojana",
    category: "Organic Farming",
    description: "Promotes organic farming and sustainable agriculture practices.",
    link: "https://pmfby.gov.in/pkv",
    icon: <FaLeaf className="text-green-600 w-8 h-8" />
  },
  {
    id: 7,
    title: "Rashtriya Krishi Vikas Yojana",
    category: "Development",
    description: "Aims to boost agricultural productivity and farmer income.",
    link: "https://rkvy.nic.in",
    icon: <FaSeedling className="text-green-600 w-8 h-8" />
  },
  {
    id: 8,
    title: "Pradhan Mantri Krishi Sinchai Yojana",
    category: "Irrigation",
    description: "Improves irrigation coverage and water use efficiency.",
    link: "https://pmksy.gov.in",
    icon: <FaWater className="text-green-600 w-8 h-8" />
  },
];

const GovSchemes = () => {
  return (
    <div className="p-6 min-h-screen bg-[#f0fdf4]">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">🌾 Government Schemes for Farmers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {govSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col justify-between"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">{scheme.icon}</div>
              <h2 className="text-xl font-semibold text-green-700">{scheme.title}</h2>
            </div>
            
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-3">
              {scheme.category}
            </span>
            
            <p className="text-gray-700 mb-4">{scheme.description}</p>

            <a
              href={scheme.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-white bg-green-600 px-4 py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovSchemes;
