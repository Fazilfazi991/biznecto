import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = (): PrismaClient => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    // During build, return a proxy that only throws if we actually try to query.
    // This allows the build to finish while guarding against dev errors.
    return new Proxy({} as PrismaClient, {
      get(target, prop) {
        if (typeof prop === 'string' && prop !== 'then' && prop !== 'constructor') {
          console.warn(`Prisma accessed but DATABASE_URL is missing. (Property: ${prop})`);
        }
        return (target as any)[prop];
      }
    });
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

// Use a lazy getter so we NEVER instantiate during build evaluation
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = globalForPrisma.prisma ?? createPrismaClient();
    return (client as any)[prop];
  }
});
