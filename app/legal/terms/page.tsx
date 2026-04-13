import React from "react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-[120px] pb-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12 border-b border-border-brand pb-8">
          <h1 className="font-sans font-extrabold text-[36px] text-ink mb-4">Terms of Service</h1>
          <p className="text-muted text-[15px]">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="prose prose-slate max-w-none font-sans text-[15px] leading-relaxed text-body space-y-6">
          <p>
            Welcome to Biznecto. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing the Biznecto website, directory, and requirements board, you acknowledge that you have read, understood, and agree to be legally bound by these terms.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">2. User Accounts</h2>
          <p>
            Suppliers and buyers must register for an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">3. Platform Usage</h2>
          <p>
            Biznecto acts as an intermediary B2B platform connecting buyers and suppliers. We do not guarantee the quality, safety, or legality of any products or services listed, nor the ability of buyers to pay for products.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">4. Lead Quality & Delivery</h2>
          <p>
            While we strive to verify all buyer requirements, lead quality and conversion are dependent on multiple factors including supplier responsiveness and market fit. Subscriptions do not guarantee closed deals.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">5. Modifications to Service</h2>
          <p>
            We reserve the right to modify or discontinue, temporarily or permanently, the platform or any subscription tiers with or without notice.
          </p>
        </div>
      </div>
    </main>
  );
}
