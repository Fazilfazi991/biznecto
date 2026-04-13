"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Handshake, Eye, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Products", href: "/dashboard/products", icon: Package },
    { name: "Buyer Matches", href: "/dashboard/matches", icon: Handshake },
    { name: "Profile Visibility", href: "/dashboard/visibility", icon: Eye },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen pt-[58px] bg-[#eef2f7]">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-[240px] bg-ink flex-col fixed top-[58px] bottom-0 left-0 overflow-y-auto z-40">
        <div className="p-4 flex-1">
          <div className="mb-4">
            <div className="text-[9px] font-semibold tracking-[1px] uppercase text-white/40 mb-1">Current Plan</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal" />
              <span className="font-serif font-bold text-[13px] text-white">Free Supplier</span>
            </div>
            <Link href="/pricing" className="text-[10px] text-teal underline mt-1 block hover:text-white transition-colors">
              Upgrade Plan
            </Link>
          </div>

          <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-white/30 px-3 mt-6 mb-2">Menu</div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all group",
                    isActive 
                      ? "bg-teal/15 text-teal" 
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon size={16} className={isActive ? "text-teal" : "text-white/60 group-hover:text-white"} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 mt-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-serif font-bold text-xs">AG</div>
            <div className="overflow-hidden">
              <p className="text-[13px] font-medium text-white truncate w-[130px]">AG Enterprises</p>
              <p className="text-[11px] text-white/40">user@example.com</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 text-[12px] text-white/50 hover:text-white mt-2">
            <LogOut size={14} /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[240px] flex flex-col min-w-0">
        
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
                  isActive ? "bg-ink text-white" : "bg-sand text-muted border border-border-brand"
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
        
        <main className="p-4 md:p-6 w-full max-w-5xl mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
