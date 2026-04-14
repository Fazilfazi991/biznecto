import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, User } from "lucide-react";
import { INSIGHTS } from "@/lib/insightsData";

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-[72px]">
      {/* Header */}
      <div className="bg-[#0f0f0f] border-b border-white/5 py-24 px-4 text-center relative overflow-hidden">
         <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(var(--color-teal) 1px, transparent 1px), linear-gradient(90deg, var(--color-teal) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-[10px] font-bold tracking-[3px] uppercase text-teal mb-4">
            Intelligence Hub
          </div>
          <h1 className="font-sans font-extrabold text-[48px] text-white leading-[1.05] tracking-[-1px] mb-6">
            Global Trade. <br/>
            <span className="italic font-serif font-normal text-white/50">Decoded.</span>
          </h1>
          <p className="text-[16px] text-white/40 leading-[1.7] max-w-xl mx-auto">
            Deep-dive playbooks, benchmark data, and strategic guides for modern suppliers and exporters in the GCC and beyond.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1100px] mx-auto px-4 py-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INSIGHTS.map((insight) => (
              <Link 
                key={insight.id} 
                href={`/insights/${insight.slug}`}
                className="group flex flex-col bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-teal/30 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[9px] font-bold tracking-[1.5px] uppercase text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded">
                      {insight.category}
                    </span>
                    <span className="text-[10px] text-white/20">{insight.date}</span>
                  </div>

                  <h3 className="font-sans font-bold text-[22px] text-white leading-[1.3] mb-4 group-hover:text-teal transition-colors">
                    {insight.title}
                  </h3>

                  <p className="text-[14px] text-white/35 leading-[1.7] flex-1 mb-8">
                    {insight.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[11px] text-white/30 font-medium">
                      <User size={12} className="text-teal" />
                      {insight.author}
                    </div>
                    <ChevronRight size={16} className="text-white/20 group-hover:text-teal transition-colors group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
         </div>
      </div>
    </main>
  );
}
