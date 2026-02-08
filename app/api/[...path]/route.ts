import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const BASE_URL = "https://cldbknd.newsbridgeai.com";

<<<<<<< HEAD
// ──────────────────────────────────────────────────────────────
// ─── Routes that DO NOT need auth ───
// ──────────────────────────────────────────────────────────────

=======
// Routes that DO NOT need auth
>>>>>>> main
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

<<<<<<< HEAD
// ──────────────────────────────────────────────────────────────
// ─── SAFE JSON PARSER ───
// ──────────────────────────────────────────────────────────────

=======
/* ---------------- SAFE JSON PARSER ---------------- */
>>>>>>> main
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return { detail: "Non-JSON response", status: res.status };
  }
}

<<<<<<< HEAD
// ──────────────────────────────────────────────────────────────
// ─── Set Auth Cookies ───
// ──────────────────────────────────────────────────────────────

=======
/* ---------------- SET AUTH COOKIES ---------------- */
>>>>>>> main
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
<<<<<<< HEAD
    maxAge: 60 * 15
=======
    maxAge: 60 * 60 * 24,
>>>>>>> main
  });

  res.cookies.set("access", "true", {
    httpOnly: false,
    secure: isProd,
    sameSite: "lax",
    path: "/",
<<<<<<< HEAD
    maxAge: 60 * 15
=======
    maxAge: 60 * 60 * 24,
>>>>>>> main
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
<<<<<<< HEAD
      maxAge: 60 * 15
=======
      maxAge: 60 * 60 * 24,
>>>>>>> main
    });
  }
}

<<<<<<< HEAD
// ──────────────────────────────────────────────────────────────
// ─── SINGLE REFRESH LOCK ───
// ──────────────────────────────────────────────────────────────

=======
/* ---------------- SINGLE REFRESH LOCK ---------------- */
>>>>>>> main
let refreshPromise: Promise<{
  access: string;
  refresh?: string;
} | null> | null = null;

async function refreshToken(): Promise<{
  access: string;
  refresh?: string;
} | null> {
<<<<<<< HEAD
  // console.log("Initial refresh promise: ", refreshPromise);
  if (refreshPromise) {
    // console.log("Returned Promise: ", refreshPromise);
    return refreshPromise;
  }
=======
  if (refreshPromise) return refreshPromise;
>>>>>>> main

  refreshPromise = (async () => {
    try {
      const cookieStore = await cookies();
      const refresh = cookieStore.get("refresh_secure")?.value;
<<<<<<< HEAD
      // console.log("refresh token from cookie: ", refresh);
=======
>>>>>>> main
      if (!refresh) return null;

      const res = await fetch(`${BASE_URL}/refresh-token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
<<<<<<< HEAD
          // credentials: "include"
=======
>>>>>>> main
        },
        body: JSON.stringify({ refresh }),
      });

<<<<<<< HEAD
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
=======
      if (!res.ok) return null;

      const data = await safeJson(res);
      if (!data.access) return null;

      return { access: data.access, refresh: data.refresh };
    } catch {
>>>>>>> main
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

<<<<<<< HEAD
  // console.log("This is the returned promise: ", refreshPromise);

  return refreshPromise;
}

// ──────────────────────────────────────────────────────────────
// MAIN HANDLER
// ──────────────────────────────────────────────────────────────
=======
  return refreshPromise;
}

/* ---------------- MAIN HANDLER ---------------- */
>>>>>>> main
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

<<<<<<< HEAD
    // ──────────────────────────────────────────────────────────────
    // ─── PUBLIC ROUTES ───
    // ──────────────────────────────────────────────────────────────
=======
    /* ---------- PUBLIC ROUTES ---------- */
>>>>>>> main
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

<<<<<<< HEAD
    // ──────────────────────────────────────────────────────────────
    // ─── PROTECTED ROUTES ───
    // ──────────────────────────────────────────────────────────────
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("access_secure")?.value;
    // console.log("access token for making requests: ", accessToken);
=======
    /* ---------- PROTECTED ROUTES ---------- */
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("access_secure")?.value;
>>>>>>> main

    if (!accessToken) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

<<<<<<< HEAD
    // ──────────────────────────────────────────────────────────────
    // ─── FIRST ATTEMPT ───
    // ──────────────────────────────────────────────────────────────

=======
    // FIRST ATTEMPT
>>>>>>> main
    let backendRes = await fetch(backendUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });

<<<<<<< HEAD
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
=======
    // TOKEN EXPIRED → REFRESH
    if (backendRes.status === 401) {
      const refreshResult = await refreshToken();
      if (!refreshResult) {
        const errData = await safeJson(backendRes);
        return NextResponse.json(errData, { status: 401 });
      }

      // 🔥 IMPORTANT: update token IN MEMORY
      accessToken = refreshResult.access;
>>>>>>> main

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
<<<<<<< HEAD
      // console.log("the retried backend fetch: ", retryData);
=======
>>>>>>> main
      const nextRes = NextResponse.json(retryData, {
        status: backendRes.status,
      });

<<<<<<< HEAD
      // console.log("retried fetch object response: ", nextRes);

=======
>>>>>>> main
      setAuthCookies(nextRes, refreshResult);
      return nextRes;
    }

    const data = await safeJson(backendRes);
<<<<<<< HEAD
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
=======
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
>>>>>>> main
    return NextResponse.json(
      {
        error: "Proxy server error",
        detail: err instanceof Error ? err.message : "Unknown",
      },
      { status: 500 },
    );
  }
}

<<<<<<< HEAD
// ──────────────────────────────────────────────────────────────
// ─── EXPORT METHODS ───
// ──────────────────────────────────────────────────────────────
=======
/* ---------------- EXPORT METHODS ---------------- */
>>>>>>> main
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
