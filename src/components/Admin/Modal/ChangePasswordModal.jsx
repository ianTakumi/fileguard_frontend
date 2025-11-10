import React, { useState } from "react";
import { useForm } from "react-hook-form";
import supabase from "../../../utils/supabase";
import { notifyError, notifySuccess } from "../../../utils/Helpers";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Update password in Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: data.new_password,
      });

      if (error) throw error;

      notifySuccess("Password updated successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error("Error updating password:", error);
      notifyError(error.message || "Failed to update password");
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
          <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-red-50 to-gray-50 rounded-t-2xl">
            <h2 className="text-xl font-semibold text-gray-800">
              Change Password
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Secure your account with a new password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register("current_password", {
                  required: "Current password is required",
                })}
              />
              {errors.current_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.current_password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.new_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("new_password") || "Passwords do not match",
                })}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

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
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Change Password</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
