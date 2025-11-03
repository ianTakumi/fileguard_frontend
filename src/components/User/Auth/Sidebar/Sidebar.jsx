import React, { useState, useRef, useEffect } from "react";
import { FiHome, FiFileText, FiUsers, FiCloud, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import client from "../../../../utils/client";
import { getUser, notifyError, notifySuccess } from "../../../../utils/Helpers";
import ProgressBar from "@ramonak/react-progress-bar";

const Sidebar = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const user = getUser();

  const fetchTotalSize = async () => {
    try {
      const response = await client.post("/files/total-size/", {
        user_id: user.id,
      });
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
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    uploadFiles(files);

    // Reset file input
    event.target.value = "";
  };

  const uploadFiles = async (files) => {
    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("user_id", user.id);

      // Append all files
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await client.post("/files/", formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(percentCompleted);
          }
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        const fileCount =
          response.data.total_created ||
          response.data.created_files?.length ||
          1;
        notifySuccess(`${fileCount} file(s) uploaded successfully!`);
        fetchTotalSize();
        if (response.data.errors && response.data.errors.length > 0) {
          response.data.errors.forEach((error) => {
            notifyError(`Failed to upload ${error.file_name}: ${error.error}`);
          });
        }
      } else {
        notifyError("Upload failed");
      }

      fetchTotalSize();
    } catch (error) {
      console.error("Upload error:", error);

      // Better error handling
      if (error.code === "ERR_NETWORK") {
        notifyError(
          "Network error: Cannot connect to server. Please check your connection."
        );
      } else if (error.response?.data?.error) {
        notifyError(`Upload failed: ${error.response.data.error}`);
      } else {
        notifyError("Upload failed. Please try again.");
      }
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
              Upload File(s)
            </button>
          </div>
        )}
      </div>

      {/* File Upload Input */}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Progress */}
      {uploading && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Uploading {progress < 50 ? "& encrypting..." : "..."}</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar
            completed={progress}
            height="12px"
            bgColor={progress < 50 ? "#f59e0b" : "#10b981"}
            borderRadius="4px"
          />
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
            className="h-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${Math.min(
                (totalSize / (15 * 1024 * 1024 * 1024)) * 100,
                100
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
