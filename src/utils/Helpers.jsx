import { toast } from "react-toastify";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFile,
} from "react-icons/fa";

// Notify success message using Toastify
export const notifySuccess = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

// Notify error message using Toastify
export const notifyError = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getBorderColor = (fieldName, errors, touchedFields) => {
  if (errors[fieldName]) {
    return "border-red-500"; // Red border for errors
  }
  if (touchedFields[fieldName]) {
    return "border-green-500"; // Green border for successful validation after interaction
  }
  return "border-gray-200"; // Gray border by default
};

// Dagdag na helper function
export const formatStorageSize = (bytes) => {
  if (bytes === 0) return "0 GB";

  const GB = bytes / (1024 * 1024 * 1024);
  if (GB < 0.001) {
    const MB = bytes / (1024 * 1024);
    return `${MB.toFixed(2)} MB`;
  }
  return `${GB.toFixed(4)} GB`;
};

export const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFileIcon = (fileName) => {
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

export const getFileColor = (fileType) => {
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
