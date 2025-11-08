"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { apiClient } from "./former-api-client"

interface User {
  id: string
  email: string
  name: string
  role: "journalist" | "media_house" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<any>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("authToken")
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("user")
        localStorage.removeItem("authToken")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiClient.login(email, password)
      if (response.success && response.data) {
        const userData: User = {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          avatar: response.data.avatar,
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("authToken", response.data.token)
        return response.data
      }
      throw new Error(response.error || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await apiClient.logout()
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
