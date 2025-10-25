import React, { useState } from "react";
import { File, Folder, MoreVertical, Download, Trash2, Share2, Upload, Grid, List, Filter, Star } from "lucide-react";

const FileGuardDrive = () => {
  const [files, setFiles] = useState([
    { id: 1, name: "Project Proposal.pdf", type: "file", size: "2.4 MB", modified: "Oct 20, 2025", shared: false, starred: false },
    { id: 2, name: "Vacation Photos", type: "folder", items: 45, modified: "Oct 18, 2025", shared: true, starred: true },
    { id: 3, name: "Budget 2025.xlsx", type: "file", size: "1.2 MB", modified: "Oct 15, 2025", shared: false, starred: false },
    { id: 4, name: "Meeting Notes.docx", type: "file", size: "856 KB", modified: "Oct 12, 2025", shared: true, starred: false },
    { id: 5, name: "Design Assets", type: "folder", items: 23, modified: "Oct 10, 2025", shared: false, starred: true },
    { id: 6, name: "Invoice_Oct2025.pdf", type: "file", size: "324 KB", modified: "Oct 8, 2025", shared: false, starred: false },
    { id: 7, name: "Marketing Campaign", type: "folder", items: 12, modified: "Oct 5, 2025", shared: true, starred: false },
    { id: 8, name: "Resume_2025.pdf", type: "file", size: "445 KB", modified: "Oct 1, 2025", shared: false, starred: false },
  ]);

  const [viewMode, setViewMode] = useState("list");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const getFileIcon = (name) => {
    if (name.endsWith('.pdf')) return '📄';
    if (name.endsWith('.xlsx')) return '📊';
    if (name.endsWith('.docx')) return '📝';
    return '📄';
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleStar = (id) => {
    setFiles(files.map(file => 
      file.id === id ? { ...file, starred: !file.starred } : file
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Folder className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">FileGuard Drive</h1>
                <p className="text-slate-600">Secure cloud storage</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-medium">
              <Upload className="w-5 h-5" />
              Upload Files
            </button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl px-6 py-5 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search files and folders..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button className="p-3 hover:bg-slate-100 rounded-xl transition-colors">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex bg-slate-100 rounded-xl p-1">
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
              >
                <List className="w-5 h-5 text-slate-700" />
              </button>
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
              >
                <Grid className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Files</p>
                <p className="text-3xl font-bold text-slate-800">
                  {files.filter(f => f.type === "file").length}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <File className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Folders</p>
                <p className="text-3xl font-bold text-slate-800">
                  {files.filter(f => f.type === "folder").length}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
                <Folder className="w-7 h-7 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Shared Items</p>
                <p className="text-3xl font-bold text-slate-800">
                  {files.filter(f => f.shared).length}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <Share2 className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Files Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">My Drive</h2>
          <p className="text-slate-600">{files.length} items • Last updated today</p>
        </div>

        {/* Files Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 w-12"></th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Modified</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Size</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((item, index) => (
                <tr key={item.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${index === files.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStar(item.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`w-5 h-5 ${item.starred ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.type === "folder" ? (
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                          <Folder className="w-6 h-6 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-11 h-11 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-xl">
                          {getFileIcon(item.name)}
                        </div>
                      )}
                      <span className="font-medium text-slate-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.modified}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.type === "folder" ? (
                      <span className="text-slate-500">{item.items} items</span>
                    ) : (
                      <span>{item.size}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.shared ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-600">Shared</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                        <span className="text-sm text-slate-600">Private</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4 text-slate-600" />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => toggleDropdown(item.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-slate-600" />
                        </button>
                        {activeDropdown === item.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden">
                            <button className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3">
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                            <button className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3">
                              <Share2 className="w-4 h-4" />
                              Share
                            </button>
                            <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3">
                              <Trash2 className="w-4 h-4" />
                              Delete
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
      </div>
    </div>
  );
};

export default FileGuardDrive;