import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="p-5 bg-[#f9f9f9] font-sans">
      <div className="text-center mb-8">
        <h1 className="text-4xl text-[#4285F4]">About Us</h1>
        <div className="mt-[10px]">
          <Link to="/" className="text-[#4285F4] no-underline hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link
            to="/about"
            className="text-[#4285F4] no-underline hover:underline"
          >
            About Us
          </Link>
        </div>
      </div>
      <div className="flex h-[500px]">
        {/* Left Div with Image */}
        <div className="flex-1 items-center justify-center overflow-hidden ">
          <img
            src="images/about-us.jpg"
            alt="About Us"
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* Right Div with Text Content */}
        <div className=" flex-1 p-5 flex-col justify-center bg-[#fff] rounded-xl shadow-lg">
          {/* Div 1: Horizontal Line with Text */}
          <div className="flex items-center mb-5">
            <hr className="border border-blue-500 w-1/2 mx-auto" />

            <h1 className="text-[#4285f4] text-4xl font-bold ml-2.5">
              About Us
            </h1>
          </div>

          {/* Div 2: Big Text */}
          <h2 className="text-black text-3xl font-bold mb-2.5">Who We Are</h2>

          {/* Div 3: Two Paragraphs about FileGuard */}
          <p className="mb-2.5">
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
      {/* Div 1: Horizontal Line beside "Our Advantages" */}
      <div className="p-5 bg-[#f9f9f9] mb-10 font-sans">
        <hr className="w-1/2 mr-2.5 border border-blue-500" />
        <h1 className="text-blue-500 text-4xl font-bold m-0">Our Advantages</h1>
      </div>
      {/* Div 2: Large Emphasized Text */}
      <h2 className="mb-8 text-black text-4xl font-bold">Why Choose Us?</h2>

      {/* Div 3: Two Columns - Left for Text, Right for Percent Bars */}
      <div className="flex mb-10">
        <div className="flex-1 pr-5">
          <p className="mb-2.5 text-[#333] leading-relaxed">
            FileGuard provides a robust file-sharing service that emphasizes
            security and user experience. Our platform is designed to ensure
            that your data remains protected while being easily accessible.
          </p>
          <p className="mb-2.5 text-[#333] leading-relaxed">
            With our state-of-the-art encryption and user-friendly interface,
            sharing files has never been more secure and straightforward. Choose
            FileGuard for peace of mind and efficiency in your file-sharing
            needs.
          </p>
        </div>

        <div className="flex-1">
          <div className="mb-4">
            <div className="mb-1.5 text-[#333] font-bold">Security 95%</div>
            <div className="bg-[#e0e0e0] rounded-md h-5 w-full">
              <div
                className="bg-blue-500 h-full rounded-md"
                style={{ width: "95%" }}
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-1.5 text-[#333] font-bold">Efficiency 90%</div>
            <div className="bg-[#e0e0e0] rounded-md h-5 w-full">
              <div className="bg-blue-500 h-full rounded-md w-[90%]"></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-1.5 text-[#333] font-bold">Guarantee 85%</div>
            <div className="bg-[#e0e0e0] rounded-md h-5 w-full">
              <div className="bg-blue-500 h-full rounded-md w-[85%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
