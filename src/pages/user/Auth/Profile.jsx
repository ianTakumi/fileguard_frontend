import React, { useState, useRef } from "react";
import { notifyError, notifySuccess } from "../../../utils/Helpers";
import ChangePassword from "../../../components/User/Auth/Modals/ChangePassword";
import client from "../../../utils/client";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaCamera, FaTrashAlt, FaUserEdit, FaLock } from "react-icons/fa";
import supabase from "../../../utils/supabase";
import { useSelector, useDispatch } from "react-redux";
import { setUser, updateAvatar } from "../../../redux/slices/userSlice";

const Profile = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      phone_number: user.phone_number || "",
      email: user.email || "",
    },
  });

  const handleOpenPasswordModal = () => setIsPasswordModalOpen(true);
  const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

  const handleDelete = async (userID) => {
    try {
      setIsLoading(true);
      await client.delete(`/users/${userID}/`, {
        withCredentials: true,
      });

      notifySuccess("Account successfully deleted");
      navigate("/");
    } catch (error) {
      console.log("Something went wrong: ", error);
      notifyError("Something went wrong while deleting account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);
    console.log(formData);

    try {
      setIsLoading(true);
      const response = await client.post(
        `/users/upload-profile-picture/${user.id}/`,
        formData
      );

      if (response.status === 200) {
        notifySuccess("Profile picture updated!");
        const { avatar_url } = response.data;

        dispatch(updateAvatar(avatar_url));
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      notifyError("Failed to update profile picture. ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // 1️⃣ Update user metadata in Supabase Auth
      const { data: updatedData, error: supabaseError } =
        await supabase.auth.updateUser({
          email: data.email, // optional: include if you allow email change
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
          },
        });

      if (supabaseError) {
        console.error("Supabase update error:", supabaseError);
        notifyError("Failed to update Supabase user profile.");
        return;
      }

      // 2️⃣ Refresh user session to get latest metadata
      const { data: refreshedUser, error: fetchError } =
        await supabase.auth.getUser();

      if (fetchError) {
        console.error("Fetch updated user error:", fetchError);
        notifyError("Failed to fetch updated user data.");
        return;
      }
      dispatch(setUser(refreshedUser));
      notifySuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error);
      notifyError("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="flex flex-col items-center text-center border-r border-gray-200">
            <div className="relative mb-6">
              <img
                src={
                  user.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md"
              />
              <button
                onClick={openFileExplorer}
                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition"
              >
                <FaCamera />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <p className="text-lg font-semibold text-gray-700">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-gray-500">@{user.phone_number}</p>
            <p className="text-sm text-gray-400 mt-1">{user.email}</p>

            <div className="mt-6 space-y-3 w-full">
              <button
                onClick={handleOpenPasswordModal}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                <FaLock /> Change Password
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition disabled:opacity-70"
              >
                <FaTrashAlt /> {isLoading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>

          {/* Right Column - Update Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5"
          >
            <div>
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("first_name", {
                  required: "First name is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("last_name", {
                  required: "Last name is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                {...register("phone_number", {
                  required: "Phone Number is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition mt-4 disabled:opacity-70"
            >
              <FaUserEdit />
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>

      {isPasswordModalOpen && (
        <ChangePassword
          isOpen={isPasswordModalOpen}
          onClose={handleClosePasswordModal}
        />
      )}
    </div>
  );
};

export default Profile;
