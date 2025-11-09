const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://newsbridge-backend.onrender.com"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface ApiError {
  message: string
  status: number
  details?: any
}

export interface ReportingRegion {
  id?: number
  name: string
}

export interface ReportingLanguage {
  id?: number
  name: string
}

export interface JournalistSignupPayload {
  first_name: string
  last_name: string
  email: string
  phone_number?: string
  country?: string
  city?: string
  role?: string
  why_join?: string
  agree_terms: boolean
  regions?: ReportingRegion[]
  region_ids?: number[]
  languages: ReportingLanguage[] // Required per API docs
  language_ids?: number[]
  coverages: ReportingLanguage[] // Required per API docs
  coverage_ids?: number[]
}

export interface MediaSignupPayload {
  organisation_name?: string // Note: British spelling
  email: string
  coverages: ReportingLanguage[] // Required per API docs
  coverage_ids?: number[]
  organisation_type?: string
  country?: string
  city?: string
  website?: string
  agree_terms: boolean
  agree_request_access: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
  user?: any
}

export interface CreatePasswordPayload {
  password1: string
  password2: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    console.log("[v0] API Client initialized with base URL:", this.baseUrl)
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    console.log("[v0] Making API request to:", url)
    console.log("[v0] Request method:", options.method || "GET")
    console.log("[v0] Request headers:", headers)
    if (options.body) {
      console.log("[v0] Request body:", options.body)
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: "cors", // Explicitly set CORS mode
        credentials: "omit", // Don't send cookies for CORS
      })

      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

      const data = await response.json()
      console.log("[v0] Response data:", data)

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error || `HTTP ${response.status}`,
          message: data.message,
        }
      }

      return {
        success: true,
        data,
        message: data.message,
      }
    } catch (error) {
      console.error("[v0] API request failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  async login(email: string, password: string) {
    const response = await this.request<LoginResponse>("/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (response.success && response.data) {
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", response.data.access)
        localStorage.setItem("refresh_token", response.data.refresh)
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user))
        }
      }
    }

    return response
  }

  async logout() {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null

    const response = await this.request("/logout/", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user")
    }

    return response
  }

  async journalistSignup(data: JournalistSignupPayload) {
    return this.request("/journalistSignup/", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async mediaSignup(data: MediaSignupPayload) {
    return this.request("/mediaSignup/", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async mediaHouseJournalistSignup(encryptedData: string) {
    return this.request(`/MediaHouseJournalistSignup/${encryptedData}`, {
      method: "POST",
    })
  }

  async inviteOnboard(data: any) {
    return this.request("/invite-onboard/", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async createPassword(uid64: string, token: string, passwords: CreatePasswordPayload) {
    return this.request(`/create-password/${uid64}/${token}/`, {
      method: "POST",
      body: JSON.stringify(passwords),
    })
  }

  async resetPassword(uid64: string, token: string, passwords: CreatePasswordPayload) {
    return this.request(`/reset-password/${uid64}/${token}/`, {
      method: "POST",
      body: JSON.stringify(passwords),
    })
  }

  async resendReset(email: string) {
    return this.request("/resend_reset/", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async resetPasswordInitiate(email: string) {
    return this.request("/reset/", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async approveUser(id: string) {
    return this.request(`/approveuser/${id}`, {
      method: "POST",
    })
  }

  async retrieveJournalistInfo() {
    return this.request("/retieveJournalistInfo/", {
      method: "GET",
    })
  }

  async updateUser(data: any) {
    return this.request("/user-update/", {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async getReport(id: string) {
    return this.request(`/report/${id}/`, {
      method: "GET",
    })
  }

  async getReports(params?: { search?: string; page?: number }) {
    const queryParams = new URLSearchParams()
    if (params?.search) queryParams.append("search", params.search)
    if (params?.page) queryParams.append("page", params.page.toString())

    return this.request(`/reports/?${queryParams.toString()}`, {
      method: "GET",
    })
  }
}

export const apiClient = new ApiClient()

export default apiClient
