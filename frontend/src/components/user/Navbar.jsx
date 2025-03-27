import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">SPM SYSTEM</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={handleScrollToTop}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600" onClick={handleScrollToTop}>
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/companies" className="text-gray-700 hover:text-blue-600" onClick={handleScrollToTop}>
              Companies
            </Link>
          </li>
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={handleContactClick}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Login & Signup */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100">
            Login
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col bg-white shadow-md p-4 space-y-4">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={() => { setIsOpen(false); handleScrollToTop(); }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600" onClick={() => { setIsOpen(false); handleScrollToTop(); }}>
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/companies" className="text-gray-700 hover:text-blue-600" onClick={() => { setIsOpen(false); handleScrollToTop(); }}>
              Companies
            </Link>
          </li>
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={handleContactClick}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/login" className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => setIsOpen(false)}>
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
