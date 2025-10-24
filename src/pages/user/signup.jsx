import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import {
  notifyError,
  notifySuccess,
  getBorderColor,
} from "../../utils/Helpers";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      // Create user using Supabase Auth
      const { data: signupData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
          },
        },
      });

      if (error) {
        notifyError(error.message);
        return;
      }

      notifySuccess(
        "Registration successful! Please check your email to confirm your account."
      );
      reset();
      navigate("/signin");
    } catch (error) {
      notifyError("Something went wrong during registration.");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-500 text-white items-center justify-center">
        <div className="absolute inset-0 bg-[url('/images/login-image.png')] bg-cover bg-center opacity-25"></div>
        <div className="relative text-center z-10 px-8 max-w-lg">
          <h2 className="text-4xl font-bold mb-4">Welcome to FileGuard 🔐</h2>
          <p className="text-gray-200 leading-relaxed">
            Protect and share your files securely in one place.
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
            Create an Account
          </h2>
          <p className="text-gray-500 text-center mb-5 text-sm">
            Get started with secure file sharing
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* First Name */}
            <div>
              <input
                id="first_name"
                type="text"
                placeholder="First Name"
                className={`w-full p-3 rounded-lg border text-sm ${getBorderColor(
                  "first_name",
                  errors,
                  touchedFields
                )} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                {...register("first_name", {
                  required: "First Name is required",
                })}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <input
                id="last_name"
                type="text"
                placeholder="Last Name"
                className={`w-full p-3 rounded-lg border text-sm ${getBorderColor(
                  "last_name",
                  errors,
                  touchedFields
                )} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                {...register("last_name", {
                  required: "Last Name is required",
                })}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className={`w-full p-3 rounded-lg border text-sm ${getBorderColor(
                  "email",
                  errors,
                  touchedFields
                )} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
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
                  minLength: { value: 8, message: "Minimum 8 characters" },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md transition-transform transform hover:scale-[1.02] text-sm"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center my-2">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-xs">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Redirect */}
            <p className="text-center text-xs text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
