import React from "react";
import { Handshake, Search, TrendingUp, Package, LayoutDashboard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function DashboardOverviewPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { 
      company: {
        include: { items: true }
      }
    }
  });

  const userName = user?.name || "Supplier";
  const productCount = user?.company?.items?.length || 0;
  const company = user?.company;

  // Matching Logic: Find active requirements that match company tags
  let matches: any[] = [];
  if (user?.role === "SUPPLIER" && company?.tags) {
    const companyTags = company.tags.split(",").map(t => t.trim().toLowerCase());
    
    const allRequirements = await prisma.requirement.findMany({
      where: { status: "Active" },
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } }
    });

    matches = allRequirements.filter(req => {
      const reqTags = req.tags.split(",").map(t => t.trim().toLowerCase());
      return companyTags.some(tag => reqTags.includes(tag));
    });

    // Apply Plan-based limits
    const planLimits = {
      FREE: 3,
      STARTER: 10,
      PRO: 25,
      PREMIUM: 100,
    };
    const limit = planLimits[company.plan || "FREE"];
    matches = matches.slice(0, limit);
  }

  // Calculate profile completeness
  let completeness = 20;
  if (company?.description) completeness += 20;
  if (company?.location) completeness += 20;
  if (productCount > 0) completeness += 40;

  const stats = [
    { label: "Profile Views", value: "0", color: "border-l-teal" },
    { label: "Matches Found", value: matches.length.toString(), color: "border-l-blue" },
    { label: "Search Ranking", value: company?.plan === "FREE" ? "Standard" : "Priority", color: "border-l-purple" },
    { label: "Plan Type", value: company?.plan || "FREE", color: "border-l-ink" },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-brand-m p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="premium" className="mb-2 bg-teal text-white">
            {user?.role === "BUYER" ? "BUYER PORTAL" : user?.role === "ADMIN" ? "ADMIN CONSOLE" : "SUPPLIER HUB"}
          </Badge>
          <h2 className="font-serif font-bold text-[18px] text-ink mb-1">
            {user?.role === "BUYER" ? "Find the Best Global Suppliers" : "Your Growth Hub is Ready"}
          </h2>
          <p className="text-[12px] text-muted">
            {user?.role === "BUYER" 
              ? "Post your requirements and let verified manufacturers come to you with competitive quotes."
              : "Complete your profile and add products to start appearing in buyer searches."}
          </p>
        </div>
        <Link 
          href={user?.role === "BUYER" ? "/requirements" : "/dashboard/products"} 
          className="bg-ink hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-ink/10"
        >
          {user?.role === "BUYER" ? "Post Requirement" : "Add Products"}
        </Link>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`border-l-4 p-4 shadow-sm transition-transform hover:-translate-y-1 ${stat.color}`}>
            <div className="text-[10px] font-bold tracking-[0.7px] uppercase text-muted mb-1.5">{stat.label}</div>
            <div className="font-serif font-bold text-2xl text-ink leading-none mb-1">{stat.value}</div>
            <div className="text-[11px] font-medium text-muted italic">
              {stat.label === "Plan Type" ? "Current Tier" : "Live data..."}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 pb-20">
        {/* New Buyer Matches Section */}
        <Card className="flex flex-col shadow-sm border-border-brand">
          <CardHeader className="bg-sand/30 border-b border-sand">
            <CardTitle className="text-sm flex items-center justify-between w-full">
              <span className="flex items-center gap-2">
                <span className="bg-teal/10 p-1.5 rounded-md"><Handshake size={16} className="text-teal" /></span>
                {user?.role === "BUYER" ? "My Recent Posts" : "New Buyer Matches"}
              </span>
              {matches.length > 0 && (
                <Badge variant="hot" className="text-[9px] px-2">HOT LEADS</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col min-h-[300px]">
            {user?.role === "SUPPLIER" ? (
              matches.length > 0 ? (
                <div className="divide-y divide-sand">
                  {matches.map((match) => (
                    <div key={match.id} className="p-4 hover:bg-sand/20 transition-colors group">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-serif font-bold text-sm text-ink group-hover:text-teal transition-colors">
                          {match.title}
                        </h4>
                        <span className="text-[10px] font-bold text-teal bg-teal/5 px-1.5 py-0.5 rounded">
                          {match.budget}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted line-clamp-1 mb-2 italic">
                        {match.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted flex items-center gap-1">
                          <Package size={10} /> {match.quantity}
                        </span>
                        <Link href="/requirements" className="text-[10px] font-bold text-ink hover:underline flex items-center gap-0.5">
                          Quote Now <TrendingUp size={10} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center mb-4">
                    <Handshake size={20} className="text-muted/40" />
                  </div>
                  <h4 className="font-serif font-semibold text-sm text-ink mb-1">No matches found yet</h4>
                  <p className="text-[11px] text-muted max-w-[200px]">Update your company tags or add more products to increase matching accuracy.</p>
                </div>
              )
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                 <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center mb-4">
                    <Package size={20} className="text-muted/40" />
                  </div>
                  <h4 className="font-serif font-semibold text-sm text-ink mb-1">Post your first requirement</h4>
                  <p className="text-[11px] text-muted max-w-[200px]">Get competitive quotes from verified global suppliers today.</p>
              </div>
            )}
          </CardContent>
          <div className="p-4 mt-auto border-t border-border-brand">
            <Link href={user?.role === "BUYER" ? "/requirements" : "/requirements"} className="block">
              <Button variant="outline" size="sm" className="w-full text-xs font-bold rounded-lg border-border-brand h-10">
                {user?.role === "BUYER" ? "View Board" : "Explore All Opportunities"}
              </Button>
            </Link>
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
                <div className="text-[13px] font-medium text-ink mb-0.5">My Product Count</div>
                <div className="text-[11px] text-muted italic">{productCount} items listed</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-serif font-bold text-ink">{productCount}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-b border-sand pb-4">
              <div>
                <div className="text-[13px] font-medium text-ink mb-0.5">Top performing product</div>
                <div className="text-[11px] text-muted italic">{productCount > 0 ? "Tracking views..." : "Awaiting catalog data..."}</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-serif font-bold text-muted">0 views</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-ink mb-0.5">Profile completeness</div>
                <div className="text-[11px] text-muted">Complete your details to boost ranking</div>
              </div>
              <div className="text-right">
                <div className={cn("text-[13px] font-serif font-bold", completeness === 100 ? "text-teal" : "text-amber-600")}>
                  {completeness}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

// Add cn utility if needed, but it should be available via imports if used.
// Since I used cn in line 100, I'll make sure it's imported.

