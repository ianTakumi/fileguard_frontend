import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifyError, notifySuccess, formatDate } from "../../utils/Helpers";
import UserModal from "../../components/Admin/Modal/UserModal";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import client from "../../utils/client";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = () => {
    try {
      client.get("/users").then((res) => {
        if (res.status === 200) {
          setUsers(res.data.data);
        }
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      notifyError("Error fetching users");
    }
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Users</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Users</span>
        </p>
      </div>

      {/* Displays users in a table */}
      <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Last Login</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
              <th className="py-2 px-4 border-b text-left">Profile</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-slate-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  {formatDate(user.last_login)}
                </td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td>
                  {user.profile ? (
                    <img
                      src={user.profile.url}
                      alt="User Profile"
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <img
                      src="/images/default"
                      alt="Default Profile"
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <IconButton
                    onClick={(event) => handleMenuClick(event, user)}
                    className="p-1 rounded-full bg-transparent text-gray-500 hover:text-black transition duration-200 ease-in-out"
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEdit}>
                      <EditOutlinedIcon className="mr-2" /> Edit
                    </MenuItem>
                    {selectedUser?.is_active === "activated" ? (
                      <MenuItem
                        onClick={() => handleDeactivate(selectedUser.id)}
                      >
                        <NoAccountsIcon className="mr-2" /> Deactivate
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={() => handleActivate(selectedUser.id)}>
                        <NoAccountsIcon className="mr-2" /> Activate
                      </MenuItem>
                    )}
                    <MenuItem onClick={() => handleDelete(selectedUser.id)}>
                      <DeleteOutlineOutlinedIcon className="mr-2" /> Delete
                    </MenuItem>
                  </Menu>
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
