import React from "react";
import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Start Your Presence",
      tier: "FREE",
      price: "0",
      bestFor: "New suppliers exploring global opportunities",
      badge: null,
      color: "gray",
      microcopy: null,
      cta: "Start Free",
      ctaHref: "/login",
      features: [
        { name: "Create your company profile", included: true },
        { name: "List up to 5 products", included: true },
        { name: "Get limited buyer enquiries", included: true },
        { name: "Visibility in global directory", included: true },
        { name: "Direct buyer contact access", included: false },
        { name: "Priority visibility in search", included: false },
      ],
    },
    {
      name: "Start Getting Leads",
      tier: "STARTER",
      price: "29",
      bestFor: "Small businesses testing global demand",
      badge: null,
      color: "teal",
      microcopy: "Low risk. High potential.",
      cta: "Start Getting Leads",
      ctaHref: "/login",
      features: [
        { name: "Everything in Free", included: true },
        { name: "Unlock 10 verified buyer contacts / month", included: true },
        { name: "Respond to 10 buyer requirements", included: true },
        { name: "Basic search visibility boost", included: true },
        { name: "Priority placement in search", included: false },
        { name: "Verified Premium badge", included: false },
      ],
    },
    {
      name: "Grow Your Global Sales",
      tier: "PRO",
      price: "99",
      bestFor: "Active suppliers ready to scale",
      badge: "MOST POPULAR",
      color: "blue",
      microcopy: "Most suppliers start seeing consistent enquiries here.",
      cta: "Upgrade to Pro",
      ctaHref: "/login",
      features: [
        { name: "Everything in Starter", included: true },
        { name: "Unlock up to 50 buyer contacts / month", included: true },
        { name: "Respond to 25 buyer requirements", included: true },
        { name: "Priority placement in search results", included: true },
        { name: "Higher visibility to international buyers", included: true },
        { name: "Verified Premium badge", included: false },
      ],
    },
    {
      name: "Dominate Your Market",
      tier: "PREMIUM",
      price: "249",
      bestFor: "Serious exporters & large suppliers",
      badge: "TOP TIER",
      color: "purple",
      microcopy: "For businesses that want maximum exposure and deal flow.",
      cta: "Go Premium",
      ctaHref: "/login",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Unlimited buyer contacts", included: true },
        { name: "Unlimited requirement responses", included: true },
        { name: "Top placement in search results", included: true },
        { name: "Verified Premium badge", included: true },
        { name: "Maximum global visibility", included: true },
      ],
    },
  ];

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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl p-7 relative flex flex-col transition-transform hover:-translate-y-1 ${
                plan.color === "purple"
                  ? "border-2 border-purple shadow-[0_0_0_4px_rgba(124,58,237,0.07)]"
                  : plan.color === "blue"
                  ? "border-2 border-blue shadow-[0_0_0_4px_rgba(37,99,235,0.07)]"
                  : plan.color === "teal"
                  ? "border-2 border-teal shadow-[0_0_0_4px_rgba(0,184,156,0.07)]"
                  : "border border-border-brand"
              }`}
            >
              {plan.badge && (
                <div
                  className={`absolute top-4 right-4 text-[9px] font-bold tracking-[0.6px] uppercase px-3 py-1 rounded-full text-white ${
                    plan.color === "purple"
                      ? "bg-purple"
                      : plan.color === "blue"
                      ? "bg-blue"
                      : "bg-teal"
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              {/* Tier label */}
              <div className={`text-[10px] font-bold tracking-[1.5px] uppercase mb-2 ${
                plan.color === "purple" ? "text-purple" :
                plan.color === "blue" ? "text-blue" :
                plan.color === "teal" ? "text-teal" : "text-muted"
              }`}>
                {plan.tier} PLAN
              </div>

              {/* Plan name */}
              <h2 className="font-serif font-bold text-[18px] text-ink mb-1 leading-tight">{plan.name}</h2>

              {/* Price */}
              <div className="flex items-end gap-1 my-3">
                <span className="text-sm font-semibold text-ink leading-[2.2]">$</span>
                <span className="font-serif font-bold text-[40px] tracking-[-2px] leading-none text-ink">{plan.price}</span>
                <span className="text-[13px] text-muted leading-[2.4]">/mo</span>
              </div>

              {/* Best for */}
              <p className="text-[12px] text-muted leading-[1.6] mb-5 pb-4 border-b border-border-brand">
                <span className="font-semibold text-ink">Best for: </span>{plan.bestFor}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-6 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] leading-[1.5]">
                    {feature.included ? (
                      <CheckCircle2 size={15} className="text-teal shrink-0 mt-0.5" />
                    ) : (
                      <X size={15} className="text-border-brand border shrink-0 mt-0.5 rounded-full p-0.5" />
                    )}
                    <span className={feature.included ? "text-ink font-medium" : "text-hint"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Microcopy */}
              {plan.microcopy && (
                <p className="text-[11px] text-muted italic mb-3">💡 {plan.microcopy}</p>
              )}

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                className={`w-full text-center font-semibold text-[14px] py-2.5 rounded-lg transition-colors ${
                  plan.color === "purple"
                    ? "bg-purple hover:bg-purple/90 text-white"
                    : plan.color === "blue"
                    ? "bg-blue hover:bg-blue/90 text-white"
                    : plan.color === "teal"
                    ? "bg-teal hover:bg-teal-dark text-white"
                    : "border border-border-brand text-ink hover:bg-black/5"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
