import React from "react";
import {
  FaLock,
  FaPlay,
  FaInfinity,
  FaKey,
  FaDatabase,
  FaShieldAlt,
  FaBolt,
  FaGlobe,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const benefits = [
    {
      icon: <FaLock className="text-4xl" />,
      label: "Anonymous Exchange",
      description: "Share files anonymously without revealing identity",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaPlay className="text-4xl" />,
      label: "Online Preview",
      description: "Play and preview files directly in browser",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: <FaInfinity className="text-4xl" />,
      label: "No Size Limits",
      description: "Upload files of any size without restrictions",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaKey className="text-4xl" />,
      label: "Password Protection",
      description: "Secure transfers with password encryption",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <FaDatabase className="text-4xl" />,
      label: "Triple Backups",
      description: "Your data is backed up across three locations",
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Secure File Sharing
                <span className="block text-blue-200">Made Simple</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                Share, store, and protect your files with enterprise-grade
                security. Access your documents anywhere, anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Get Started Free <FaArrowRight />
                </button>
                <button
                  onClick={() => navigate("/about-us")}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                >
                  Learn More <FaArrowRight />
                </button>
              </div>

              {/* Trusted Users (Hero) */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                  <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+9.9K</span>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-white">10,000+ Users</p>
                  <p className="text-blue-200">Trust FileGuard</p>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-3xl transform rotate-6 opacity-20"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-4xl">
                      <FaDatabase className="text-blue-600" />
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-700 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-blue-600 rounded-tl-3xl opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-4 border-indigo-600 rounded-br-3xl opacity-50"></div>

              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/images/home-about.jpg"
                  alt="About FileGuard"
                  className="relative w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    10K+
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Happy Users</p>
                    <p className="text-sm text-gray-500">Trust FileGuard</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                  About FileGuard
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  What is{" "}
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    FileGuard?
                  </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                FileGuard is a{" "}
                <span className="font-semibold text-gray-900">
                  reliable and secure
                </span>{" "}
                file sharing and storage solution that empowers users to manage
                their files effortlessly. Our platform is designed with
                user-friendliness and security in mind, ensuring that your files
                are always safe and accessible.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <FaShieldAlt />, text: "Enterprise-grade security" },
                  { icon: <FaBolt />, text: "Lightning-fast file transfers" },
                  { icon: <FaGlobe />, text: "Access from anywhere" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <span className="text-gray-700 font-medium group-hover/item:text-blue-600 transition-colors">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* ✅ Trusted by Thousands Section */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                <div className="flex -space-x-3">
                  <img
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
                    alt="User 1"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <img
                    src="https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg"
                    alt="User 2"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                    alt="User 3"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">
                    Trusted by thousands
                  </p>
                  <p className="text-gray-500">Join our growing community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold uppercase tracking-wider text-sm">
              Why Choose FileGuard
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              More than just
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                sharing and storage
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit) => (
              <div key={benefit.label} className="group relative">
                <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <div className="relative">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white`}
                    >
                      {benefit.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                    {benefit.label}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-1 rounded-2xl shadow-2xl">
              <div className="bg-white rounded-xl px-8 py-4 w-full sm:w-auto">
                <button className="group relative font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
                  Start Free Today <FaArrowRight />
                </button>
              </div>
              <div className="px-6 py-4 text-white font-medium">
                No credit card required • 15GB free storage
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500 flex-wrap">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> Secure & Encrypted
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> GDPR Compliant
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> Cancel Anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Plan
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16">
            Start free, and upgrade anytime for more power and storage.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-500 mb-6">Best for personal use</p>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  ₱0
                  <span className="text-lg text-gray-500 font-medium">/mo</span>
                </p>
                <ul className="space-y-3 text-gray-600 mb-8 text-left">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> 15GB Secure
                    Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> File Sharing
                    Links
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Basic Support
                  </li>
                </ul>
                <button className="w-full py-3 rounded-lg font-semibold border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                  Get Started
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl transform scale-105 border border-blue-700">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-blue-100 mb-6">
                  For professionals and teams
                </p>
                <p className="text-4xl font-bold mb-6">
                  ₱299
                  <span className="text-lg text-blue-200 font-medium">/mo</span>
                </p>
                <ul className="space-y-3 text-blue-100 mb-8 text-left">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-white" /> 200GB Secure
                    Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-white" /> Password-Protected
                    Links
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-white" /> Priority Support
                  </li>
                </ul>
                <button className="w-full py-3 rounded-lg font-semibold bg-white text-blue-600 hover:bg-blue-50 transition-all">
                  Upgrade to Pro
                </button>
              </div>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Business
                </h3>
                <p className="text-gray-500 mb-6">
                  For large teams & enterprises
                </p>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  ₱999
                  <span className="text-lg text-gray-500 font-medium">/mo</span>
                </p>
                <ul className="space-y-3 text-gray-600 mb-8 text-left">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> 2TB Encrypted
                    Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Team Management
                    Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> 24/7 Priority
                    Support
                  </li>
                </ul>
                <button className="w-full py-3 rounded-lg font-semibold border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
