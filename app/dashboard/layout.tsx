import React from "react";
import Link from "next/link";
import { LayoutDashboard, Package, Handshake, Eye, Settings, LogOut, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;
  const role = user?.role || "SUPPLIER";
  const isBuyer = role === "BUYER";
  const isAdmin = role === "ADMIN";

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  ];

  if (!isBuyer || isAdmin) {
    navItems.push({ name: "My Products", href: "/dashboard/products", icon: Package });
    navItems.push({ name: "Buyer Matches", href: "/dashboard/matches", icon: Handshake });
    navItems.push({ name: "Profile Visibility", href: "/dashboard/visibility", icon: Eye });
  }

  if (isBuyer || isAdmin) {
    navItems.push({ name: "My Requirements", href: "/dashboard/requirements", icon: ClipboardList });
  }

  navItems.push({ name: "Settings", href: "/dashboard/settings", icon: Settings });

  return (
    <div className="flex min-h-screen pt-[58px] bg-[#eef2f7]">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-[240px] bg-ink flex-col fixed top-[58px] bottom-0 left-0 overflow-y-auto z-40">
        <div className="p-4 flex-1">
          <div className="mb-4">
            <div className="text-[9px] font-semibold tracking-[1px] uppercase text-white/40 mb-1">Current Plan</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal" />
              <span className="font-serif font-bold text-[13px] text-white">
                {isBuyer ? "Free Buyer" : "Free Supplier"}
              </span>
            </div>
            {!isBuyer && (
              <Link href="/pricing" className="text-[10px] text-teal underline mt-1 block hover:text-white transition-colors">
                Upgrade Plan
              </Link>
            )}
          </div>

          <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-white/30 px-3 mt-6 mb-2">Menu</div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all group text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon size={16} className="text-white/60 group-hover:text-white" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 mt-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-serif font-bold text-xs uppercase">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-[13px] font-medium text-white truncate w-[130px]">{user?.name || "User Account"}</p>
              <p className="text-[11px] text-white/40 truncate w-[130px]">{user?.email}</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 text-[12px] text-white/50 hover:text-white mt-2">
            <LogOut size={14} /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[240px] flex flex-col min-w-0">
        <main className="p-4 md:p-6 w-full max-w-5xl mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
