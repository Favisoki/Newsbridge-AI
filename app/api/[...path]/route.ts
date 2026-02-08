import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const BASE_URL = "https://cldbknd.newsbridgeai.com";

// ──────────────────────────────────────────────────────────────
// ─── Routes that DO NOT need auth ───
// ──────────────────────────────────────────────────────────────

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

// ──────────────────────────────────────────────────────────────
// ─── SAFE JSON PARSER ───
// ──────────────────────────────────────────────────────────────

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return { detail: "Non-JSON response", status: res.status };
  }
}

// ──────────────────────────────────────────────────────────────
// ─── Set Auth Cookies ───
// ──────────────────────────────────────────────────────────────

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
    maxAge: 60 * 15
  });

  res.cookies.set("access", "true", {
    httpOnly: false,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15
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
      maxAge: 60 * 15
    });
  }
}

// ──────────────────────────────────────────────────────────────
// ─── SINGLE REFRESH LOCK ───
// ──────────────────────────────────────────────────────────────

let refreshPromise: Promise<{
  access: string;
  refresh?: string;
} | null> | null = null;

async function refreshToken(): Promise<{
  access: string;
  refresh?: string;
} | null> {
  // console.log("Initial refresh promise: ", refreshPromise);
  if (refreshPromise) {
    // console.log("Returned Promise: ", refreshPromise);
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const cookieStore = await cookies();
      const refresh = cookieStore.get("refresh_secure")?.value;
      // console.log("refresh token from cookie: ", refresh);
      if (!refresh) return null;

      const res = await fetch(`${BASE_URL}/refresh-token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // credentials: "include"
        },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) {
        // console.log("I am loading 1.....");
        const errorRefresh = await safeJson(res);
        // console.log(
        //   "Error occured during getting new access token with refresh token ",
        //   errorRefresh,
        // );
        return null;
      }

      // console.log("I am loading 2.....");
      const data = await safeJson(res);
      // console.log("token response object: ", data);
      if (!data.access) return null;

      return { access: data.access, refresh: data.refresh };
    } catch (err) {
      // console.log("couldnt get token: ", err);
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  // console.log("This is the returned promise: ", refreshPromise);

  return refreshPromise;
}

// ──────────────────────────────────────────────────────────────
// MAIN HANDLER
// ──────────────────────────────────────────────────────────────
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

    // ──────────────────────────────────────────────────────────────
    // ─── PUBLIC ROUTES ───
    // ──────────────────────────────────────────────────────────────
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

    // ──────────────────────────────────────────────────────────────
    // ─── PROTECTED ROUTES ───
    // ──────────────────────────────────────────────────────────────
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("access_secure")?.value;
    // console.log("access token for making requests: ", accessToken);

    if (!accessToken) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    // ──────────────────────────────────────────────────────────────
    // ─── FIRST ATTEMPT ───
    // ──────────────────────────────────────────────────────────────

    let backendRes = await fetch(backendUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });

    // ──────────────────────────────────────────────────────────────
    // ─── TOKEN EXPIRED → REFRESH ───
    // ──────────────────────────────────────────────────────────────

    // console.log(
    //   "Response object from fetch made from backend api: ",
    //   backendRes,
    // );
    if (backendRes.status === 401) {
      const refreshResult = await refreshToken();
      if (!refreshResult) {
        const res = NextResponse.json(
          { detail: "session_expired" },
          { status: 401 },
        );

        res.cookies.set("access_secure", "", { path: "/", maxAge: 0 });
        res.cookies.set("refresh_secure", "", { path: "/", maxAge: 0 });
        res.cookies.set("access", "", { path: "/", maxAge: 0 });
        res.cookies.set("user", "", { path: "/", maxAge: 0 });
        res.cookies.set("blockSpecialRoutes", "", { path: "/", maxAge: 0 });
        // console.log("no refresh result. new access token didn't come");
        return res;
      }

      // ──────────────────────────────────────────────────────────────
      // ─── IMPORTANT: update token IN MEMORY ───
      // ──────────────────────────────────────────────────────────────

      // console.log("new access token object: ", refreshResult);
      accessToken = refreshResult.access;
      // console.log("access token value: ", accessToken);

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
      // console.log("the retried backend fetch: ", retryData);
      const nextRes = NextResponse.json(retryData, {
        status: backendRes.status,
      });

      // console.log("retried fetch object response: ", nextRes);

      setAuthCookies(nextRes, refreshResult);
      return nextRes;
    }

    const data = await safeJson(backendRes);
    // console.log(
    //   "the first request did not fail, i.e access token did not expire: ",
    //   data,
    // );
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    // console.log(
    //   "all attempts to make request failed, i.e couldn't get access token when making a request: ",
    //   err,
    // );
    return NextResponse.json(
      {
        error: "Proxy server error",
        detail: err instanceof Error ? err.message : "Unknown",
      },
      { status: 500 },
    );
  }
}

// ──────────────────────────────────────────────────────────────
// ─── EXPORT METHODS ───
// ──────────────────────────────────────────────────────────────
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
