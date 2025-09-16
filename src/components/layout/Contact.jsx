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
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    // Placeholder for future backend/email integration
  };

  const handleDismiss = () => setSubmitted(false);

  return (
    <section className="py-16 px-6 bg-green-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4 text-center">
          📬 Contact Us
        </h2>
        <p className="text-center text-green-800 mb-12">
          Have questions or feedback? Reach out and we’ll get back to you promptly.
        </p>

        {submitted && (
          <div className="relative bg-green-200 text-green-900 p-4 mb-6 rounded-lg text-center flex justify-between items-center">
            <span>✅ Thank you! Your message has been submitted.</span>
            <button
              onClick={handleDismiss}
              className="text-green-800 hover:text-green-900 font-bold text-lg transition"
            >
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-4 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-4 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="6"
            className="p-4 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-center text-green-800 space-y-2">
          <p>Email: <a href="mailto:support@krishimitra.com" className="underline hover:text-green-900 transition">support@krishimitra.com</a></p>
          <p>Phone: <a href="tel:+919876543210" className="underline hover:text-green-900 transition">+91 98765 43210</a></p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
