import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { MapPin, ShoppingCart, CircleDollarSign, Calendar, Globe, ShieldCheck } from "lucide-react";
import { InquiryForm } from "./InquiryForm";

export default async function RequirementQuotePage({ params }: { params: { id: string } }) {
  const requirement = await prisma.requirement.findUnique({
    where: { id: params.id },
    include: { author: { select: { name: true, email: true } } }
  });

  if (!requirement) notFound();

  const session = await auth();
  
  // Try to find if user has a company for default data
  let defaultData = {};
  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: true }
    });
    if (user) {
      defaultData = {
        name: user.name,
        email: user.email,
        companyName: user.company?.name || ""
      };
    }
  }

  return (
    <main className="min-h-screen bg-sand pb-20 pt-[58px]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-teal uppercase tracking-widest">
            <ShieldCheck size={14} /> Secure Inquiry Channel
          </div>
          <h1 className="font-serif font-bold text-3xl text-ink">
            Sending Inquiry For: <span className="text-teal font-serif">{requirement.title}</span>
          </h1>
        </div>

        {/* Requirement Summary Card */}
        <div className="bg-white border border-border-brand rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
               <Badge className="bg-teal text-white border-none text-[10px] uppercase font-bold tracking-wider">
                <CheckCircle2 size={10} className="mr-1" /> VERIFIED
              </Badge>
              <span className="text-[11px] text-muted font-medium">{new Date(requirement.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <h2 className="font-serif font-bold text-xl text-ink mb-4">
            Wanted : {requirement.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-[13px] text-muted border-t border-sand pt-4 mt-4">
             <div className="flex items-center gap-2">
                <Globe size={14} className="text-teal" /> 
                <span>Buyer From: <b className="text-ink">Global</b></span>
             </div>
             <div className="flex items-center gap-2">
                <ShoppingCart size={14} className="text-teal" /> 
                <span>Quantity Required: <b className="text-ink">{requirement.quantity}</b></span>
             </div>
             <div className="flex items-center gap-2">
                <CircleDollarSign size={14} className="text-teal" /> 
                <span>Budget: <b className="text-ink">{requirement.budget || "TBD"}</b></span>
             </div>
             <div className="flex items-center gap-2">
                <MapPin size={14} className="text-teal" /> 
                <span>Destination: <b className="text-ink">Worldwide</b></span>
             </div>
          </div>

          <div className="mt-6">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none text-[13px] font-bold text-ink hover:text-teal transition-colors">
                Product Description
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 p-4 bg-sand/30 rounded-xl border border-border-brand/50 text-[13px] text-muted leading-relaxed">
                {requirement.description}
                {requirement.buyerDetails && (
                  <div className="mt-4 pt-4 border-t border-border-brand/50">
                    <b className="text-ink block mb-1">Additional Specifications:</b>
                    {requirement.buyerDetails}
                  </div>
                )}
              </div>
            </details>
          </div>
        </div>

        {/* Inquiry Form */}
        <InquiryForm requirementId={requirement.id} defaultData={defaultData} />
      </div>
    </main>
  );
}

// Re-using icon because CheckCircle2 is not imported in this scope but used in Badge
function CheckCircle2({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size || 16} 
      height={size || 16} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
