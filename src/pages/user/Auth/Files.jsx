import React, { useState } from "react";
import {
  FaUpload,
  FaSearch,
  FaEllipsisV,
  FaDownload,
  FaShare,
  FaTrash,
  FaLock,
  FaFolder,
  FaStar,
  FaFilePdf,
  FaFileExcel,
  FaFileWord,
  FaFileImage,
  FaFile,
} from "react-icons/fa";
import { formatDate } from "../../../utils/Helpers";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = { id: 1 }; // Mock current user

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return <FaFilePdf className="text-red-500" />;
      case "docx":
      case "doc":
        return <FaFileWord className="text-blue-500" />;
      case "xlsx":
      case "xls":
        return <FaFileExcel className="text-green-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-purple-500" />;
      default:
        return <FaFile className="text-slate-500" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setUploading(true);
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            setProgress(0);
            alert("File(s) uploaded successfully!");
          }, 500);
        }
      }, 300);
    }
  };

  const handleFileUpload = (event) => {
    handleFileChange(event);
  };

  const toggleStar = (fileId, currentStarred) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId ? { ...file, isStarred: !currentStarred } : file
      )
    );
  };

  const handleDownload = (file) => {
    alert(`Downloading file: ${file.name}`);
    setActiveDropdown(null);
  };

  const handleShare = (fileId) => {
    alert(`Sharing file ID: ${fileId}`);
    setActiveDropdown(null);
  };

  const handleDelete = (fileId) => {
    if (confirm("Are you sure you want to delete this file?")) {
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
      alert("File deleted successfully!");
    }
    setActiveDropdown(null);
  };

  const toggleDropdown = (fileId) => {
    setActiveDropdown(activeDropdown === fileId ? null : fileId);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            File Manager
          </h1>
          <p className="text-slate-600">
            Manage and organize your documents securely
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={() => document.getElementById("file-upload").click()}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              <FaUpload className="w-5 h-5" />
              Upload Files
            </button>
            <input
              id="file-upload"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Files Table */}
        {files.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <FaFolder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No files yet
            </h3>
            <p className="text-slate-500 mb-6">
              Upload your first file to get started
            </p>
            <input
              type="file"
              id="empty-upload"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="empty-upload"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg inline-flex items-center gap-2 font-medium cursor-pointer"
            >
              <FaUpload className="w-5 h-5" />
              Upload Your First File
            </label>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 w-12"></th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Size
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file, index) => (
                  <tr
                    key={file.id}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                      index === filteredFiles.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStar(file.id, file.isStarred)}
                        className="hover:scale-110 transition-transform"
                      >
                        <FaStar
                          className={`w-5 h-5 ${
                            file.isStarred
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-xl">
                          {getFileIcon(file.name)}
                        </div>
                        <div>
                          <span className="font-medium text-slate-800 block">
                            {file.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatFileSize(file.size)}
                    </td>
                    <td className="px-6 py-4">
                      {file.is_private ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                          <span className="text-sm text-slate-600">
                            Private
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-slate-600">Shared</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDownload(file)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <FaDownload className="w-4 h-4 text-slate-600" />
                        </button>
                        <button
                          onClick={() => handleShare(file.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <FaShare className="w-4 h-4 text-slate-600" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(file.id)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <FaEllipsisV className="w-4 h-4 text-slate-600" />
                          </button>
                          {activeDropdown === file.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden">
                              <button
                                onClick={() => handleDownload(file)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                              >
                                <FaDownload className="w-4 h-4" />
                                Download
                              </button>
                              <button
                                onClick={() => handleShare(file.id)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                              >
                                <FaShare className="w-4 h-4" />
                                Share
                              </button>
                              {file.user_id === currentUser?.id && (
                                <button
                                  onClick={() => handleDelete(file.id)}
                                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                                >
                                  <FaTrash className="w-4 h-4" />
                                  Delete
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* File Count */}
        <div className="mt-4 text-sm text-slate-600">
          Showing {filteredFiles.length} of {files.length} files
        </div>
      </div>

      {/* Upload Progress Modal */}
      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Uploading Files
            </h3>
            <div className="space-y-4">
              <div className="relative pt-1">
                <div className="overflow-hidden h-3 text-xs flex rounded-full bg-slate-200">
                  <div
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-300 rounded-full"
                  ></div>
                </div>
              </div>
              <p className="text-center text-2xl font-bold text-slate-800">
                {progress}%
              </p>
              <p className="text-center text-sm text-slate-600">
                Please wait while we upload your files...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Files;
