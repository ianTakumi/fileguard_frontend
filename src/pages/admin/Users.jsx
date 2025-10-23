import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiMoreVertical, FiUserX } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifyError, notifySuccess, formatDate } from "../../utils/Helpers";
import UserModal from "../../components/Admin/Modal/UserModal";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Instead of MUI menu
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      });
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    setIsEditing(!!user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setIsEditing(false);
  };

  const handleUserChange = async () => {
    try {
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
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
      axios
        .put(`${process.env.REACT_APP_API_LINK}/users/deactivate/${userID}`)
        .then((response) => {
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
        })
        .catch(() => notifyError("Something went wrong"));
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
      axios
        .put(`${process.env.REACT_APP_API_LINK}/users/activate/${userID}`)
        .then((response) => {
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
        })
        .catch(() => notifyError("Something went wrong"));
    }
  };

  const handleDelete = async (userID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      axios
        .delete(`${process.env.REACT_APP_API_LINK}/users/${userID}/`)
        .then((response) => {
          if (response.status === 204) {
            notifySuccess("Successfully Deleted");
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userID));
          } else {
            notifyError("Deletion Unsuccessful");
          }
        })
        .catch(() => notifyError("Something went wrong"));
    }
  };

  const toggleDropdown = (id, user) => {
    setSelectedUser(user);
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Users</h1>
        <p className="text-sm">
          <span className="text-blue-500 hover:underline">Users</span>
        </p>
      </div>

      <button
        onClick={() => openModal()}
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add User
      </button>

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

      <div className="mt-4 bg-white p-4 shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Last Login</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Profile</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.first_name}</td>
                <td className="py-2 px-4 border-b">{user.last_name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  {formatDate(user.last_login)}
                </td>
                <td className="py-2 px-4 border-b">
                  {user.is_superuser ? "Admin" : "User"}
                </td>
                <td className="py-2 px-4 border-b">
                  {user.profile ? (
                    <img
                      src={user.profile.url}
                      alt="User Profile"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <img
                      src="/images/default"
                      alt="Default Profile"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border-b relative">
                  <button
                    onClick={() => toggleDropdown(user._id, user)}
                    className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
                  >
                    <FiMoreVertical className="w-5 h-5" />
                  </button>

                  {dropdownOpen === user._id && (
                    <div className="absolute right-4 mt-2 bg-white border border-gray-200 shadow-lg rounded-md w-40 z-10">
                      <button
                        onClick={() => openModal(selectedUser)}
                        className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
                      >
                        <FiEdit className="mr-2 text-blue-600" /> Edit
                      </button>
                      {selectedUser?.is_active === "activated" ? (
                        <button
                          onClick={() => handleDeactivate(selectedUser.id)}
                          className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
                        >
                          <FiUserX className="mr-2 text-yellow-600" />{" "}
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(selectedUser.id)}
                          className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
                        >
                          <FiUserX className="mr-2 text-green-600" /> Activate
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(selectedUser.id)}
                        className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 text-red-600"
                      >
                        <FiTrash2 className="mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UsersPage;
