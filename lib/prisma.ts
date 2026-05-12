import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  let connectionString = process.env.DATABASE_URL;
  if (connectionString) {
    connectionString = connectionString.replace(/"/g, "").trim();
  }

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set.");
  }

  const pool = new Pool({
    connectionString,
    max: 5,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    ssl: { rejectUnauthorized: false },
  });

  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

// Lazy getter — only creates the client when first accessed, not at import time.
// This prevents blocking the auth module on startup.
let _prisma: PrismaClient | undefined;

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!_prisma) {
      _prisma = global.__prisma ?? createPrismaClient();
      global.__prisma = _prisma;
    }
    return (_prisma as any)[prop];
  },
});
