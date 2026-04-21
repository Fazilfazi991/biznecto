import React from "react";
import { Handshake } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function MatchesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif font-bold text-2xl text-ink mb-1">Buyer Matches</h1>
        <p className="text-sm text-muted">Verified buyer requirements matching your product profile.</p>
      </div>

      <Card className="flex-1 flex flex-col items-center justify-center p-20 text-center border-dashed border-2">
        <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mb-4">
          <Handshake size={28} className="text-muted/40" />
        </div>
        <h3 className="font-serif font-bold text-lg text-ink mb-2">Searching for matches...</h3>
        <p className="text-sm text-muted max-w-sm mx-auto">
          We'll automatically notify you when a buyer posts a requirement that matches your products or industry.
        </p>
      </Card>
    </div>
  );
}
