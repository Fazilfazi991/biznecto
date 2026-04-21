"use client";

import React, { useState } from "react";
import { Lock, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

export default function RequirementsPage() {
  const [isPostModalOpen, setPostModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-sand pb-12 mt-[58px]">
      {/* Header */}
      <div className="bg-ink p-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl text-white mb-1">Requirements Board</h1>
            <p className="text-xs text-white/50">Buyers post what they need. Suppliers respond directly.</p>
          </div>
          <Button variant="primary" onClick={() => setPostModalOpen(true)}>
            + Post Requirement
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <div className="bg-white border border-border-brand rounded-brand-m p-12 w-full max-w-lg">
          <ClipboardList size={40} className="text-muted mx-auto mb-3" />
          <h3 className="font-serif font-semibold text-ink mb-2">No requirements posted yet</h3>
          <p className="text-sm text-muted mb-6">Buyer requirements will appear here once submitted. Be the first to post one!</p>
          <Button variant="primary" onClick={() => setPostModalOpen(true)}>
            + Post a Requirement
          </Button>
        </div>
      </div>

      <Modal isOpen={isPostModalOpen} onClose={() => setPostModalOpen(false)} title="Post a Requirement">
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setPostModalOpen(false); }}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-muted uppercase tracking-wide">Product / Service Needed</label>
            <input type="text" className="border-1.5 border-border-brand rounded-lg px-3 py-2 text-sm focus:border-teal outline-none" required placeholder="e.g. 500kg Organic Honey" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold text-muted uppercase tracking-wide">Quantity</label>
              <input type="text" className="border-1.5 border-border-brand rounded-lg px-3 py-2 text-sm focus:border-teal outline-none" required placeholder="e.g. 500 units" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold text-muted uppercase tracking-wide">Estimated Budget</label>
              <input type="text" className="border-1.5 border-border-brand rounded-lg px-3 py-2 text-sm focus:border-teal outline-none" placeholder="e.g. AED 10,000" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-muted uppercase tracking-wide">Description & Specifications</label>
            <textarea className="border-1.5 border-border-brand rounded-lg px-3 py-2 text-sm focus:border-teal outline-none min-h-[100px]" required placeholder="Provide details, variants, certs needed..." />
          </div>

          <Button type="submit" size="full" className="mt-2">Post Requirement</Button>
        </form>
      </Modal>
    </main>
  );
}


