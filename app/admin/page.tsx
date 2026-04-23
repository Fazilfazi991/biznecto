import React from "react";
import { Users, AlertCircle, Building2, Package, LayoutDashboard, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { prisma } from "@/lib/prisma";
import { ModerationQueue } from "./ModerationQueue";
import { CompanyModeration } from "./CompanyModeration";

export default async function AdminOverviewPage() {
  // Fetch real counts from the database
  const activeSupplierCount = await prisma.company.count({
    where: { status: "APPROVED" }
  });
  const pendingCompaniesCount = await prisma.company.count({
    where: { status: "PENDING" }
  });
  const userCount = await prisma.user.count();
  const pendingRequirementsCount = await prisma.requirement.count({
    where: { status: "PENDING" }
  });

  const stats = [
    { label: "Active Suppliers", value: activeSupplierCount.toLocaleString(), color: "border-l-indigo-500" },
    { label: "Pending Suppliers", value: pendingCompaniesCount.toString(), sub: pendingCompaniesCount > 0 ? "Review Needed" : "All Clear", color: "border-l-teal" },
    { label: "Pending Review", value: pendingRequirementsCount.toString(), sub: pendingRequirementsCount > 0 ? "Action Required" : "Clean Queue", color: "border-l-amber-500" },
    { label: "Total Users", value: userCount.toLocaleString(), color: "border-l-blue" },
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
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } }
  });

  // Fetch pending companies
  const pendingCompanies = await prisma.company.findMany({
    where: { status: "PENDING" },
    take: 10,
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
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ModerationQueue 
            pendingRequirements={pendingRequirements} 
            totalCount={pendingRequirementsCount} 
          />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Supplier Approvals */}
          <CompanyModeration 
            pendingCompanies={pendingCompanies} 
            totalCount={pendingCompaniesCount} 
          />

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
    </div>
  );
}
