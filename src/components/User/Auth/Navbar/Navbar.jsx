import React, { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import client from "../../../../utils/client";
import { notifyError, notifySuccess } from "../../../../utils/Helpers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../../redux/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate("/drive/profile");
  };

  const handleLogoutClick = async () => {
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
      await client
        .post("/auth/logout", {}, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            dispatch(clearUser());
            notifySuccess("Logout Successfully");
            navigate("/signin");
          }
        });
    }
  };

  return (
    <>
      <nav
        style={{
          padding: "10px",
          backgroundColor: "#f1f3f4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Hamburger Menu for Mobile View */}
        <IconButton
          onClick={toggleMenu}
          style={{ display: "none", marginRight: "10px" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            backgroundColor: "white",
            padding: "5px 15px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <SearchIcon style={{ marginRight: "8px", color: "gray" }} />
          <input
            type="text"
            placeholder="Search in Drive"
            style={{
              border: "none",
              outline: "none",
              flexGrow: 1,
              backgroundColor: "transparent",
            }}
          />
        </div>

        {/* User Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <HelpOutlineIcon style={{ color: "gray", cursor: "pointer" }} />
          <div style={{ position: "relative" }}>
            <img
              src={user.profile.url}
              alt="User Avatar"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  right: 0,
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
                  zIndex: 1000,
                  width: "150px",
                }}
              >
                <div
                  onClick={handleProfileClick}
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  Profile
                </div>
                <div
                  onClick={handleLogoutClick}
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu (for demonstration purposes, adjust as needed) */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px", // Adjust based on navbar height
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
            width: "200px",
          }}
        >
          <div
            onClick={handleProfileClick}
            style={{ padding: "10px 15px", cursor: "pointer" }}
          >
            Profile
          </div>
          <div
            onClick={handleLogoutClick}
            style={{ padding: "10px 15px", cursor: "pointer" }}
          >
            Logout
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
