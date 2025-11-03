import { toast } from "react-toastify";

export const authenticate = (data) => {
  if (typeof window !== "undefined" && data.session && data.user) {
    localStorage.setItem("supabase_session", JSON.stringify(data.session));

    // Extract user info (works for Supabase and custom backends)
    const { user } = data;

    // If Supabase, user info might be inside user_metadata
    const userData = {
      id: user.id,
      email: user.email,
      first_name: user.user_metadata?.first_name || user.first_name || "",
      last_name: user.user_metadata?.last_name || user.last_name || "",
      role: user.user_metadata?.role || user.role || "",
      avatar: user.user_metadata?.avatar || null,
      phone_number: user.user_metadata?.phone_number || "",
    };

    // Save user data
    localStorage.setItem("supabase_user", JSON.stringify(userData));
  }
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("supabase_user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const setUser = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

export const logout = () => {
  if (window !== "undefined") {
    localStorage.removeItem("supabase_session");
    localStorage.removeItem("supabase_user");
  }
};

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

// Format Date
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
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
