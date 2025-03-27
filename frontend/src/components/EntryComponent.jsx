import React from "react";

const EntryComponent = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center px-6 md:px-20 bg-gray-50">
      {/* Left Section - Text & Search Box */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-6xl font-bold text-gray-800">
          Find A <span className="text-blue-600">Job</span> That <br />
          <span className="text-blue-600">Matches</span> Your Passion
        </h1>
        <p className="text-lg text-gray-600">
          Hand-picked opportunities to work from home, remotely, freelance,
          full-time, part-time, contract, and internships.
        </p>
        {/* Search Box */}
        <div className="flex items-center bg-white shadow-md rounded-lg p-2 w-full max-w-md mx-auto md:mx-0">
          <input
            type="text"
            placeholder="Search jobs..."
            className="flex-1 outline-none p-3 rounded-l-lg"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </div>

      <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src="/banner.jpg"
          alt="Job Search"
          className="w-full max-w-md "
        />
      </div>
    </div>
  );
};

export default EntryComponent;
