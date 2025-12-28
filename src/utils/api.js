// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",  // your backend port
  withCredentials: true,  // ← THIS IS THE KEY: sends cookies automatically
});

// Optional: Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: redirect to login if unauthorized
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;