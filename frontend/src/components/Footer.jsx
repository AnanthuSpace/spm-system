import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Brand Name */}
        <h2 className="text-xl font-bold">SPM SYSTEM</h2>

        {/* Quick Links */}
        <ul className="flex space-x-6 mt-4 md:mt-0">
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

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
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

      {/* Copyright */}
      <p className="text-center mt-4 text-sm">&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
