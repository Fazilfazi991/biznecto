"use client";

import React, { useState } from "react";
import { createSupplierAccount } from "@/app/admin/actions";
import { CheckCircle, Copy, Eye, EyeOff } from "lucide-react";

function generatePassword(companyName: string) {
  const clean = companyName.replace(/\s+/g, "").substring(0, 6) || "Bizn";
  return `${clean}@2026`;
}

export default function NewListingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ companyName: string; email: string; password: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    description: "",
    location: "",
    tags: "",
    supplierName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    // Auto-generate password when company name changes
    if (e.target.name === "companyName") {
      updated.password = generatePassword(e.target.value);
    }
    setForm(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await createSupplierAccount(formData);

    setLoading(false);
    if (result.success) {
      setSuccess({ companyName: result.companyName!, email: result.email!, password: result.password! });
      setForm({ companyName: "", description: "", location: "", tags: "", supplierName: "", email: "", password: "" });
    } else {
      setError(result.error || "Failed to create account.");
    }
  };

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  if (success) {
    return (
      <div className="max-w-2xl">
        <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-ink">Supplier Account Created!</h2>
              <p className="text-sm text-muted">Share the following login credentials with the supplier.</p>
            </div>
          </div>

          <div className="bg-sand rounded-xl p-4 flex flex-col gap-3 mb-5 border border-border-brand">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-muted uppercase tracking-wide">Company</span>
              <span className="text-sm font-semibold text-ink">{success.companyName}</span>
            </div>
            <div className="border-t border-border-brand" />
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-muted uppercase tracking-wide">Login URL</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-teal">biznecto.com/login</span>
                <button onClick={() => copyToClipboard("https://biznecto.com/login")} className="text-muted hover:text-ink">
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className="border-t border-border-brand" />
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-muted uppercase tracking-wide">Email</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-ink">{success.email}</span>
                <button onClick={() => copyToClipboard(success.email)} className="text-muted hover:text-ink">
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className="border-t border-border-brand" />
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-muted uppercase tracking-wide">Password</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-ink font-mono">{success.password}</span>
                <button onClick={() => copyToClipboard(success.password)} className="text-muted hover:text-ink">
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSuccess(null)}
            className="w-full bg-teal hover:bg-teal-dark text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
          >
            Add Another Supplier
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif font-bold text-2xl text-ink mb-1">Add Supplier Listing</h1>
      <p className="text-sm text-muted mb-6">Create a supplier account. Share the login credentials with the business so they can log in and complete their profile.</p>

      {error && <div className="mb-4 bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-lg border border-red-200">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white border border-border-brand rounded-2xl p-6 shadow-sm flex flex-col gap-5">

        <div className="pb-3 border-b border-border-brand">
          <p className="text-[11px] font-bold text-purple uppercase tracking-widest">Company Information</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Company Name *</label>
          <input
            name="companyName" type="text" required
            value={form.companyName} onChange={handleChange}
            placeholder="e.g. Global Steel Traders LLC"
            className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Description</label>
          <textarea
            name="description" rows={3}
            value={form.description} onChange={handleChange}
            placeholder="Brief company overview..."
            className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Location *</label>
            <input
              name="location" type="text" required
              value={form.location} onChange={handleChange}
              placeholder="e.g. Dubai, UAE"
              className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Tags (comma separated)</label>
            <input
              name="tags" type="text"
              value={form.tags} onChange={handleChange}
              placeholder="e.g. Premium, ISO Certified"
              className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
            />
          </div>
        </div>

        <div className="pb-3 border-b border-border-brand pt-2">
          <p className="text-[11px] font-bold text-purple uppercase tracking-widest">Supplier Login Credentials</p>
          <p className="text-xs text-muted mt-1">These details will be shared with the supplier to access their dashboard.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Contact Name *</label>
          <input
            name="supplierName" type="text" required
            value={form.supplierName} onChange={handleChange}
            placeholder="e.g. Ahmed Al Rashid"
            className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Email Address *</label>
          <input
            name="email" type="email" required
            value={form.email} onChange={handleChange}
            placeholder="supplier@company.com"
            className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Password *</label>
          <div className="relative">
            <input
              name="password" type={showPassword ? "text" : "password"} required
              value={form.password} onChange={handleChange}
              placeholder="Auto-generated — you can edit"
              className="w-full border border-border-brand rounded-lg px-4 py-2.5 pr-10 text-[14px] font-mono focus:border-teal focus:outline-none"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-[11px] text-muted">Password is auto-generated from the company name. You can edit it.</p>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-teal hover:bg-teal-dark text-white font-semibold text-[14px] py-3 rounded-lg transition-colors disabled:opacity-60 mt-2"
        >
          {loading ? "Creating Account..." : "Create Supplier Account"}
        </button>
      </form>
    </div>
  );
}
