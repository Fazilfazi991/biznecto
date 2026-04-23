import React from "react";
import { ClipboardList, Search, MessageSquare, Plus, ShoppingBag, Bell, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BuyerDashboardProps {
  user: any;
  requirements: any[];
}

export function BuyerDashboard({ user, requirements }: BuyerDashboardProps) {
  const stats = [
    { label: "Total Posts", value: requirements.length.toString(), color: "border-l-ink" },
    { label: "Active Requests", value: requirements.filter(r => r.status === "Active").length.toString(), color: "border-l-teal" },
    { label: "Quotes Received", value: "0", color: "border-l-amber" },
    { label: "Verified Partners", value: "0", color: "border-l-blue" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-r from-ink to-ink-2 text-white rounded-brand-m p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <Badge variant="premium" className="mb-2 bg-teal text-white border-none">BUYER PORTAL</Badge>
          <h2 className="font-serif font-bold text-2xl mb-1">Find the Best Global Suppliers</h2>
          <p className="text-[13px] text-white/60 max-w-md">Post your requirements and let verified manufacturers come to you with competitive quotes.</p>
        </div>
        <Link href="/requirements" className="bg-teal hover:bg-teal-dark text-white px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-teal/20">
          + Post Requirement
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`border-l-4 p-4 shadow-sm ${stat.color}`}>
            <div className="text-[10px] font-bold tracking-[0.7px] uppercase text-muted mb-1.5">{stat.label}</div>
            <div className="font-serif font-bold text-2xl text-ink leading-none mb-1">{stat.value}</div>
            <div className="text-[11px] font-medium text-muted">Real-time update</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 pb-20">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="flex flex-col shadow-sm border-border-brand">
            <CardHeader className="border-b border-sand">
              <CardTitle className="text-sm flex items-center justify-between w-full">
                <span className="flex items-center gap-2">
                  <ClipboardList size={16} className="text-ink" />
                  My Recent Sourcing Requests
                </span>
                <Link href="/requirements" className="text-[11px] text-teal font-bold hover:underline">View All</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {requirements.length > 0 ? (
                <div className="divide-y divide-sand">
                  {requirements.slice(0, 4).map((req) => (
                    <div key={req.id} className="p-4 flex items-center justify-between hover:bg-sand/30 transition-colors">
                      <div>
                        <h4 className="font-sans font-bold text-[14px] text-ink">{req.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[11px] text-muted">{new Date(req.createdAt).toLocaleDateString()}</span>
                          <Badge className={cn("text-[9px] px-1.5", 
                            req.status === "Active" ? "bg-teal/10 text-teal border-none" : "bg-amber-50 text-amber-600 border-none"
                          )}>
                            {req.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-[10px] font-bold h-8 border-border-brand">Manage</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <ClipboardList size={32} className="text-muted/20 mx-auto mb-3" />
                  <p className="text-[13px] text-muted">You haven't posted any requirements yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="shadow-sm border-border-brand bg-sand/30">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldCheck size={16} className="text-teal" />
                Sourcing Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[12px] text-muted leading-relaxed mb-4">
                Your requirements are only visible to verified suppliers. We protect your privacy and shield you from spam.
              </p>
              <div className="p-3 bg-white rounded-lg border border-border-brand flex items-center gap-3">
                <div className="w-8 h-8 bg-teal/10 rounded-full flex items-center justify-center text-teal">
                  <Bell size={16} />
                </div>
                <div className="text-[11px] font-medium text-ink">Notification settings: ON</div>
              </div>
            </CardContent>
          </Card>
          
          <Link href="/directory" className="group">
            <Card className="shadow-sm border-border-brand hover:border-teal/50 transition-colors cursor-pointer overflow-hidden">
              <div className="p-6 bg-gradient-to-br from-white to-sand relative">
                <Search size={48} className="absolute -right-4 -bottom-4 text-ink/5 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif font-bold text-base text-ink mb-2">Browse Directory</h3>
                <p className="text-[11px] text-muted mb-4 leading-relaxed">Search 5,000+ verified global manufacturers and distributors.</p>
                <div className="text-[12px] font-bold text-teal flex items-center gap-1">Search Now →</div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
