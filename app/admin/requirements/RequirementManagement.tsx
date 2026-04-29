"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, XCircle, Loader2, Package, Eye, User, Calendar, 
  Tag, FileText, Mail, Phone, Info, ShoppingCart, DollarSign, Clock 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { approveRequirement, rejectRequirement } from "@/app/requirements/actions";
import { useRouter } from "next/navigation";

interface RequirementManagementProps {
  initialRequirements: any[];
}

export function RequirementManagement({ initialRequirements }: RequirementManagementProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedReq, setSelectedReq] = useState<any | null>(null);
  const router = useRouter();

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setProcessingId(id);
    const result = action === "approve" ? await approveRequirement(id) : await rejectRequirement(id);
    if (result.success) {
      router.refresh();
      if (selectedReq?.id === id) {
        setSelectedReq(null);
      }
    } else {
      alert(result.error);
    }
    setProcessingId(null);
  };

  return (
    <div className="bg-white border border-border-brand rounded-brand-m overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sand border-b border-border-brand">
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Requirement</th>
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Budget</th>
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-brand">
            {initialRequirements.map((req) => (
              <tr key={req.id} className="hover:bg-sand/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-bold text-ink truncate">{req.title}</div>
                    <div className="text-[11px] text-muted truncate">By {req.author?.name || "Unknown"} • {new Date(req.createdAt).toLocaleDateString()}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[12px] font-semibold bg-sand px-2 py-1 rounded border border-border-brand/50 text-ink">
                    {req.quantity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[12px] font-bold text-teal">
                    {req.budget || "TBD"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={
                    req.status === "Active" || req.status === "APPROVED" ? "pro" : 
                    req.status === "PENDING" ? "free" : "gray"
                  }>
                    {req.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedReq(req)}
                      className="h-8 px-3 text-[11px] font-bold rounded-lg"
                    >
                      <Eye size={14} className="mr-1.5" />
                      Review
                    </Button>
                    {req.status === "PENDING" && (
                      <div className="flex gap-1.5 ml-1.5 pl-1.5 border-l border-border-brand">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={!!processingId}
                          onClick={() => handleAction(req.id, "reject")}
                          className="h-8 w-8 p-0 text-red-600 border-red-100 hover:bg-red-50 rounded-lg"
                        >
                          <XCircle size={14} />
                        </Button>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          disabled={!!processingId}
                          onClick={() => handleAction(req.id, "approve")}
                          className="h-8 w-8 p-0 bg-teal hover:bg-teal-dark text-white rounded-lg"
                        >
                          <CheckCircle2 size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <Modal 
        isOpen={!!selectedReq} 
        onClose={() => setSelectedReq(null)}
        title="Requirement Details"
        className="max-w-2xl"
      >
        {selectedReq && (
          <div className="flex flex-col gap-6">
            <div className="pb-6 border-b border-border-brand">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="pro" className="bg-amber-100 text-amber-700 border-none px-2 py-0.5">
                  <Package size={10} className="mr-1" /> BUYER REQUEST
                </Badge>
                <Badge variant={selectedReq.status === "PENDING" ? "free" : "pro"}>{selectedReq.status}</Badge>
              </div>
              <h2 className="font-serif font-bold text-2xl text-ink leading-tight">{selectedReq.title}</h2>
              <p className="text-xs text-muted mt-2 flex items-center gap-1.5">
                <Calendar size={14} /> Posted on {new Date(selectedReq.createdAt).toLocaleDateString()} by <b>{selectedReq.author?.name}</b>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-sand/30 p-4 rounded-xl border border-border-brand/50">
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <ShoppingCart size={12} className="text-teal" /> Quantity
                </div>
                <div className="text-lg font-serif font-bold text-ink">{selectedReq.quantity}</div>
              </div>
              <div className="bg-sand/30 p-4 rounded-xl border border-border-brand/50">
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <DollarSign size={12} className="text-purple" /> Budget
                </div>
                <div className="text-lg font-serif font-bold text-ink">{selectedReq.budget || "N/A"}</div>
              </div>
              <div className="bg-sand/30 p-4 rounded-xl border border-border-brand/50">
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Clock size={12} className="text-coral" /> Deadline
                </div>
                <div className="text-sm font-bold text-ink">{selectedReq.deadline || "None set"}</div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Requirement Description</label>
                <div className="text-[14px] text-ink leading-relaxed whitespace-pre-wrap italic bg-sand/20 p-4 rounded-xl border border-border-brand/50">
                  {selectedReq.description}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Specific Details / Notes</label>
                <div className="text-[13px] text-muted leading-relaxed">
                  {selectedReq.buyerDetails || "No additional details provided."}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border-brand">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Category Tags</label>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReq.tags?.split(",").map((tag: string, i: number) => (
                      <span key={i} className="text-[10px] font-semibold bg-sand text-ink px-2.5 py-1.5 rounded-lg border border-border-brand/50">
                        {tag.trim()}
                      </span>
                    )) || <span className="text-[11px] text-hint italic">No tags</span>}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Buyer Contact Info</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs text-ink font-medium">
                      <User size={14} className="text-muted" /> {selectedReq.contactName || selectedReq.author?.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ink font-medium">
                      <Mail size={14} className="text-muted" /> {selectedReq.contactEmail || selectedReq.author?.email}
                    </div>
                    {selectedReq.contactPhone && (
                      <div className="flex items-center gap-2 text-xs text-ink font-medium">
                        <Phone size={14} className="text-muted" /> {selectedReq.contactPhone}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {selectedReq.status === "PENDING" && (
              <div className="flex gap-3 pt-6 border-t border-border-brand mt-2">
                <Button 
                  variant="outline" 
                  disabled={!!processingId}
                  onClick={() => handleAction(selectedReq.id, "reject")}
                  className="flex-1 text-red-600 border-red-100 hover:bg-red-50 font-bold h-12 rounded-xl"
                >
                  {processingId === selectedReq.id ? <Loader2 size={16} className="animate-spin" /> : "Reject Request"}
                </Button>
                <Button 
                  variant="primary" 
                  disabled={!!processingId}
                  onClick={() => handleAction(selectedReq.id, "approve")}
                  className="flex-1 bg-teal hover:bg-teal-dark text-white font-bold h-12 rounded-xl shadow-lg shadow-teal/10"
                >
                  {processingId === selectedReq.id ? <Loader2 size={16} className="animate-spin" /> : "Approve & Publish"}
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
