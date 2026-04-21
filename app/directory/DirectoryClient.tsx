"use client";

import React, { useState } from "react";
import { Search, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// Inline Verified Badge icon
function CheckBadge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  )
}

export default function DirectoryClient({ dbCompanies }: { dbCompanies: any[] }) {
  const [activeChip, setActiveChip] = useState("All");

  const chips = [
    "All", "Food & Bev", "Technology", "Healthcare", 
    "Energy", "Construction", "Agriculture", "Gulfood", "GITEX"
  ];

  // Only show real DB companies added by admin
  const allCompanies = dbCompanies;

  return (
    <main className="min-h-screen bg-sand pb-12 mt-[58px]">
      {/* Search Header */}
      <div className="bg-ink p-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-teal transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search products, suppliers, or locations..."
                  className="w-full bg-white h-12 rounded-xl pl-11 pr-4 text-sm font-medium border-0 focus:ring-2 focus:ring-teal/50 transition-all placeholder:text-muted/60 shadow-sm"
                />
              </div>
              <Button size="lg" className="h-12 px-8 rounded-xl bg-teal hover:bg-teal-dark shadow-lg shadow-teal/20">Search</Button>
            </div>
            
            <div className="flex gap-2">
              <select className="h-12 bg-white rounded-xl px-4 text-xs font-semibold text-ink border-0 focus:ring-2 focus:ring-teal/50 cursor-pointer shadow-sm min-w-[140px]">
                <option>All Industries</option>
                <option>Food & Beverage</option>
              </select>
              <select className="h-12 bg-white rounded-xl px-4 text-xs font-semibold text-ink border-0 focus:ring-2 focus:ring-teal/50 cursor-pointer shadow-sm min-w-[140px]">
                <option>All Countries</option>
                <option>UAE</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Chips */}
      <div className="border-b border-border-brand bg-white/80 backdrop-blur-md sticky top-[58px] z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar">
          {chips.map(chip => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`shrink-0 whitespace-nowrap text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg border transition-all ${
                activeChip === chip 
                  ? "bg-ink border-ink text-white shadow-md shadow-ink/10" 
                  : "bg-white border-border-brand text-muted hover:border-teal/50 hover:text-teal"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Listing */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-medium text-muted uppercase tracking-widest">
            Found <span className="text-ink font-bold">{allCompanies.length}</span> Verified Suppliers
          </div>
          <div className="text-[11px] text-teal font-bold flex items-center gap-1.5 bg-teal/5 px-3 py-1 rounded-full border border-teal/10">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            LIVE MARKET DATA
          </div>
        </div>

        <div className="grid gap-4">
          {allCompanies.length === 0 && (
            <div className="bg-white border border-dashed border-border-brand rounded-2xl p-20 text-center">
              <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 size={24} className="text-muted/40" />
              </div>
              <h3 className="font-serif font-bold text-xl text-ink mb-2">No listings found</h3>
              <p className="text-sm text-muted max-w-xs mx-auto">We couldn't find any suppliers matching your criteria. Try adjusting your filters.</p>
            </div>
          )}
          
          {allCompanies.map(company => {
            const tags = Array.isArray(company.tags) 
              ? company.tags 
              : (company.tags ? company.tags.split(",") : []);
            
            const products = Array.isArray(company.products)
              ? company.products
              : (company.products ? company.products.split(",") : []);
            
            const isVerified = company.isVerified || tags.includes("Verified");

            return (
              <div 
                key={company.id}
                className="group bg-white border border-border-brand rounded-2xl p-5 flex flex-col md:flex-row gap-6 transition-all hover:border-teal/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden"
              >
                {/* Status Bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-teal opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Logo Area */}
                <div className="shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-ink to-ink-2 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-inner relative overflow-hidden">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-white/5" />
                        <span className="relative z-10">{company.name.substring(0, 2).toUpperCase()}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-ink flex items-center gap-2 group-hover:text-teal transition-colors">
                        {company.name}
                        {isVerified && (
                          <span className="text-teal" title="Verified"><CheckBadge /></span>
                        )}
                      </h3>
                      <div className="text-xs font-semibold text-muted flex items-center gap-1 mt-0.5">
                        <MapPin size={12} className="text-teal" /> {company.location || "Global Supplier"}
                      </div>
                    </div>
                    
                    <div className="hidden sm:flex flex-wrap gap-1.5 justify-end">
                      <Badge variant="premium" className="bg-teal/5 text-teal border-teal/10">Verified Member</Badge>
                      {tags.filter((t: string) => t !== "Verified").map((t: string) => (
                        <Badge key={t} variant="gray" className="bg-sand text-muted border-border-brand">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-[13px] text-muted leading-relaxed mb-4 line-clamp-2 max-w-2xl mt-2 italic">
                    {company.description || "A professional supplier in the global B2B marketplace, committed to quality and international standards."}
                  </p>

                  {/* Product Tags Section */}
                  <div className="flex flex-wrap items-center gap-2 mt-auto">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest bg-sand px-2 py-1 rounded">Products:</span>
                    {products.length > 0 && products[0] !== "" ? (
                      products.map((p: string) => (
                        <span key={p} className="text-[11px] font-medium bg-white border border-border-brand px-3 py-1 rounded-full text-ink hover:border-teal hover:text-teal transition-all cursor-default">
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-hint italic">Catalog being updated...</span>
                    )}
                  </div>
                </div>

                {/* Sidebar Actions */}
                <div className="md:w-48 flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-border-brand pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
                  <Button variant="primary" size="sm" className="flex-1 bg-ink hover:bg-black text-white rounded-lg py-2.5">
                    Contact Supplier
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 rounded-lg border-border-brand hover:bg-sand text-ink py-2.5">
                    View Catalog
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
