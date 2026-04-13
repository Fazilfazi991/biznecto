import React from "react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <div className="bg-ink relative overflow-hidden px-4 py-16 md:py-24 text-center">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px"
        }}
        aria-hidden="true"
      />
      
      {/* Orb Element */}
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[600px] bg-[radial-gradient(ellipse,rgba(0,184,156,0.1)_0%,transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[1.5px] uppercase text-teal bg-teal/10 px-3.5 py-1.5 rounded-full border border-teal-border mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pill-dot" />
          CONNECTING BUSINESSES GLOBALLY
        </div>

        {/* Headline */}
        <h1 className="font-sans font-extrabold text-[clamp(28px,6.5vw,58px)] leading-[1.1] text-white tracking-[-0.5px] mb-6">
          Get Verified B2B Buyer Leads — <br className="hidden sm:block" />
          <span className="text-teal font-normal italic font-serif">Not Just Visibility</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-[15px] md:text-[18px] text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
          BIZNECTO connects global suppliers and manufacturers with real buyers actively looking for products and services. <strong className="text-white font-semibold">No cold outreach. No wasted marketing spend.</strong>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Button size="lg" className="w-full sm:w-auto">
            👉 Get Buyer Leads Now
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/20 hover:border-white hover:bg-white/5">
            👉 List Your Business Free
          </Button>
        </div>
      </div>
    </div>
  );
}
