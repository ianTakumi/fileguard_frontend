import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col items-center text-gray-800">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-2">About Us</h1>
        <div className="text-sm space-x-2">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          /
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl my-16 px-6 md:px-10">
        {/* Left: Image */}
        <div className="flex-1 flex items-center justify-center mb-10 md:mb-0">
          <img
            src="/images/about-us.jpg"
            alt="About Us"
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Text */}
        <div className="flex-1 flex flex-col justify-center md:pl-10 space-y-6">
          <div className="text-center">
            <hr className="w-1/2 mx-auto border-blue-500 mb-3" />
            <h1 className="text-blue-500 text-3xl font-bold">About Us</h1>
          </div>

          <h2 className="text-2xl font-bold">Who We Are</h2>
          <p>
            FileGuard is a secure file-sharing tool that enables users to share
            documents and files easily while ensuring their privacy and data
            security. Our platform offers a user-friendly interface designed for
            efficiency and convenience, making it simple to send and receive
            files.
          </p>
          <p>
            With advanced encryption technologies and stringent access controls,
            FileGuard guarantees that your sensitive information remains
            protected at all times. Whether for personal use or business
            purposes, our service is tailored to meet the needs of every user.
          </p>
        </div>
      </div>

      {/* Advantages Section */}
      <div className="w-full max-w-6xl px-6 md:px-10 my-16">
        {/* Header */}
        <div className="flex items-center justify-center mb-10">
          <hr className="w-24 border-2 border-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Our Advantages</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-12">
          Why Choose Us?
        </h2>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Text */}
          <div className="flex-1 space-y-4 text-gray-700 leading-relaxed">
            <p>
              FileGuard provides a robust file-sharing service that emphasizes
              security and user experience. Our platform is designed to ensure
              that your data remains protected while being easily accessible.
            </p>
            <p>
              With our state-of-the-art encryption and user-friendly interface,
              sharing files has never been more secure and straightforward.
              Choose FileGuard for peace of mind and efficiency in your
              file-sharing needs.
            </p>
          </div>

          {/* Right: Percent Bars */}
          <div className="flex-1 space-y-6">
            {[
              { label: "Security", percent: 95 },
              { label: "Efficiency", percent: 90 },
              { label: "Guarantee", percent: 85 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-blue-600 font-semibold">
                    {item.percent}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
