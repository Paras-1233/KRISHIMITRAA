import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
  src="/images/farmer.jpg"
  alt="About Us"
  className="w-full max-h-80 rounded-2xl shadow-lg object-contain mx-auto"
  loading="lazy"
/>

        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to <i>KRISHIMITRAA</i> – your trusted partner in modern
            agriculture!
            <br />
            <br />
            We believe that farming is not just an occupation, it’s the backbone
            of our nation. KrishiMitra is a one-stop platform designed to
            empower farmers, agri-entrepreneurs, and rural communities by
            combining government agricultural schemes with modern e-commerce
            solutions.
          </p>
        </div>
      </div>

      {/* Mission, Vision, Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
        <div>
          <h4 className="text-xl font-semibold mb-2">Our Mission</h4>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to bridge the gap between government support and
            farmers’ needs while creating a reliable marketplace for
            agri-products.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-2">Our Vision</h4>
          <p className="text-gray-600 leading-relaxed">
            With transparency, trust, and technology at the core, KrishiMitra is
            here to transform traditional farming into a sustainable and
            profitable journey.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-2">Our Values</h4>
          <p className="text-gray-600 leading-relaxed">
            We believe agriculture is more than a livelihood—it's the backbone
            of our nation. Our platform is built to empower farmers and rural
            communities by bridging the gap between traditional farming and
            modern digital solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
