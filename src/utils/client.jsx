import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:8000/api"; // Development
  } else {
    return "https://fileguardpython-backend.onrender.com/api"; // Production
  }
};

const client = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
