import React, { useState, useEffect } from "react";
import {
  File,
  Folder,
  MoreVertical,
  Download,
  Share2,
  Grid,
  List,
  Filter,
  Star,
  Users,
  Search,
} from "lucide-react";
import client from "../../../utils/client";
import { notifyError, notifySuccess } from "../../../utils/Helpers";
import { useSelector } from "react-redux";

const Shared = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((state) => state.user.user);

  const fetchSharedFiles = async () => {
    if (!user?.id) {
      notifyError("User not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Fetch files shared with the current user
      const response = await client.get(
        `/files/shared-with-me/?user_id=${user.id}`
      );

      if (response.data && response.data.success) {
        const sharedFiles = response.data.shared_files || [];
        const sortedFiles = sharedFiles.sort((a, b) => {
          return new Date(b.shared_at) - new Date(a.shared_at);
        });

        setFiles(sortedFiles);
        setFilteredFiles(sortedFiles); // Initialize filtered files
      } else {
        console.error("Unexpected response format:", response.data);
        setFiles([]);
        setFilteredFiles([]);
      }
    } catch (error) {
      console.error("Error fetching shared files:", error);
      notifyError("Failed to load shared files");
      setFiles([]);
      setFilteredFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSharedFiles();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFiles(files);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = files.filter(
      (file) =>
        file.file_name?.toLowerCase().includes(query) ||
        file.shared_by?.toLowerCase().includes(query)
    );

    setFilteredFiles(filtered);
  }, [searchQuery, files]);

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
            file.file === fileId
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

  const handleDownload = async (file) => {
    try {
      notifySuccess("Preparing download...");

      // Download from backend instead of direct Supabase URL
      const response = await client.get(`/files/${file.file}/download/`, {
        responseType: "blob", // Important for file download
      });

      // Create blob and download link
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.file_name; // Use file_name from shared files response
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      notifySuccess("Download completed");
    } catch (error) {
      console.error("Download error:", error);

      // Fallback to direct download if backend fails
      if (error.response?.status === 404 || error.response?.status === 500) {
        notifyError("Secure download failed, trying direct download...");

        // Direct download as fallback - use file_url from shared files response
        const link = document.createElement("a");
        link.href = file.file_url;
        link.download = file.file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        notifyError("Download failed");
      }
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
      hour: "2-digit",
      minute: "2-digit",
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeDropdown]);

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredFiles.map((file) => (
        <div
          key={file.id}
          className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300"
        >
          <div className="p-5">
            {/* File Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-2xl">
                {getFileIcon(file.file_name)}
              </div>
              <div className="flex items-center gap-1">
                <div className="relative dropdown-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(file.id);
                    }}
                    className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                  {activeDropdown === file.id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-lg shadow-xl z-30 overflow-hidden">
                      <button
                        onClick={() => handleDownload(file)}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* File Info */}
            <div className="mb-4">
              <h3 className="font-semibold text-slate-800 mb-1 truncate">
                {file.file_name}
              </h3>
              <p className="text-xs text-slate-500 mb-2">
                {formatFileSize(file.file_size)}
              </p>
              <p className="text-xs text-slate-500">
                Shared {formatDate(file.shared_at)}
              </p>
            </div>

            {/* Download Button */}
            <button
              onClick={() => handleDownload(file)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // List View Component
  const ListView = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 w-12"></th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
              File Name
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
              Size
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
              Shared On
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
                  onClick={() => toggleStar(file.file, file.isStarred)}
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
                    {getFileIcon(file.file_name)}
                  </div>
                  <div>
                    <span className="font-medium text-slate-800 block">
                      {file.file_name}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {formatFileSize(file.file_size)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {formatDate(file.shared_at)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleDownload(file)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-slate-600" />
                  </button>
                  <div className="relative dropdown-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(file.id);
                      }}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title="More options"
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
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading shared files...</p>
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
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Shared with Me
                </h1>
                <p className="text-slate-600 mt-1">
                  Files that others have shared with you
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl px-6 py-5 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search shared files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    ? "bg-white shadow-sm text-blue-600"
                    : "hover:bg-slate-200 text-slate-600"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-blue-600"
                    : "hover:bg-slate-200 text-slate-600"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Files Section */}
        <div className="mb-6">
          <p className="text-slate-600">
            {filteredFiles.length}{" "}
            {filteredFiles.length === 1 ? "shared file" : "shared files"}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Files Content */}
        {filteredFiles.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            {searchQuery ? (
              <>
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  No files found for "{searchQuery}"
                </h3>
                <p className="text-slate-500 mb-6">
                  Try adjusting your search terms or browse all shared files
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  No files shared with you yet
                </h3>
                <p className="text-slate-500 mb-6">
                  When someone shares files with you, they will appear here
                </p>
              </>
            )}
          </div>
        ) : (
          <>{viewMode === "list" ? <ListView /> : <GridView />}</>
        )}
      </div>
    </div>
  );
};

export default Shared;
