import React, { useState, useEffect } from "react";
import {
  File,
  Folder,
  MoreVertical,
  Download,
  Trash2,
  Share2,
  Upload,
  Grid,
  List,
  Filter,
  Star,
  X,
  Copy,
} from "lucide-react";
import client from "../../../utils/client";
import { notifyError, notifySuccess } from "../../../utils/Helpers";
import { useSelector } from "react-redux";
import ShareModal from "../../../components/User/Auth/Modals/ShareModal";

const FileGuardDrive = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [shareEmail, setShareEmail] = useState("");
  const [sharePermission, setSharePermission] = useState("view");
  const [shareLoading, setShareLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  const fetchFiles = async () => {
    if (!user?.id) {
      notifyError("User not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await client.get(`/files/?user_id=${user.id}`);

      if (response.data && Array.isArray(response.data)) {
        const sortedFiles = response.data.sort((a, b) => {
          if (a.isStarred && !b.isStarred) return -1;
          if (!a.isStarred && b.isStarred) return 1;
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setFiles(sortedFiles);
      } else {
        console.error("Unexpected response format:", response.data);
        setFiles([]);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      notifyError("Failed to load files");
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const toggleStar = async (fileId, currentStarStatus) => {
    if (!user?.id) {
      notifyError("User not found");
      return;
    }

    try {
      const response = await client.post(`/files/${fileId}/toggle-star/`, {
        user_id: user.id,
      });

      if (response.data.success) {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId
              ? { ...file, isStarred: response.data.isStarred }
              : file
          )
        );
        notifySuccess(
          `File ${response.data.isStarred ? "starred" : "unstarred"}`
        );
      }
    } catch (error) {
      console.error("Error toggling star:", error);
      notifyError("Failed to update star status");
    }
  };

  const handleFileUpload = async (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles.length || !user?.id) return;

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    formData.append("user_id", user.id);
    formData.append("is_private", true);

    try {
      const response = await client.post("/files/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        notifySuccess(
          `Successfully uploaded ${response.data.total_created} file(s)`
        );
        fetchFiles();
        event.target.value = "";
      } else {
        notifyError("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      notifyError("Upload failed");
    }
  };

  const handleDownload = async (file) => {
    try {
      notifySuccess("Preparing download...");

      const response = await client.get(`/files/${file.id}/download/`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      notifySuccess("Download completed");
    } catch (error) {
      console.error("Download error:", error);

      if (error.response?.status === 404 || error.response?.status === 500) {
        notifyError("Secure download failed, trying direct download...");

        const link = document.createElement("a");
        link.href = file.file;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        notifyError("Download failed");
      }
    }
  };

  const handleDelete = async (fileId) => {
    if (!user?.id) {
      notifyError("User not found");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this file?")) {
      return;
    }

    try {
      await client.delete(`/files/${fileId}/`);
      notifySuccess("File deleted successfully");
      fetchFiles();
    } catch (error) {
      console.error("Delete error:", error);
      notifyError("Failed to delete file");
    }
  };

  const openShareModal = (file) => {
    setSelectedFile(file);
    setShareEmail("");
    setSharePermission("view");
    setShareModalOpen(true);
    setActiveDropdown(null);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
    setSelectedFile(null);
    setShareEmail("");
    setSharePermission("view");
    setShareLoading(false);
  };

  const handleShareSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile || !shareEmail.trim()) {
      notifyError("Please enter a valid email address");
      return;
    }

    if (!user?.id) {
      notifyError("User not found");
      return;
    }

    setShareLoading(true);

    try {
      const response = await client.post(`/files/${selectedFile.id}/share/`, {
        email: shareEmail.trim(),
        permission: sharePermission,
        shared_by: user.id,
      });

      if (response.data.success) {
        notifySuccess(`File shared successfully with ${shareEmail}`);
        closeShareModal();
        fetchFiles();
      } else {
        notifyError(response.data.message || "Failed to share file");
      }
    } catch (error) {
      console.error("Share error:", error);
      notifyError(
        error.response?.data?.message ||
          "Failed to share file. Please try again."
      );
    } finally {
      setShareLoading(false);
    }
  };

  const generateShareableLink = async (file) => {
    try {
      const response = await client.post(`/files/${file.id}/generate-link/`, {
        user_id: user.id,
      });

      if (response.data.shareable_link) {
        await navigator.clipboard.writeText(response.data.shareable_link);
        notifySuccess("Shareable link copied to clipboard!");

        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id === file.id ? { ...f, is_private: false } : f
          )
        );
      }
    } catch (error) {
      console.error("Generate link error:", error);
      notifyError("Failed to generate shareable link");
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getFileIcon = (fileName) => {
    if (fileName?.endsWith?.(".pdf")) return "📄";
    if (fileName?.endsWith?.(".xlsx") || fileName?.endsWith?.(".xls"))
      return "📊";
    if (fileName?.endsWith?.(".docx") || fileName?.endsWith?.(".doc"))
      return "📝";
    if (
      fileName?.endsWith?.(".jpg") ||
      fileName?.endsWith?.(".jpeg") ||
      fileName?.endsWith?.(".png")
    )
      return "🖼️";
    return "📄";
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Close dropdown when clicking outside - FIXED VERSION
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside dropdown
      if (activeDropdown && !event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeDropdown]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your files...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Folder className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">My Drive</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-medium cursor-pointer"
              >
                <Upload className="w-5 h-5" />
                Upload Files
              </label>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl px-6 py-5 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <svg
                className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search files"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button className="p-3 hover:bg-slate-100 rounded-xl transition-colors">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-white shadow-sm"
                    : "hover:bg-slate-200"
                }`}
              >
                <List className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm"
                    : "hover:bg-slate-200"
                }`}
              >
                <Grid className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Files Section */}
        <div className="mb-6">
          <p className="text-slate-600">
            {files.length} {files.length === 1 ? "item" : "items"} • Last
            updated today
          </p>
        </div>

        {/* Files Table */}
        {files.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <Folder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
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
              <Upload className="w-5 h-5" />
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
                {files.map((file, index) => (
                  <tr
                    key={file.id}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                      index === files.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStar(file.id, file.isStarred)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
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
                          <Download className="w-4 h-4 text-slate-600" />
                        </button>
                        <button
                          onClick={() => openShareModal(file)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Share2 className="w-4 h-4 text-slate-600" />
                        </button>
                        <div className="relative dropdown-container">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(file.id);
                            }}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-slate-600" />
                          </button>
                          {activeDropdown === file.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden">
                              <button
                                onClick={() => handleDownload(file)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </button>
                              <button
                                onClick={() => openShareModal(file)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                              >
                                <Share2 className="w-4 h-4" />
                                Share with Email
                              </button>
                              <button
                                onClick={() => generateShareableLink(file)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                              >
                                <Copy className="w-4 h-4" />
                                Copy Shareable Link
                              </button>
                              {file.user_id === user?.id && (
                                <button
                                  onClick={() => handleDelete(file.id)}
                                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                                >
                                  <Trash2 className="w-4 h-4" />
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

        <ShareModal
          isOpen={shareModalOpen}
          onClose={closeShareModal}
          selectedFile={selectedFile}
          shareEmail={shareEmail}
          setShareEmail={setShareEmail}
          sharePermission={sharePermission}
          setSharePermission={setSharePermission}
          onSubmit={handleShareSubmit}
          loading={shareLoading}
        />
      </div>
    </div>
  );
};

export default FileGuardDrive;
