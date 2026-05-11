import { auth } from "@/auth";

export default auth;

// Protect dashboard and admin routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
