import React from "react";
import { ArrowUpRight, TrendingUp, Handshake, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function DashboardOverviewPage() {
  const stats = [
    { label: "Profile Views", value: "342", up: true, trend: "+12%" },
    { label: "Search Appearances", value: "1,204", up: true, trend: "+5%" },
    { label: "Direct Inquiries", value: "12", up: true, trend: "+3" },
    { label: "Matches Unlocked", value: "2", up: false, trend: "" },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-brand-m p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="pro" className="mb-2">UPGRADE SUGGESTED</Badge>
          <h2 className="font-serif font-semibold text-[15px] text-ink mb-1">Get more out of Biznecto</h2>
          <p className="text-[12px] text-muted">You are missing out on 42 direct buyer matches this week. Upgrade to Pro to unlock.</p>
        </div>
        <Button variant="primary" className="bg-blue hover:bg-blue/90 shrink-0">
          View Pro Plans
        </Button>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-l-4 border-l-teal p-4">
            <div className="text-[10px] font-bold tracking-[0.7px] uppercase text-muted mb-1.5">{stat.label}</div>
            <div className="font-serif font-bold text-2xl text-ink leading-none mb-1">{stat.value}</div>
            {stat.trend && (
              <div className={`text-[11px] font-medium ${stat.up ? "text-green-600" : "text-muted"}`}>
                {stat.trend} this month
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <span className="bg-teal-glass p-1.5 rounded-md"><Handshake size={16} className="text-teal" /></span>
              New Buyer Matches
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border-brand rounded-lg p-3 flex gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-glass border border-teal-border flex flex-col items-center justify-center shrink-0">
                  <span className="font-serif font-bold text-xs text-teal">95%</span>
                  <span className="text-[7px] text-teal">MATCH</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-serif font-semibold text-xs text-ink mb-1">Needs Organic Honey Bulk</h4>
                  <p className="text-[10px] text-muted mb-2">🇩🇪 Buyer from Germany · Active</p>
                  <div className="flex gap-1.5">
                    <Badge variant="gray">Honey</Badge>
                    <Badge variant="gray">1000kg+</Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 mt-auto border-t border-border-brand text-center">
            <Button variant="outline" size="sm" className="w-full text-xs">View all matches</Button>
          </div>
        </Card>

        {/* Visibility Insights */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <span className="bg-blue-50 p-1.5 rounded-md"><Search size={16} className="text-blue" /></span>
              Visibility Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-sand pb-4">
                <div>
                  <div className="text-[13px] font-medium text-ink mb-0.5">Top performing product</div>
                  <div className="text-[11px] text-muted">A-Grade Steel Pipes</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-serif font-bold text-ink">145 views</div>
                  <div className="text-[10px] text-green-600">↑ 12% week</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b border-sand pb-4">
                <div>
                  <div className="text-[13px] font-medium text-ink mb-0.5">Top search keyword</div>
                  <div className="text-[11px] text-muted">"organic honey uae"</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-serif font-bold text-ink">89 searches</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-medium text-ink mb-0.5">Profile completeness</div>
                  <div className="text-[11px] text-muted">Missing company certificates</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-serif font-bold text-amber-600">60%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
