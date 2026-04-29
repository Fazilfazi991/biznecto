"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Loader2, Building2, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { approveCompany, rejectCompany } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface CompanyModerationProps {
  pendingCompanies: any[];
  totalCount: number;
}

export function CompanyModeration({ pendingCompanies, totalCount }: CompanyModerationProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const router = useRouter();

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setProcessingId(id);
    const result = action === "approve" ? await approveCompany(id) : await rejectCompany(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setProcessingId(null);
  };

  return (
    <div className="bg-white border border-border-brand rounded-brand-m overflow-hidden flex flex-col shadow-sm">
      <div className="bg-sand p-4 border-b border-border-brand flex items-center justify-between">
        <h3 className="font-sans font-semibold text-sm flex items-center gap-2 text-ink">
          <Building2 size={16} className="text-teal" />
          Supplier Approvals
        </h3>
        {totalCount > 0 && (
          <Badge className="bg-teal/10 text-teal border-none">{totalCount} Pending</Badge>
        )}
      </div>
      
      <div className="divide-y divide-border-brand flex-1 flex flex-col min-h-[300px]">
        {pendingCompanies.length > 0 ? (
          pendingCompanies.map((company) => (
            <div key={company.id} className="p-5 flex flex-col gap-4 hover:bg-sand/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-border-brand flex items-center justify-center font-serif font-bold text-xl text-ink shrink-0">
                  {company.logoUrl ? (
                    <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain rounded-xl" />
                  ) : (
                    company.name.charAt(0)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-base text-ink mb-0.5">{company.name}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-muted">
                    <span className="flex items-center gap-1"><Globe size={12} /> {company.location || "Location not set"}</span>
                    <span className="w-1 h-1 rounded-full bg-border-brand" />
                    <span>{new Date(company.createdAt).toLocaleDateString()}</span>
                  </div>
                  {company.users?.[0] && (
                    <div className="text-[10px] text-teal font-bold mt-1 uppercase">
                      Contact: {company.users[0].name} ({company.users[0].email})
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-[11px] text-muted line-clamp-2 italic leading-relaxed">
                {company.description || "No description provided."}
              </p>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={!!processingId}
                  onClick={() => handleAction(company.id, "reject")}
                  className="flex-1 text-red-600 border-red-100 hover:bg-red-50 text-[11px] font-bold h-9 rounded-lg"
                >
                  {processingId === company.id ? <Loader2 size={14} className="animate-spin" /> : "Reject"}
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  disabled={!!processingId}
                  onClick={() => handleAction(company.id, "approve")}
                  className="flex-1 bg-teal hover:bg-teal-dark text-white text-[11px] font-bold h-9 rounded-lg shadow-md shadow-teal/10"
                >
                  {processingId === company.id ? <Loader2 size={14} className="animate-spin" /> : "Approve Supplier"}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <Building2 size={32} className="text-muted/20 mb-3" />
            <p className="text-[13px] text-muted font-medium">All Suppliers Verified</p>
            <p className="text-[11px] text-hint">New registrations will appear here for review.</p>
          </div>
        )}
      </div>
    </div>
  );
}
