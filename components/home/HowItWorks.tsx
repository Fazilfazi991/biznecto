import React from "react";
import { Edit3, CheckCircle, Target } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Edit3 className="text-teal" size={24} />,
      title: "1. Buyers post requirements",
      desc: "Real buyers submit their exact sourcing needs and timelines."
    },
    {
      icon: <CheckCircle className="text-teal" size={24} />,
      title: "2. BIZNECTO verifies",
      desc: "We verify and match requirements with relevant suppliers."
    },
    {
      icon: <Target className="text-teal" size={24} />,
      title: "3. You receive leads",
      desc: "Get high-quality buyer leads delivered directly to you."
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-border-brand text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-ink tracking-tight mb-16">
          Simple. Direct. Results-Driven.
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative items-start">
          {/* Connector Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-px bg-border-brand" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white border-2 border-teal-border rounded-full flex items-center justify-center mb-6 shadow-sm">
                <div className="w-16 h-16 bg-teal-glass rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="font-sans font-bold text-[17px] text-ink mb-3 tracking-tight">{step.title}</h3>
              <p className="text-muted text-[14px] leading-relaxed max-w-[250px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 inline-flex items-center text-ink font-semibold bg-sand px-6 py-3 rounded-full border border-border-brand text-[15px]">
          <span className="text-teal mr-2">🎯</span>
          👉 No cold calling. No chasing.
        </div>
      </div>
    </section>
  );
}
