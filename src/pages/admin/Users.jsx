import React, { useState, useEffect, useRef } from "react";
import {
  FiEdit,
  FiTrash2,
  FiMoreVertical,
  FiUserX,
  FiUsers,
} from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifyError, notifySuccess, formatDate } from "../../utils/Helpers";
import UserModal from "../../components/Admin/Modal/UserModal";
import client from "../../utils/client";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRefs = useRef({});

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await client.get("/users/get-users/");
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        notifyError("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      notifyError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    setIsEditing(!!user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsEditing(false);
  };

  const handleUserChange = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      const isClickInsideAnyDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      );

      if (!isClickInsideAnyDropdown) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeactivate = async (userID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Deactivating this user will restrict their access.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await client.put(`/users/deactivate/${userID}`);
        if (response.status === 200) {
          notifySuccess("Successfully deactivated");
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userID ? { ...user, status: "Deactivated" } : user
            )
          );
        } else {
          notifyError("Deactivation Unsuccessful");
        }
      } catch {
        notifyError("Something went wrong");
      }
    }
  };

  const handleActivate = async (userID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Activating this user will restore their access.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await client.put(`/users/activate/${userID}`);
        if (response.status === 200) {
          notifySuccess("Successfully activated");
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userID ? { ...user, status: "activated" } : user
            )
          );
        } else {
          notifyError("Activation Unsuccessful");
        }
      } catch {
        notifyError("Something went wrong");
      }
    }
  };

  const toggleDropdown = (userId, event) => {
    event.stopPropagation();
    setDropdownOpen(dropdownOpen === userId ? null : userId);
  };

  const handleEdit = (user, event) => {
    event.stopPropagation();
    setSelectedUser(user);
    openModal(user);
    setDropdownOpen(null);
  };

  const handleDeactivateClick = (user, event) => {
    event.stopPropagation();
    handleDeactivate(user._id);
    setDropdownOpen(null);
  };

  const handleActivateClick = (user, event) => {
    event.stopPropagation();
    handleActivate(user._id);
    setDropdownOpen(null);
  };

  const setDropdownRef = (node, userId) => {
    if (node) {
      dropdownRefs.current[userId] = node;
    }
  };

  const renderSkeletonRows = () => {
    return Array(5)
      .fill()
      .map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="py-3 px-4">
            <div className="h-4 w-6 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto"></div>
          </td>
          <td className="py-3 px-4 text-center">
            <div className="h-8 w-16 bg-gray-200 rounded mx-auto"></div>
          </td>
        </tr>
      ));
  };

  return (
    <>
      <div className="px-6 mt-8">
        {/* 🔹 Breadcrumb Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-5">
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Dashboard
            </span>{" "}
            / <span className="text-gray-700 font-medium">Users</span>
          </p>

          <div className="flex items-center gap-2">
            <FiUsers className="text-blue-600 text-3xl" />
            <h1 className="font-serif font-bold text-2xl text-gray-800">
              User Management
            </h1>
          </div>
        </div>

        {/* 🔹 Table Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 uppercase text-xs font-semibold tracking-wide">
                  <th className="py-3 px-4 text-left rounded-tl-lg">No.</th>
                  <th className="py-3 px-4 text-left">First Name</th>
                  <th className="py-3 px-4 text-left">Last Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Last Login</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Profile</th>
                  <th className="py-3 px-4 text-center rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  renderSkeletonRows()
                ) : users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="py-3 px-4 text-gray-700 font-medium">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">
                        {user.user_metadata.first_name}
                      </td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">
                        {user.user_metadata.last_name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4 text-gray-500">
                        {user.last_sign_in_at
                          ? formatDate(user.last_sign_in_at)
                          : "Never"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.user_metadata.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.user_metadata.role === "admin"
                            ? "Admin"
                            : "User"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center">
                          {user.user_metadata.avatar ? (
                            <img
                              src={user.user_metadata.avatar}
                              alt="User Profile"
                              className="w-10 h-10 object-cover rounded-full border-2 border-gray-200"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <FiUsers className="text-gray-500" size={16} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center relative">
                        <button
                          onClick={(e) => toggleDropdown(user._id, e)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200 relative z-20"
                        >
                          <FiMoreVertical size={16} />
                        </button>

                        {dropdownOpen === user._id && (
                          <div
                            ref={(node) => setDropdownRef(node, user._id)}
                            className="absolute right-4 top-full mt-1 bg-white border border-gray-200 shadow-lg rounded-lg w-40 z-50 overflow-hidden"
                          >
                            <button
                              onClick={(e) => handleEdit(user, e)}
                              className="flex items-center px-4 py-2 w-full text-left hover:bg-blue-50 text-blue-600 transition-colors duration-200"
                            >
                              <FiEdit className="mr-3" /> Edit
                            </button>
                            {user.status === "activated" ? (
                              <button
                                onClick={(e) => handleDeactivateClick(user, e)}
                                className="flex items-center px-4 py-2 w-full text-left hover:bg-yellow-50 text-yellow-600 transition-colors duration-200"
                              >
                                <FiUserX className="mr-3" /> Deactivate
                              </button>
                            ) : (
                              <button
                                onClick={(e) => handleActivateClick(user, e)}
                                className="flex items-center px-4 py-2 w-full text-left hover:bg-green-50 text-green-600 transition-colors duration-200"
                              >
                                <FiUserX className="mr-3" /> Activate
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center text-gray-500 py-6 italic"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <UserModal
          userToEdit={selectedUser}
          isEditing={isEditing}
          onClose={closeModal}
          onUserCreated={handleUserChange}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          refresh={fetchUsers}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default UsersPage;
