import React, { useState } from "react";
import { Upload, Search, MoreVertical, Download, Share2, Trash2, Lock } from "lucide-react";

const Files = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      file_name: "Project_Proposal_2025.pdf",
      file_type: "pdf",
      file_size: "2.4 MB",
      upload_date: "2025-10-20T14:30:00",
    },
    {
      id: 2,
      file_name: "Financial_Report_Q3.xlsx",
      file_type: "xlsx",
      file_size: "1.8 MB",
      upload_date: "2025-10-18T09:15:00",
    },
    {
      id: 3,
      file_name: "Meeting_Notes.docx",
      file_type: "docx",
      file_size: "456 KB",
      upload_date: "2025-10-15T16:45:00",
    },
    {
      id: 4,
      file_name: "Presentation_Slides.pdf",
      file_type: "pdf",
      file_size: "5.2 MB",
      upload_date: "2025-10-12T11:20:00",
    },
    {
      id: 5,
      file_name: "Team_Photo.jpg",
      file_type: "jpg",
      file_size: "3.1 MB",
      upload_date: "2025-10-10T13:00:00",
    },
    {
      id: 6,
      file_name: "Budget_Template.xlsx",
      file_type: "xlsx",
      file_size: "892 KB",
      upload_date: "2025-10-08T10:30:00",
    },
    {
      id: 7,
      file_name: "Contract_Agreement.pdf",
      file_type: "pdf",
      file_size: "1.2 MB",
      upload_date: "2025-10-05T15:10:00",
    },
    {
      id: 8,
      file_name: "Marketing_Strategy.docx",
      file_type: "docx",
      file_size: "678 KB",
      upload_date: "2025-10-01T08:45:00",
    },
  ]);
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFileTypeColor = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "bg-red-50 text-red-600 border-red-200";
      case "docx":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "xlsx":
        return "bg-green-50 text-green-600 border-green-200";
      case "jpg":
      case "png":
        return "bg-purple-50 text-purple-600 border-purple-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
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

  const handleDecrypt = (fileId) => {
    alert(`Decrypting file ID: ${fileId}`);
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

  const filteredFiles = files.filter(file =>
    file.file_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">File Manager</h1>
          <p className="text-slate-600">Manage and organize your documents securely</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
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
              <Upload className="w-5 h-5" />
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
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Type</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Size</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Modified</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredFiles.map((file) => (
                  <tr
                    key={file.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${getFileTypeColor(file.file_type)}`}>
                          <span className="text-xs font-bold uppercase">
                            {file.file_type}
                          </span>
                        </div>
                        <span className="font-medium text-slate-800">{file.file_name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-600 text-sm uppercase">{file.file_type}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-600 text-sm">{file.file_size}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-600 text-sm">{formatDate(file.upload_date)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end">
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(file.id)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-5 h-5 text-slate-600" />
                          </button>
                          {activeDropdown === file.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-hidden">
                              <button
                                onClick={() => handleDecrypt(file.id)}
                                className="flex items-center gap-3 w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                <Lock className="w-4 h-4" />
                                <span className="text-sm">Decrypt</span>
                              </button>
                              <button
                                onClick={() => handleShare(file.id)}
                                className="flex items-center gap-3 w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm">Share</span>
                              </button>
                              <button
                                onClick={() => handleDelete(file.id)}
                                className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="text-sm">Delete</span>
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

          {filteredFiles.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-500">No files found</p>
            </div>
          )}
        </div>

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