import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import client from "../../utils/client";
import {
  notifyError,
  notifySuccess,
  getBorderColor,
  authenticate,
} from "../../utils/Helpers";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onChange" });

  const onValid = async (data) => {
    try {
      const url = `${process.env.REACT_APP_API_LINK}/login/`;
      const response = await client.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      const user = response.data.user;
      notifySuccess("Sign-in successful!");
      authenticate(response.data);
      reset();

      if (user.is_superuser) navigate("/admin");
      else navigate("/drive");
    } catch (error) {
      if (error.response) {
        const message = error.response.data[0];
        notifyError(message);
      } else {
        notifyError("Sign-in failed. Please check your credentials.");
      }
    }
  };

  const onInvalid = () => {
    notifyError("Please fix the errors before submitting.");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Form Section */}
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

        {/* Form Card */}
        <div className="w-full max-w-md bg-gray-50 shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back!
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Sign in to securely access your files
          </p>

          <form
            onSubmit={handleSubmit(onValid, onInvalid)}
            className="space-y-5"
          >
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username<span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className={`w-full p-3 rounded-md border ${getBorderColor(
                  "username",
                  errors,
                  touchedFields
                )} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
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
                placeholder="Min. of 8 characters"
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

            {/* Reset Password */}
            <div className="flex justify-end">
              <Link
                to="/reset-password"
                className="text-blue-500 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-transform transform hover:scale-[1.02] shadow-md"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Create one
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
          <h2 className="text-4xl font-bold mb-4">Secure File Sharing</h2>
          <p className="max-w-md text-gray-200">
            Keep your files safe and share them securely with FileGuard — your
            trusted data protection partner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
