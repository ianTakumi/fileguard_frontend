import React, { useState } from "react";
import { X, Share2 } from "lucide-react";
import { notifyError, notifySuccess } from "../../../../utils/Helpers";
import client from "../../../../utils/client";
import { useSelector } from "react-redux";

const ShareModal = ({ isOpen, onClose, selectedFile }) => {
  const [shareEmail, setShareEmail] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

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
        shared_with_email: shareEmail.trim(),
        owner_id: user.id,
      });

      if (response.status === 201) {
        notifySuccess(`File shared successfully with ${shareEmail}`);
        handleClose();
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

  const handleClose = () => {
    setShareEmail("");
    setShareLoading(false);
    onClose();
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

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
      {/* Modal Container */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Share File</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {selectedFile && (
            <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-lg">
                {getFileIcon(selectedFile.name)}
              </div>
              <div>
                <p className="font-medium text-slate-800">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-slate-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleShareSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Share Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> The recipient will receive an email
                  notification with access to this file.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={shareLoading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {shareLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sharing...
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Share File
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
