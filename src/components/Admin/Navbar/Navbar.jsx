import React, { useState } from "react";
import {
  MdMenu,
  MdEmail,
  MdKeyboardArrowDown,
  MdPersonOutline,
  MdLogout,
} from "react-icons/md";
import { useNavigate, NavLink } from "react-router-dom";
import { logout, getUser } from "../../../utils/Helpers";
import Swal from "sweetalert2";
import client from "../../../utils/client";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = getUser();

  const handleSearch = () => {
    console.log("Search for:", searchTerm);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    });

    if (result.isConfirmed) {
      try {
        await client.post(`${process.env.REACT_APP_API_LINK}/logout/`);
        logout();
        navigate("/");

        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        );
      } catch (error) {
        Swal.fire("Error", "Failed to log out. Please try again.", "error");
      }
    }

    setIsProfileDropdownOpen(false);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="flex items-center py-2 px-4 bg-gray-50 shadow-sm">
      {/* Sidebar Toggle */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-black mr-4 p-1 rounded-md hover:bg-gray-100 transition"
        >
          <MdMenu size={20} />
        </button>
      </div>

      {/* Right Section */}
      <div className="ml-auto flex items-center space-x-4">
        {/* Email Icon */}
        <NavLink to={"/admin/email"}>
          <button className="text-gray-600 hover:text-black p-1 rounded-md hover:bg-gray-100 transition">
            <MdEmail size={22} />
          </button>
        </NavLink>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center gap-3 text-gray-800 hover:text-black focus:outline-none"
          >
            {/* <img
              src={profile.url}
              alt="User Profile Pic"
              className="rounded-full w-10 h-10 object-cover"
            /> */}
            <span className="text-sm font-medium">
              {user.first_name + " " + user.last_name}
            </span>
            <MdKeyboardArrowDown size={16} />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
              <NavLink to={"/admin/profile"} onClick={closeProfileDropdown}>
                <button className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-100 text-sm">
                  <span>Profile</span>
                  <MdPersonOutline size={18} className="text-gray-600" />
                </button>
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <span>Logout</span>
                <MdLogout size={18} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
