import React from "react";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="px-4 py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto text-center rounded-brand-x bg-sand border border-border-brand p-12 md:p-20 relative overflow-hidden">
        
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-glass rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-ink tracking-tight mb-8">
            Ready to Get Your First Buyer?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              👉 Get Buyer Leads Now
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              👉 Join as Supplier
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
