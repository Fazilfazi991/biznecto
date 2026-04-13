import React from "react";
import { CheckCircle2 } from "lucide-react";

export function OfferSection() {
  const benefits = [
    "Free business listing",
    "Access to initial buyer leads",
    "No upfront commitment",
  ];

  return (
    <section className="py-20 md:py-28 bg-sand border-b border-border-brand">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-ink tracking-tight mb-10">
          Start Getting Buyer Leads — FREE
        </h2>
        
        <div className="flex flex-col items-center gap-4 mb-10 max-w-lg mx-auto">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="w-full bg-white border border-border-brand p-5 rounded-brand flex items-center gap-4 text-left shadow-sm justify-center"
            >
              <CheckCircle2 className="text-teal flex-shrink-0" size={22} />
              <p className="font-medium text-ink w-full">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="inline-flex items-center text-ink font-semibold text-[15px]">
          👉 <span className="underline decoration-teal decoration-2 underline-offset-4 ml-2">Upgrade only when you start receiving leads</span>
        </div>
      </div>
    </section>
  );
}
