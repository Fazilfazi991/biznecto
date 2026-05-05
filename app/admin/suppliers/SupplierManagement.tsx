"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Loader2, Building2, Globe, Eye, User, Calendar, Tag, FileText, Mail, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { approveCompany, rejectCompany, updateSupplier, deleteSupplier } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface SupplierManagementProps {
  initialCompanies: any[];
}

export function SupplierManagement({ initialCompanies }: SupplierManagementProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const router = useRouter();

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("id", editingCompany.id);
    const result = await updateSupplier(formData);
    setEditLoading(false);
    if (result.success) {
      setEditingCompany(null);
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setProcessingId(id);
    const result = action === "approve" ? await approveCompany(id) : await rejectCompany(id);
    if (result.success) {
      router.refresh();
      if (selectedCompany?.id === id) {
        setSelectedCompany(null);
      }
    } else {
      alert(result.error);
    }
    setProcessingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this supplier? This action cannot be undone.")) return;
    setProcessingId(id);
    const result = await deleteSupplier(id);
    if (result.success) {
      router.refresh();
      if (selectedCompany?.id === id) setSelectedCompany(null);
      if (editingCompany?.id === id) setEditingCompany(null);
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
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-brand">
            {initialCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-sand/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sand flex items-center justify-center font-serif font-bold text-ink shrink-0 overflow-hidden border border-border-brand">
                      {company.logoUrl ? (
                        <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover" />
                      ) : (
                        company.name.charAt(0)
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-ink truncate">{company.name}</div>
                      <div className="text-[11px] text-muted truncate">{new Date(company.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-[12px] text-muted">
                    <Globe size={14} />
                    {company.location || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={
                    company.status === "APPROVED" ? "pro" : 
                    company.status === "PENDING" ? "free" : "gray"
                  }>
                    {company.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={!!processingId}
                      onClick={() => handleDelete(company.id)}
                      className="h-8 px-3 text-[11px] font-bold rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                    >
                      {processingId === company.id ? <Loader2 size={14} className="animate-spin mr-1.5" /> : <Trash2 size={14} className="mr-1.5" />}
                      Delete
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingCompany(company)}
                      className="h-8 px-3 text-[11px] font-bold rounded-lg"
                    >
                      <Edit2 size={14} className="mr-1.5" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedCompany(company)}
                      className="h-8 px-3 text-[11px] font-bold rounded-lg"
                    >
                      <Eye size={14} className="mr-1.5" />
                      Details
                    </Button>
                    {company.status === "PENDING" && (
                      <div className="flex gap-1.5 ml-1.5 pl-1.5 border-l border-border-brand">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={!!processingId}
                          onClick={() => handleAction(company.id, "reject")}
                          className="h-8 w-8 p-0 text-red-600 border-red-100 hover:bg-red-50 rounded-lg"
                        >
                          <XCircle size={14} />
                        </Button>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          disabled={!!processingId}
                          onClick={() => handleAction(company.id, "approve")}
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
        isOpen={!!selectedCompany} 
        onClose={() => setSelectedCompany(null)}
        title="Supplier Details"
        className="max-w-2xl"
      >
        {selectedCompany && (
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-6 pb-6 border-b border-border-brand">
              <div className="w-20 h-20 rounded-2xl bg-sand flex items-center justify-center font-serif font-bold text-3xl text-ink shrink-0 border border-border-brand overflow-hidden shadow-sm">
                {selectedCompany.logoUrl ? (
                  <img src={selectedCompany.logoUrl} alt={selectedCompany.name} className="w-full h-full object-contain" />
                ) : (
                  selectedCompany.name.charAt(0)
                )}
              </div>
              <div className="flex-1 min-w-0 pt-2">
                <h2 className="font-serif font-bold text-2xl text-ink mb-1">{selectedCompany.name}</h2>
                <div className="flex flex-wrap gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1.5"><Globe size={14} className="text-teal" /> {selectedCompany.location || "No location set"}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-purple" /> Member since {new Date(selectedCompany.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5 block">Plan & Status</label>
                  <div className="flex items-center gap-2">
                    <Badge variant="pro" className="uppercase font-bold tracking-wider">{selectedCompany.plan}</Badge>
                    <Badge variant={selectedCompany.status === "APPROVED" ? "pro" : "free"}>{selectedCompany.status}</Badge>
                    {selectedCompany.isVerified && (
                      <Badge variant="pro" className="bg-blue/10 text-blue border-none">
                        <CheckCircle2 size={10} className="mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5 block">Categories / Tags</label>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCompany.tags?.split(",").map((tag: string, i: number) => (
                      <span key={i} className="text-[10px] font-semibold bg-sand text-ink px-2 py-1 rounded-md border border-border-brand/50">
                        {tag.trim()}
                      </span>
                    )) || <span className="text-[11px] text-hint italic">No tags provided</span>}
                  </div>
                </div>

                {selectedCompany.catalogueUrl && (
                  <div>
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5 block">Company Catalogue</label>
                    <a 
                      href={selectedCompany.catalogueUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-teal hover:underline"
                    >
                      <FileText size={14} />
                      View PDF Catalogue
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5 block">About Company</label>
                  <p className="text-[13px] text-ink leading-relaxed whitespace-pre-wrap italic bg-sand/30 p-3 rounded-lg border border-border-brand/50">
                    {selectedCompany.description || "No company description provided."}
                  </p>
                </div>

                {selectedCompany.users?.[0] && (
                  <div className="pt-2">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Primary Contact</label>
                    <div className="bg-white border border-border-brand rounded-xl p-3 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-ink">
                        <User size={14} className="text-purple" /> {selectedCompany.users[0].name}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted">
                        <Mail size={14} className="text-teal" /> {selectedCompany.users[0].email}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedCompany.status === "PENDING" && (
              <div className="flex gap-3 pt-4 border-t border-border-brand mt-2">
                <Button 
                  variant="outline" 
                  disabled={!!processingId}
                  onClick={() => handleAction(selectedCompany.id, "reject")}
                  className="flex-1 text-red-600 border-red-100 hover:bg-red-50 font-bold h-11 rounded-xl"
                >
                  {processingId === selectedCompany.id ? <Loader2 size={16} className="animate-spin" /> : "Reject Supplier"}
                </Button>
                <Button 
                  variant="primary" 
                  disabled={!!processingId}
                  onClick={() => handleAction(selectedCompany.id, "approve")}
                  className="flex-1 bg-teal hover:bg-teal-dark text-white font-bold h-11 rounded-xl shadow-lg shadow-teal/10"
                >
                  {processingId === selectedCompany.id ? <Loader2 size={16} className="animate-spin" /> : "Approve & Verify"}
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal 
        isOpen={!!editingCompany} 
        onClose={() => setEditingCompany(null)}
        title="Edit Supplier"
        className="max-w-2xl"
      >
        {editingCompany && (
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Company Name</label>
              <input
                name="name" type="text" required defaultValue={editingCompany.name}
                className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Location</label>
              <input
                name="location" type="text" defaultValue={editingCompany.location || ""}
                className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Tags / Categories (comma separated)</label>
              <input
                name="tags" type="text" defaultValue={editingCompany.tags || ""}
                className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Description</label>
              <textarea
                name="description" rows={4} defaultValue={editingCompany.description || ""}
                className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Catalogue URL</label>
              <input
                name="catalogueUrl" type="url" defaultValue={editingCompany.catalogueUrl || ""}
                className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border-brand">
              <Button type="button" variant="outline" onClick={() => setEditingCompany(null)}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={editLoading} className="bg-teal hover:bg-teal-dark text-white">
                {editLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
