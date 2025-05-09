import React, { useState } from "react";
import { Menu } from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../../redux/slices/userSlice";
import client from "../../../utils/client";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log("User data in Navbar:", user); // Log user data for debugging
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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
        await client
          .post("/auth/logout", {}, { withCredentials: true })
          .then((res) => {
            if (res.status === 200) {
              dispatch(clearUser());
              navigate("/");

              Swal.fire(
                "Logged Out!",
                "You have been logged out successfully.",
                "success"
              );
            }
          });
      } catch (error) {
        Swal.fire("Error", "Failed to log out. Please try again.", "error");
      }
    }

    // Close the profile dropdown after logout
    setIsProfileDropdownOpen(false);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  if (!user) {
    return (
      <nav className="text-center text-gray-600 py-4">Loading user...</nav>
    );
  }

  return (
    <nav
      className="text-white flex items-center py-2 px-4"
      style={{ backgroundColor: "#FAFAFB" }}
    >
      <div className="flex items-center justify-center">
        {/* Menu Icon */}
        <button onClick={toggleSidebar} className="text-black mr-4">
          <Menu
            style={{ fontSize: "15px" }}
            className="text-gray-400 mb-1 ml-2"
          />
        </button>
      </div>
      <div className="ml-auto flex items-center w-full">
        {/* Right Side Icons */}
        <div className="flex items-center ml-auto space-x-4">
          <NavLink to={"/admin/email"}>
            <button className="text-black">
              <EmailOutlinedIcon style={{ fontSize: "20px" }} />
            </button>
          </NavLink>

          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="text-black flex items-center gap-3"
            >
              <img
                src={user.profile.url}
                alt="User Profile Pic"
                className="rounded-full w-10 h-10 object-cover"
              />
              <span>{user.name}</span>
              <KeyboardArrowDownOutlinedIcon style={{ fontSize: "15px" }} />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                <NavLink to={"/admin/profile"} onClick={closeProfileDropdown}>
                  <button className="flex gap-4 px-4 py-3 text-gray-700 justify-between hover:bg-gray-100 w-full text-left">
                    <span className="text-gray-700">Profile</span>
                    <PersonOutlineOutlinedIcon style={{ fontSize: "18px" }} />
                  </button>
                </NavLink>

                <button
                  className="flex gap-4 px-4 py-3 text-gray-700 justify-between hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}
                >
                  <span className="text-gray-700">Logout</span>
                  <LogoutOutlinedIcon style={{ fontSize: "18px" }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
