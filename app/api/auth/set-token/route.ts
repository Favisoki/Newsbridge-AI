// app/api/set-cookie/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, refresh, user } = await req.json();
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 400 }
      );
    }

    const res = NextResponse.json({ success: true, cookiesSet: true });

    // HttpOnly cookie (most secure, but JS can't read it)
    res.cookies.set({
      name: "access_secure",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    // Non-httpOnly cookie for Authorization header (needed for Django)
    res.cookies.set({
      name: "access_token_header",
      value: token,
      httpOnly: false,  // JS can read this
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    if (refresh) {
      res.cookies.set({
        name: "refresh_secure",
        value: refresh,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    // Flag cookie
    res.cookies.set({
      name: "access",
      value: "true",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    if (user) {
      res.cookies.set({
        name: "user",
        value: JSON.stringify(user),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }

    return res;
  } catch (error) {
    console.error("Error setting auth cookies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to set authentication cookies" },
      { status: 500 }
    );
  }
}
