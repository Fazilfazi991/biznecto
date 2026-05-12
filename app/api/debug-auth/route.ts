import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    return NextResponse.json({ ok: true, session: session ? "exists" : null });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message, type: e?.name }, { status: 500 });
  }
}
