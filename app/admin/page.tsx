import React from "react";
import { Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function AdminOverviewPage() {
  const stats = [
    { label: "Active Suppliers", value: "2,450", color: "border-l-indigo-500" },
    { label: "Active Buyers", value: "890", color: "border-l-teal" },
    { label: "New Requirements", value: "24", sub: "Pending review", color: "border-l-amber-500" },
    { label: "Total MRR", value: "$12,400", color: "border-l-green-500" },
  ];

  return (
    <div className="flex flex-col gap-8">
      
      <div>
        <h1 className="font-serif font-bold text-2xl text-ink mb-1">Platform Overview</h1>
        <p className="text-sm text-muted">Monitor marketplace activity and moderation queues.</p>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white border-y border-r border-border-brand border-l-4 rounded-brand-m p-4.5 ${stat.color} shadow-sm`}>
            <div className="text-[10px] font-bold tracking-[0.7px] uppercase text-muted mb-1.5">{stat.label}</div>
            <div className="font-serif font-bold text-3xl text-ink leading-none mb-1.5">{stat.value}</div>
            {stat.sub && (
              <div className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded inline-block">
                {stat.sub}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Moderation Queue */}
        <div className="lg:col-span-2 bg-white border border-border-brand rounded-brand-m overflow-hidden flex flex-col shadow-sm">
          <div className="bg-sand p-4 border-b border-border-brand flex items-center justify-between">
            <h3 className="font-sans font-semibold text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" />
              Pending Requirements Queue
            </h3>
            <Badge variant="hot">24 Pending</Badge>
          </div>
          
          <div className="divide-y divide-border-brand">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-semibold text-[14px] text-ink mb-1">500kg Organic Dates</h4>
                  <div className="text-[11px] text-muted flex items-center gap-2">
                    <span>🇦🇪 Buyer from UAE</span>
                    <span className="w-1 h-1 rounded-full bg-border-brand" />
                    <span>Posted 2 hours ago</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:border-red-600 hover:bg-red-50">Reject</Button>
                  <Button variant="primary" size="sm" className="bg-teal hover:bg-teal-dark text-white">Approve & Publish</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-border-brand rounded-brand-m shadow-sm flex flex-col">
          <div className="p-4 border-b border-border-brand">
            <h3 className="font-sans font-semibold text-sm flex items-center gap-2">
              <Users size={16} className="text-purple" />
              Latest Signups
            </h3>
          </div>
          
          <div className="p-4 flex flex-col gap-4">
            {[
              { n: "Premium Packaging LLC", p: "Pro Connect" },
              { n: "TechSolutions Berlin", p: "Free Supplier" },
              { n: "Agro Exports India", p: "Premium Vendor" },
            ].map((u, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-sand flex items-center justify-center font-serif font-bold text-xs text-ink">
                  {u.n.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-ink truncate">{u.n}</div>
                  <div className="text-[11px] text-muted">{u.p}</div>
                </div>
                <Badge variant={u.p === "Free Supplier" ? "free" : u.p === "Pro Connect" ? "pro" : "premium"}>
                  {u.p === "Free Supplier" ? "Free" : "Paid"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
