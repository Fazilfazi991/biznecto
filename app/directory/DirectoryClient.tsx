"use client";

import React, { useState } from "react";
import { Search, MapPin, CheckCircle2, MessageSquare, Filter, ArrowUpRight, ShieldCheck, Tag, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function DirectoryClient({ dbCompanies }: { dbCompanies: any[] }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredCompanies = dbCompanies.filter((company) => {
    const matchesSearch = 
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      (company.tags && company.tags.toLowerCase().includes(search.toLowerCase())) ||
      (company.products_legacy && company.products_legacy.toLowerCase().includes(search.toLowerCase()));
    
    const matchesTag = selectedTag === "All" || (company.tags && company.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen bg-sand pt-[58px] pb-20">
      {/* Header & Search */}
      <div className="bg-ink text-white py-12 px-4 mb-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-serif font-bold text-4xl mb-4">Supplier Directory</h1>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto italic">
            Connect with verified global manufacturers and wholesalers.
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-teal" size={20} />
            <input
              type="text"
              placeholder="Search by company name, products, or industry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white text-ink pl-12 pr-4 py-4 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-teal/20 transition-all text-[15px]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-6 shrink-0">
          <div className="bg-white rounded-2xl p-6 border border-border-brand shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 border-b border-sand pb-4">
              <Filter size={16} className="text-teal" />
              <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-ink">Browse Categories</h3>
            </div>
            
            <div className="flex flex-col gap-2">
              {["All", "Construction", "Electronics", "Textiles", "Chemicals", "Metals"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-left px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                    selectedTag === tag 
                      ? "bg-teal text-white shadow-lg shadow-teal/20" 
                      : "text-muted hover:bg-sand hover:text-ink"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-[11px] font-bold text-muted uppercase tracking-widest">
              Found {filteredCompanies.length} Verified Suppliers
            </span>
          </div>

          {filteredCompanies.map((company) => {
            const isVerified = company.isVerified || company.tags?.includes("Verified");
            const tags = company.tags ? company.tags.split(",") : [];
            const products = company.products_legacy ? company.products_legacy.split(",") : [];

            return (
              <div key={company.id} className="group bg-white rounded-2xl p-6 border border-border-brand shadow-sm hover:shadow-xl hover:border-teal/30 transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden">
                {/* Premium Accent */}
                {company.isPremium && <div className="absolute top-0 left-0 w-1 h-full bg-teal" />}
                
                {/* Logo Section */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-sand rounded-2xl flex items-center justify-center font-serif font-bold text-2xl text-ink shrink-0 border border-border-brand transition-transform group-hover:scale-105">
                  {company.logoUrl ? (
                    <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    company.name.substring(0, 1).toUpperCase()
                  )}
                </div>

                {/* Info Section */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-ink flex items-center gap-2 group-hover:text-teal transition-colors">
                        {company.name}
                        {isVerified && <CheckCircle2 size={18} className="text-teal" />}
                      </h3>
                      <div className="text-xs font-semibold text-muted flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1"><MapPin size={12} className="text-teal" /> {company.location || "Global Supplier"}</span>
                        {company.catalogueUrl && (
                          <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                            <FileDown size={10} /> Catalogue
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] text-muted leading-relaxed mb-4 line-clamp-2 max-w-2xl mt-2 italic">
                    {company.description || "A professional supplier in the global B2B marketplace, committed to quality and international standards."}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-auto">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest bg-sand px-2 py-1 rounded">Catalog Preview:</span>
                    {company.items?.length > 0 ? (
                      company.items.slice(0, 4).map((p: any) => (
                        <span key={p.id} className="text-[11px] font-medium bg-white border border-border-brand px-3 py-1 rounded-full text-ink hover:border-teal hover:text-teal transition-all cursor-default">
                          {p.name}
                        </span>
                      ))
                    ) : products.length > 0 && products[0] !== "" ? (
                      products.slice(0, 4).map((p: string) => (
                        <span key={p} className="text-[11px] font-medium bg-white border border-border-brand px-3 py-1 rounded-full text-ink">
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
                  <Link href={`/suppliers/${company.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full bg-ink hover:bg-black text-white rounded-lg py-2.5">
                      Contact Supplier
                    </Button>
                  </Link>
                  <Link href={`/suppliers/${company.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full rounded-lg border-border-brand hover:bg-sand text-ink py-2.5">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
