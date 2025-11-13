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

    // For external API calls, we need to send the token in the header
    // because Django expects it there
    if (
      !url.startsWith("/api/") &&
      ["post", "put", "delete", "patch"].includes(config.method?.toLowerCase() || "")
    ) {
      const csrfToken = Cookies.get("csrftoken");
      if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
      }
    }

     if (!url.startsWith("/api/")) {
      const token = Cookies.get("access_token_header");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("401 detected – session expired");
      
      // // Clear client-side cookies
      // document.cookie = "access=; path=/; max-age=0";
      // document.cookie = "access_token_header=; path=/; max-age=0";
      // document.cookie = "user=; path=/; max-age=0";
      
      // // Redirect to login
      // window.location.href = "/login";
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