import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import supabase from "../../../utils/supabase";

const ProfileModal = ({ isOpen, onClose, user }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user && isOpen) {
      reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
        email: user.email || "",
      });
    }
  }, [user, reset, isOpen]);

  // Function to set user in localStorage (same as authenticate)
  const setUser = (data) => {
    if (typeof window !== "undefined" && data.session && data.user) {
      localStorage.setItem("supabase_session", JSON.stringify(data.session));

      // Extract user info (works for Supabase and custom backends)
      const { user } = data;

      // If Supabase, user info might be inside user_metadata
      const userData = {
        id: user.id,
        email: user.email,
        first_name: user.user_metadata?.first_name || user.first_name || "",
        last_name: user.user_metadata?.last_name || user.last_name || "",
        role: user.user_metadata?.role || user.role || "",
        avatar: user.user_metadata?.avatar || null,
        phone_number:
          user.user_metadata?.phone_number || user.phone_number || "",
      };

      // Save user data
      localStorage.setItem("supabase_user", JSON.stringify(userData));
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      // Update user metadata in Supabase Auth
      const { data: updatedUser, error: updateAuthError } =
        await supabase.auth.updateUser({
          email: data.email,
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
          },
        });

      if (updateAuthError) throw updateAuthError;

      // Get the updated session to set in localStorage
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData.session) {
        // Set the updated user data in localStorage (same as authenticate function)
        setUser({
          session: sessionData.session,
          user: updatedUser.user,
        });
      }

      toast.success("Profile updated successfully!");
      onClose();

      // Reload the page to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Blur Overlay */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-md bg-black/20"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-300 transform transition-all">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-t-2xl">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Profile
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Update your personal information
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  {...register("first_name", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                  })}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  {...register("last_name", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                  })}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register("phone_number", {
                  pattern: {
                    value: /^[+]?[\d\s\-()]+$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Update Profile</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
