import React from "react";
import { Calendar, MapPin, Building2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MOCK_TRADESHOWS } from "@/lib/mockData";

export default function TradeShowsPage() {
  return (
    <main className="min-h-screen bg-sand pb-12 mt-[58px]">
      <div className="bg-ink p-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-2">
          <h1 className="font-serif font-bold text-2xl text-white">Global Trade Shows Calendar</h1>
          <p className="text-xs text-white/50">Plan your B2B networking and global exhibitions.</p>
          
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              placeholder="Search events e.g. Gulfood, GITEX..."
              className="flex-1 bg-white h-11 rounded-brand px-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <Button size="lg" className="h-11">Search Calendar</Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOCK_TRADESHOWS.map(show => (
            <div 
              key={show.id}
              className="bg-white border border-border-brand rounded-brand-m p-4.5 cursor-pointer transition-all hover:border-blue hover:shadow-[0_4px_18px_rgba(37,99,235,0.08)] group"
            >
              <div className="flex gap-3 mb-3">
                <div className="w-11 h-11 bg-sand rounded-lg flex items-center justify-center text-ink-2 shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-[15px] text-ink mb-0.5 tracking-tight group-hover:text-blue transition-colors">
                    {show.name}
                  </h3>
                  <p className="text-[11px] text-muted">{show.category}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs text-body">
                  <Calendar size={14} className="text-muted" /> {show.dates}
                </div>
                <div className="flex items-center gap-2 text-xs text-body">
                  <MapPin size={14} className="text-muted" /> {show.location}
                </div>
              </div>
              
              <div className="flex justify-end pr-1">
                <ArrowUpRight size={16} className="text-hint group-hover:text-blue transition-colors" />
              </div>
            </div>
          ))}

          <div className="bg-sand border border-border-brand-2 border-dashed rounded-brand-m p-4.5 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-sand-2 transition-colors">
            <Calendar size={28} className="text-muted mb-1" />
            <div className="font-serif font-semibold text-[13px] text-ink">Request Event Listing</div>
            <div className="text-[11px] text-muted">Are we missing an event?</div>
          </div>
        </div>
      </div>
    </main>
  );
}
