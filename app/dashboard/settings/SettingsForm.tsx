"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, Building2, Globe, FileText, ImageIcon, FileDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { updateSettings } from "./actions";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
  company: any;
}

export function SettingsForm({ company }: SettingsFormProps) {
  const [logoUrl, setLogoUrl] = useState(company?.logoUrl || "");
  const [catalogueUrl, setCatalogueUrl] = useState(company?.catalogueUrl || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    formData.set("logoUrl", logoUrl);
    formData.set("catalogueUrl", catalogueUrl);

    try {
      await updateSettings(formData);
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <h3 className="font-serif font-bold text-lg mb-6 flex items-center gap-2 text-ink">
            <Building2 size={20} className="text-teal" /> Company Identity
          </h3>
          <div className="grid gap-6">
            <div className="grid gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-widest">Company Name</label>
              <input 
                name="companyName"
                type="text" 
                defaultValue={company?.name || ""}
                className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-4 focus:ring-teal/5 outline-none transition-all" 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div className="grid gap-1.5">
                <label className="text-[11px] font-bold text-muted uppercase tracking-widest">Company Logo</label>
                <FileUpload 
                  onUploadComplete={(url) => setLogoUrl(url)}
                  folder="logos"
                  label="Upload Company Logo"
                />
                <div className="mt-2">
                  <label className="text-[10px] font-bold text-muted uppercase block mb-1">Or Paste Logo URL</label>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full border border-border-brand rounded-lg px-3 py-2 text-[12px] focus:border-teal outline-none"
                  />
                </div>
                {logoUrl && logoUrl.startsWith('http') && (
                  <div className="mt-2 flex items-center gap-3 p-2 border border-teal/10 rounded-lg bg-teal/5">
                    <img src={logoUrl} alt="Logo Preview" className="w-10 h-10 object-contain rounded bg-white p-1" />
                    <span className="text-[10px] text-teal font-medium truncate">Preview visible</span>
                  </div>
                )}
              </div>

              <div className="grid gap-1.5">
                <label className="text-[11px] font-bold text-muted uppercase tracking-widest">Business Catalogue (PDF)</label>
                <FileUpload 
                  onUploadComplete={(url) => setCatalogueUrl(url)}
                  folder="catalogues"
                  label="Upload PDF Catalogue"
                  accept=".pdf"
                />
                <div className="mt-2">
                  <label className="text-[10px] font-bold text-muted uppercase block mb-1">Or Paste Catalogue URL</label>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={catalogueUrl}
                    onChange={(e) => setCatalogueUrl(e.target.value)}
                    className="w-full border border-border-brand rounded-lg px-3 py-2 text-[12px] focus:border-teal outline-none"
                  />
                </div>
                {catalogueUrl && catalogueUrl.startsWith('http') && (
                  <div className="mt-2 flex items-center gap-3 p-2 border border-blue-100 rounded-lg bg-blue-50">
                    <FileDown size={16} className="text-blue" />
                    <span className="text-[10px] text-blue font-medium truncate">Link attached</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-widest">Location</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" size={16} />
                <input 
                  name="location"
                  type="text" 
                  defaultValue={company?.location || ""}
                  className="w-full border border-border-brand rounded-xl pl-10 pr-4 py-3 text-sm focus:border-teal focus:ring-4 focus:ring-teal/5 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-widest">Company Description</label>
              <textarea 
                name="description"
                rows={4} 
                defaultValue={company?.description || ""}
                className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-4 focus:ring-teal/5 outline-none transition-all resize-none" 
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-serif font-bold text-lg mb-4">Security</h3>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className="text-xs font-bold text-muted uppercase">New Password</label>
              <input type="password" placeholder="Leave blank to keep current" disabled className="border border-border-brand rounded-lg px-4 py-2 text-sm focus:border-teal outline-none opacity-50 cursor-not-allowed" />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-teal hover:bg-teal-dark text-white px-10 py-4 rounded-xl flex items-center gap-2 shadow-lg shadow-teal/20 transition-all font-bold"
          >
            {loading ? "Saving..." : success ? "Changes Saved!" : "Save All Changes"}
            {!loading && !success && <Save size={18} />}
          </Button>
        </div>
        {error && <p className="text-xs text-coral font-medium text-right">{error}</p>}
      </div>

      <div className="space-y-6">
        <Card className="p-6 bg-sand border-none">
          <h3 className="font-serif font-bold text-[15px] mb-2">Need Help?</h3>
          <p className="text-xs text-muted leading-relaxed mb-4">
            If you need assistance with your account or want to verify your business, contact our support team.
          </p>
          <Button variant="outline" size="sm" className="w-full bg-white shadow-sm hover:shadow-md transition-shadow">Contact Support</Button>
        </Card>

        <Card className="p-6 border-teal/20 bg-teal/5">
           <h3 className="font-serif font-bold text-[15px] mb-2">Profile Status</h3>
           <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                 <span className="text-muted">Verification</span>
                 <span className="text-teal font-bold uppercase tracking-wider">Verified</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                 <span className="text-muted">Listing Type</span>
                 <span className="text-ink font-bold uppercase tracking-wider">Standard</span>
              </div>
           </div>
        </Card>
      </div>
    </form>
  );
}
