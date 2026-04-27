import React from "react";
import { Handshake, Search, TrendingUp, Package, LayoutDashboard, BarChart3, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SupplierDashboardProps {
  user: any;
  company: any;
  matches: any[];
  productCount: number;
  completeness: number;
}

export function SupplierDashboard({ user, company, matches, productCount, completeness }: SupplierDashboardProps) {
  const stats = [
    { label: "Profile Views", value: "0", color: "border-l-teal" },
    { label: "Matches Found", value: matches.length.toString(), color: "border-l-blue" },
    { label: "Search Ranking", value: company?.plan === "FREE" ? "Standard" : "Priority", color: "border-l-purple" },
    { label: "Plan Type", value: company?.plan || "FREE", color: "border-l-ink" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-brand-m p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="premium" className="mb-2 bg-teal text-white">SUPPLIER HUB</Badge>
          <h2 className="font-serif font-bold text-[18px] text-ink mb-1">Your Growth Hub is Ready</h2>
          <p className="text-[12px] text-muted">Complete your profile and add products to start appearing in buyer searches.</p>
        </div>
        <Link 
          href={company ? "/dashboard/products" : "/dashboard/settings"} 
          className="bg-ink hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-ink/10"
        >
          {company ? "Add Products" : "Complete Profile First"}
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`border-l-4 p-4 shadow-sm transition-transform hover:-translate-y-1 ${stat.color}`}>
            <div className="text-[10px] font-bold tracking-[0.7px] uppercase text-muted mb-1.5">{stat.label}</div>
            <div className="font-serif font-bold text-2xl text-ink leading-none mb-1">{stat.value}</div>
            <div className="text-[11px] font-medium text-muted italic">Live data...</div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 pb-20">
        <Card className="flex flex-col shadow-sm border-border-brand relative overflow-hidden">
          <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center mb-3 border border-border-brand/50">
              <Handshake size={24} className="text-muted" />
            </div>
            <Badge variant="hot" className="mb-2 bg-ink text-white">PHASE 2</Badge>
            <h4 className="font-serif font-bold text-lg text-ink mb-1">Lead Matching</h4>
            <p className="text-[11px] text-muted max-w-[200px]">Automated buyer-supplier matching coming soon.</p>
          </div>
          <CardHeader className="bg-sand/30 border-b border-sand">
            <CardTitle className="text-sm flex items-center gap-2 opacity-40">
              <span className="bg-teal/10 p-1.5 rounded-md"><Handshake size={16} className="text-teal" /></span>
              New Buyer Matches
            </CardTitle>
          </CardHeader>
          <CardContent className="p-12 text-center opacity-20 min-h-[300px]">
            <Handshake size={40} className="text-muted/40 mx-auto mb-4" />
            <h4 className="font-serif font-semibold text-sm text-ink mb-1">Matching in progress</h4>
          </CardContent>
        </Card>

        <Card className="flex flex-col shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center mb-3 border border-border-brand/50">
              <BarChart3 size={24} className="text-muted" />
            </div>
            <Badge variant="hot" className="mb-2 bg-blue text-white">PHASE 2</Badge>
            <h4 className="font-serif font-bold text-lg text-ink mb-1">Visibility Analytics</h4>
            <p className="text-[11px] text-muted max-w-[200px]">Track your reach and impressions.</p>
          </div>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2 opacity-40">
              <span className="bg-blue-50 p-1.5 rounded-md"><Search size={16} className="text-blue" /></span>
              Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="py-8 opacity-20">
            <div className="flex justify-between border-b pb-4 mb-4"><span>Product Views</span><span>0</span></div>
            <div className="flex justify-between border-b pb-4 mb-4"><span>Search Appearances</span><span>0</span></div>
            <div className="flex justify-between"><span>Profile Rating</span><span>4.8</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
