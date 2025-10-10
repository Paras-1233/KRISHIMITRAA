// src/components/layout/Contact.js
import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://krishimitra-backend-zdwj.onrender.com";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/contact`, formData);
      showToast(res.data.message, "success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to send message", "error");
    }
  };

  return (
    <section className="py-16 px-6 bg-green-50">
      <div className="max-w-5xl mx-auto">

        {/* Toast */}
        {toast.message && (
          <div
            className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg text-white z-50 animate-slideIn ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.message}
          </div>
        )}

        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-2 text-center">
          📬 Contact Us
        </h2>
        <p className="text-center text-green-800 mb-12 text-lg">
          Have questions or feedback? Reach out and we’ll get back to you promptly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-4 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-4 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="6"
              className="p-4 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info / Info Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6 justify-center">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Contact Information</h3>
            <p className="text-green-800 text-lg">
              <strong>Email:</strong>{" "}
              <a href="mailto:support@krishimitra.com" className="underline hover:text-green-900">
                support@krishimitra.com
              </a>
            </p>
            <p className="text-green-800 text-lg">
              <strong>Phone:</strong>{" "}
              <a href="tel:+919876543210" className="underline hover:text-green-900">
                +91 98765 43210
              </a>
            </p>
            <p className="text-green-800 text-lg">
              <strong>Address:</strong> 123 Krishi Street, Ratnagiri, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
