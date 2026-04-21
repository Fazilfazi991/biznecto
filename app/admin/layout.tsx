"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Users, ShieldAlert, DollarSign, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: Activity },
    { name: "Add Listing", href: "/admin/listings/new", icon: Activity },
    { name: "Signups", href: "/admin/users", icon: Users },
    { name: "Requirement Moderation", href: "/admin/moderation", icon: ShieldAlert },
    { name: "Revenue", href: "/admin/revenue", icon: DollarSign },
  ];

  return (
    <div className="flex min-h-screen pt-[58px] bg-[#fafaf9]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[220px] bg-white border-r border-border-brand flex-col fixed top-[58px] bottom-0 left-0 overflow-y-auto z-40">
        <div className="p-4 flex-1">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-purple mb-4">Admin Hub</div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all group",
                    isActive 
                      ? "bg-purple/10 text-purple" 
                      : "text-muted hover:bg-sand hover:text-ink"
                  )}
                >
                  <Icon size={16} className={isActive ? "text-purple" : "text-hint group-hover:text-muted"} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border-brand mt-auto">
          <Link href="/" className="flex items-center gap-2 text-[12px] text-muted hover:text-ink transition-colors">
            <LogOut size={14} /> Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[220px] flex flex-col min-w-0">
        
        {/* Mobile Nav */}
        <div className="md:hidden flex overflow-x-auto gap-2 p-3 bg-white border-b border-border-brand hide-scrollbar sticky top-[58px] z-30">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "whitespace-nowrap text-[11px] font-medium px-4 py-2 rounded-full transition-colors shrink-0",
                  isActive ? "bg-purple text-white" : "bg-sand text-muted border border-border-brand"
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
        
        <main className="p-4 md:p-8 w-full max-w-6xl mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
