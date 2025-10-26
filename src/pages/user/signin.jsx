import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import {
  notifyError,
  notifySuccess,
  getBorderColor,
  authenticate,
} from "../../utils/Helpers";
import { motion } from "framer-motion";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ NEW STATE

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onChange" });

  const onValid = async (data) => {
    try {
      setLoading(true); // 🔥 Disable button + show loading state

      const { data: loginData, error } = await supabase.auth.signInWithPassword(
        {
          email: data.username,
          password: data.password,
        }
      );

      if (error) {
        notifyError(error.message);
        return;
      }

      const user = loginData.user;

      if (user) {
        const role = user.user_metadata?.role || "user";

        notifySuccess("Sign-in successful!");
        authenticate(loginData);
        reset();

        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/drive");
        }
      }
    } catch (error) {
      console.error(error);
      notifyError("Sign-in failed. Please check your credentials.");
    } finally {
      setLoading(false); // ✅ Re-enable button
    }
  };

  const onInvalid = () => {
    notifyError("Please fix the errors before submitting.");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-500 text-white items-center justify-center">
        <div className="absolute inset-0 bg-[url('/images/login-image.png')] bg-cover bg-center opacity-25"></div>
        <div className="relative text-center z-10 px-8 max-w-lg">
          <h2 className="text-4xl font-bold mb-4">
            Welcome Back to FileGuard 🔐
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Access, manage, and protect your files in one secure space.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-8 mx-4"
        >
          {/* Logo */}
          <div
            className="flex flex-col items-center mb-6 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/images/logo.png"
              alt="FileGuard Logo"
              className="w-16 mb-2"
            />
            <p className="text-xl font-semibold text-blue-600">FileGuard</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
            Welcome Back!
          </h2>
          <p className="text-gray-500 text-center mb-6 text-sm">
            Sign in to securely access your files
          </p>

          <form
            onSubmit={handleSubmit(onValid, onInvalid)}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <input
                id="username"
                type="email"
                placeholder="Email"
                className={`w-full p-3 rounded-lg border text-sm ${getBorderColor(
                  "username",
                  errors,
                  touchedFields
                )} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                {...register("username", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                id="password"
                type="password"
                placeholder="Password (min 8 chars)"
                className={`w-full p-3 rounded-lg border text-sm ${getBorderColor(
                  "password",
                  errors,
                  touchedFields
                )} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/reset-password"
                className="text-blue-500 text-xs hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading} // ✅ Disable while loading
              className={`w-full font-semibold py-3 rounded-lg shadow-md text-sm transition-transform transform ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white hover:scale-[1.02]"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-4 h-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                    ></path>
                  </svg>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-xs">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Redirect to Sign Up */}
            <p className="text-center text-xs text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
