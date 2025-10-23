import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import { FiMenu } from "react-icons/fi";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen relative">
      {/* Hamburger Menu Button (visible on small screens) */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden absolute top-4 left-4 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-64 bg-white shadow-md md:relative fixed inset-y-0 z-20`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-0">
        <Navbar />

        <main className="p-4 h-full overflow-auto bg-[#F0F1F6]">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile (click to close sidebar) */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Layout;
