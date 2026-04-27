import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "fallback-secret-key-for-dev",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdminLogin = nextUrl.pathname.startsWith("/admin/login");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin") && !isOnAdminLogin;
      const isOnLogin = nextUrl.pathname === "/login";

      if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (isOnAdminLogin) {
        if (isLoggedIn && (auth?.user as any)?.role === "ADMIN") {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        return true; // allow unauthenticated to see admin login
      }

      if (isOnAdmin) {
        if (isLoggedIn && (auth?.user as any)?.role === "ADMIN") return true;
        // Redirect unauthenticated admin visitors to the admin login page
        return Response.redirect(new URL("/admin/login", nextUrl));
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  providers: [], // Providers are added in auth.ts
} satisfies NextAuthConfig;
