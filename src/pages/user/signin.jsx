import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess, authenticate } from "../../utils/Helpers";
import client from "../../utils/client";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
  });

  const onValid = async (data) => {
    try {
      const url = `${process.env.REACT_APP_API_LINK}/login/`;
      const response = await client
        .post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data;
          const user = data.user;
          notifySuccess("Sign-in successful!");
          reset();
          authenticate(response.data);

          if (user.is_superuser) {
            navigate("/admin");
          } else {
            navigate("/drive");
          }
        })
        .catch((error) => {
          if (error.response) {
            const message = error.response.data[0];
            notifyError(message);
            console.log(message);
          }
        });
    } catch (error) {
      notifyError("Sign-in failed. Please check your credentials.");
      console.error(error);
    }
  };

  const onInvalid = (errors) => {
    notifyError("Please fix the errors before submitting.");
    console.error(errors);
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

        <form onSubmit={handleSubmit(onValid, onInvalid)} className="w-full">
          <div className="mb-4">
            <label className="text-sm mb-2 text-[#555]">Username*</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mb-4 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>

          <label className="text-sm mb-2 text-[#555]">Password*</label>
          <input
            id="password"
            type="password"
            placeholder="Min. of 8 characters"
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
            <p className="error-message">{errors.password.message}</p>
          )}

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
