import { auth } from "@/auth";

export const proxy = auth;

// Protect dashboard and admin routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
