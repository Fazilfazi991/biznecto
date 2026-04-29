"use client";

import React, { useState } from "react";
import { AlertCircle, LayoutDashboard, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { approveRequirement, rejectRequirement } from "@/app/requirements/actions";
import { useRouter } from "next/navigation";

interface ModerationQueueProps {
  pendingRequirements: any[];
  totalCount: number;
}

export function ModerationQueue({ pendingRequirements, totalCount }: ModerationQueueProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const router = useRouter();

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setProcessingId(id);
    const result = action === "approve" ? await approveRequirement(id) : await rejectRequirement(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setProcessingId(null);
  };

  return (
    <div className="lg:col-span-2 bg-white border border-border-brand rounded-brand-m overflow-hidden flex flex-col shadow-sm">
      <div className="bg-sand p-4 border-b border-border-brand flex items-center justify-between">
        <h3 className="font-sans font-semibold text-sm flex items-center gap-2 text-ink">
          <AlertCircle size={16} className="text-amber-500" />
          Moderation Queue
        </h3>
        {totalCount > 0 && (
          <Badge className="bg-amber-100 text-amber-700 border-none">{totalCount} Pending</Badge>
        )}
      </div>
      
      <div className="divide-y divide-border-brand flex-1 flex flex-col min-h-[300px]">
        {pendingRequirements.length > 0 ? (
          pendingRequirements.map((req) => (
            <div key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-sand/30 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-serif font-bold text-[15px] text-ink">{req.title}</h4>
                  <span className="text-[10px] text-muted font-bold bg-sand px-1.5 py-0.5 rounded">{req.quantity}</span>
                </div>
                <p className="text-[11px] text-muted line-clamp-1 mb-2 italic">{req.description}</p>
                <div className="text-[10px] text-muted flex items-center gap-2">
                  <span className="font-bold text-teal">{req.budget}</span>
                  <span className="w-1 h-1 rounded-full bg-border-brand" />
                  <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                  <span className="w-1 h-1 rounded-full bg-border-brand" />
                  <span className="text-ink font-medium">By {req.author?.name || "Unknown"} ({req.author?.email})</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={!!processingId}
                  onClick={() => handleAction(req.id, "reject")}
                  className="text-red-600 border-red-200 hover:border-red-600 hover:bg-red-50 text-[11px] font-bold h-9 px-4 rounded-lg"
                >
                  {processingId === req.id ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} className="mr-1" />}
                  Reject
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  disabled={!!processingId}
                  onClick={() => handleAction(req.id, "approve")}
                  className="bg-teal hover:bg-teal-dark text-white text-[11px] font-bold h-9 px-4 rounded-lg shadow-md shadow-teal/10"
                >
                  {processingId === req.id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} className="mr-1" />}
                  Approve & Publish
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center mb-3">
              <LayoutDashboard size={20} className="text-muted/40" />
            </div>
            <p className="text-[13px] text-muted font-medium">Moderation Queue Clear</p>
            <p className="text-[11px] text-hint">New buyer requirements will appear here for review.</p>
          </div>
        )}
      </div>
    </div>
  );
}
