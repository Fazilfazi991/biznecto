import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, Globe, Package, MessageSquare, FileDown, Mail, Phone, User, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function SupplierProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = await prisma.company.findUnique({
    where: { id },
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
      <div className="bg-ink text-white py-10 px-4 relative overflow-hidden">
         {/* Background Decor */}
         <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-teal/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-center md:items-end relative z-10">
          {/* Logo */}
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-ink font-serif font-bold text-3xl shadow-xl shrink-0 border-4 border-white/10">
            {company.logoUrl ? (
              <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              company.name.substring(0, 2).toUpperCase()
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <h1 className="font-serif font-bold text-2xl md:text-4xl tracking-tight">{company.name}</h1>
              {company.isVerified && (
                <div className="flex items-center gap-1 bg-teal/20 text-teal px-2 py-0.5 rounded-full border border-teal/30">
                   <CheckCircle2 size={12} />
                   <span className="text-[9px] font-bold uppercase tracking-widest">Verified</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/50 text-[12px] font-medium">
              <div className="flex items-center gap-1.5"><MapPin size={14} className="text-teal/70" /> {company.location || "Global Supplier"}</div>
              <div className="flex items-center gap-1.5"><Globe size={14} className="text-teal/70" /> Verified Domain</div>
              <div className="flex items-center gap-1.5"><Package size={14} className="text-teal/70" /> {company.items.length} Products</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {company.catalogueUrl && (
              <a href={company.catalogueUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-5 py-4 rounded-lg text-xs font-bold flex items-center gap-2">
                  <FileDown size={16} /> Catalogue
                </Button>
              </a>
            )}
            <a href="#contact">
              <Button className="bg-teal hover:bg-teal-dark text-white px-6 py-4 rounded-lg text-xs font-bold shadow-lg shadow-teal/20 transition-all hover:-translate-y-0.5">
                Contact Supplier
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Left: About & Contact */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-white rounded-2xl p-5 border border-border-brand shadow-sm">
            <h3 className="font-serif font-bold text-lg text-ink mb-3 border-b border-sand pb-2">About the Company</h3>
            <p className="text-muted leading-relaxed text-[13px]">
              {company.description || "A professional supplier in the global B2B marketplace, committed to quality and international standards."}
            </p>
          </section>

          <section id="contact" className="bg-white rounded-2xl p-5 border border-teal/20 shadow-sm relative overflow-hidden ring-1 ring-teal/5">
            <div className="absolute top-0 right-0 p-3 opacity-5">
               <MessageSquare size={60} />
            </div>
            <h3 className="font-serif font-bold text-lg text-ink mb-4 flex items-center gap-2">
               Contact Details
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-lg bg-teal/5 flex items-center justify-center text-teal shrink-0">
                    <User size={16} />
                 </div>
                 <div>
                    <div className="text-[9px] font-bold text-muted uppercase tracking-widest mb-0.5">Primary Contact</div>
                    <div className="text-xs font-bold text-ink">{primaryContact?.name || "Company Sales Team"}</div>
                 </div>
              </div>

              <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-lg bg-teal/5 flex items-center justify-center text-teal shrink-0">
                    <Mail size={16} />
                 </div>
                 <div>
                    <div className="text-[9px] font-bold text-muted uppercase tracking-widest mb-0.5">Email Address</div>
                    <a href={`mailto:${primaryContact?.email}`} className="text-xs font-bold text-teal hover:underline break-all">
                       {primaryContact?.email || "Contact via portal"}
                    </a>
                 </div>
              </div>

              <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-lg bg-teal/5 flex items-center justify-center text-teal shrink-0">
                    <Phone size={16} />
                 </div>
                 <div>
                    <div className="text-[9px] font-bold text-muted uppercase tracking-widest mb-0.5">Phone Number</div>
                    <div className="text-xs font-bold text-ink">Verified by Biznecto</div>
                    <div className="text-[10px] text-muted mt-0.5">Contact via email for direct line</div>
                 </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sand">
               <p className="text-[10px] text-muted italic">Mention <strong>Biznecto</strong> when contacting for priority response.</p>
            </div>
          </section>

          <section className="bg-sand rounded-xl p-5 border border-border-brand">
            <h4 className="font-sans font-bold text-[9px] uppercase tracking-widest text-muted mb-3">Business Tags</h4>
            <div className="flex flex-wrap gap-1.5">
              {tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-white text-ink rounded-md text-[10px] font-bold border border-border-brand shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Product Catalog */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border-brand pb-4">
            <h3 className="font-serif font-bold text-xl text-ink tracking-tight">Digital Showroom</h3>
            <Badge variant="gray" className="text-[9px] font-bold uppercase tracking-widest border-border-brand">
               {company.items.length} Items
            </Badge>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.items.length > 0 ? (
              company.items.map(product => (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-border-brand hover:border-teal/30 hover:shadow-2xl transition-all duration-300 flex flex-col">
                  <div className="aspect-square bg-sand relative overflow-hidden shrink-0 p-4">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted/20">
                        <Package size={36} />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                       <Badge className="bg-white/90 backdrop-blur-sm text-ink border-none shadow-sm text-[9px]">{product.category || "General"}</Badge>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <Link href={`/products/${product.id}`}>
                      <h4 className="font-serif font-bold text-md text-ink mb-1 group-hover:text-teal transition-colors leading-tight">{product.name}</h4>
                    </Link>
                    <p className="text-[11px] text-muted line-clamp-2 mb-4 leading-relaxed flex-1">{product.description || "High-quality product."}</p>
                    <div className="mt-auto">
                       <Link href={`/products/${product.id}`}>
                          <Button variant="outline" className="w-full rounded-xl h-8 text-[10px] font-bold border-border-brand hover:bg-teal hover:text-white hover:border-teal transition-all">View Details</Button>
                       </Link>
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
