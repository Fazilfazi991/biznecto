"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Home, Search, ClipboardList, CreditCard, User, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Directory", href: "/directory", icon: Search },
    { name: "Requirements", href: "/requirements", icon: ClipboardList },
    { name: "Pricing", href: "/pricing", icon: CreditCard },
    { name: "Insights", href: "/insights", icon: User },
  ];

  return (
    <>
      {/* ─── TOP NAV (Desktop & Global Header) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-[300] h-[72px] bg-white/95 backdrop-blur-[18px] border-b border-border-brand flex items-center justify-between px-4">
        <Link href="/" className="flex items-center no-underline cursor-pointer group">
          <img src="/logo.png" alt="Biznecto" className="h-[40px] md:h-[52px] w-auto object-contain drop-shadow-sm" />
        </Link>
        
        <div className="hidden md:flex gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] font-semibold px-3 py-1.5 rounded-md transition-colors",
                  isActive 
                    ? "bg-teal text-white" 
                    : "text-ink/60 hover:text-ink hover:bg-black/5"
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          {status === "loading" ? (
            <div className="w-20 h-8 bg-black/5 animate-pulse rounded-md" />
          ) : session ? (
            <>
              <Link
                href="/dashboard"
                className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold text-ink/70 px-3 py-1.5 rounded-md border border-border-brand bg-transparent transition-colors hover:text-ink hover:bg-black/5"
              >
                <LayoutDashboard size={14} />
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-white bg-teal px-3.5 py-1.5 rounded-md transition-colors hover:bg-teal-dark"
              >
                <LogOut size={13} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[13px] font-semibold text-ink/70 px-3 py-1.5 rounded-md border border-border-brand bg-transparent transition-colors hover:text-ink hover:bg-black/5"
              >
                Log in
              </Link>
              <Link
                href="/login"
                className="text-[13px] font-semibold text-white bg-teal px-3.5 py-1.5 rounded-md transition-colors hover:bg-teal-dark"
              >
                List Free
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ─── BOTTOM NAV (Mobile) ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-[300] h-[58px] bg-white border-t border-border-brand flex md:hidden items-stretch px-1 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors",
                isActive ? "text-teal" : "text-ink/40 hover:text-ink/70"
              )}
            >
              <Icon size={18} />
              <span>{link.name === "Requirements" ? "Needs" : link.name === "Insights" ? "Guides" : link.name === "Directory" ? "Search" : link.name}</span>
            </Link>
          )
        })}
        {/* Auth tab on mobile */}
        {session ? (
          <Link
            href="/dashboard"
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors",
              pathname.startsWith("/dashboard") ? "text-teal" : "text-ink/40 hover:text-ink/70"
            )}
          >
            <LayoutDashboard size={18} />
            <span>Account</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors",
              pathname === "/login" ? "text-teal" : "text-ink/40 hover:text-ink/70"
            )}
          >
            <User size={18} />
            <span>Login</span>
          </Link>
        )}
      </nav>
    </>
  );
}
