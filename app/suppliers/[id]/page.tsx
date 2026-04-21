import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, Globe, Package, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function SupplierProfilePage({ params }: { params: { id: string } }) {
  const company = await prisma.company.findUnique({
    where: { id: params.id },
    include: { items: true }
  });

  if (!company) notFound();

  const tags = company.tags ? company.tags.split(",") : [];

  return (
    <main className="min-h-screen bg-sand pt-[58px]">
      {/* Hero Header */}
      <div className="bg-ink text-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center md:items-end">
          {/* Logo */}
          <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center text-ink font-serif font-bold text-4xl shadow-xl shrink-0">
            {company.logoUrl ? (
              <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-3xl" />
            ) : (
              company.name.substring(0, 2).toUpperCase()
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="font-serif font-bold text-3xl md:text-4xl">{company.name}</h1>
              {company.isVerified && <span className="text-teal scale-125"><CheckBadge /></span>}
              <Badge variant="premium" className="bg-teal/10 text-teal border-teal/20">Verified Supplier</Badge>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/60 text-sm font-medium">
              <div className="flex items-center gap-1.5"><MapPin size={16} className="text-teal" /> {company.location || "Global"}</div>
              <div className="flex items-center gap-1.5"><Globe size={16} className="text-teal" /> Verified Domain</div>
              <div className="flex items-center gap-1.5"><Package size={16} className="text-teal" /> {company.items.length} Products</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-teal hover:bg-teal-dark text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-teal/20">
              Contact Supplier
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
        {/* Left: About & Stats */}
        <div className="lg:col-span-1 space-y-8">
          <section>
            <h3 className="font-serif font-bold text-xl text-ink mb-4">About the Company</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              {company.description || "A professional supplier in the global B2B marketplace, committed to quality and international standards."}
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 border border-border-brand shadow-sm">
            <h4 className="font-sans font-bold text-[11px] uppercase tracking-widest text-muted mb-4">Business Tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-sand text-ink rounded-lg text-xs font-semibold border border-border-brand">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Product Catalog */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border-brand pb-4">
            <h3 className="font-serif font-bold text-2xl text-ink">Product Catalog</h3>
            <span className="text-xs font-bold text-muted uppercase tracking-tighter">{company.items.length} Items Available</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {company.items.length > 0 ? (
              company.items.map(product => (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-border-brand hover:border-teal/30 hover:shadow-xl transition-all">
                  <div className="aspect-[4/3] bg-sand relative overflow-hidden">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted/30">
                        <Package size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif font-bold text-lg text-ink mb-1 group-hover:text-teal transition-colors">{product.name}</h4>
                    <p className="text-xs text-muted line-clamp-2 mb-4 leading-relaxed">{product.description || "High-quality product sourced globally."}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal">{product.category || "General"}</span>
                      <Button variant="outline" size="sm" className="rounded-lg h-8 text-[11px] font-bold border-border-brand hover:bg-teal hover:text-white transition-all">View Details</Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 py-20 text-center border-2 border-dashed border-border-brand rounded-2xl bg-white/50">
                <Package size={40} className="mx-auto text-muted/30 mb-3" />
                <h4 className="font-serif font-semibold text-ink">No products listed yet</h4>
                <p className="text-xs text-muted">Check back soon for this supplier's catalog.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// CheckBadge Helper
function CheckBadge() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549a4.49 4.49 0 01-3.498-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12a4.49 4.49 0 011.549-3.397 4.491 4.491 0 011.307-3.498 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 00-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
}
