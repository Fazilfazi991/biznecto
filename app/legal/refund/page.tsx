import React from "react";

export default function RefundPolicy() {
  return (
    <main className="min-h-screen pt-[120px] pb-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12 border-b border-border-brand pb-8">
          <h1 className="font-sans font-extrabold text-[36px] text-ink mb-4">Refund Policy</h1>
          <p className="text-muted text-[15px]">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="prose prose-slate max-w-none font-sans text-[15px] leading-relaxed text-body space-y-6">
          <p>
            At Biznecto, we aim to provide exceptional value to our suppliers through verified buyer leads and prominent directory placements. This policy outlines our stance on refunds for subscriptions and lead unlocking services.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">1. Subscription Plans</h2>
          <p>
            Subscription fees (such as Pro or Enterprise tiers) are billed in advance on a monthly or annual basis. <strong>We do not offer prorated refunds</strong> for canceled subscriptions. If you cancel your plan, you will retain access to your premium features until the end of your current billing cycle.
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">2. Invalid Buyer Leads</h2>
          <p>
            While every effort is made to verify the authenticity of buyers on the requirements board, if you unlock a lead that is proven to be completely fraudulent or contains entirely disconnected contact information, you may submit a review request within 72 hours of unlocking the lead.
          </p>
          <p>
            If our moderation team validates your claim, we will credit your account with equivalent lead unlock tokens. <strong>Cash refunds are not provided for unlocked leads under any circumstances.</strong>
          </p>

          <h2 className="font-bold text-ink text-[20px] mt-8 mb-4">3. Requesting Assistance</h2>
          <p>
            If you experience an issue with billing or have questions regarding your charges, please contact our support team immediately at <strong>info@biznecto.com</strong> or via WhatsApp at <strong>+971 56 656 5471</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}
