import React from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BuyerDashboard } from "../BuyerDashboard";

export default async function BuyerDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || user.role !== "BUYER" && user.role !== "ADMIN") redirect("/dashboard");

  let userRequirements: any[] = [];
  try {
    userRequirements = await prisma.requirement.findMany({
      where: { authorId: session.user.id },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Buyer requirements fetch error:", error);
    userRequirements = [];
  }

  return (
    <BuyerDashboard 
      user={user} 
      requirements={userRequirements} 
    />
  );
}
