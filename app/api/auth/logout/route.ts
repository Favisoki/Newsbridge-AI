import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const clearedAccessCookie = serialize("access", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0), // expire immediately
    sameSite: "strict",
  });

  const clearedUserCookie = serialize("user", "", {
    path: "/",
    expires: new Date(0),
  });

  const res = NextResponse.json({
    status: 200,
    message: "Logged out successfully",
  });

  res.headers.set("Set-Cookie", [clearedAccessCookie, clearedUserCookie].join(", "));
  return res;
}
