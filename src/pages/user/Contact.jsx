import React, { useState } from "react";
import client from "../../utils/client";
import { useForm } from "react-hook-form";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      await client.post("/contacts/", data);
      alert("✅ Message sent successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: <FaPhoneAlt className="text-blue-500" />,
      title: "Phone",
      text: "09123456789",
      subtitle: "Mon-Sun, 24/7",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaEnvelope className="text-purple-500" />,
      title: "Email",
      text: "fileguard@info.com",
      subtitle: "Quick response guaranteed",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaMapMarkerAlt className="text-orange-500" />,
      title: "Address",
      text: "Western Bicutan, Taguig",
      subtitle: "Metro Manila, Philippines",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <FaClock className="text-green-500" />,
      title: "Hours",
      text: "24/7 Available",
      subtitle: "Always here for you",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-white py-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have.
          </p>
          <div className="flex justify-center space-x-3 text-sm text-blue-200">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span>/</span>
            <span className="text-white font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="w-full max-w-7xl px-6 -mt-16 mb-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group transform hover:-translate-y-2"
            >
              <div className={`h-2 bg-gradient-to-r ${item.gradient}`}></div>
              <div className="p-8 text-center">
                <div className="flex justify-center items-center text-5xl mb-4 transition-transform group-hover:scale-110">
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 font-medium mb-1">{item.text}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-7xl px-6 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                We're Here To Help
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Have any questions, feedback, or need assistance? Our team is
                here to support you. Reach out to us anytime.
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you soon.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject (optional)"
                  {...register("subject")}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  {...register("message", { required: "Message is required" })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none transition-all"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
