import React from "react";
import { CheckCircle2 } from "lucide-react";

export function SolutionSection() {
  const solutions = [
    "Verified buyer requirements",
    "Direct supplier access to real demand",
    "No middlemen, no fake leads",
    "Focus on high-intent buyers only",
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-border-brand">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-ink tracking-tight mb-10">
          We Deliver Buyer Intent — Not Just Listings
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {solutions.map((setup, idx) => (
            <div 
              key={idx} 
              className="bg-teal-glass border border-teal-border p-5 rounded-brand-m flex items-start gap-4 text-left shadow-sm transition-all hover:bg-teal/10 hover:border-teal/40"
            >
              <div className="text-teal flex-shrink-0 mt-0.5">
                <CheckCircle2 size={24} />
              </div>
              <p className="font-medium text-ink leading-relaxed">{setup}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
