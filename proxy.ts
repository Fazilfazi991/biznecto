export { auth as default } from "@/auth";

// Protect dashboard and admin routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
