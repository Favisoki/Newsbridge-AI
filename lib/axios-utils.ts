import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const externalBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://newsbridge-backend.onrender.com";

const client = axios.create({
  timeout: 300000,
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    const url = config.url || "";

    // Decide which baseURL to use
    if (url.startsWith("/api/")) {
      config.baseURL = ""; // same origin
    } else {
      // External Django backend
      config.baseURL = externalBaseUrl;
    }

    // Attach access token if available 
    const token = Cookies.get("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Handle expired or invalid token
    if (status === 401) {
      console.warn("401 detected – possibly expired session");
      // Optionally clear local cookies here
      // Cookies.remove("access");
      // Cookies.remove("user");
    }

    return Promise.reject(error);
  }
);

export const request = async (options: AxiosRequestConfig) => {
  const config = {
    ...options,
    withCredentials: true,
  };

  return client(config);
};
