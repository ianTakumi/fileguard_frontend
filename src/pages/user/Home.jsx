import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => navigate("/signup");
  const handleAboutUsClick = () => navigate("/about-us");

  return (
    <div className="flex flex-col">
      {/* Carousel Section */}
      <div className="w-full max-w-6xl mx-auto py-8">
        <Swiper
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {[1, 2, 3].map((num) => (
            <SwiperSlide key={num}>
              <div className="relative flex items-center justify-start h-[400px] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={`/images/image-slide-${num}.jpeg`}
                  alt={`Slide ${num}`}
                  className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute left-10 text-white max-w-lg animate-fadeIn">
                  <h1 className="text-4xl font-bold leading-snug">
                    File sharing &
                  </h1>
                  <h1 className="text-4xl font-bold mb-4">
                    storage made simple
                  </h1>
                  <p className="text-lg mb-6 opacity-90">
                    All your files with you everywhere and anytime.
                  </p>
                  <button
                    onClick={handleSignUpClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md transition-all"
                  >
                    Free Sign Up
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 flex items-center justify-center p-6">
          <img
            src="/images/home-about.jpg"
            alt="About Us"
            className="w-4/5 max-w-sm rounded-lg"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
          <div className="flex items-center space-x-4">
            <hr className="w-1/2 border-gray-300" />
            <span className="text-2xl font-bold">About Us</span>
          </div>
          <h1 className="text-3xl font-semibold">What is FileGuard?</h1>
          <p className="text-gray-700 leading-relaxed">
            FileGuard is a reliable and secure file sharing and storage solution
            that empowers users to manage their files effortlessly. Our platform
            is designed with user-friendliness and security in mind, ensuring
            that your files are always safe and accessible.
          </p>
          <button
            onClick={handleAboutUsClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
          >
            More About Us
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="flex flex-col items-center text-center py-16 space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <hr className="w-20 border-2 border-blue-500" />
          <h1 className="text-3xl font-bold">Our Benefits</h1>
        </div>
        <h2 className="text-2xl font-semibold">
          More than just sharing and storage
        </h2>
        <p className="text-gray-600 max-w-lg">
          Take a look at the top features to make your life simple and easy.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-8">
          {[
            { src: "icon1.jpg", label: "Anonymous file exchange" },
            { src: "icon2.jpg", label: "Playing files online" },
            { src: "icon3.jpg", label: "No size limits" },
            { src: "icon4.jpg", label: "Setting password for file transfer" },
            { src: "icon5.jpg", label: "Triple backups" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <img
                src={`/images/${item.src}`}
                alt={item.label}
                className="w-16 h-16 mb-3"
              />
              <p className="text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleSignUpClick}
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition"
        >
          Free Sign Up
        </button>
      </div>

      {/* Floating Section */}
      <div className="relative w-full h-screen">
        <img
          src="/images/background-large.jpg"
          alt="File Needs"
          className="w-full h-full object-cover brightness-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/50 rounded-lg mx-8 p-10 backdrop-blur-md">
          <div className="text-3xl font-bold text-gray-800 mb-6">
            Handles all of your file needs
          </div>
          <div className="text-gray-900 space-y-2 mb-6">
            <h1 className="text-4xl font-bold">No matter where you go –</h1>
            <h1 className="text-4xl font-bold">take your files with you</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl">
            Whether it’s your music collection, home videos, your resume, or
            your important work docs, have them in your pocket whenever you need
            them.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Powerful and Simple
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          File storage made easy – including powerful features you won’t find
          anywhere else. Whether you’re sharing photos, videos, audio, or docs,
          FileGuard can simplify your workflow.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {[
            { src: "step-1.jpg", label: "Share" },
            { src: "step-2.jpg", label: "Collaborate" },
            { src: "step-3.jpg", label: "Store" },
            { src: "step-4.jpg", label: "Access" },
          ].map((step) => (
            <div key={step.label} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-3">
                <img
                  src={`/images/${step.src}`}
                  alt={step.label}
                  className="w-10 h-10"
                />
              </div>
              <p className="font-semibold text-gray-700">{step.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-gray-500 mb-10">
          <p className="w-56">
            Share through email, link, or social network. Unlimited downloads.
            No wait times.
          </p>
          <p className="w-56">
            Store and share any file type. Share folders of project files.
            Easily email large files.
          </p>
          <p className="w-56">
            10GB for free. Up to 50GB free with bonuses. Store all your photos,
            audio, and videos.
          </p>
          <p className="w-56">
            Always have your important files with you. Never forget your work at
            home.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 text-white text-lg font-semibold">
          {[1, 2, 3, 4].map((num, i) => (
            <React.Fragment key={num}>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                {num}
              </div>
              {i < 3 && <span className="text-gray-600 text-2xl">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
