import React from "react";
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { SupplierManagement } from "./SupplierManagement";

export default async function AdminSuppliersPage() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
    include: { users: true },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif font-bold text-2xl text-ink mb-1">Suppliers Management</h1>
        <p className="text-sm text-muted">Manage all registered suppliers and their verification status.</p>
      </div>

      <SupplierManagement initialCompanies={companies} />
    </div>
  );
}
