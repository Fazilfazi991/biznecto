import React from "react";
import { prisma } from "@/lib/prisma";
import { RequirementManagement } from "./RequirementManagement";

export default async function AdminRequirementsPage() {
  const requirements = await prisma.requirement.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        }
      }
    }
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif font-bold text-2xl text-ink mb-1">Requirements Moderation</h1>
        <p className="text-sm text-muted">Review and manage all buyer inquiries and requests for quotes.</p>
      </div>

      <RequirementManagement initialRequirements={requirements} />
    </div>
  );
}
