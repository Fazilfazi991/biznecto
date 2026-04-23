import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, Globe, Package, MessageSquare, FileDown, Mail, Phone, User, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function SupplierProfilePage({ params }: { params: { id: string } }) {
  const company = await prisma.company.findUnique({
    where: { id: params.id },
    include: { 
      items: true,
      users: {
        select: {
          name: true,
          email: true,
        },
        take: 1
      }
    }
  });

  if (!company) notFound();

  const tags = company.tags ? company.tags.split(",") : [];
  const primaryContact = company.users[0];

  return (
    <main className="min-h-screen bg-sand pt-[58px]">
      {/* Hero Header */}
      <div className="bg-ink text-white py-12 px-4 relative overflow-hidden">
         {/* Background Decor */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center md:items-end relative z-10">
          {/* Logo */}
          <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center text-ink font-serif font-bold text-4xl shadow-xl shrink-0 border-4 border-white/10">
            {company.logoUrl ? (
              <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-3xl" />
            ) : (
              company.name.substring(0, 2).toUpperCase()
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
              <h1 className="font-serif font-bold text-3xl md:text-5xl tracking-tight">{company.name}</h1>
              {company.isVerified && (
                <div className="flex items-center gap-1.5 bg-teal/20 text-teal px-3 py-1 rounded-full border border-teal/30">
                   <CheckCircle2 size={16} />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-white/50 text-[13px] font-medium">
              <div className="flex items-center gap-1.5"><MapPin size={16} className="text-teal/70" /> {company.location || "Global Supplier"}</div>
              <div className="flex items-center gap-1.5"><Globe size={16} className="text-teal/70" /> Verified Domain</div>
              <div className="flex items-center gap-1.5"><Package size={16} className="text-teal/70" /> {company.items.length} Products</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {company.catalogueUrl && (
              <a href={company.catalogueUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-5 rounded-xl text-sm font-bold flex items-center gap-2">
                  <FileDown size={18} /> Catalogue
                </Button>
              </a>
            )}
            <a href="#contact">
              <Button className="bg-teal hover:bg-teal-dark text-white px-8 py-5 rounded-xl text-sm font-bold shadow-lg shadow-teal/20 transition-all hover:-translate-y-0.5">
                Contact Supplier
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
        {/* Left: About & Contact */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-white rounded-2xl p-7 border border-border-brand shadow-sm">
            <h3 className="font-serif font-bold text-xl text-ink mb-4 border-b border-sand pb-3">About the Company</h3>
            <p className="text-muted leading-relaxed text-[14px]">
              {company.description || "A professional supplier in the global B2B marketplace, committed to quality and international standards."}
            </p>
          </section>

          <section id="contact" className="bg-white rounded-2xl p-7 border border-teal/20 shadow-sm relative overflow-hidden ring-1 ring-teal/5">
            <div className="absolute top-0 right-0 p-3 opacity-5">
               <MessageSquare size={80} />
            </div>
            <h3 className="font-serif font-bold text-xl text-ink mb-5 flex items-center gap-2">
               Contact Details
            </h3>
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-teal/5 flex items-center justify-center text-teal shrink-0">
                    <User size={18} />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-0.5">Primary Contact</div>
                    <div className="text-sm font-bold text-ink">{primaryContact?.name || "Company Sales Team"}</div>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-teal/5 flex items-center justify-center text-teal shrink-0">
                    <Mail size={18} />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-0.5">Email Address</div>
                    <a href={`mailto:${primaryContact?.email}`} className="text-sm font-bold text-teal hover:underline break-all">
                       {primaryContact?.email || "Contact via portal"}
                    </a>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-teal/5 flex items-center justify-center text-teal shrink-0">
                    <Phone size={18} />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-0.5">Phone Number</div>
                    <div className="text-sm font-bold text-ink">Verified by Biznecto</div>
                    <div className="text-[11px] text-muted mt-0.5">Contact via email for direct line</div>
                 </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-sand">
               <p className="text-[11px] text-muted italic">Mention <strong>Biznecto</strong> when contacting for priority response.</p>
            </div>
          </section>

          <section className="bg-sand rounded-2xl p-7 border border-border-brand">
            <h4 className="font-sans font-bold text-[11px] uppercase tracking-widest text-muted mb-4">Business Tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white text-ink rounded-lg text-[11px] font-bold border border-border-brand shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Product Catalog */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-border-brand pb-5">
            <h3 className="font-serif font-bold text-2xl text-ink tracking-tight">Digital Showroom</h3>
            <Badge variant="outline" className="text-[11px] font-bold uppercase tracking-widest border-border-brand">
               {company.items.length} Items
            </Badge>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {company.items.length > 0 ? (
              company.items.map(product => (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-border-brand hover:border-teal/30 hover:shadow-2xl transition-all duration-300 flex flex-col">
                  <div className="aspect-[4/3] bg-sand relative overflow-hidden shrink-0">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted/20">
                        <Package size={48} />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                       <Badge className="bg-white/90 backdrop-blur-sm text-ink border-none shadow-sm">{product.category || "General"}</Badge>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="font-serif font-bold text-lg text-ink mb-2 group-hover:text-teal transition-colors leading-tight">{product.name}</h4>
                    <p className="text-[13px] text-muted line-clamp-3 mb-6 leading-relaxed flex-1">{product.description || "High-quality product sourced globally."}</p>
                    <div className="mt-auto">
                       <Button variant="outline" className="w-full rounded-xl h-10 text-[12px] font-bold border-border-brand hover:bg-teal hover:text-white hover:border-teal transition-all">View Specifications</Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 py-32 text-center border-2 border-dashed border-border-brand rounded-[24px] bg-white/50">
                <div className="w-20 h-20 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
                   <Package size={36} className="text-muted/30" />
                </div>
                <h4 className="font-serif font-bold text-xl text-ink mb-2">No products listed yet</h4>
                <p className="text-sm text-muted max-w-xs mx-auto">This supplier is currently updating their digital showroom. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
