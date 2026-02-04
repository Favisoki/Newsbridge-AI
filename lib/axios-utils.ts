// client.ts
import axios, { type AxiosRequestConfig } from "axios";
import { logout } from "./utils";

const client = axios.create({
  timeout: 300000,
  withCredentials: true,
  baseURL: "/api",
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const errorMessage = error.response?.data?.error;

    console.log("❌ Request failed:", {
      status,
      errorMessage,
      url: error.config?.url,
      cookies: document.cookie, // See what cookies exist
    });

    console.log(error.response)

    // Only logout on specific session expiry errors
     if (status === 401) {
      // Check if it's a real auth failure (not a network/server error)
      if (
        errorMessage === "Session expired" ||
        errorMessage === "Unauthorized"
      ) {
        console.warn("Session expired, logging out");
        // logout();
      }
     }
    
        if (status === 500 || !status) {
      console.warn("Network/server error, not logging out:", {
        status,
        error: errorMessage || error.message,
      });
    }

    return Promise.reject(error);
  }
);

export const request = async (options: AxiosRequestConfig) => {
  return client(options);
};

export default client;