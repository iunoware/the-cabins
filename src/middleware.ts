// middleware is responsible for

import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "the_cabins_session";

function getAuthSecret() {
  if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not set");
  }

  return new TextEncoder().encode(process.env.AUTH_SECRET);
}

async function isValidSession(token: string | undefined) {
  if (!token) return false;

  try {
    await jwtVerify(token, getAuthSecret());
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isLoggedIn = await isValidSession(token);

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  // If user opens /admin and is logged in, send to dashboard
  if (pathname === "/admin" && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // If user opens /admin route and is not logged in, send to login
  if (isAdminRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);

    response.cookies.delete(SESSION_COOKIE_NAME);

    return response;
  }

  // If logged-in user opens login page, send to dashboard
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
