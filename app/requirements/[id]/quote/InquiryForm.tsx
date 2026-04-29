"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitInquiry } from "@/app/requirements/actions";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface InquiryFormProps {
  requirementId: string;
  defaultData?: {
    name?: string;
    email?: string;
    companyName?: string;
  };
}

export function InquiryForm({ requirementId, defaultData }: InquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await submitInquiry(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/requirements");
      }, 3000);
    } else {
      setError(result.error || "Failed to submit inquiry.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="bg-teal/10 border border-teal/20 rounded-2xl p-12 text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center text-white shadow-lg shadow-teal/20">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="font-serif font-bold text-2xl text-ink">Inquiry Sent!</h2>
        <p className="text-muted text-sm max-w-sm">
          Your inquiry has been successfully sent to the buyer. You will be redirected back to the requirements board shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-white border border-border-brand rounded-2xl p-8 shadow-sm">
      <input type="hidden" name="requirementId" value={requirementId} />
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase tracking-wider">Your Message</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Please type your detailed introductory message here. Mention pricing, minimum order quantity, delivery timelines etc."
            className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-1 focus:ring-teal focus:outline-none transition-all placeholder:italic"
          />
          <p className="text-[11px] text-teal font-medium flex items-center gap-1.5 mt-1">
            <Info size={12} /> Detailed messages result in prompter responses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted uppercase tracking-wider">Company Name</label>
            <input
              name="companyName"
              defaultValue={defaultData?.companyName}
              placeholder="Your Business Name"
              className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-1 focus:ring-teal focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted uppercase tracking-wider">Your Name</label>
            <input
              name="contactName"
              required
              defaultValue={defaultData?.name}
              placeholder="Full Name"
              className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-1 focus:ring-teal focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted uppercase tracking-wider">Your Email</label>
            <input
              name="contactEmail"
              type="email"
              required
              defaultValue={defaultData?.email}
              placeholder="email@example.com"
              className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-1 focus:ring-teal focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted uppercase tracking-wider">Phone Number</label>
            <input
              name="contactPhone"
              placeholder="+Country Area Number"
              className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-1 focus:ring-teal focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase tracking-wider">Country</label>
          <select
            name="country"
            required
            className="w-full border border-border-brand rounded-xl px-4 py-3 text-sm focus:border-teal focus:ring-1 focus:ring-teal focus:outline-none transition-all bg-white"
          >
            <option value="">Select your country</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Oman">Oman</option>
            <option value="Qatar">Qatar</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Bahrain">Bahrain</option>
            <option value="India">India</option>
            <option value="Pakistan">Pakistan</option>
            <option value="China">China</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            {/* Add more as needed */}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-red-600 text-xs flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-teal hover:bg-teal-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-teal/10 text-base"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin mr-2" /> Sending Inquiry...
          </>
        ) : (
          "Inquire Now"
        )}
      </Button>
    </form>
  );
}
