import React, { useState } from "react";
import { FiHelpCircle, FiSearch, FiMenu } from "react-icons/fi";
import client from "../../../../utils/client";
import { notifyError, notifySuccess, logout } from "../../../../utils/Helpers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleProfileClick = () => navigate("/drive/profile");

  const handleLogoutClick = () => {
    const url = `${process.env.REACT_APP_API_LINK}/logout/`;
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await client.post(url, { withCredentials: true });
          if (response.status === 200) {
            notifySuccess("Logout Successfully");
            logout();
            navigate("/signin");
          }
        } catch (err) {
          notifyError("Something went wrong.");
          console.error(err);
        }
      }
    });
  };

  return (
    <>
      {/* Navbar Container */}
      <nav className="w-full flex justify-between items-center bg-gray-100 px-4 py-3 shadow-sm relative">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-sm w-full max-w-md">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search in Drive"
            className="flex-grow bg-transparent outline-none text-sm text-gray-700"
          />
        </div>

        {/* Right-side Icons and Profile */}
        <div className="flex items-center gap-4">
          <FiHelpCircle className="text-gray-600 hover:text-gray-800 cursor-pointer w-5 h-5" />

          <div className="relative">
            {/* Profile Avatar */}
            {/* <img
              src={profile.url}
              alt="User Avatar"
              onClick={toggleDropdown}
              className="w-8 h-8 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-gray-300 transition"
            /> */}

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-10 md:hidden">
          <button
            onClick={handleProfileClick}
            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={handleLogoutClick}
            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
