import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Package, MapPin, Building2, ArrowLeft, Tag, MessageSquare, ShieldCheck, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      company: {
        include: {
          users: {
            select: {
              name: true,
              email: true,
            },
            take: 1
          }
        }
      }
    }
  });

  if (!product) notFound();

  const company = product.company;
  const primaryContact = company.users[0];

  return (
    <main className="min-h-screen bg-sand pt-[120px] pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb / Back Link */}
        <Link 
          href="/directory" 
          className="inline-flex items-center gap-2 text-muted text-xs font-bold uppercase tracking-widest mb-8 hover:text-teal transition-colors"
        >
          <ArrowLeft size={14} /> Back to Directory
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Product Image */}
          <div className="space-y-6">
            <div className="h-[400px] md:h-[500px] bg-white rounded-[32px] border border-border-brand shadow-xl overflow-hidden flex items-center justify-center relative group p-8">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                />
              ) : (
                <Package size={120} className="text-muted/10" />
              )}
              
              <div className="absolute top-6 left-6">
                 <Badge variant="teal" className="px-4 py-1.5 shadow-lg backdrop-blur-md">
                    Verified Product
                 </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
               <div className="bg-white p-4 rounded-2xl border border-border-brand text-center">
                  <div className="text-[10px] font-bold text-muted uppercase mb-1">Status</div>
                  <div className="text-xs font-bold text-teal">In Stock</div>
               </div>
               <div className="bg-white p-4 rounded-2xl border border-border-brand text-center">
                  <div className="text-[10px] font-bold text-muted uppercase mb-1">Origin</div>
                  <div className="text-xs font-bold text-ink">{company.location || "Global"}</div>
               </div>
               <div className="bg-white p-4 rounded-2xl border border-border-brand text-center">
                  <div className="text-[10px] font-bold text-muted uppercase mb-1">Lead Time</div>
                  <div className="text-xs font-bold text-ink">7-14 Days</div>
               </div>
            </div>
          </div>

          {/* Right: Product Info & Supplier Card */}
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="gray" className="uppercase tracking-widest px-3 py-1">
                   {product.category || "General Category"}
                </Badge>
              </div>
              <h1 className="font-serif font-bold text-4xl md:text-5xl text-ink leading-tight tracking-tight mb-6">
                {product.name}
              </h1>
              <p className="text-muted text-lg leading-relaxed mb-8 italic">
                {product.description || "High-quality industrial grade product sourced globally through the Biznecto verified network."}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-6 border-t border-border-brand">
                 <a href="#inquiry" className="flex-1">
                    <Button className="w-full bg-teal hover:bg-teal-dark text-white py-6 rounded-2xl font-bold shadow-lg shadow-teal/20 transition-all hover:-translate-y-1">
                       Request Quote
                    </Button>
                 </a>
                 <Button variant="outline" className="p-6 rounded-2xl border-border-brand hover:bg-sand">
                    <Share2 size={20} />
                 </Button>
              </div>
            </section>

            {/* Supplier Preview Card */}
            <div className="bg-white rounded-[32px] p-8 border border-border-brand shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-teal/10 transition-colors" />
               
               <div className="flex items-center gap-5 mb-8 relative z-10">
                  <div className="w-16 h-16 bg-sand rounded-2xl flex items-center justify-center text-ink font-serif font-bold text-xl shrink-0 border border-border-brand">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      company.name.substring(0, 1).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-ink group-hover:text-teal transition-colors leading-tight">
                       {company.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted font-medium mt-1">
                       <MapPin size={14} className="text-teal" /> {company.location || "Verified Supplier"}
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                  <div className="bg-sand/50 p-4 rounded-2xl">
                     <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Response Rate</div>
                     <div className="text-sm font-bold text-ink">98% Faster</div>
                  </div>
                  <div className="bg-sand/50 p-4 rounded-2xl">
                     <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Member Since</div>
                     <div className="text-sm font-bold text-ink">2024</div>
                  </div>
               </div>

               <div className="space-y-3 relative z-10">
                  <Link href={`/suppliers/${company.id}`}>
                    <Button variant="outline" className="w-full border-border-brand hover:bg-sand rounded-xl py-5 font-bold text-sm">
                       View Full Profile
                    </Button>
                  </Link>
                  <div id="inquiry" className="mt-6 pt-6 border-t border-sand">
                     <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal shrink-0">
                           <MessageSquare size={18} />
                        </div>
                        <div>
                           <div className="text-xs font-bold text-ink">Contact {primaryContact?.name || "Sales Team"}</div>
                           <a href={`mailto:${primaryContact?.email}`} className="text-sm text-teal hover:underline font-medium">{primaryContact?.email}</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Verification Badge */}
            <div className="flex items-center gap-3 bg-teal/5 border border-teal/20 p-5 rounded-2xl">
               <ShieldCheck className="text-teal" size={24} />
               <div>
                  <div className="text-xs font-bold text-ink leading-tight">Verified by Biznecto Market Integrity</div>
                  <div className="text-[11px] text-muted">Direct manufacturer contact. No intermediaries.</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
