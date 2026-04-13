"use client";

import React, { useState } from "react";
import { Search, MapPin, Building2, Lock, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MOCK_COMPANIES } from "@/lib/mockData";

export default function DirectoryPage() {
  const [activeChip, setActiveChip] = useState("All");

  const chips = [
    "All", "Food & Bev", "Technology", "Healthcare", 
    "Energy", "Construction", "Agriculture", "Gulfood", "GITEX"
  ];

  return (
    <main className="min-h-screen bg-sand pb-12 mt-[58px]">
      {/* Search Header */}
      <div className="bg-ink p-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search a product e.g. 'organic honey', 'steel pipes'..."
                className="w-full bg-white h-11 rounded-brand pl-10 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            <Button size="lg" className="h-11">Search</Button>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
            <select className="h-11 bg-white rounded-brand px-3 text-xs text-muted font-sans border-0 focus:ring-2 focus:ring-teal cursor-pointer shrink-0">
              <option>All Industries</option>
              <option>Food & Beverage</option>
            </select>
            <select className="h-11 bg-white rounded-brand px-3 text-xs text-muted font-sans border-0 focus:ring-2 focus:ring-teal cursor-pointer shrink-0">
              <option>All Countries</option>
              <option>UAE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chips */}
      <div className="border-b border-border-brand bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar">
          {chips.map(chip => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`shrink-0 whitespace-nowrap text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                activeChip === chip 
                  ? "bg-ink border-ink text-white" 
                  : "bg-white border-border-brand text-muted hover:border-ink/30"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Listing */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="text-xs text-muted mb-4">
          Showing <strong className="text-ink">10,000+</strong> companies · <span className="text-teal">Search by product name to find specific suppliers →</span>
        </div>

        <div className="flex flex-col gap-3">
          {MOCK_COMPANIES.map(company => (
            <div 
              key={company.id}
              className="bg-white border border-border-brand rounded-brand-m p-4 flex flex-col md:flex-row gap-4 transition-all hover:border-teal hover:shadow-brand cursor-pointer"
            >
              {/* Logo */}
              <div className="w-12 h-12 bg-teal rounded-lg flex items-center justify-center text-white font-serif font-bold shrink-0">
                {company.logo}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-serif font-semibold text-sm text-ink mb-1 flex items-center gap-2">
                  {company.name}
                  {company.tags.includes("Verified") && (
                    <span className="text-blue flex items-center" title="Verified"><CheckBadge /></span>
                  )}
                </h3>
                <div className="text-xs text-muted flex items-center gap-1 mb-2">
                  <MapPin size={12} /> {company.location}
                </div>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {company.tags.filter(t => t !== "Verified").map(t => (
                    <Badge key={t} variant={t === "Premium" ? "premium" : "gray"}>
                      {t}
                    </Badge>
                  ))}
                </div>

                {/* Products */}
                <div className="flex px-3 py-2 bg-sand rounded-brand items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Products:</span>
                  {company.products.map(p => (
                    <span key={p} className="text-[10px] bg-teal-glass text-teal-dark border border-teal-border px-2 py-0.5 rounded-full">
                      {p}
                    </span>
                  ))}
                  {company.isLocked && (
                    <span className="text-[10px] bg-white border border-border-brand text-hint px-2 py-0.5 rounded-full blur-[2px] select-none">
                      Locked Items
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0 flex items-center md:items-start justify-end mt-2 md:mt-0">
                <Button variant="outline" size="sm">View Profile</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// Inline Verified Badge icon
function CheckBadge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  )
}
