import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-[120px] pb-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12 border-b border-border-brand pb-8">
          <h1 className="font-sans font-extrabold text-[36px] text-ink mb-4">Privacy Policy</h1>
          <p className="text-muted text-[15px]">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="prose prose-slate max-w-none font-sans text-[15px] leading-relaxed text-body space-y-6">
          <p>
            At Biznecto, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal and corporate information when you use our B2B platform.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you register, we collect personal and corporate data including your name, email address, company details, phone numbers (+971 extensions, etc.), and browsing activity on the platform relating to requirements and directories.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">2. How We Use Your Data</h2>
          <p>
            We use your data to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Match your business profile with relevant buyer requirements.</li>
            <li>Send notifications regarding new leads or trade shows.</li>
            <li>Maintain platform security and prevent fraudulent listings.</li>
            <li>Improve our routing algorithm and user dashboard experience.</li>
          </ul>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">3. Data Sharing</h2>
          <p>
            As a B2B matching platform, your corporate profile is intentionally shared with prospective buyers and suppliers whenever you engage with a listing or requirement. We do not sell your personal data to third-party ad networks.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement industry-standard encryption and security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
          </p>
        </div>
      </div>
    </main>
  );
}
