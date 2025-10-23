import React, { useState, useRef, useEffect } from "react";
import { FiHome, FiFileText, FiUsers, FiCloud, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import client from "../../../../utils/client";
import { notifyError, notifySuccess } from "../../../../utils/Helpers";
import ProgressBar from "@ramonak/react-progress-bar";

const Sidebar = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const fetchTotalSize = async () => {
    try {
      const response = await client.post("/get-tot-file-size/");
      setTotalSize(response.data.total_size);
    } catch (error) {
      notifyError("Failed to fetch total upload size");
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTotalSize();
  }, []);

  const handleMenuOptionClick = (option) => {
    if (option === "Upload File") {
      fileInputRef.current.click();
    }
    setMenuOpen(false);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const formData = new FormData(formRef.current);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    uploadFiles(formData);
  };

  const uploadFiles = async (formData) => {
    setUploading(true);
    try {
      const response = await client.post("/upload/", formData, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.floor((current / total) * 100);
          setProgress(percentCompleted);
        },
        headers: {
          Accept: "application/json",
          "Content-Type": undefined,
        },
        withCredentials: true,
      });

      notifySuccess("File(s) uploaded successfully!", response.data);
      fetchTotalSize();
    } catch (error) {
      notifyError("Something went wrong");
      console.error(error.message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-64 p-4 bg-white h-full flex flex-col shadow-sm">
      {/* Logo */}
      <div
        onClick={() => navigate("/drive")}
        className="flex flex-col items-center mt-4 cursor-pointer mb-6"
      >
        <img
          src="/images/logo.png"
          alt="FileGuard Logo"
          className="w-20 h-20"
        />
        <h5 className="mt-2 text-lg font-semibold text-gray-700">FileGuard</h5>
      </div>

      {/* + New Button */}
      <div className="relative mb-6">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 rounded-md shadow-md transition"
        >
          <FiPlus className="w-5 h-5" />
          <span>New</span>
        </button>

        {/* Upload Menu */}
        {menuOpen && (
          <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-md shadow-md w-full z-10">
            <button
              onClick={() => handleMenuOptionClick("Upload File")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Upload File
            </button>
          </div>
        )}
      </div>

      {/* File Upload Form (Hidden Input) */}
      <form ref={formRef} encType="multipart/form-data">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </form>

      {/* Upload Progress */}
      {uploading && (
        <div className="mb-4">
          <ProgressBar
            completed={progress}
            height="20px"
            bgColor={progress < 50 ? "#facc15" : "#4caf50"}
          />
          <p className="text-sm text-center mt-1 text-gray-600">
            {progress < 50 ? "Encrypting the file..." : "Uploading..."}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <nav className="flex flex-col gap-2 mb-6">
        <button
          onClick={() => navigate("/drive")}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
        >
          <FiHome className="w-5 h-5 text-gray-600" />
          Home
        </button>

        <button
          onClick={() => navigate("/drive/files")}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
        >
          <FiFileText className="w-5 h-5 text-gray-600" />
          My Drive
        </button>

        <button
          onClick={() => navigate("/drive/shared-with-me")}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
        >
          <FiUsers className="w-5 h-5 text-gray-600" />
          Shared with me
        </button>
      </nav>

      <hr className="border-gray-200 mb-4" />

      {/* Storage Info */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-gray-700">
          <FiCloud className="w-5 h-5 text-gray-600" />
          <span>Storage</span>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          {(totalSize / (1024 * 1024)).toFixed(2)} MB of 15 GB used
        </p>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${(totalSize / (15 * 1024 * 1024 * 1024)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
