import React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Lock, MapPin } from "lucide-react";

export function LiveRequirements() {
  const requirements = [
    {
      flag: "🇦🇪",
      location: "Buyer from Dubai",
      needs: "Exhibition Stand Builder",
      meta: ["Budget: AED 25,000", "Timeline: 2 Weeks"],
    },
    {
      flag: "🇸🇦",
      location: "Buyer from Saudi Arabia",
      needs: "LED Display Supplier",
      meta: ["Quantity: 500 Units", "Budget: $15,000"],
    },
    {
      flag: "🇮🇳",
      location: "Buyer from India",
      needs: "Packaging Material Supplier",
      meta: ["Bulk Order"],
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-sand border-b border-border-brand">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="hot" className="mb-4">Live</Badge>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-ink tracking-tight mb-4">
            Active Buyer Requirements
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Buyers post what they need. You unlock the lead and connect directly.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-12">
          {requirements.map((req, idx) => (
            <div 
              key={idx}
              className="bg-white border-1.5 border-border-brand rounded-brand-m p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:border-teal hover:shadow-brand relative overflow-hidden group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{req.flag}</span>
                  <span className="text-[13px] text-muted font-medium flex items-center gap-1">
                    <MapPin size={12} /> {req.location}
                  </span>
                </div>
                <h3 className="font-sans font-semibold text-[16px] text-ink mb-3 group-hover:text-teal transition-colors">
                  Needs: {req.needs}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {req.meta.map((m, i) => (
                    <span key={i} className="text-[11px] bg-sand border border-border-brand px-2.5 py-1 rounded-full text-body font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="shrink-0 w-full md:w-auto mt-2 md:mt-0">
                <Button variant="primary" className="w-full md:w-auto gap-2 bg-ink hover:bg-ink-2 shadow-sm">
                  <Lock size={14} /> 👉 Unlock This Lead
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-teal-glass border border-teal-border rounded-brand-l p-8 max-w-2xl mx-auto shadow-sm">
          <h3 className="font-serif font-bold text-xl text-ink mb-5">Want leads like this?</h3>
          <Button size="lg" variant="primary">
            👉 Get Access Now
          </Button>
        </div>
      </div>
    </section>
  );
}
