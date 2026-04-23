"use client";

import React, { useState } from "react";
import { Plus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { postRequirement, updateRequirement } from "./actions";
import { useRouter } from "next/navigation";

export function RequirementForm({ requirement }: { requirement?: any }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isEditing = !!requirement;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = isEditing 
      ? await updateRequirement(requirement.id, formData)
      : await postRequirement(formData);

    if (result.success) {
      setSuccess(true);
      if (!isEditing) (e.target as HTMLFormElement).reset();
      router.refresh();
      setTimeout(() => {
        setSuccess(false);
        setModalOpen(false);
      }, 2500);
    } else {
      setError(result.error || "Failed to save requirement");
    }
    setLoading(false);
  };

  return (
    <>
      <Button variant={isEditing ? "outline" : "primary"} size={isEditing ? "sm" : "md"} onClick={() => setModalOpen(true)} className={isEditing ? "text-[10px] font-bold h-8 border-border-brand hover:bg-sand" : ""}>
        {isEditing ? "Edit" : "+ Post Requirement"}
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={isEditing ? "Edit Requirement" : "Post a New Requirement"}>
        {success ? (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-teal" />
            </div>
            <h3 className="font-serif font-bold text-xl text-ink mb-2">{isEditing ? "Updated Successfully!" : "Submitted Successfully!"}</h3>
            <p className="text-sm text-muted max-w-[280px]">
              {isEditing 
                ? "Your changes have been saved and sent for re-moderation." 
                : "Your requirement is now in the moderation queue and will be live once approved."}
            </p>
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Product / Service Needed *</label>
              <input 
                name="title"
                required 
                defaultValue={requirement?.title}
                placeholder="e.g. 500kg Organic Honey"
                className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-4 focus:ring-teal/5 outline-none transition-all" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Quantity *</label>
                <input 
                  name="quantity"
                  required 
                  defaultValue={requirement?.quantity}
                  placeholder="e.g. 500 units"
                  className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-4 focus:ring-teal/5 outline-none transition-all" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Estimated Budget</label>
                <input 
                  name="budget"
                  defaultValue={requirement?.budget}
                  placeholder="e.g. AED 10,000"
                  className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-4 focus:ring-teal/5 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Description & Specifications *</label>
              <textarea 
                name="description"
                required 
                rows={4}
                defaultValue={requirement?.description}
                placeholder="Provide details, variants, certs needed..."
                className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-4 focus:ring-teal/5 outline-none transition-all resize-none" 
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-medium">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="mt-2 bg-teal hover:bg-teal-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-teal/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> {isEditing ? "Saving..." : "Publishing..."}
                </>
              ) : (
                isEditing ? "Save Changes" : "Post Requirement"
              )}
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
}
