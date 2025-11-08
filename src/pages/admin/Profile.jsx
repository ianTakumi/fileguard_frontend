import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from "../../components/Admin/Modal/Profile";
import ChangePasswordModal from "../../components/Admin/Modal/ChangePasswordModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  console.log(user);
  const handleEditProfile = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenPasswordModal = () => setIsPasswordModalOpen(true);
  const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

  const redirect_home = () => navigate("/admin");
  const redirect_profile = () => navigate("/admin/profile");

  return (
    <div className="container mx-auto mt-10 px-4">
      {/* Page Header */}
      <div className="flex justify-between mb-10 items-center">
        <h1 className="text-3xl font-bold font-serif text-gray-800">
          Admin Profile
        </h1>
        <p className="text-sm text-gray-500">
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={redirect_home}
          >
            Home
          </span>{" "}
          /{" "}
          <span
            className="cursor-pointer hover:underline"
            onClick={redirect_profile}
          >
            Profile
          </span>
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-8 text-white relative">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="flex items-center space-x-6">
            {/* Profile Image */}
            <img
              src="/default-profile.png"
              alt="Profile"
              className="rounded-full w-28 h-28 object-cover border-4 border-white shadow-md"
            />

            <div>
              <h2 className="text-3xl font-semibold mb-1">
                {(user?.first_name || "") + " " + (user?.last_name || "")}
              </h2>
              <p className="text-lg text-blue-100">
                {user?.email || "admin@example.com"}
              </p>
              <p className="font-medium mt-2 bg-white/20 px-3 py-1 rounded-lg inline-block">
                Administrator
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={handleEditProfile}
            className="bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-lg font-medium flex items-center space-x-2 shadow-md mt-6 md:mt-0"
          >
            <FiEdit className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-md p-10">
        <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          Profile Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-gray-700">
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">First Name</p>
            <p className="font-medium">{user?.first_name || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">Last Name</p>
            <p className="font-medium">{user?.last_name || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">Phone Number</p>
            <p className="font-medium">{user?.phone_number || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">Email</p>
            <p className="font-medium">{user?.email || "N/A"}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Change Password Button */}
        <div className="flex justify-center">
          <button
            onClick={handleOpenPasswordModal}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg shadow-md font-medium transition-all duration-200"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Toast + Modals */}
      <ToastContainer />
      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={user}
        />
      )}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={handleClosePasswordModal}
        />
      )}
    </div>
  );
};

export default Profile;
