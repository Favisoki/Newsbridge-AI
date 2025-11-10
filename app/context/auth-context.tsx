"use client";

import { createContext, useContext, type ReactNode, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSetToken } from "@/app/api/auth/mutations";
import { clearSignupData, ObjectLiteral } from "@/lib/utils";

interface AuthContextType {
  user: ObjectLiteral | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  setUser: (user: ObjectLiteral | null) => void;
  signupData: ObjectLiteral | null;
  setSignupData: React.Dispatch<React.SetStateAction<ObjectLiteral | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<ObjectLiteral | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mutate: setToken } = useSetToken();
  const [signupData, setSignupData] = useState<ObjectLiteral | null>(null)

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
      // Save client-readable cookie for user info
      Cookies.set("user", JSON.stringify(userData), { path: "/" });

      // Optional: sync with backend / mutation
      setToken(userData);

      router.refresh();
    } else {
      Cookies.remove("user");
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", 
      });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      Cookies.remove("user");
      Cookies.remove("access"); 
      clearSignupData()
      router.push("/login"); 
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        setUser: updateUser,
        signupData,
        setSignupData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
