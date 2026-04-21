"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addBusinessListing } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";

export default function NewListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const result = await addBusinessListing(formData);
    
    setLoading(false);
    if (result.success) {
      router.push("/directory");
    } else {
      setError(result.error || "Failed to add listing.");
    }
  };

  return (
    <div className="max-w-2xl bg-white border border-border-brand rounded-brand-m p-6 shadow-sm">
      <h1 className="font-serif font-bold text-2xl text-ink mb-1">Add Business Listing</h1>
      <p className="text-sm text-muted mb-6">Create a new verified company listing for the directory.</p>

      {error && <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Company Name</label>
          <input
            name="name" type="text" required
            placeholder="e.g. Global Steel Traders LLC"
            className="border border-border-brand rounded-lg px-4 py-2 text-[14px] focus:border-teal focus:outline-none"
          />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Description</label>
          <textarea
            name="description" rows={3}
            placeholder="Brief company overview..."
            className="border border-border-brand rounded-lg px-4 py-2 text-[14px] focus:border-teal focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Location</label>
          <input
            name="location" type="text" required
            placeholder="e.g. Dubai, UAE"
            className="border border-border-brand rounded-lg px-4 py-2 text-[14px] focus:border-teal focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Tags (Comma separated)</label>
          <input
            name="tags" type="text"
            placeholder="e.g. Premium, Verified, Top Supplier"
            className="border border-border-brand rounded-lg px-4 py-2 text-[14px] focus:border-teal focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Products (Comma separated)</label>
          <input
            name="products" type="text" required
            placeholder="e.g. Steel Pipes, Construction Beams"
            className="border border-border-brand rounded-lg px-4 py-2 text-[14px] focus:border-teal focus:outline-none"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={loading} className="bg-teal hover:bg-teal-dark text-white px-6">
            {loading ? "Adding..." : "Add Listing"}
          </Button>
        </div>
      </form>
    </div>
  );
}
