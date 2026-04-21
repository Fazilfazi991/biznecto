import React from "react";
import { Users, AlertCircle, Building2, Package, LayoutDashboard, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  // Fetch real counts from the database
  const supplierCount = await prisma.company.count();
  const userCount = await prisma.user.count();
  const pendingRequirementsCount = await prisma.requirement.count({
    where: { status: "PENDING" }
  });

  const stats = [
    { label: "Active Suppliers", value: supplierCount.toLocaleString(), color: "border-l-indigo-500" },
    { label: "Active Buyers", value: "0", color: "border-l-teal" }, // Placeholder for buyers
    { label: "Pending Review", value: pendingRequirementsCount.toString(), sub: pendingRequirementsCount > 0 ? "Action Required" : "Clean Queue", color: "border-l-amber-500" },
    { label: "Platform Revenue", value: "$0", color: "border-l-green-500" },
  ];

  // Fetch latest signups
  const latestSignups = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { company: true }
  });

  // Fetch pending requirements
  const pendingRequirements = await prisma.requirement.findMany({
    where: { status: "PENDING" },
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col gap-8">
      
      <div>
        <h1 className="font-serif font-bold text-2xl text-ink mb-1">Platform Overview</h1>
        <p className="text-sm text-muted">Monitor real-time marketplace activity and moderation queues.</p>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white border-y border-r border-border-brand border-l-4 rounded-brand-m p-4.5 ${stat.color} shadow-sm transition-transform hover:-translate-y-1`}>
            <div className="text-[10px] font-bold tracking-[0.7px] uppercase text-muted mb-1.5">{stat.label}</div>
            <div className="font-serif font-bold text-3xl text-ink leading-none mb-1.5">{stat.value}</div>
            {stat.sub && (
              <div className={`text-[11px] font-medium px-2 py-0.5 rounded inline-block ${
                pendingRequirementsCount > 0 ? "text-amber-600 bg-amber-50" : "text-teal bg-teal/5"
              }`}>
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
            {pendingRequirementsCount > 0 && (
              <Badge variant="hot">{pendingRequirementsCount} Pending</Badge>
            )}
          </div>
          
          <div className="divide-y divide-border-brand flex-1 flex flex-col">
            {pendingRequirements.length > 0 ? (
              pendingRequirements.map((req) => (
                <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif font-semibold text-[14px] text-ink mb-1">{req.title}</h4>
                    <div className="text-[11px] text-muted flex items-center gap-2">
                      <span>{req.category}</span>
                      <span className="w-1 h-1 rounded-full bg-border-brand" />
                      <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:border-red-600 hover:bg-red-50">Reject</Button>
                    <Button variant="primary" size="sm" className="bg-teal hover:bg-teal-dark text-white">Approve & Publish</Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center mb-3">
                  <LayoutDashboard size={20} className="text-muted/40" />
                </div>
                <p className="text-[13px] text-muted font-medium">All caught up!</p>
                <p className="text-[11px] text-hint">New buyer requirements will appear here for review.</p>
              </div>
            )}
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
            {latestSignups.length > 0 ? (
              latestSignups.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-sand flex items-center justify-center font-serif font-bold text-xs text-ink uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-ink truncate">{user.name}</div>
                    <div className="text-[11px] text-muted">{user.company?.name || user.role}</div>
                  </div>
                  <Badge variant={user.role === "ADMIN" ? "pro" : "free"}>
                    {user.role === "ADMIN" ? "Admin" : "Supplier"}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-[11px] text-muted italic">No signups yet</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
