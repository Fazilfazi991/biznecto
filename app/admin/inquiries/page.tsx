import React from "react";
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { InquiryManagement } from "./InquiryManagement";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      requirement: {
        select: {
          title: true,
        }
      },
      sender: {
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
        <h1 className="font-serif font-bold text-2xl text-ink mb-1">Inquiries Management</h1>
        <p className="text-sm text-muted">Monitor all inquiries and quotes sent between suppliers and buyers.</p>
      </div>

      <InquiryManagement initialInquiries={inquiries} />
    </div>
  );
}
