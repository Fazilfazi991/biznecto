"use client";

import React, { useState } from "react";
import { Lock, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { MOCK_REQUIREMENTS } from "@/lib/mockData";

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

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-3">
          {MOCK_REQUIREMENTS.map((req) => (
            <div 
              key={req.id}
              className="bg-white border-1.5 border-border-brand rounded-brand-m p-5 transition-all hover:border-teal hover:shadow-brand relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-serif font-semibold text-[15px] text-ink leading-tight">
                  {req.title}
                </h3>
                <Badge variant={req.status === "Urgent" || req.status === "Hot" ? "hot" : "active"}>
                  {req.status}
                </Badge>
              </div>

              <div className="text-xs text-muted mb-4 opacity-80">{req.buyerDetails}</div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                <DetailItem label="Quantity" value={req.quantity} />
                <DetailItem label="Timeline" value={req.deadline} />
                <DetailItem label="Budget" value={req.budget} />
                <DetailItem label="Status" value="Open to quotes" />
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {req.tags.map(t => (
                  <Badge key={t} variant="gray">{t}</Badge>
                ))}
              </div>

              {/* Locked Contact Block */}
              <div className="bg-gradient-to-br from-ink to-ink-2 rounded-lg p-4 mb-4 relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "linear-gradient(var(--color-teal) 1px, transparent 1px), linear-gradient(90deg, var(--color-teal) 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                  }}
                  aria-hidden="true"
                />
                
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="blur-[4px] select-none flex-1">
                    <div className="text-sm font-semibold text-white mb-1">Contact: John Doe</div>
                    <div className="text-xs text-white/50">Email: j***@company.com</div>
                    <div className="text-xs text-white/50">Phone: +44 20 7*** ****</div>
                  </div>
                  <div className="shrink-0 text-center">
                    <Button size="sm" className="bg-purple hover:bg-purple/90 text-white gap-1.5">
                      <Lock size={12} /> Unlock Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-brand">
                <div className="text-[10px] text-hint">
                  {req.postedAgo} · {req.responses} responded
                </div>
                <div className="flex gap-2">
                  <Button variant="sand" size="sm">Save</Button>
                  <Button variant="primary" size="sm">Supply Quote</Button>
                </div>
              </div>
            </div>
          ))}
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

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-sand rounded-lg px-3 py-2">
      <div className="text-[10px] font-semibold text-hint uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-[13px] font-semibold text-ink">
        {value}
      </div>
    </div>
  )
}
