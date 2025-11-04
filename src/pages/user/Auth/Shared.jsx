import React, { useState } from "react";
import {
  Download,
  MoreVertical,
  FileText,
  FileSpreadsheet,
  Archive,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";
import { useSelector } from "react-redux";
import { formatDate } from "../../../utils/Helpers";
const Shared = () => {
  const user = useSelector((state) => state.user.user);

  const [sharedFiles, setSharedFiles] = useState([
    {
      id: 1,
      file_id: 101,
      file_name: "Q4_Sales_Report.pdf",
      file_type: "pdf",
      username: "John Martinez",
      shared_date: "2025-10-22T10:30:00",
      size: "2.4 MB",
    },
    {
      id: 2,
      file_id: 102,
      file_name: "Project_Timeline.xlsx",
      file_type: "xlsx",
      username: "Sarah Chen",
      shared_date: "2025-10-20T14:15:00",
      size: "1.8 MB",
    },
    {
      id: 3,
      file_id: 103,
      file_name: "Design_Mockups.zip",
      file_type: "zip",
      username: "Michael Rodriguez",
      shared_date: "2025-10-18T09:45:00",
      size: "15.2 MB",
    },
    {
      id: 4,
      file_id: 104,
      file_name: "Contract_Draft.docx",
      file_type: "docx",
      username: "Emily Johnson",
      shared_date: "2025-10-15T16:20:00",
      size: "856 KB",
    },
    {
      id: 5,
      file_id: 105,
      file_name: "Team_Building_Photos.zip",
      file_type: "zip",
      username: "David Kim",
      shared_date: "2025-10-12T11:00:00",
      size: "28.5 MB",
    },
    {
      id: 6,
      file_id: 106,
      file_name: "Budget_Analysis.xlsx",
      file_type: "xlsx",
      username: "Lisa Anderson",
      shared_date: "2025-10-10T13:30:00",
      size: "3.2 MB",
    },
    {
      id: 7,
      file_id: 107,
      file_name: "Training_Materials.pdf",
      file_type: "pdf",
      username: "James Wilson",
      shared_date: "2025-10-08T08:15:00",
      size: "4.7 MB",
    },
    {
      id: 8,
      file_id: 108,
      file_name: "Product_Presentation.pdf",
      file_type: "pdf",
      username: "Maria Garcia",
      shared_date: "2025-10-05T15:45:00",
      size: "6.1 MB",
    },
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");

  const getFileIcon = (fileType) => {
    const iconProps = { className: "w-5 h-5" };
    switch (fileType) {
      case "pdf":
      case "docx":
        return <FileText {...iconProps} />;
      case "xlsx":
        return <FileSpreadsheet {...iconProps} />;
      case "zip":
        return <Archive {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const getFileColor = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "bg-red-50 text-red-600 border-red-200";
      case "xlsx":
        return "bg-green-50 text-green-600 border-green-200";
      case "docx":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "zip":
        return "bg-purple-50 text-purple-600 border-purple-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleDecrypt = async (fileId) => {
    alert(`Decrypting file ID: ${fileId}`);
    setActiveDropdown(null);
  };

  const toggleDropdown = (fileId) => {
    setActiveDropdown(activeDropdown === fileId ? null : fileId);
  };

  const filteredFiles = sharedFiles.filter(
    (file) =>
      file.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Shared with me
              </h1>
              <p className="text-gray-500 text-sm">
                {filteredFiles.length} files shared to you
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search files or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-gray-700 font-medium">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {viewMode === "list" ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Shared by
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredFiles.map((file) => (
                    <tr
                      key={file.id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg border flex items-center justify-center ${getFileColor(
                              file.file_type
                            )}`}
                          >
                            {getFileIcon(file.file_type)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {file.file_name}
                            </p>
                            <p className="text-xs text-gray-500 uppercase">
                              {file.file_type}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                            {getInitials(file.username)}
                          </div>
                          <span className="text-sm text-gray-700">
                            {file.username}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">
                          {formatDate(file.shared_date)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">
                          {file.size}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecrypt(file.file_id)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => toggleDropdown(file.id)}
                              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {activeDropdown === file.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                                <button
                                  onClick={() => handleDecrypt(file.file_id)}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                  <Download className="w-4 h-4" />
                                  Decrypt & Download
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="group border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all hover:border-blue-300 bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getFileColor(
                        file.file_type
                      )}`}
                    >
                      {getFileIcon(file.file_type)}
                    </div>
                    <button
                      onClick={() => toggleDropdown(file.id)}
                      className="p-1 rounded hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    {file.file_name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    {file.size} • {formatDate(file.shared_date)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                      {getInitials(file.username)}
                    </div>
                    <span className="text-xs text-gray-600 truncate">
                      {file.username}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No files found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shared;
