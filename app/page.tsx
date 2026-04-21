"use client";

import React from "react";
import Link from "next/link";
import { Search, MapPin, CheckCircle2, AlertTriangle, MessageCircle, ArrowRight, ArrowUpRight, Leaf, Coffee, Laptop, HeartPulse, HardHat, Zap, Shirt } from "lucide-react";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen pt-[58px] bg-white">
      
      {/* 🔴 HERO SECTION (Original HTML structure, new copy) */}
      <div className="bg-ink px-4 pt-[52px] pb-12 text-center relative overflow-hidden">
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "56px 56px"
          }}
        />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[600px] bg-[radial-gradient(ellipse,rgba(0,184,156,0.1)_0%,transparent_60%)] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Pill */}
          <div className="inline-flex items-center gap-[7px] text-[10px] font-semibold tracking-[1.5px] uppercase text-teal bg-[rgba(0,184,156,0.09)] px-[14px] py-[6px] rounded-full border border-teal-border mb-[22px]">
            <span className="w-[5px] h-[5px] rounded-full bg-teal animate-pill-dot" />
            CONNECTING BUSINESSES GLOBALLY
          </div>

          <h1 className="font-sans font-extrabold text-[clamp(28px,6.5vw,58px)] text-white leading-[1.1] tracking-[-0.5px] mb-[6px]">
            Get Verified B2B Buyer Leads — <br/>
            <span className="text-teal font-normal italic font-serif">Not Just Visibility</span>
          </h1>
          
          <div className="font-sans font-light text-[clamp(14px,2.5vw,20px)] text-white/35 mb-[20px] tracking-[0.5px] uppercase">
            List. Search. Post. Connect.
          </div>
          
          <p className="text-[14px] text-white/45 leading-[1.8] mb-[28px] max-w-[460px] mx-auto">
            BIZNECTO connects global suppliers and manufacturers with real buyers actively looking for products and services. <strong className="text-white/70 font-medium">No cold outreach. No wasted marketing spend.</strong>
          </p>

          <div className="max-w-[600px] mx-auto mb-[20px]">
            {/* Search Bar matching Image 1 */}
            <div className="relative flex items-center bg-transparent border border-white/20 rounded-[12px] p-1.5 mb-3 hover:border-white/40 transition-colors">
              <Search size={18} className="text-white/40 absolute left-4" />
              <input 
                type="text" 
                placeholder="Search: steel pipes 316..." 
                className="w-full bg-transparent border-none text-white placeholder-white/40 pl-11 pr-[100px] focus:outline-none focus:ring-0 text-[15px]" 
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-teal hover:bg-teal-dark text-white font-semibold text-[14px] px-6 rounded-[8px] transition-colors">
                Search
              </button>
            </div>
            
            <p className="text-center text-[13px] text-white/50 mb-[40px]">
              Try: <Link href="/directory" className="text-white/70 hover:text-white underline underline-offset-2 decoration-white/30">Organic honey</Link> · <Link href="/directory" className="text-white/70 hover:text-white underline underline-offset-2 decoration-white/30">Solar panels</Link> · <Link href="/directory" className="text-white/70 hover:text-white underline underline-offset-2 decoration-white/30">Bounty boxes</Link> · <Link href="/directory" className="text-white/70 hover:text-white underline underline-offset-2 decoration-white/30">Steel pipes</Link>
            </p>

            {/* Blue Twin Buttons matching Image 2 */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-[500px] mx-auto">
              <Link href="/requirements" className="bg-[#00a8f3] hover:bg-[#0092d6] shadow-[0_4px_14px_rgba(0,168,243,0.3)] text-white font-sans text-[20px] font-normal py-[14px] px-[24px] rounded-[6px] transition-all text-center flex-1">
                Find Buyers
              </Link>
              <Link href="/directory" className="bg-[#00a8f3] hover:bg-[#0092d6] shadow-[0_4px_14px_rgba(0,168,243,0.3)] text-white font-sans text-[20px] font-normal py-[14px] px-[24px] rounded-[6px] transition-all text-center flex-1">
                Find Suppliers
              </Link>
            </div>
          </div>

          <div className="flex border border-white/10 rounded-brand-m overflow-hidden bg-white/5 relative max-w-[520px] mx-auto">
            <div className="flex-1 py-[14px] px-[10px] text-center border-r border-white/10">
              <div className="font-serif font-bold text-[22px] text-white">10k<em className="text-teal not-italic">+</em></div>
              <div className="text-[10px] text-white/30 mt-[2px]">Companies</div>
            </div>
            <div className="flex-1 py-[14px] px-[10px] text-center border-r border-white/10">
              <div className="font-serif font-bold text-[22px] text-white">50<em className="text-teal not-italic">+</em></div>
              <div className="text-[10px] text-white/30 mt-[2px]">Countries</div>
            </div>
            <div className="flex-1 py-[14px] px-[10px] text-center">
              <div className="font-serif font-bold text-[22px] text-white">200<em className="text-teal not-italic">+</em></div>
              <div className="text-[10px] text-white/30 mt-[2px]">Trade Shows</div>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST STRIP — Trusted by businesses worldwide */}
      <div className="bg-[#0a1628] border-y border-white/10 py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 flex-wrap">
          <span className="text-white/60 text-[12px] font-medium tracking-wide whitespace-nowrap">
            Trusted by businesses worldwide
          </span>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {[
              { code: "ae", label: "UAE" },
              { code: "in", label: "India" },
              { code: "cn", label: "China" },
              { code: "sa", label: "Saudi Arabia" },
              { code: "eu", label: "Europe" },
            ].map(({ code, label }) => (
              <img
                key={code}
                src={`https://flagcdn.com/w40/${code}.png`}
                alt={label}
                title={label}
                className="h-5 w-auto rounded-sm shadow-sm opacity-90 hover:opacity-100 transition-opacity"
              />
            ))}
            <span className="flex items-center gap-1 text-white/60 text-[12px] font-medium border border-white/20 rounded px-2 py-0.5">
              🌐 Global
            </span>
          </div>
        </div>
      </div>

      {/* 🧩 PRODUCT SECTORS */}
      <div className="py-[clamp(40px,6vw,72px)] bg-white text-left">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-teal mb-[10px]">Product Sectors</div>
          <h2 className="font-sans font-extrabold text-[clamp(24px,4vw,36px)] text-ink tracking-[-0.5px] leading-[1.1] mb-[8px]">
            Wide Range of Categories
          </h2>
          <p className="text-[15px] text-muted mb-[36px]">
            Browse suppliers and buyers by sector. Click a category to filter the directory instantly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px]">
             {/* 1 */}
             <Link href="/directory" className="bg-white border border-border-brand rounded-[12px] p-5 transition-all hover:border-teal hover:shadow-brand group flex flex-col">
               <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-ink mb-4">
                  <Leaf size={16} />
               </div>
               <h3 className="font-serif font-bold text-[16px] text-ink mb-1 group-hover:text-teal flex justify-between items-center">
                 Agriculture <ArrowUpRight size={14} className="text-muted group-hover:text-teal" />
               </h3>
               <p className="text-[12px] text-muted leading-[1.5]">Machinery, Agrochemicals, Animal Feed, Seeds...</p>
             </Link>
             
             {/* 2 */}
             <Link href="/directory" className="bg-white border border-border-brand rounded-[12px] p-5 transition-all hover:border-teal hover:shadow-brand group flex flex-col">
               <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-ink mb-4">
                  <Coffee size={16} />
               </div>
               <h3 className="font-serif font-bold text-[16px] text-ink mb-1 group-hover:text-teal flex justify-between items-center">
                 Food & Beverage <ArrowUpRight size={14} className="text-muted group-hover:text-teal" />
               </h3>
               <p className="text-[12px] text-muted leading-[1.5]">Organic, Halal, Packaged Foods, Beverages, Spices...</p>
             </Link>
             
             {/* 3 */}
             <Link href="/directory" className="bg-white border border-border-brand rounded-[12px] p-5 transition-all hover:border-teal hover:shadow-brand group flex flex-col">
               <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-ink mb-4">
                  <Laptop size={16} />
               </div>
               <h3 className="font-serif font-bold text-[16px] text-ink mb-1 group-hover:text-teal flex justify-between items-center">
                 Technology <ArrowUpRight size={14} className="text-muted group-hover:text-teal" />
               </h3>
               <p className="text-[12px] text-muted leading-[1.5]">IoT, Software, Consumer Electronics, AI Devices...</p>
             </Link>
             
             {/* 4 */}
             <Link href="/directory" className="bg-white border border-border-brand rounded-[12px] p-5 transition-all hover:border-teal hover:shadow-brand group flex flex-col">
               <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-ink mb-4">
                  <HeartPulse size={16} />
               </div>
               <h3 className="font-serif font-bold text-[16px] text-ink mb-1 group-hover:text-teal flex justify-between items-center">
                 Healthcare <ArrowUpRight size={14} className="text-muted group-hover:text-teal" />
               </h3>
               <p className="text-[12px] text-muted leading-[1.5]">Medical Devices, Diagnostics, PPE, Pharma...</p>
             </Link>
             
             {/* 5 */}
             <Link href="/directory" className="bg-white border border-border-brand rounded-[12px] p-5 transition-all hover:border-teal hover:shadow-brand group flex flex-col">
               <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-ink mb-4">
                  <HardHat size={16} />
               </div>
               <h3 className="font-serif font-bold text-[16px] text-ink mb-1 group-hover:text-teal flex justify-between items-center">
                 Construction <ArrowUpRight size={14} className="text-muted group-hover:text-teal" />
               </h3>
               <p className="text-[12px] text-muted leading-[1.5]">Building Materials, Steel, Glass, Fittings...</p>
             </Link>
             
             {/* 6 */}
             <Link href="/directory" className="bg-white border border-border-brand rounded-[12px] p-5 transition-all hover:border-teal hover:shadow-brand group flex flex-col">
               <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-ink mb-4">
                  <Zap size={16} />
               </div>
               <h3 className="font-serif font-bold text-[16px] text-ink mb-1 group-hover:text-teal flex justify-between items-center">
                 Energy <ArrowUpRight size={14} className="text-muted group-hover:text-teal" />
               </h3>
               <p className="text-[12px] text-muted leading-[1.5]">Solar, Petroleum Equipment, Cables, Batteries...</p>
             </Link>
             
             {/* 7 */}
             <Link href="/directory" className="bg-white border border-border-brand rounded-[12px] p-5 transition-all hover:border-teal hover:shadow-brand group flex flex-col">
               <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-ink mb-4">
                  <Shirt size={16} />
               </div>
               <h3 className="font-serif font-bold text-[16px] text-ink mb-1 group-hover:text-teal flex justify-between items-center">
                 Apparel <ArrowUpRight size={14} className="text-muted group-hover:text-teal" />
               </h3>
               <p className="text-[12px] text-muted leading-[1.5]">Clothing, Accessories, Sportswear, Textiles...</p>
             </Link>

             {/* 8 MORE */}
             <Link href="/directory" className="bg-[#1d4ed8] rounded-[12px] p-6 transition-all hover:bg-[#1e40af] hover:shadow-[0_8px_20px_rgba(29,78,216,0.3)] group flex flex-col justify-end text-white relative overflow-hidden">
                <div className="font-serif font-bold text-[32px] leading-none mb-2">+24</div>
                <h3 className="font-sans font-bold text-[16px] mb-1">More categories</h3>
                <p className="text-[12px] text-white/70 mb-4">Browse all suppliers worldwide</p>
                <div className="bg-white text-[#1d4ed8] font-bold text-[12px] px-3 py-1.5 rounded-[6px] inline-flex self-start items-center gap-1 hover:bg-sand transition-colors">
                  View all <ArrowUpRight size={14} />
                </div>
             </Link>
          </div>
        </div>
      </div>

      {/* 🟠 PROBLEM SECTION */}
      <div className="py-[clamp(40px,6vw,72px)] bg-white text-center">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-teal mb-[10px]">The Old Way</div>
          <h2 className="font-sans font-extrabold text-[clamp(22px,3.5vw,34px)] text-ink tracking-[-0.3px] leading-[1.15] mb-[32px]">
            Why Most B2B Platforms Fail Suppliers
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-[10px] max-w-2xl mx-auto text-left">
            {[
              "You get views, not real inquiries",
              "You pay for visibility, not results",
              "Buyers don't contact you directly",
              "No control over lead quality"
            ].map((text, i) => (
              <div key={i} className="bg-white border border-border-brand rounded-brand-m p-4 flex items-start gap-3">
                <div className="text-coral shrink-0"><AlertTriangle size={18} /></div>
                <p className="text-[13px] text-body leading-[1.5]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🟢 SOLUTION SECTION */}
      <div className="py-[clamp(40px,6vw,72px)] bg-sand border-y border-border-brand text-center">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-teal mb-[10px]">The Biznecto Way</div>
          <h2 className="font-sans font-extrabold text-[clamp(22px,3.5vw,34px)] text-ink tracking-[-0.3px] leading-[1.15] mb-[32px]">
            We Deliver Buyer Intent — Not Just Listings
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-[10px] max-w-2xl mx-auto text-left">
            {[
              "Verified buyer requirements",
              "Direct supplier access to real demand",
              "No middlemen, no fake leads",
              "Focus on high-intent buyers only"
            ].map((text, i) => (
              <div key={i} className="bg-teal-glass border border-teal-border rounded-brand-m p-4 flex items-start gap-3">
                <div className="text-teal-dark shrink-0"><CheckCircle2 size={18} /></div>
                <p className="text-[13px] text-teal-dark font-medium leading-[1.5]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔵 LIVE BUYER REQUIREMENTS */}
      <div className="py-[clamp(40px,6vw,72px)] bg-[#f6f8fa] text-center border-t border-border-brand">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] text-[#1e293b] tracking-[-0.2px] mb-[32px]">
            Active Buyer Requirements
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left mb-[40px]">
            {/* Req 1 */}
            <div className="bg-white border border-border-brand p-5 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://flagcdn.com/w40/ae.png" alt="UAE Flag" className="w-[30px] rounded-sm shadow-sm" />
                <span className="font-sans font-bold text-[16px] text-[#1e293b]">Dubai Buyer</span>
              </div>
              <div className="flex-1 space-y-[10px] mb-6">
                <p className="text-[14px] text-[#334155]">Exhibition Stand Builder Needed</p>
                <p className="text-[14px] text-[#334155]">Budget: AED 25,000</p>
                <p className="text-[14px] text-[#334155]">Timeline: 2 Weeks</p>
              </div>
              <Link href="/requirements" className="w-full bg-[#1b64c0] hover:bg-[#1553a0] text-white font-sans text-[15px] font-medium py-2.5 rounded-[4px] text-center transition-colors">
                Unlock This Lead
              </Link>
            </div>

            {/* Req 2 */}
            <div className="bg-white border border-border-brand p-5 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://flagcdn.com/w40/sa.png" alt="Saudi Arabia Flag" className="w-[30px] rounded-sm shadow-sm" />
                <span className="font-sans font-bold text-[16px] text-[#1e293b]">Saudi Buyer</span>
              </div>
              <div className="flex-1 space-y-[10px] mb-6">
                <p className="text-[14px] text-[#334155]">• LED Display Supplier</p>
                <p className="text-[14px] text-[#334155]">• Qty: 500 Units</p>
                <p className="text-[14px] text-[#334155]">• Budget: $15,000</p>
              </div>
              <Link href="/requirements" className="w-full bg-[#1b64c0] hover:bg-[#1553a0] text-white font-sans text-[15px] font-medium py-2.5 rounded-[4px] text-center transition-colors">
                Unlock This Lead
              </Link>
            </div>

            {/* Req 3 */}
            <div className="bg-white border border-border-brand p-5 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://flagcdn.com/w40/in.png" alt="India Flag" className="w-[30px] rounded-sm shadow-sm" />
                <span className="font-sans font-bold text-[16px] text-[#1e293b]">India Buyer</span>
              </div>
              <div className="flex-1 space-y-[10px] mb-6">
                <p className="text-[14px] text-[#334155]">• Packaging Supplier Needed</p>
                <p className="text-[14px] text-[#334155]">• Bulk Order</p>
              </div>
              <Link href="/requirements" className="w-full bg-[#1b64c0] hover:bg-[#1553a0] text-white font-sans text-[15px] font-medium py-2.5 rounded-[4px] text-center transition-colors">
                Unlock This Lead
              </Link>
            </div>
          </div>

          <div className="mt-[20px]">
            <Link href="/requirements" className="bg-transparent text-ink border border-border-brand hover:bg-black/5 font-sans text-[15px] font-medium py-[10px] px-[28px] rounded-brand inline-flex transition-colors">
              View more requirements
            </Link>
          </div>
        </div>
      </div>

      {/* 🟣 HOW IT WORKS */}
      <div className="py-[clamp(40px,6vw,72px)] bg-sand border-y border-border-brand text-center">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="font-sans font-extrabold text-[clamp(22px,3.5vw,34px)] text-ink tracking-[-0.3px] leading-[1.15] mb-[32px]">
            Simple. Direct. Results-Driven.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            <div className="bg-white border border-border-brand p-6 rounded-brand-m">
              <div className="font-serif font-bold tracking-[1px] text-teal text-xl mb-2">1</div>
              <h3 className="font-sans font-semibold text-[15px] text-ink mb-1">Buyers post requirements</h3>
            </div>
            <div className="bg-white border border-border-brand p-6 rounded-brand-m relative">
              <div className="hidden md:block absolute top-[50%] left-[-20px] w-4 border-t-2 border-dashed border-border-brand" />
              <div className="hidden md:block absolute top-[50%] right-[-20px] w-4 border-t-2 border-dashed border-border-brand" />
              <div className="font-serif font-bold tracking-[1px] text-teal text-xl mb-2">2</div>
              <h3 className="font-sans font-semibold text-[15px] text-ink mb-1">BIZNECTO verifies and matches suppliers</h3>
            </div>
            <div className="bg-white border border-border-brand p-6 rounded-brand-m">
              <div className="font-serif font-bold tracking-[1px] text-teal text-xl mb-2">3</div>
              <h3 className="font-sans font-semibold text-[15px] text-ink mb-1">You receive high-quality buyer leads</h3>
            </div>
          </div>
          
          <div className="inline-block bg-teal-glass text-teal-dark font-medium text-[13px] px-[16px] py-[8px] rounded-full border border-teal-border">
            👉 No cold calling. No chasing.
          </div>
        </div>
      </div>

      {/* 🟡 OFFER SECTION */}
      <div className="py-[clamp(40px,6vw,72px)] bg-white border-b border-border-brand text-center">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="font-sans font-extrabold text-[clamp(22px,3.5vw,34px)] text-ink tracking-[-0.3px] leading-[1.15] mb-[24px]">
            Start Getting Buyer Leads — <span className="text-teal">FREE</span>
          </h2>
          
          <ul className="text-left inline-block mb-[32px] space-y-3">
            <li className="flex items-center gap-3 bg-sand px-5 py-3 rounded-brand-m">
              <CheckCircle2 size={18} className="text-teal" />
              <span className="font-medium text-body text-[14px]">Free business listing</span>
            </li>
            <li className="flex items-center gap-3 bg-sand px-5 py-3 rounded-brand-m">
              <CheckCircle2 size={18} className="text-teal" />
              <span className="font-medium text-body text-[14px]">Access to initial buyer leads</span>
            </li>
            <li className="flex items-center gap-3 bg-sand px-5 py-3 rounded-brand-m">
              <CheckCircle2 size={18} className="text-teal" />
              <span className="font-medium text-body text-[14px]">No upfront commitment</span>
            </li>
          </ul>

          <div>
             <span className="text-ink font-semibold text-[14px]">👉 Upgrade only when you start receiving leads</span>
          </div>
        </div>
      </div>

      {/* ⚫ URGENCY SECTION */}
      <div className="py-[clamp(40px,6vw,72px)] bg-[#fef2f2] border-b border-[#fecaca] text-center">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="font-sans font-extrabold text-[clamp(22px,3.5vw,34px)] text-[#991b1b] tracking-[-0.3px] leading-[1.15] mb-[12px]">
            Limited Supplier Slots Per Category
          </h2>
          <p className="text-[15px] text-[#7f1d1d] leading-[1.85] max-w-[520px] mx-auto mb-[24px]">
            To maintain lead quality, we onboard only a limited number of suppliers per industry. 
          </p>
          <Link href="/pricing" className="bg-[#dc2626] text-white border-none py-[12px] px-[22px] rounded-brand font-sans text-[14px] font-semibold transition-colors hover:bg-[#b91c1c] inline-flex items-center justify-center">
            👉 Secure your position now
          </Link>
        </div>
      </div>

      {/* 🟢 FINAL CTA */}
      <div className="px-4 pb-[40px] pt-[40px] bg-white">
        <div className="bg-ink rounded-[28px] py-[clamp(36px,6vw,60px)] px-[clamp(20px,5vw,56px)] text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,184,156,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,184,156,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="relative z-10">
            <div className="font-serif font-bold italic text-[clamp(22px,4vw,40px)] text-white mb-[28px] tracking-[-0.3px] leading-[1.1]">
              Ready to Get Your First Buyer?
            </div>
            
            <div className="flex flex-wrap justify-center gap-[10px]">
              <Link href="/requirements" className="bg-teal text-white font-sans text-[14px] font-semibold py-[12px] px-[24px] rounded-brand inline-flex transition-colors hover:bg-teal-dark">
                👉 Get Buyer Leads Now
              </Link>
              <Link href="/pricing" className="bg-[rgba(255,255,255,0.07)] text-[rgba(255,255,255,0.75)] border border-[rgba(255,255,255,0.14)] font-sans text-[14px] font-semibold py-[12px] px-[22px] rounded-brand inline-flex transition-colors hover:border-white hover:text-white">
                👉 Join as Supplier
              </Link>
            </div>
          </div>
        </div>
      </div>

      
      
      {/* 🟠 TRADE SHOWS (Moved down, minimal) */}
      <div className="py-[clamp(40px,6vw,72px)] bg-sand border-t border-border-brand text-center">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-teal mb-[10px]">Upcoming Events</div>
          <h2 className="font-sans font-extrabold text-[clamp(22px,3.5vw,34px)] text-ink tracking-[-0.3px] leading-[1.15] mb-[20px]">
            Trade Show Calendar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px]">
            {["Gulfood 2026", "GITEX Global 2025", "Arab Health 2026", "ADIPEC 2025"].map(p => (
              <div key={p} className="bg-white border border-border-brand rounded-brand-m p-[16px] text-left transition-all hover:border-blue">
                <div className="font-serif font-semibold text-[14px] text-ink mb-[8px] tracking-[-0.1px]">{p}</div>
                <div className="text-[11px] text-muted">Dubai / Abu Dhabi, UAE</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/trade-shows" className="text-blue text-[13px] font-semibold hover:underline">
              Browse full calendar →
            </Link>
          </div>
        </div>
      </div>

      <FloatingWhatsApp />
    </main>
  );
}
