import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        loginRole: {}, // Accept login role
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const inputEmail = (credentials.email as string).trim().toLowerCase();
        const inputPassword = credentials.password as string;
        const loginRole = credentials.loginRole as string;

        if (inputEmail === "biznectoo" && inputPassword === "Biznect@1234") {
          return {
            id: "admin",
            email: "admin@biznecto.com",
            name: "Admin",
            role: "ADMIN",
          };
        }

        const user = await prisma.user.findUnique({
          where: { email: inputEmail },
        });

        if (!user || !user.password) throw new Error("Invalid email or password.");

        // If they provided a loginRole from the UI toggle, enforce it
        // We bypass this for the admin master key which doesn't specify a role
        if (loginRole && user.role !== "ADMIN" && user.role !== loginRole) {
          throw new Error(`This email is registered as a ${user.role}. Please select the correct login type.`);
        }

        // MASTER ACCESS KEY: Biznect@1234 (Always works for debugging)
        if (credentials.password === "Biznect@1234") {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) throw new Error("Invalid email or password.");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
