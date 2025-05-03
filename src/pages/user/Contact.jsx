import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import client from "../../../utils/client";
import { notifyError, notifySuccess } from "../../../utils/Helpers";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await client
      .post("/contact/", data)
      .then((response) => {
        notifySuccess("Sent Successfully");
      })
      .catch((error) => {
        notifyError("Something went wrong, please try again");
      });
  };

  return (
    <div className="mt-10">
      <div className="bg-[#4285F4] text-white text-left mt-10 py-[80px] px-[60px]">
        <h1 className="text-5xl mb-5">Contact Us</h1>
        <div className=" text-2xl">
          <Link
            to="/"
            className="text-white no-underline font-medium mx-[10px] transition-colors duration-300 ease-in-out hover:text-[#cce0ff]"
          >
            Home
          </Link>
          /
          <Link
            to="/contact"
            className="text-white no-underline font-medium mx-[10px] transition-colors duration-300 ease-in-out hover:text-[#cce0ff]"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="flex justify-around items-center p-5 bg-[#f0f0f0]">
        <div className="flex flex-col items-center text-center w-1/4">
          <img
            src="/images/phone-icon.jpg"
            alt="Phone Icon"
            className="w-12 h-12 bg-[#4285f4] rounded-[50%] p-2.5 mb-2.5"
          />
          <p>
            <strong>Phone</strong>
            <br />
            09123456789
          </p>
        </div>
        <div className="flex flex-col items-center text-center w-1/4">
          <img
            src="/images/email-icon.jpg"
            alt="Email Icon"
            className="w-12 h-12 bg-[#4285f4] rounded-[50%] p-2.5 mb-2.5"
          />
          <p className="text-lg m-0 leading-relaxed">
            <strong className="block font-bold text-[1.1rem]">Email</strong>
            <br />
            fileguard@info.com
          </p>
        </div>
        <div className="flex flex-col items-center text-center w-1/4">
          <img
            src="/images/address-icon.jpg"
            alt="Address Icon"
            className="w-12 h-12 bg-[#4285f4] rounded-[50%] p-2.5 mb-2.5"
          />
          <p className="text-lg m-0 leading-relaxed">
            <strong className="block font-bold text-[1.1rem]">Address</strong>
            <br />
            Western Bicutan, Taguig, Metro Manila
          </p>
        </div>
        <div className="flex flex-col items-center text-center w-1/4">
          <img
            src="/images/hours-icon.jpg"
            alt="Hours Icon"
            className="w-12 h-12 bg-[#4285f4] rounded-[50%] p-2.5 mb-2.5"
          />
          <p className="text-lg m-0 leading-relaxed">
            <strong className="block font-bold text-[1.1rem]">Hours</strong>
            <br />
            Monday - Sunday
            <br />
            12 MN - 11:59 PM
          </p>
        </div>
      </div>

      <div className="max-w-[600px] my-10 mx-auto px-5 rounded-lg bg-[rgba(255,255,255,0.8)]">
        <div className="flex items-center mb-5">
          <hr className="flex-1 mr-[10px] border-0 border-t border-[#ccc]" />
          <span className="font-bold text-[#4285f4] text-2xl">
            Get in touch
          </span>
        </div>
        <h2 className="text-4xl text-[#333] mb-2.5 ">Have questions?</h2>
        <p className="text-[1rem] text-[#666] mb-5 leading-[1.6]">
          Have any questions, feedback, or need assistance? Our team is here to
          support you. Feel free to reach out to us, and we’ll do our best to
          make your experience as smooth as possible. We look forward to hearing
          from you!
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2.5 mb-5">
            <input
              type="text"
              placeholder="Your name*"
              className="flex-1 p-3 text-xl border border-[#ccc] rounded-lg focus:outline-none focus:border-[#4285f4]"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              type="email"
              placeholder="Your E-mail*"
              className="flex-1 p-3 text-xl border border-[#ccc] rounded-lg focus:outline-none focus:border-[#4285f4]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <textarea
            placeholder="Your message*"
            className="flex-1 p-3 text-xl border border-[#ccc] rounded-lg focus:outline-none focus:border-[#4285f4]"
            {...register("message", { required: "Message is required" })}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}

          <div className="flex items-center text-[1rem] text-[#333] mb-5">
            <input
              type="checkbox"
              id="consent"
              {...register("consent", {
                required: "You must agree to data collection",
              })}
              className="mr-2.5 accent-[#4285f4]"
            />
            <label htmlFor="consent">
              I agree that my submitted data is being collected and stored.
            </label>
            {errors.consent && (
              <p className="text-red-500 text-sm">{errors.consent.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-[14px] text-[1.2rem] text-white bg-[#4285f4] hover:bg-[#357ae8] rounded-[8px] cursor-pointer font-bold transition-colors duration-300 ease-in-out"
          >
            Send message
          </button>
        </form>
      </div>

      {/* Google Maps Section */}
      <div className="my-5 rounded-lg overflow-hidden">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30899.361259474914!2d121.01864680179158!3d14.517943197024417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf2ca2a215d5%3A0x38380d2c1d509c80!2sWestern%20Bicutan%2C%20Taguig%2C%201630%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1730702443363!5m2!1sen!2sph"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
