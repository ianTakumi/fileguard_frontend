import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src="/images/logo.png" alt="Logo" className="h-10" />
          <span className="text-2xl font-bold text-blue-600">FileGuard</span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Sign In button */}
        <div className="hidden md:block">
          <Link
            to="/signin"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md transition-transform transform hover:scale-[1.03]"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile menu icon */}
        <button className="md:hidden flex flex-col space-y-1.5">
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
