import React, { useState } from "react";
import { FiHelpCircle, FiMenu } from "react-icons/fi";
import { notifySuccess } from "../../../../utils/Helpers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import supabase from "../../../../utils/supabase";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../../../redux/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleProfileClick = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/drive/profile");
  };

  const handleLogoutClick = () => {
    setDropdownOpen(false); // close dropdown
    setMenuOpen(false); // close mobile menu (optional)
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
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Error signing out:", error.message);
        } else {
          notifySuccess("Logout Successfully!");
          dispatch(clearUser());
          navigate("/");
        }
      }
    });
  };

  return (
    <>
      {/* Navbar Container */}
      <nav className="w-full flex justify-between items-center bg-gray-100 px-4 py-3 shadow-sm relative">
        {/* Left Side (Hamburger for Mobile) */}
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side (Help + Profile) */}
        <div className="flex items-center gap-4 ml-auto">
          <FiHelpCircle className="text-gray-600 hover:text-gray-800 cursor-pointer w-5 h-5" />

          <div className="flex items-center gap-3 relative">
            {/* User Name */}
            {user && (
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-semibold text-gray-800">
                  {user.first_name} {user.last_name}
                </span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            )}

            {/* Profile Picture */}
            <img
              src={
                user?.avatar || "https://i.ibb.co/MBtjqXQ/default-profile.png"
              }
              alt="User Avatar"
              onClick={toggleDropdown}
              className="w-8 h-8 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-gray-300 transition"
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
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
