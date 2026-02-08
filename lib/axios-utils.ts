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
    const errorMessage = error.response?.data?.detail;

    // console.log("❌ Request failed:", {
    //   status,
    //   errorMessage,
    //   url: error.config?.url,
    //   cookies: document.cookie,
    // });

    // Only logout on specific session expiry errors
    if (status === 401) {
      if (
        errorMessage === "session_expired" ||
        errorMessage === "Unauthorized"
      ) {
        console.warn("Session expired, logging out");
        logout("session-expired");
      }
    }

    return Promise.reject(error);
  },
);

export const request = async (options: AxiosRequestConfig) => {
  return client(options);
};

export default client;
