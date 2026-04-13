import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PricingPage() {
  const plans = [
    {
      name: "Free Supplier",
      price: "0",
      target: "Starter",
      badge: null,
      color: "gray",
      desc: "For suppliers wanting to claim their profile and access initial leads.",
      features: [
        { name: "List up to 5 products", included: true },
        { name: "Public company profile", included: true },
        { name: "Access to initial buyer leads", included: true },
        { name: "Unlock direct buyer contacts", included: false },
        { name: "Priority in search results", included: false },
        { name: "Respond to requirements", included: false },
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro Connect",
      price: "99",
      target: "Growth",
      badge: "MOST POPULAR",
      color: "blue",
      desc: "For active suppliers who want direct access to verified B2B buyers.",
      features: [
        { name: "List up to 50 products", included: true },
        { name: "Public company profile", included: true },
        { name: "Access to initial buyer leads", included: true },
        { name: "Unlock 20 buyer contacts / mo", included: true },
        { name: "Enhanced in search results", included: true },
        { name: "Respond to 10 requirements / mo", included: true },
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "primary" as const,
    },
    {
      name: "Premium Vendor",
      price: "249",
      target: "Enterprise",
      badge: "TOP TIER",
      color: "purple",
      desc: "Maximum visibility and unlimited access to high-intent global buyers.",
      features: [
        { name: "Unlimited product listings", included: true },
        { name: "Verified Premium badge", included: true },
        { name: "Access to ALL buyer leads", included: true },
        { name: "Unlock unlimited buyer contacts", included: true },
        { name: "Top placement in search results", included: true },
        { name: "Unlimited requirement responses", included: true },
      ],
      buttonText: "Upgrade to Premium",
      buttonVariant: "primary" as const,
    }
  ];

  return (
    <main className="min-h-screen bg-sand pb-16 mt-[58px]">
      <div className="bg-ink p-10 md:p-16 text-center">
        <h1 className="font-serif font-bold text-3xl md:text-5xl text-white mb-4 tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-white/60 md:text-lg max-w-2xl mx-auto">
          Start for free, upgrade when you need direct access to buyers. No hidden fees.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white rounded-brand-x p-8 relative transition-transform hover:-translate-y-1 ${
                plan.color === "blue" ? "border-2 border-blue shadow-[0_0_0_4px_rgba(37,99,235,0.07)]" :
                plan.color === "purple" ? "border-2 border-purple shadow-[0_0_0_4px_rgba(124,58,237,0.07)]" :
                "border-1.5 border-border-brand"
              }`}
            >
              {plan.badge && (
                <div className={`absolute top-5 right-5 text-[9px] font-bold tracking-[0.6px] uppercase px-3 py-1 rounded-full text-white ${
                  plan.color === "blue" ? "bg-blue" : "bg-purple"
                }`}>
                  {plan.badge}
                </div>
              )}
              
              <div className="text-[10px] font-bold tracking-[1px] uppercase text-muted mb-2">
                {plan.target}
              </div>
              
              <h2 className="font-serif font-bold text-[22px] text-ink mb-1">{plan.name}</h2>
              
              <div className="flex items-end gap-1 mb-2">
                <span className="text-sm font-semibold text-ink leading-[2.2]">$</span>
                <span className="font-serif font-bold text-[42px] tracking-[-2px] leading-none text-ink">{plan.price}</span>
                <span className="text-[13px] text-muted leading-[2.4]">/mo</span>
              </div>
              
              <p className="text-[13px] text-muted leading-[1.65] mb-6 min-h-[44px]">
                {plan.desc}
              </p>
              
              <Button 
                variant={plan.buttonVariant} 
                size="full" 
                className={plan.buttonVariant === "primary" && plan.color === "purple" ? "bg-purple hover:bg-purple/90" : plan.buttonVariant === "primary" ? "bg-blue hover:bg-blue/90" : ""}
              >
                {plan.buttonText}
              </Button>
              
              <div className="h-px bg-border-brand my-6" />
              
              <ul className="flex flex-col gap-3.5">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] text-body leading-[1.5]">
                    {feature.included ? (
                      <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
                    ) : (
                      <X size={16} className="text-border-brand border shrink-0 mt-0.5 rounded-full p-0.5" />
                    )}
                    <span className={feature.included ? "text-ink font-medium" : "text-hint"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
