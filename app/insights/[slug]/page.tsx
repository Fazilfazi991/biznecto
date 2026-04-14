import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Share2, MessageCircle } from "lucide-react";
import { INSIGHTS } from "@/lib/insightsData";

export default function InsightDetailPage({ params }: { params: { slug: string } }) {
  const insight = INSIGHTS.find((i) => i.slug === params.slug);

  if (!insight) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Article Header (Dark) */}
      <div className="bg-[#0a0a0a] pt-[120px] pb-24 px-4 text-center border-b border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link 
            href="/insights" 
            className="inline-flex items-center gap-2 text-teal text-[11px] font-bold tracking-[2px] uppercase mb-12 hover:gap-3 transition-all"
          >
            <ArrowLeft size={14} /> Back to Hub
          </Link>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#d4af37] border border-[#d4af37]/30 px-3 py-1 rounded-full">
              {insight.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[11px] font-medium text-white/40">{insight.date}</span>
          </div>

          <h1 className="font-sans font-extrabold text-[clamp(28px,6vw,56px)] text-white leading-[1.1] tracking-[-1.5px] mb-12">
            {insight.title}
          </h1>

          <div className="flex items-center justify-center gap-8 pt-8 border-t border-white/5">
             <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {insight.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white">{insight.author}</div>
                  <div className="text-[11px] text-white/30 uppercase tracking-wide">Market Analyst</div>
                </div>
             </div>
             <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                <div className="text-left">
                  <div className="text-[13px] font-bold text-white">12 min</div>
                  <div className="text-[11px] text-white/30 uppercase tracking-wide">Reading time</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-[800px] mx-auto px-6 py-24">
        <div className="prose prose-lg prose-ink max-w-none">
          <p className="text-[20px] leading-[1.7] text-ink/80 font-medium mb-12 first-letter:text-5xl first-letter:font-bold first-letter:text-teal first-letter:mr-3 first-letter:float-left">
            {insight.excerpt}
          </p>

          <div className="bg-sand rounded-2xl p-8 mb-12 border border-border-brand relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="font-sans font-bold text-ink mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-teal" /> Key Takeaways
                </h4>
                <ul className="space-y-4 m-0 p-0 list-none">
                  <li className="flex items-start gap-3 text-[15px] text-ink/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal mt-2 shrink-0" />
                    Crucial data points for the Saudi Arabian market in 2026.
                  </li>
                  <li className="flex items-start gap-3 text-[15px] text-ink/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal mt-2 shrink-0" />
                    How to leverage AI Search Optimization (GEO) before competitors.
                  </li>
                  <li className="flex items-start gap-3 text-[15px] text-ink/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal mt-2 shrink-0" />
                    A framework for reporting revenue instead of vanity metrics.
                  </li>
                </ul>
             </div>
          </div>

          <div className="text-ink/60 italic border-l-4 border-teal-border pl-6 py-4 mb-12">
            This article is part of our "Market Intelligence 2026" series. Check back weekly for updated Saudi and UAE trade benchmarks.
          </div>

          <h2 className="text-3xl font-sans font-extrabold text-ink mb-8">Full playbook coming soon.</h2>
          <p className="text-ink/70 leading-relaxed mb-8">
            We are currently finalising the deep-dive video walkthrough and data sheets for this playbook. 
            Registered Biznecto suppliers will receive immediate access to the full raw dataset.
          </p>
          
          <div className="mt-20 p-10 bg-[#0a0a0a] rounded-[32px] text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Want the full data pack?</h3>
            <p className="text-white/40 mb-8">Join the Biznecto supplier network to unlock restricted market reports.</p>
            <Link 
              href="/pricing" 
              className="bg-teal text-white font-bold py-4 px-10 rounded-xl inline-block hover:bg-teal-dark transition-all"
            >
              Get Full Access
            </Link>
          </div>
        </div>
      </article>

      {/* Share / Footer Section */}
      <div className="border-t border-border-brand py-16 bg-sand">
        <div className="max-w-[800px] mx-auto px-6 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <span className="text-[12px] font-bold text-ink/40 uppercase tracking-widest flex items-center gap-2">
                <Share2 size={14} /> Share
              </span>
              <div className="flex gap-2">
                 <button className="w-9 h-9 rounded-full bg-white border border-border-brand flex items-center justify-center text-ink/60 hover:text-teal hover:border-teal transition-all"><MessageCircle size={16} /></button>
                 <button className="w-9 h-9 rounded-full bg-white border border-border-brand flex items-center justify-center text-ink/60 hover:text-teal hover:border-teal transition-all"><Share2 size={16} /></button>
              </div>
           </div>
           <Link href="/insights" className="text-[13px] font-bold text-teal hover:underline decoration-2 underline-offset-4">
             More Insights →
           </Link>
        </div>
      </div>
    </main>
  );
}
