import React, { useState } from "react";
import {
  MdDashboard,
  MdGroup,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
  MdFastfood,
  MdKeyboardArrowRight,
  MdPerson,
  MdLogout,
  MdAssignment,
  MdPhone,
  MdSubscriptions, // Added subscriptions icon
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearUser } from "../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import supabase from "../../../utils/supabase";
import { notifyError, notifySuccess } from "../../../utils/Helpers";

const Sidebar = ({ isMinimized }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState("dashboard");
  const [expanded, setExpanded] = useState({
    foods: false,
    users: false,
  });
  const dispatch = useDispatch();
  const handleItemClick = (item) => setSelected(item);

  const toggleExpansion = (item) => {
    setExpanded((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
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
        const { error } = await supabase.auth.signOut();

        if (error) {
          console.error("Error signing out:", error.message);
          notifyError("Error signing out ");
        } else {
          dispatch(clearUser());
          navigate("/");
          notifySuccess("Successfully signed out ");
        }
      } catch (error) {
        console.log("Error signing out: ", error);
        notifyError("Error signing out");
      }
    }
  };

  return (
    <aside
      className={`text-white overflow-hidden transition-all duration-300 ${
        isMinimized ? "w-20" : "w-80"
      }`}
      style={{ backgroundColor: "white" }}
    >
      {/* Logo */}
      {!isMinimized ? (
        <div className="p-4 text-xl font-bold font-serif space-x-2 flex justify-center items-center -ml-2">
          <img src="/images/logo.png" alt="Logo" className="h-10" />
          <span className="text-2xl font-bold text-blue-600">FileGuard</span>
        </div>
      ) : (
        <div className="p-4 flex justify-center items-center">
          <img
            src="/images/logoTransparent.png"
            alt="Cinemax"
            className="ml-6 w-10"
          />
        </div>
      )}

      {/* Sidebar Links */}
      <ul className="mt-5 text-xs">
        {/* Dashboard */}
        <Link to="/admin">
          <li
            className="mt-3 py-2 px-8 flex items-center cursor-pointer w-full transition-colors duration-300 ease-in-out"
            onMouseOver={() => setHovered("dashboard")}
            onMouseOut={() => setHovered(null)}
            onClick={() => handleItemClick("dashboard")}
            style={{
              backgroundColor:
                hovered === "dashboard" || selected === "dashboard"
                  ? "#D9DDE8"
                  : "transparent",
            }}
          >
            <MdDashboard className="mr-5 text-[#605BFF]" size={26} />
            {!isMinimized && (
              <span
                className="text-[16px]"
                style={{
                  color:
                    hovered === "dashboard" || selected === "dashboard"
                      ? "#A1A1AC"
                      : "#605BFF",
                }}
              >
                Dashboard
              </span>
            )}
          </li>
        </Link>

        {/* Users */}
        <Link to="/admin/users">
          <li
            className="mt-3 py-2 px-8 flex items-center cursor-pointer transition-colors duration-300 ease-in-out"
            onMouseOver={() => setHovered("users")}
            onMouseOut={() => setHovered(null)}
            onClick={() => handleItemClick("users")}
            style={{
              backgroundColor:
                hovered === "users" || selected === "users"
                  ? "#D9DDE8"
                  : "transparent",
            }}
          >
            <MdGroup className="mr-5 text-[#605BFF]" size={26} />
            {!isMinimized && (
              <span className="text-[16px] text-gray-500">Users</span>
            )}
          </li>
        </Link>

        {/* Subscriptions */}
        <Link to="/admin/subscriptions">
          <li
            className="mt-3 py-2 px-8 flex items-center cursor-pointer transition-colors duration-300 ease-in-out"
            onMouseOver={() => setHovered("subscriptions")}
            onMouseOut={() => setHovered(null)}
            onClick={() => handleItemClick("subscriptions")}
            style={{
              backgroundColor:
                hovered === "subscriptions" || selected === "subscriptions"
                  ? "#D9DDE8"
                  : "transparent",
            }}
          >
            <MdSubscriptions className="mr-5 text-[#605BFF]" size={26} />
            {!isMinimized && (
              <span className="text-[16px] text-gray-500">Subscriptions</span>
            )}
          </li>
        </Link>

        {/* Contacts */}
        <Link to="/admin/contacts">
          <li
            className="mt-3 py-2 px-8 flex items-center cursor-pointer transition-colors duration-300 ease-in-out"
            onMouseOver={() => setHovered("contacts")}
            onMouseOut={() => setHovered(null)}
            onClick={() => handleItemClick("contacts")}
            style={{
              backgroundColor:
                hovered === "contacts" || selected === "contacts"
                  ? "#D9DDE8"
                  : "transparent",
            }}
          >
            <MdPhone className="mr-5 text-[#605BFF]" size={26} />
            {!isMinimized && (
              <span className="text-[16px] text-gray-500">Contacts</span>
            )}
          </li>
        </Link>

        {/* Header: User */}
        {!isMinimized && (
          <h1 className="text-gray-400 font-sans px-8 pt-3 text-sm">User</h1>
        )}

        {/* Profile */}
        <Link to="profile">
          <li
            className="mt-3 py-2 px-8 flex items-center cursor-pointer transition-colors duration-300 ease-in-out"
            onMouseOver={() => setHovered("profile")}
            onMouseOut={() => setHovered(null)}
            onClick={() => handleItemClick("profile")}
            style={{
              backgroundColor:
                hovered === "profile" || selected === "profile"
                  ? "#D9DDE8"
                  : "transparent",
            }}
          >
            <MdPerson className="mr-5 text-[#605BFF]" size={26} />
            {!isMinimized && (
              <span className="text-[16px] text-gray-500">Profile</span>
            )}
          </li>
        </Link>

        {/* Logout */}
        <li
          className="mt-3 py-2 px-8 flex items-center cursor-pointer transition-colors duration-300 ease-in-out"
          onMouseOver={() => setHovered("logout")}
          onMouseOut={() => setHovered(null)}
          onClick={handleLogout}
          style={{
            backgroundColor:
              hovered === "logout" || selected === "logout"
                ? "#D9DDE8"
                : "transparent",
          }}
        >
          <MdLogout className="mr-5 text-[#605BFF]" size={26} />
          {!isMinimized && (
            <span className="text-[16px] text-gray-500">Logout</span>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
