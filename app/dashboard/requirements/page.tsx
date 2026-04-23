import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { RequirementForm } from "@/app/requirements/RequirementForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { RequirementList } from "./RequirementList";

export default async function BuyerRequirementsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const requirements = await prisma.requirement.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard" className="w-10 h-10 rounded-full bg-white border border-border-brand flex items-center justify-center hover:bg-sand transition-colors">
          <ChevronLeft size={20} className="text-ink" />
        </Link>
        <div>
          <h1 className="font-serif font-bold text-3xl text-ink">My Sourcing Requests</h1>
          <p className="text-sm text-muted">Manage all your posted requirements and track their status.</p>
        </div>
        <div className="ml-auto">
          <RequirementForm />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-brand shadow-sm overflow-hidden">
        <RequirementList initialRequirements={requirements} />
      </div>
    </div>
  );
}
