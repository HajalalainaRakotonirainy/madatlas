import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./library/IsAuthenticated";

const protectedRoutes = ["/user", "/register"];
const publicRoutes = ["/auth/login", "/auth/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute && !(await isAuthenticated())) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
