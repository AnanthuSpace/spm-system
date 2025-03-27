import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";

const Footer = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted: " + message);
    setMessage("");
  };

  return (
    <footer className="bg-gray-900 text-white mt-10 py-8" id="contact">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-10">
        {/* Left Section - Brand & Feedback */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          {/* Brand Name */}
          <h2 className="text-2xl font-bold mb-4">SPM SYSTEM</h2>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Send feedback..."
              className="px-4 py-2 w-full md:w-64 rounded-md text-gray-800 bg-gray-200"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white flex items-center space-x-1"
            >
              <Send size={18} />
              <span>Submit</span>
            </button>
          </form>

          {/* Social Media Icons (Under Input) */}
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Facebook size={20} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Twitter size={20} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Linkedin size={20} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Right Section - Navigation Links */}
        <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-end items-center md:items-start text-center md:text-left mt-6 md:mt-0">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-blue-400">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center mt-6 text-sm">&copy; {new Date().getFullYear()} SPM System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
