import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia" as any,
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { plan } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: true },
    });

    if (!user?.company) {
      return new NextResponse("Company not found", { status: 404 });
    }

    // Replace these with actual Price IDs from Stripe Dashboard
    const priceMap: Record<string, string> = {
      STARTER: "price_1_mock_starter", 
      PRO: "price_1_mock_pro",         
      PREMIUM: "price_1_mock_premium", 
    };

    const priceId = priceMap[plan];
    if (!priceId) {
      return new NextResponse("Invalid plan selected", { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        companyId: user.company.id,
        plan: plan,
      },
      customer: user.company.stripeCustomerId || undefined,
      customer_email: user.company.stripeCustomerId ? undefined : session.user.email!,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing?canceled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[STRIPE_CHECKOUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
