import React from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SupplierDashboard } from "../SupplierDashboard";

export default async function SupplierDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { 
      company: {
        include: { items: true }
      }
    }
  });

  if (!user || user.role !== "SUPPLIER") redirect("/dashboard");

  const productCount = user?.company?.items?.length || 0;
  const company = user?.company;

  let matches: any[] = [];
  try {
    if (company?.tags) {
      const companyTags = (company.tags || "").split(",").map(t => t.trim().toLowerCase()).filter(Boolean);
      
      const allRequirements = await prisma.requirement.findMany({
        where: { status: "Active" },
        orderBy: { createdAt: "desc" },
      });

      matches = allRequirements.filter(req => {
        if (!req.tags) return false;
        const reqTags = req.tags.split(",").map(t => t.trim().toLowerCase()).filter(Boolean);
        return companyTags.some(tag => reqTags.includes(tag));
      });

      const planLimits: Record<string, number> = { FREE: 3, STARTER: 10, PRO: 25, PREMIUM: 100 };
      const limit = planLimits[company.plan || "FREE"] || 3;
      matches = matches.slice(0, limit);
    }
  } catch (error) {
    console.error("Supplier matching error:", error);
    matches = [];
  }

  // Calculate profile completeness safely
  let completeness = 20;
  if (company?.description) completeness += 20;
  if (company?.location) completeness += 20;
  if (productCount > 0) completeness += 40;

  return (
    <SupplierDashboard 
      user={user} 
      company={company} 
      matches={matches} 
      productCount={productCount} 
      completeness={completeness} 
    />
  );
}
