import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: true },
    });

    if (!user?.company?.stripeCustomerId) {
      return new NextResponse("No active subscription", { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.company.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/settings`,
    });

    return NextResponse.redirect(portalSession.url);
  } catch (error) {
    console.error("[STRIPE_PORTAL]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
