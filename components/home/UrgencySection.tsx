import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function UrgencySection() {
  return (
    <section className="py-16 md:py-20 bg-ink relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-amber/10 rounded-full mb-6">
          <AlertTriangle className="text-amber" size={24} />
        </div>
        
        <h2 className="font-sans font-bold text-2xl md:text-3xl text-white tracking-tight mb-4">
          Limited Supplier Slots Per Category
        </h2>
        
        <p className="text-white/70 text-[15px] md:text-[17px] max-w-2xl mx-auto leading-relaxed mb-8">
          To maintain lead quality, we onboard only a limited number of suppliers per industry.
        </p>

        <Button variant="primary" size="lg" className="shadow-lg">
          👉 Secure your position now
        </Button>
      </div>
    </section>
  );
}
