import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const getPrisma = () => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // Return a dummy client or throw a more descriptive error if we're in production
    if (process.env.NODE_ENV === "production") {
      throw new Error("DATABASE_URL is not defined");
    }
    return new PrismaClient();
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const client = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
};

export const prisma = getPrisma();
