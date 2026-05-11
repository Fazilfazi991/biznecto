import React from "react";
import { auth } from "@/auth";
import PricingClient from "./PricingClient";

export default async function PricingPage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-sand pb-16 mt-[58px]">
      {/* Header */}
      <div className="bg-ink p-10 md:p-16 text-center">
        <h1 className="font-serif font-bold text-3xl md:text-5xl text-white mb-4 tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="text-white/60 md:text-lg max-w-2xl mx-auto">
          Start for free, upgrade when you need direct access to buyers. No hidden fees.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <PricingClient session={session} />
      </div>
    </main>
  );
}
