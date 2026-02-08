// app/api/refresh-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // Read the HttpOnly refresh token from cookies
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_secure")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: "No refresh token found" },
        { status: 401 }
      );
    }

    // Forward the request to your Django backend
    const response = await fetch("https://cldbknd.newsbridgeai.com/refresh-token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Token refresh failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const newAccessToken = data.access;
    const newRefreshToken = data.refresh;

    if (!newAccessToken) {
      return NextResponse.json(
        { success: false, error: "No access token in response" },
        { status: 500 }
      );
    }

    // Create response with new tokens
    const res = NextResponse.json({ 
      success: true, 
      access: newAccessToken,
      refresh: newRefreshToken 
    });

    // Update cookies with new tokens
    res.cookies.set({
      name: "access_secure",
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    if (newRefreshToken) {
      res.cookies.set({
        name: "refresh_secure",
        value: newRefreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return res;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { success: false, error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}