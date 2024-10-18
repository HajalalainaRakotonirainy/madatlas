import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./library/IsAuthenticated";

const protectedRoutes = ["/user", "/register"];
const publicRoutes = ["/dashboard"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const cookiesType = cookies().get("type")?.value;

  if (isProtectedRoute && (cookiesType == "user" || !cookiesType)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && !(await isAuthenticated())) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
