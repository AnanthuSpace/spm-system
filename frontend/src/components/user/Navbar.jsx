import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle, LogOut, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const userData = localStorage.getItem("accessToken")

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    setDropdownOpen(false);
    setLogoutDialogOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">SPM SYSTEM</h1>

        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="text-gray-700 hover:text-blue-600" onClick={handleScrollToTop}>Home</Link></li>
          <li><Link to="/jobs" className="text-gray-700 hover:text-blue-600" onClick={handleScrollToTop}>Jobs</Link></li>
          <li><Link to="/companies" className="text-gray-700 hover:text-blue-600" onClick={handleScrollToTop}>Companies</Link></li>
          <li><Link to="/" className="text-gray-700 hover:text-blue-600" onClick={handleContactClick}>Contact</Link></li>
        </ul>

        <div className="hidden md:flex space-x-4 relative">
          {userData ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <UserCircle size={32} className="text-blue-600 cursor-pointer" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                  <Link to="/user-profile" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded" onClick={() => setDropdownOpen(false)}>
                    <User size={18} className="mr-2" />Profile
                  </Link>
                  <button onClick={() => setLogoutDialogOpen(true)} className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 rounded">
                    <LogOut size={18} className="mr-2" />Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100">Login</Link>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden flex flex-col bg-white shadow-md p-4 space-y-4">
          <li><Link to="/" className="text-gray-700 hover:text-blue-600" onClick={() => { setIsOpen(false); handleScrollToTop(); }}>Home</Link></li>
          <li><Link to="/jobs" className="text-gray-700 hover:text-blue-600" onClick={() => { setIsOpen(false); handleScrollToTop(); }}>Jobs</Link></li>
          <li><Link to="/companies" className="text-gray-700 hover:text-blue-600" onClick={() => { setIsOpen(false); handleScrollToTop(); }}>Companies</Link></li>
          <li><Link to="/" className="text-gray-700 hover:text-blue-600" onClick={handleContactClick}>Contact</Link></li>
          {userData ? (
            <>
              <li><Link to="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded" onClick={() => setIsOpen(false)}><User size={18} className="mr-2" />Profile</Link></li>
              <li><button onClick={() => setLogoutDialogOpen(true)} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"><LogOut size={18} className="mr-2" />Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100" onClick={() => setIsOpen(false)}>Login</Link></li>
          )}
        </ul>
      )}

      {logoutDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-lg z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setLogoutDialogOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">Logout</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
