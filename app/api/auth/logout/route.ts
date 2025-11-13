// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get the refresh token from httpOnly cookie
    const refreshToken = req.cookies.get("refresh_secure")?.value;

    console.log("🔍 Refresh token found:", refreshToken ? "YES" : "NO");

    // Call Django logout endpoint if refresh token exists
    if (refreshToken) {
      try {
        const djangoLogoutUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://newsbridge-backend.onrender.com"}/logout/`;
        
        console.log("Calling Django logout:", djangoLogoutUrl);
        
        const request = await fetch(djangoLogoutUrl, {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        const djangoResponse = await request.json();
        
        console.log("Django response:", {
          status: request.status,
          ok: request.ok,
          data: djangoResponse,
        });

        if (request.ok) {
          console.log("Django logout successful");
        } else {
          console.warn("Django logout returned error:", djangoResponse);
        }
      } catch (djangoError) {
        console.error("Django logout failed:", djangoError);
        // Continue with cookie clearing even if Django fails
      }
    } else {
      console.warn(" No refresh token found in cookies");
    }

    // Create response
    const res = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Clear all auth cookies
    const cookiesToClear = [
      "access_secure",
      "refresh_secure",
      "access",
      "access_token_header",
      "user",
      "csrftoken",
    ];

    cookiesToClear.forEach((cookieName) => {
      res.cookies.delete(cookieName);
    });

    console.log("🧹 Cookies cleared");

    return res;
  } catch (error) {
    console.error("Logout error:", error);
    
    // Even on error, clear cookies
    const res = NextResponse.json(
      { success: false, message: "Logout completed with errors" },
      { status: 500 }
    );

    // Clear cookies even on error
    const cookiesToClear = [
      "access_secure",
      "refresh_secure",
      "access",
      "access_token_header",
      "user",
      "csrftoken",
    ];

    cookiesToClear.forEach((cookieName) => {
      res.cookies.delete(cookieName);
    });

    return res;
  }
}