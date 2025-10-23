import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import client from "../../utils/client";
import { notifyError, notifySuccess } from "../../utils/Helpers";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await client
      .post("/contact/", data)
      .then(() => {
        notifySuccess("Sent Successfully");
        reset();
      })
      .catch(() => {
        notifyError("Something went wrong, please try again");
      });
  };

  return (
    <div className="flex flex-col items-center text-gray-800 mt-10">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <div className="text-sm space-x-2">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          /
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl my-16 px-6">
        {[
          {
            src: "/images/phone-icon.jpg",
            title: "Phone",
            text: "09123456789",
          },
          {
            src: "/images/email-icon.jpg",
            title: "Email",
            text: "fileguard@info.com",
          },
          {
            src: "/images/address-icon.jpg",
            title: "Address",
            text: "Western Bicutan, Taguig, Metro Manila",
          },
          {
            src: "/images/hours-icon.jpg",
            title: "Hours",
            text: "Monday - Sunday\n12 MN - 11:59 PM",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-16 h-16 mb-4 rounded-full object-cover"
            />
            <p>
              <strong className="block text-lg mb-1">{item.title}</strong>
              {item.text.split("\n").map((line, i) => (
                <span key={i} className="block text-gray-700">
                  {line}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* Contact Form Section */}
      <div className="w-full max-w-4xl bg-gray-50 rounded-lg shadow-md p-10 mb-16 mx-4">
        <div className="flex flex-col items-center mb-10">
          <hr className="w-1/3 border-blue-500 mb-3" />
          <span className="text-blue-500 font-semibold text-lg uppercase tracking-wide">
            Get in touch
          </span>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">Have questions?</h2>
        <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
          Have any questions, feedback, or need assistance? Our team is here to
          support you. Feel free to reach out to us, and we’ll do our best to
          make your experience as smooth as possible. We look forward to hearing
          from you!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Your name*"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Your E-mail*"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea
              placeholder="Your message*"
              className="w-full p-3 border border-gray-300 rounded-md h-40 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              {...register("message", { required: "Message is required" })}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="consent"
              className="mt-1"
              {...register("consent", {
                required: "You must agree to data collection",
              })}
            />
            <label htmlFor="consent" className="text-gray-700 text-sm">
              I agree that my submitted data is being collected and stored.
            </label>
          </div>
          {errors.consent && (
            <p className="text-red-500 text-sm">{errors.consent.message}</p>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md shadow-md transition-all"
            >
              Send message
            </button>
          </div>
        </form>
      </div>

      {/* Google Maps */}
      <div className="w-full">
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
