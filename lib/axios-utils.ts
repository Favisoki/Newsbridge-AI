import axios, { type AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
import { logout } from "./utils"

const getBaseUrl = (url: string) => {
  return "https://cldbknd.newsbridgeai.com"
}

const client = axios.create({
  timeout: 300000,
  withCredentials: true,
})

client.interceptors.request.use(
  (config) => {
    const url = config.url || ""

    if (url.startsWith("/api/")) {
      config.baseURL = "" // same origin
    } else {
      config.baseURL = getBaseUrl(url)
      console.log("[v0] Request config - URL:", url, "BaseURL:", config.baseURL)
    }

    // For external API calls, we need to send the token in the header
    if (!url.startsWith("/api/") && ["post", "put", "delete", "patch"].includes(config.method?.toLowerCase() || "")) {
      const csrfToken = Cookies.get("csrftoken")
      if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken
      }
    }

    if (!url.startsWith("/api/")) {
      const token = Cookies.get("access_token_header")
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status

    if (status === 401) {
      console.warn("401 detected – session expired")
      logout()
    }

    return Promise.reject(error)
  },
)

export const request = async (options: AxiosRequestConfig) => {
  const config = {
    ...options,
    withCredentials: true,
  }

  return client(config)
}
