import React from "react";
import { Handshake, Search, TrendingUp, Package, LayoutDashboard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { auth } from "@/auth";

export default async function DashboardOverviewPage() {
  const session = await auth();
  const userName = session?.user?.name || "Supplier";

  const stats = [
    { label: "Profile Views", value: "0", up: true, trend: "" },
    { label: "Search Appearances", value: "0", up: true, trend: "" },
    { label: "Direct Inquiries", value: "0", up: true, trend: "" },
    { label: "Matches Unlocked", value: "0", up: false, trend: "" },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-brand-m p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="premium" className="mb-2 bg-teal text-white">WELCOME, {userName.toUpperCase()}</Badge>
          <h2 className="font-serif font-bold text-[18px] text-ink mb-1">Your Growth Hub is Ready</h2>
          <p className="text-[12px] text-muted">Complete your profile and add products to start appearing in buyer searches.</p>
        </div>
        <Link href="/dashboard/products" className="bg-ink hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-ink/10">
          Add Products
        </Link>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-l-4 border-l-teal p-4 shadow-sm transition-transform hover:-translate-y-1">
            <div className="text-[10px] font-bold tracking-[0.7px] uppercase text-muted mb-1.5">{stat.label}</div>
            <div className="font-serif font-bold text-2xl text-ink leading-none mb-1">{stat.value}</div>
            <div className="text-[11px] font-medium text-muted italic">
              Initial tracking...
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <Card className="flex flex-col shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <span className="bg-teal/10 p-1.5 rounded-md"><Handshake size={16} className="text-teal" /></span>
              New Buyer Matches
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[240px]">
            <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center mb-4">
              <Handshake size={20} className="text-muted/40" />
            </div>
            <h4 className="font-serif font-semibold text-sm text-ink mb-1">No matches found yet</h4>
            <p className="text-[11px] text-muted max-w-[200px]">Add products to your catalog to start matching with buyers in your industry.</p>
          </CardContent>
          <div className="p-4 mt-auto border-t border-border-brand">
            <Button variant="outline" size="sm" className="w-full text-xs" disabled>View all matches</Button>
          </div>
        </Card>

        {/* Visibility Insights */}
        <Card className="flex flex-col shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <span className="bg-blue-50 p-1.5 rounded-md"><Search size={16} className="text-blue" /></span>
              Visibility Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-6 py-8">
            <div className="flex items-center justify-between border-b border-sand pb-4">
              <div>
                <div className="text-[13px] font-medium text-ink mb-0.5">Top performing product</div>
                <div className="text-[11px] text-muted italic">Awaiting catalog data...</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-serif font-bold text-muted">0 views</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-b border-sand pb-4">
              <div>
                <div className="text-[13px] font-medium text-ink mb-0.5">Top search keyword</div>
                <div className="text-[11px] text-muted italic">No searches recorded</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-serif font-bold text-muted">0 searches</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-ink mb-0.5">Profile completeness</div>
                <div className="text-[11px] text-muted">Complete your details to boost ranking</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-serif font-bold text-amber-600">20%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

// Internal Link component for server component
function Link({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
