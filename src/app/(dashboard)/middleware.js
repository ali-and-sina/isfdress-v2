import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (!isDashboardRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "ورود الزامی است" }, { status: 401 });
    }
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token.role !== "admin") {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
};
