import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_LINK, // e.g., http://127.0.0.1:8000/api/v1
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Automatically attach Supabase token to every request
client.interceptors.request.use(
  (config) => {
    // Try to get the Supabase session from localStorage
    const session = JSON.parse(localStorage.getItem("supabase_session"));
    const token = session?.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Handle multipart/form-data automatically when uploading files
client.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

export default client;
