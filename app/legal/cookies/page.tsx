import React from "react";

export default function CookiePolicy() {
  return (
    <main className="min-h-screen pt-[120px] pb-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12 border-b border-border-brand pb-8">
          <h1 className="font-sans font-extrabold text-[36px] text-ink mb-4">Cookie Policy</h1>
          <p className="text-muted text-[15px]">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="prose prose-slate max-w-none font-sans text-[15px] leading-relaxed text-body space-y-6">
          <p>
            This Cookie Policy explains how Biznecto uses tracking technologies to improve your B2B networking experience across our platform.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit our website. They allow the platform to remember your actions and preferences over time, preventing you from having to continually re-enter them (e.g., logging in to view leads).
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">How We Use Cookies</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Authentication:</strong> Keeping you logged into your Supplier or Buyer Dashboard.</li>
            <li><strong>Preferences:</strong> Remembering your filters (e.g., specific regions like Dubai or specific sectors like Agriculture) so your directory search stays relevant.</li>
            <li><strong>Analytics:</strong> Aggregating usage statistics to help us optimize the platform's speed and layout.</li>
          </ul>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">Managing Your Cookies</h2>
          <p>
            You can control or delete cookies as you wish using your browser settings. However, disabling essential cookies may prevent you from logging into your dashboard or securely unlocking buyer leads.
          </p>
        </div>
      </div>
    </main>
  );
}
