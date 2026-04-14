import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INSIGHTS } from "@/lib/insightsData";

export function InsightsSection() {
  return (
    <section className="py-[clamp(48px,8vw,80px)] bg-[#0a0a0a] text-left border-y border-white/5 relative overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--color-teal) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px"
        }}
      />
      
      <div className="max-w-[1100px] mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-teal mb-[12px]">
              Market Insights & Playbooks
            </div>
            <h2 className="font-sans font-extrabold text-[clamp(26px,5vw,40px)] text-white tracking-[-0.8px] leading-[1.05]">
              Smarter Trade through <br/>
              <span className="text-white/40 italic font-serif font-normal">Expert Intelligence</span>
            </h2>
          </div>
          <Link 
            href="/insights" 
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[13px] font-semibold"
          >
            View all insights
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 rounded-brand-m overflow-hidden shadow-2xl">
          {INSIGHTS.map((insight) => (
            <div 
              key={insight.id}
              className="bg-[#0f0f0f] p-8 flex flex-col h-full transition-all hover:bg-[#141414] group"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#d4af37]">
                  {insight.category}
                </span>
                <span className="text-[11px] font-medium text-white/30">
                  {insight.date}
                </span>
              </div>
              
              <h3 className="font-sans font-bold text-[20px] text-white leading-[1.3] mb-4 group-hover:text-teal transition-colors">
                {insight.title}
              </h3>
              
              <p className="text-[13.5px] text-white/40 leading-[1.7] flex-1 mb-8">
                {insight.excerpt}
              </p>

              <Link 
                href={`/insights/${insight.slug}`} 
                className="inline-flex items-center gap-2 text-[12.5px] font-bold text-white group-hover:gap-3 transition-all"
              >
                Read Article
                <ArrowRight size={15} className="text-[#d4af37]" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
