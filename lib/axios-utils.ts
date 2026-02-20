// client.ts
import axios, { type AxiosRequestConfig } from "axios";

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

    // Only logout on specific session expiry errors
    if (status === 401) {
      // Check if it's a real auth failure (not a network/server error)
      if (
        errorMessage === "Session expired" ||
        errorMessage === "Unauthorized"
      ) {
        // Handle session expiry - user will be redirected by middleware
      }
    }
    
    if (status === 500 || !status) {
      // Network/server error - don't logout
    }

    return Promise.reject(error);
  }
);

export const request = async (options: AxiosRequestConfig) => {
  return client(options);
};

export default client;
