// src/components/layout/Contact.js
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show success message
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    // You can integrate EmailJS or your backend here
  };

  return (
    <section className="py-12 px-6 bg-green-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          📬 Contact Us
        </h2>
        <p className="text-center text-green-800 mb-8">
          Have questions or feedback? Reach out to us and we'll get back to you promptly.
        </p>

        {submitted && (
          <div className="bg-green-200 text-green-800 p-4 mb-6 rounded-lg text-center">
            Thank you! Your message has been submitted.
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-center text-green-800">
          <p>Email: support@krishimitra.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
