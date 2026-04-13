import React from "react";
import { AlertCircle } from "lucide-react";

export function ProblemSection() {
  const problems = [
    "You get views, not real inquiries",
    "You pay for visibility, not results",
    "Buyers don't contact you directly",
    "No control over lead quality",
  ];

  return (
    <section className="py-16 md:py-24 bg-sand border-b border-border-brand">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-ink tracking-tight mb-10">
          Why Most B2B Platforms Fail Suppliers
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {problems.map((problem, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-border-brand p-5 rounded-brand-m flex items-start gap-4 text-left shadow-sm"
            >
              <div className="bg-red-50 p-2 rounded-full text-coral flex-shrink-0 mt-0.5">
                <AlertCircle size={20} />
              </div>
              <p className="font-medium text-body leading-relaxed">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
