export const dynamic = "force-dynamic";

export async function GET() {
  const info: Record<string, unknown> = {
    node: process.version,
    env: {
      AUTH_SECRET: !!process.env.AUTH_SECRET,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      DATABASE_URL: !!process.env.DATABASE_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "(not set)",
      AUTH_URL: process.env.AUTH_URL || "(not set)",
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    info.auth = { ok: true, session: session ? "active" : "null" };
  } catch (e: any) {
    info.auth = { ok: false, error: e?.message, stack: e?.stack?.split("\n").slice(0, 5) };
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    await (prisma as any).$queryRaw`SELECT 1`;
    info.db = { ok: true };
  } catch (e: any) {
    info.db = { ok: false, error: e?.message };
  }

  return Response.json(info);
}
