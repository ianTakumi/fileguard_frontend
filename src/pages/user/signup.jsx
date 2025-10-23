import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import client from "../../utils/client";
import {
  notifyError,
  notifySuccess,
  getBorderColor,
  authenticate,
} from "../../utils/Helpers";

const SignUp = () => {
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onChange" });

  const username = watch("username");
  const email = watch("email");

  useEffect(() => {
    const checkUniqueness = async () => {
      if (username) {
        const response = await client.get("/check-unique/", {
          params: { username },
        });
        setIsUsernameUnique(response.data.is_username_unique);
        if (!response.data.is_username_unique) {
          setError("username", {
            type: "manual",
            message: "Username already exists",
          });
        }
      }

      if (email) {
        const response = await client.get("/check-unique/", {
          params: { email },
        });
        setIsEmailUnique(response.data.is_email_unique);
        if (!response.data.is_email_unique) {
          setError("email", {
            type: "manual",
            message: "Email already exists",
          });
        }
      }
    };

    checkUniqueness();
  }, [username, email, setError]);

  const onSubmit = async (data) => {
    try {
      await client.post("/register/", data).then((response) => {
        reset();
        notifySuccess("Registration successful!");
        authenticate(response.data);
        navigate("/drive");
      });
    } catch (error) {
      notifyError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side - Sign Up Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-8 md:px-20">
        {/* Logo */}
        <div
          className="flex flex-col items-center mb-10 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/logo.png"
            alt="FileGuard Logo"
            className="w-28 mb-3"
          />
          <p className="text-2xl font-bold text-blue-600 tracking-wide">
            FileGuard
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md bg-gray-50 shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Your Account 🧾
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Get started with secure file sharing and protection
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                id="first_name"
                type="text"
                placeholder="Ex: John"
                className={`w-full p-3 rounded-md border ${getBorderColor(
                  "first_name",
                  errors,
                  touchedFields
                )} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                {...register("first_name", {
                  required: "First Name is required",
                })}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                id="last_name"
                type="text"
                placeholder="Ex: Doe"
                className={`w-full p-3 rounded-md border ${getBorderColor(
                  "last_name",
                  errors,
                  touchedFields
                )} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                {...register("last_name", {
                  required: "Last Name is required",
                })}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username<span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="Ex: johndoe123"
                className={`w-full p-3 rounded-md border ${getBorderColor(
                  "username",
                  errors,
                  touchedFields
                )} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="mail@example.com"
                className={`w-full p-3 rounded-md border ${getBorderColor(
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                className={`w-full p-3 rounded-md border ${getBorderColor(
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-transform transform hover:scale-[1.02] shadow-md"
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Sign In Redirect */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side Image */}
      <div
        className="hidden lg:flex flex-1 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/login-image.png')",
        }}
      >
        <div className="bg-blue-900/40 w-full h-full flex flex-col items-center justify-center text-white text-center p-10">
          <h2 className="text-4xl font-bold mb-4">Join FileGuard Today</h2>
          <p className="max-w-md text-gray-200">
            Experience a secure way to store, protect, and share your files —
            FileGuard keeps your data safe, always.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
