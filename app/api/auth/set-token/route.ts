import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, user } = await req.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: "access",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  res.cookies.set({
    name: "user",
    value: JSON.stringify(user),
    httpOnly: false, // allow reading from client
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
