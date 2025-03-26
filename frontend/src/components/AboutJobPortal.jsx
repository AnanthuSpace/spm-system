import React from "react";

const AboutJobPortal = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gray-50">
      {/* Left Section - Title & Content */}
      <div className="md:w-3/5 space-y-6">
        <h2 className="text-4xl font-bold text-gray-800 relative">
          <span className="text-blue-600">Empowering</span> Students & Companies
          <div className="h-1 w-20 bg-blue-600 mt-2"></div>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our platform connects talented students with their dream careers. Whether 
          you're seeking internships, full-time, part-time, or freelance jobs, 
          we've got you covered.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          If you're a company, register with us and discover skilled candidates 
          tailored to your hiring needs.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition">
            Find Jobs
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition">
            Register as Company
          </button>
        </div>
      </div>

      {/* Right Section - Creative Styling */}
      <div className="hidden md:flex flex-col space-y-4">
        <div className="h-3 w-32 bg-blue-600 rounded-full"></div>
        <div className="h-3 w-24 bg-gray-300 rounded-full"></div>
        <div className="h-3 w-16 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default AboutJobPortal;
