"use client";

import React, { useState } from "react";
import { 
  MessageSquare, Eye, User, Calendar, Mail, Phone, 
  Building2, Globe, FileText, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

interface InquiryManagementProps {
  initialInquiries: any[];
}

export function InquiryManagement({ initialInquiries }: InquiryManagementProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  return (
    <div className="bg-white border border-border-brand rounded-brand-m overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sand border-b border-border-brand">
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Inquiry For</th>
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">From</th>
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-brand">
            {initialInquiries.map((inquiry) => (
              <tr key={inquiry.id} className="hover:bg-sand/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-bold text-ink truncate max-w-[250px]">{inquiry.requirement.title}</div>
                    <div className="text-[10px] text-teal font-bold uppercase flex items-center gap-1">
                      <FileText size={10} /> Requirement ID: {inquiry.requirementId.substring(0, 8)}...
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-[13px] font-semibold text-ink">{inquiry.contactName}</div>
                    <div className="text-[11px] text-muted">{inquiry.companyName}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[12px] text-muted flex items-center gap-1.5">
                    <Calendar size={14} className="text-purple" />
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedInquiry(inquiry)}
                    className="h-8 px-3 text-[11px] font-bold rounded-lg"
                  >
                    <Eye size={14} className="mr-1.5" />
                    View Message
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <Modal 
        isOpen={!!selectedInquiry} 
        onClose={() => setSelectedInquiry(null)}
        title="Inquiry Details"
        className="max-w-2xl"
      >
        {selectedInquiry && (
          <div className="flex flex-col gap-6">
            <div className="pb-6 border-b border-border-brand">
              <div className="text-[10px] font-bold text-teal uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <MessageSquare size={12} /> INQUIRY MESSAGE
              </div>
              <h2 className="font-serif font-bold text-xl text-ink leading-tight">
                Inquiry for: {selectedInquiry.requirement.title}
              </h2>
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Message Content</label>
              <div className="bg-sand/30 p-5 rounded-2xl border border-border-brand/50 text-[14px] text-ink leading-relaxed whitespace-pre-wrap italic shadow-inner">
                "{selectedInquiry.message}"
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-2">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Supplier Details</label>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5 text-sm font-bold text-ink">
                      <Building2 size={16} className="text-purple" /> {selectedInquiry.companyName}
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-muted">
                      <User size={16} className="text-hint" /> {selectedInquiry.contactName}
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-muted">
                      <Globe size={16} className="text-hint" /> {selectedInquiry.country}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Contact Information</label>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5 text-[13px] text-ink font-medium">
                      <Mail size={16} className="text-teal" /> {selectedInquiry.contactEmail}
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-ink font-medium">
                      <Phone size={16} className="text-teal" /> {selectedInquiry.contactPhone || "No phone provided"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border-brand flex justify-end">
              <Button 
                variant="primary" 
                onClick={() => setSelectedInquiry(null)}
                className="bg-ink text-white font-bold h-11 px-8 rounded-xl"
              >
                Close Details
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
