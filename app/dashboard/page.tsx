import React from "react";
import { Handshake, Search, TrendingUp, Package, LayoutDashboard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { SupplierDashboard } from "./SupplierDashboard";
import { BuyerDashboard } from "./BuyerDashboard";

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

  if (!user) return null;

  const productCount = user?.company?.items?.length || 0;
  const company = user?.company;

  // ─── SUPPLIER LOGIC ───
  let matches: any[] = [];
  if (user.role === "SUPPLIER" && company?.tags) {
    const companyTags = company.tags.split(",").map(t => t.trim().toLowerCase());
    const allRequirements = await prisma.requirement.findMany({
      where: { status: "Active" },
      orderBy: { createdAt: "desc" },
    });
    matches = allRequirements.filter(req => {
      const reqTags = req.tags.split(",").map(t => t.trim().toLowerCase());
      return companyTags.some(tag => reqTags.includes(tag));
    });
    const planLimits: Record<string, number> = { FREE: 3, STARTER: 10, PRO: 25, PREMIUM: 100 };
    const limit = planLimits[company.plan || "FREE"];
    matches = matches.slice(0, limit);
  }

  // ─── BUYER LOGIC ───
  let userRequirements: any[] = [];
  if (user.role === "BUYER" || user.role === "ADMIN") {
    userRequirements = await prisma.requirement.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" }
    });
  }

  // Calculate profile completeness
  let completeness = 20;
  if (company?.description) completeness += 20;
  if (company?.location) completeness += 20;
  if (productCount > 0) completeness += 40;

  return (
    <>
      {user.role === "SUPPLIER" ? (
        <SupplierDashboard 
          user={user} 
          company={company} 
          matches={matches} 
          productCount={productCount} 
          completeness={completeness} 
        />
      ) : (
        <BuyerDashboard 
          user={user} 
          requirements={userRequirements} 
        />
      )}
    </>
  );
}

// Add cn utility if needed, but it should be available via imports if used.
// Since I used cn in line 100, I'll make sure it's imported.

