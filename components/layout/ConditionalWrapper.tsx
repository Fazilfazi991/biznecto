"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoLayoutPage = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  if (isNoLayoutPage) {
    return <div className="flex-1">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
