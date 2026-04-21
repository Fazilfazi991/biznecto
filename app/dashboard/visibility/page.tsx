import React from "react";
import { Eye, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function VisibilityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-bold text-2xl text-ink mb-1">Profile Visibility</h1>
        <p className="text-sm text-muted">Analytics on how buyers are interacting with your brand.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Profile Views", value: "0" },
          { label: "Search Appearances", value: "0" },
          { label: "Contact Requests", value: "0" },
        ].map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-3xl font-serif font-bold text-ink">{stat.value}</div>
          </Card>
        ))}
      </div>

      <Card className="flex-1 flex flex-col items-center justify-center p-20 text-center border-dashed border-2">
        <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mb-4">
          <TrendingUp size={28} className="text-muted/40" />
        </div>
        <h3 className="font-serif font-bold text-lg text-ink mb-2">Insufficient data</h3>
        <p className="text-sm text-muted max-w-sm mx-auto">
          Visibility insights will appear here once your profile has been live for at least 7 days.
        </p>
      </Card>
    </div>
  );
}
