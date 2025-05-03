import React, { useEffect, useState } from "react";
import client from "../../../utils/client";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  notifyError,
  notifySuccess,
  getBorderColor,
  authenticate,
} from "../../../utils/Helpers";

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
  } = useForm({
    mode: "onChange",
  });

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
    };

    const checkEmailUniqueness = async () => {
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
    checkEmailUniqueness();
  }, [username, email, setError]);

  const onSubmit = async (data) => {
    try {
      // Submit form data to API endpoint
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
    <div className="flex h-screen">
      {/* Left side - Sign Up Form */}
      <div className="flex-1 flex-col items-center p-8 bg-[#fff]">
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/logo.png"
            alt="Your Logo"
            className="p-5"
            style={{ width: "150px", height: "140px" }}
          />
          <p className="text-2xl font-bold font-sans">FileGuard</p>
        </div>
        {/* Sign Up Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-4">
            <label className="text-sm mb-2 text-[#555]">Name*</label>
            <input
              id="name"
              type="text"
              placeholder="Ex: Doe"
              className="w-full p-2 mb-4 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm mb-2 text-[#555]">Email Address*</label>
            <input
              id="email"
              type="email"
              placeholder="mail@example.com"
              className="w-full p-2 mb-4 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm mb-2 text-[#555]">Password*</label>
            <input
              id="password"
              type="password"
              placeholder="Min. 8 characters"
              className="w-full p-2 mb-4 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 border-none bg-[#007bff] text-white text-lg cursor-pointer rounded-sm"
          >
            Sign Up
          </button>

          <p className="mt-4 text-sm w-full text-right">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
