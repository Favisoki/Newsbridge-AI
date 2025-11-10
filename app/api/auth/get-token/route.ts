import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access")?.value;
  const userData = req.cookies.get("user")?.value;

  if (!userData || !accessToken) {
    return NextResponse.json(
      { status: 404, error: "user not authenticated", message: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: 200,
    data: JSON.parse(userData),
  });
}
