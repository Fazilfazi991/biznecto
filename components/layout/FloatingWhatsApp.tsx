import React from "react";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/971566565471"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[400] flex items-center gap-3 bg-[#25D366] hover:bg-[#20BE5C] text-white px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={24} fill="currentColor" />
      <span className="hidden md:inline-block font-sans font-semibold text-[14px]">
        Get Instant Buyer Leads
      </span>
    </a>
  );
}
