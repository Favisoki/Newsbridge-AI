"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { clearSignupData, ObjectLiteral } from "@/lib/utils";

interface AuthContextType {
  user: ObjectLiteral | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  setUser: (user: ObjectLiteral | null) => void;
  signupData: ObjectLiteral | null;
  setSignupData: React.Dispatch<React.SetStateAction<ObjectLiteral | null>>;
  isLoggingOut: boolean;
  setIsLoggingOut: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<ObjectLiteral | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signupData, setSignupData] = useState<ObjectLiteral | null>(null);

  // Hydrate user from client-readable cookie
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        Cookies.remove("user");
      }
    }
    setIsLoading(false);
  }, []);

  const updateUser = (userData: ObjectLiteral | null) => {
    setUser(userData);
    if (userData) {
      // User cookie will be set by the API route
      router.refresh();
    } else {
      Cookies.remove("user");
    }
  };

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    if (isLoggingOut) return; // Prevent double logout

    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Server logout failed");
      }
    } catch (err) {
      console.error("Logout failed", err);
      // Continue with cleanup even if server call fails
    } finally {
      setUser(null);
      setSignupData(null);

      // Clear cookies
      const cookiesToRemove = ["user", "access", "access_token_header"];
      cookiesToRemove.forEach((name) => {
        Cookies.remove(name, { path: "/" });
      });

      // Clear storage
      clearSignupData();
      localStorage.removeItem("journalist-profile-draft");
      localStorage.removeItem("media-house-setup-draft");
      sessionStorage.clear();
      Cookies.remove("blockSpecialRoutes");

      // Reset state
      setIsLoggingOut(false);

      // Redirect with success message
      router.push("/auth/login?logout=success");
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      logout,
      setUser: updateUser,
      signupData,
      setSignupData,
      isLoggingOut,
      setIsLoggingOut
    }),
    [user, isLoading, signupData, isLoggingOut, logout, updateUser, setSignupData, setIsLoggingOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
