import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Protect dashboard and admin routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
