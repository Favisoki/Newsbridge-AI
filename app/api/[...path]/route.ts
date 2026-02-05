import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const BASE_URL = "https://cldbknd.newsbridgeai.com";

// Routes that DO NOT need auth
const PUBLIC_ROUTES = [
  "login",
  "logout",
  "journalistsignup",
  "mediasignup",
  "mediahousejournalistsignup",
  "refresh-token",
  "reset",
  "resend_reset",
  "reset-password",
  "create-password",
  "wait",
  "invitejourno",
];

function isPublicRoute(path: string[]) {
  const joined = path.join("/").toLowerCase();
  return PUBLIC_ROUTES.some((r) => joined.startsWith(r));
}

/* ---------------- SAFE JSON PARSER ---------------- */
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return { detail: "Non-JSON response", status: res.status };
  }
}

/* ---------------- SET AUTH COOKIES ---------------- */
function setAuthCookies(
  res: NextResponse,
  data: { access: string; refresh?: string; user?: any },
) {
  const isProd = process.env.NODE_ENV === "production";

  res.cookies.set("access_secure", data.access, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  res.cookies.set("access", "true", {
    httpOnly: false,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  if (data.refresh) {
    res.cookies.set("refresh_secure", data.refresh, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  if (data.user) {
    res.cookies.set("user", JSON.stringify(data.user), {
      httpOnly: false,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }
}

/* ---------------- SINGLE REFRESH LOCK ---------------- */
let refreshPromise: Promise<{
  access: string;
  refresh?: string;
} | null> | null = null;

async function refreshToken(): Promise<{
  access: string;
  refresh?: string;
} | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const cookieStore = await cookies();
      const refresh = cookieStore.get("refresh_secure")?.value;
      if (!refresh) return null;

      const res = await fetch(`${BASE_URL}/refresh-token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) return null;

      const data = await safeJson(res);
      if (!data.access) return null;

      return { access: data.access, refresh: data.refresh };
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/* ---------------- MAIN HANDLER ---------------- */
async function handleRequest(req: NextRequest, path: string[], method: string) {
  try {
    let backendPath = path.join("/");
    if (!backendPath.endsWith("/")) backendPath += "/";

    const backendUrl = `${BASE_URL}/${backendPath}${req.nextUrl.search}`;

    let body: string | undefined;
    if (!["GET", "DELETE"].includes(method)) {
      try {
        body = JSON.stringify(await req.json());
      } catch {
        body = undefined;
      }
    }

    /* ---------- PUBLIC ROUTES ---------- */
    if (isPublicRoute(path)) {
      const res = await fetch(backendUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body,
      });

      const data = await safeJson(res);
      const nextRes = NextResponse.json(data, { status: res.status });

      if (
        res.ok &&
        data.access &&
        (backendPath === "login/" || backendPath.startsWith("create-password/"))
      ) {
        setAuthCookies(nextRes, data);
      }

      return nextRes;
    }

    /* ---------- PROTECTED ROUTES ---------- */
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("access_secure")?.value;

    if (!accessToken) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    // FIRST ATTEMPT
    let backendRes = await fetch(backendUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });

    // TOKEN EXPIRED → REFRESH
    if (backendRes.status === 401) {
      const refreshResult = await refreshToken();
      if (!refreshResult) {
        const errData = await safeJson(backendRes);
        return NextResponse.json(errData, { status: 401 });
      }

      // 🔥 IMPORTANT: update token IN MEMORY
      accessToken = refreshResult.access;

      backendRes = await fetch(backendUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      });

      const retryData = await safeJson(backendRes);
      const nextRes = NextResponse.json(retryData, {
        status: backendRes.status,
      });

      setAuthCookies(nextRes, refreshResult);
      return nextRes;
    }

    const data = await safeJson(backendRes);
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Proxy server error",
        detail: err instanceof Error ? err.message : "Unknown",
      },
      { status: 500 },
    );
  }
}

/* ---------------- EXPORT METHODS ---------------- */
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => handleRequest(req, (await params).path, "GET");

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => handleRequest(req, (await params).path, "POST");

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => handleRequest(req, (await params).path, "PUT");

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => handleRequest(req, (await params).path, "PATCH");

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => handleRequest(req, (await params).path, "DELETE");
