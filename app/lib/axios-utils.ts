import axios, { AxiosRequestConfig } from "axios";
// import { Cookies } from "react-cookie";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://newsbridge-backend.onrender.com";

const client = axios.create({
  timeout: 300000,
  baseURL: baseUrl,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   withCredentials: true,
});
// const cookies = new Cookies();
client.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const tkn = localStorage.getItem("token");
      if (tkn) {
        config.headers["Authorization"] = `Bearer ${tkn}`;
      }
    }
    return config;
  },
  (error) => {
    throw error;
  }
);
client.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

export const request = ({ ...options }: AxiosRequestConfig) => client(options);





// import axios, { AxiosRequestConfig } from "axios";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const client = axios.create({
//   baseURL: baseUrl,
//   timeout: 300000,
// });

// client.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       const tkn = localStorage.getItem("token");
//       if (tkn) {
//         config.headers = {
//           ...config.headers,
//           Authorization: `Bearer ${tkn}`,
//         };
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// client.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

// export const request = async <T>(options: AxiosRequestConfig): Promise<T> => {
//   const response = await client(options);
//   return response.data;
// };
