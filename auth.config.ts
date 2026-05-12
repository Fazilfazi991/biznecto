import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "fallback-secret-key-for-dev",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const role = (session?.user as any)?.role;
      const { pathname } = nextUrl;

      const isOnDashboard = pathname.startsWith("/dashboard");
      const isOnAdminLogin = pathname.startsWith("/admin/login");
      const isOnAdmin = pathname.startsWith("/admin") && !isOnAdminLogin;

      if (isOnAdminLogin) {
        if (isLoggedIn && role === "ADMIN") {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        return true;
      }

      if (isOnAdmin) {
        if (isLoggedIn && role === "ADMIN") return true;
        return Response.redirect(new URL("/admin/login", nextUrl));
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        const loginUrl = new URL("/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return Response.redirect(loginUrl);
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
