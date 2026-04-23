import React from "react";
import { ClipboardList, MapPin, Calendar, CircleDollarSign, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { prisma } from "@/lib/prisma";
import { RequirementForm } from "./RequirementForm";
import { auth } from "@/auth";

export default async function RequirementsPage() {
  const session = await auth();
  const canPost = session?.user?.role === "BUYER" || session?.user?.role === "ADMIN";

  const requirements = await prisma.requirement.findMany({
    where: { status: "Active" },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } }
  });

  return (
    <main className="min-h-screen bg-sand pb-20 pt-[58px]">
      {/* Hero Section */}
      <div className="bg-ink text-white py-16 px-4 border-b border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1">
            <Badge variant="premium" className="mb-4 bg-teal text-white">LIVE OPPORTUNITIES</Badge>
            <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4 leading-tight">Requirements Board</h1>
            <p className="text-white/60 text-lg max-w-xl italic leading-relaxed">
              Real-time sourcing requests from verified buyers. Connect directly with businesses seeking your products.
            </p>
          </div>
          <div className="shrink-0">
            {canPost ? (
              <RequirementForm />
            ) : session?.user ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl max-w-xs">
                <p className="text-xs font-bold text-white mb-1 uppercase tracking-wider">Sourcing Only</p>
                <p className="text-[11px] text-white/60 leading-relaxed italic">
                  Posting is restricted to Buyers. Explore active opportunities below to connect.
                </p>
              </div>
            ) : (
              <RequirementForm /> 
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-muted">
            Latest Sourcing Requests ({requirements.length})
          </h2>
        </div>

        <div className="grid gap-6">
          {requirements.length > 0 ? (
            requirements.map((req) => (
              <div key={req.id} className="group bg-white rounded-2xl p-6 border border-border-brand shadow-sm hover:shadow-xl hover:border-teal/30 transition-all">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-sand text-ink border-none text-[10px] uppercase font-bold tracking-wider">
                        {req.tags ? req.tags.split(',')[0] : "General"}
                      </Badge>
                      <span className="text-[11px] text-muted font-medium flex items-center gap-1">
                        <Calendar size={12} className="text-teal" /> {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="font-serif font-bold text-2xl text-ink mb-3 group-hover:text-teal transition-colors">
                      {req.title}
                    </h3>
                    
                    <p className="text-[14px] text-muted leading-relaxed mb-6 line-clamp-3">
                      {req.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-sand rounded-lg text-teal">
                          <Tag size={16} />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-muted uppercase tracking-tighter">Quantity</div>
                          <div className="text-[13px] font-semibold text-ink">{req.quantity}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-sand rounded-lg text-teal">
                          <CircleDollarSign size={16} />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-muted uppercase tracking-tighter">Budget</div>
                          <div className="text-[13px] font-semibold text-ink">{req.budget}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-auto">
                         <div className="text-right">
                           <div className="text-[10px] font-bold text-muted uppercase tracking-tighter">Posted By</div>
                           <div className="text-[13px] font-serif font-bold text-ink">{req.author.name}</div>
                         </div>
                         <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center font-serif font-bold text-xs text-teal">
                            {req.author.name.charAt(0)}
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-48 shrink-0 flex flex-col justify-end">
                    <Button variant="primary" className="w-full bg-ink hover:bg-black text-white font-bold py-3 rounded-xl shadow-lg shadow-ink/10">
                      Send Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border-2 border-dashed border-border-brand rounded-2xl p-20 text-center">
              <ClipboardList size={48} className="text-muted/20 mx-auto mb-4" />
              <h3 className="font-serif font-bold text-xl text-ink mb-2">The Board is Quiet</h3>
              <p className="text-sm text-muted max-w-sm mx-auto mb-8 leading-relaxed">
                New buyer requirements appear here after being approved by our team. Check back soon for new opportunities!
              </p>
              {canPost ? <RequirementForm /> : null}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
