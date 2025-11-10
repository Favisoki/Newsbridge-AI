// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access")?.value;
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
  ];

  const matchesRoute = (routes: string[]) =>
    routes.some((route) => pathname === route || pathname.startsWith(route + "/"));

  const isPublic = matchesRoute(publicRoutes);
  const isOnboarding = pathname.startsWith("/onboarding");
  const isSpecial = matchesRoute(specialRoutes);

  if (!token && !isPublic && !isOnboarding) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (token && isOnboarding && !isSpecial) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
  "/((?!_next|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
],

};
