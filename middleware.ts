// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access")?.value;
  const userCookie = req.cookies.get("user")?.value;
  const blockSpecialRoutes = req.cookies.get("blockSpecialRoutes")?.value === "true";
  const { pathname } = req.nextUrl;

  // Exclude Next internals, APIs, and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(?:svg|png|jpg|jpeg|gif|webp|ico)$/)
  ) {
    return NextResponse.next();
  }

  const publicRoutes = ["/", "/auth", "/about"];
  const specialRoutes = [
    "/onboarding/password-created",
    "/onboarding/journalist-profile",
    "/onboarding/setup-mediahouse-profile"
  ];

  const matchesRoute = (routes: string[]) =>
    routes.some((route) => pathname === route || pathname.startsWith(route + "/"));

  const isPublic = matchesRoute(publicRoutes);
  const isOnboarding = pathname.startsWith("/onboarding");
  const isSpecial = matchesRoute(specialRoutes);

  // If blockSpecialRoutes is true, redirect away from special routes
  if (blockSpecialRoutes && isSpecial) {
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        
        // Redirect based on user type
        if (user.user_type === "admin") {
          return NextResponse.redirect(new URL("/superadmin", req.url));
        } else {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Basic auth check - allow special routes if blockSpecialRoutes is false
  if (!token && !isPublic && !isOnboarding) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && isPublic) {
    // Check user type and redirect accordingly
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        
        // Redirect admin to /superadmin instead of /dashboard
        if (user.user_type === "admin") {
          return NextResponse.redirect(new URL("/superadmin", req.url));
        }
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
    
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Modified: Allow special routes without token if blockSpecialRoutes is false
  if (token && isOnboarding && !isSpecial) {
    // Check user type and redirect accordingly
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        
        // Redirect admin to /superadmin instead of /dashboard
        if (user.user_type === "admin") {
          return NextResponse.redirect(new URL("/superadmin", req.url));
        }
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
    
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Role-based protection for authenticated routes
  if (token && userCookie) {
    try {
      const user = JSON.parse(userCookie);
      
      // Redirect admin users trying to access /dashboard to /superadmin
      if (pathname.startsWith("/dashboard") && user.user_type === "admin") {
        return NextResponse.redirect(new URL("/superadmin", req.url));
      }

      // Prevent non-admin users from accessing /superadmin
      if (pathname.startsWith("/superadmin") && user.user_type !== "admin") {
        return NextResponse.redirect(new URL("/dashboard?error=unauthorized", req.url));
      }

      // Protect /dashboard/team - only for mediaHouse users
      if (pathname.startsWith("/dashboard/team")) {
        if (user.user_type !== "mediaHouse") {
          return NextResponse.redirect(new URL("/dashboard?error=unauthorized", req.url));
        }
      }

    } catch (error) {
      console.error("Error parsing user cookie:", error);
      // Invalid user cookie, redirect to login
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};