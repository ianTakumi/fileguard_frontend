import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../../utils/Helpers";
import client from "../../utils/client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await client
        .post("/auth/login", data, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            notifySuccess("Login successful!");
            dispatch(
              setUser({
                user: res.data.user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              })
            );

            navigate("/admin");
          } else if (res.status === 400) {
            notifyError("All fields are required");
          } else if (res.status === 401) {
            notifyError("Invalid email or password");
          }
        });
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 400) {
          notifyError("All fields are required");
        } else if (status === 401) {
          notifyError("Invalid email or password");
        } else {
          notifyError("An error occurred. Please try again later.");
        }
      } else {
        notifyError("Unable to connect to server");
      }

      console.error("Error during login:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex-col items-center p-8 bg-[#fff]">
        <div
          className=" mb-16 text-2xl font-bold flex justify-center items-center flex-col cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/logo.png"
            alt="Your Logo"
            style={{ width: "150px", height: "auto" }}
          />
          <p>FileGuard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-4">
            <label className="text-base mb-4 text-[#555]">Username</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2  border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-base mb-2 text-[#555]">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Min. of 8 characters"
              className="w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="form-options flex flex-row-reverse justify-between items-center mb-4">
            <Link
              to="/reset-password"
              className="cursor-pointer hover:underline"
            >
              Reset Password
            </Link>
          </div>

          <button
            type="submit"
            className="w-full p-3 border-none bg-[#007bff] text-white text-lg cursor-pointer rounded-sm"
          >
            Sign In
          </button>

          <p className="text-sm mt-4 text-right w-full">
            Don’t have an account yet?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              New Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
