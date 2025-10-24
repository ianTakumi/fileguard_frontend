import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-gray-200 py-6 px-4 md:px-10 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section - Logo & Brand */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="FileGuard Logo"
            className="w-8 h-8"
          />
          <span className="font-semibold text-lg tracking-wide">FileGuard</span>
        </div>

        {/* Center Section - Links */}
        <div className="flex items-center gap-4 text-sm">
          <a
            href="/privacy"
            className="hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="/terms"
            className="hover:text-white transition-colors duration-200"
          >
            Terms of Service
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="/contact"
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Right Section - Copyright */}
        <div className="text-xs text-gray-400 md:text-sm text-center md:text-right">
          © {new Date().getFullYear()} FileGuard. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
