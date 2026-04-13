import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 pb-[80px] md:pb-8 pt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-flex bg-white px-4 py-2 rounded-lg self-start shadow-sm hover:opacity-95 transition-opacity">
              <img src="/logo.png" alt="Biznecto" className="h-[40px] md:h-[48px] w-auto object-contain" />
            </Link>
            <p className="text-[13px] text-white/50 leading-relaxed mb-1 pr-6">
              Connect globally, direct and seamlessly. The platform where B2B buyers and suppliers find exactly what they need.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              <a href="mailto:info@biznecto.com" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-[13px] font-medium">
                <Mail size={16} className="text-teal" /> info@biznecto.com
              </a>
              <a href="https://wa.me/971566565471" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-[13px] font-medium">
                <Phone size={16} className="text-teal" /> +971 56 656 5471
              </a>
              <div className="text-white/70 flex items-center gap-2 text-[13px] font-medium mt-1">
                <MapPin size={16} className="text-teal shrink-0" /> <span className="opacity-80">Dubai, United Arab Emirates</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="flex flex-col gap-4 lg:ml-auto">
            <h4 className="font-sans font-bold text-[14px] text-white uppercase tracking-wider mb-2">Platform</h4>
            <Link href="/requirements" className="text-[13px] text-white/50 hover:text-white transition-colors">Active Requirements</Link>
            <Link href="/directory" className="text-[13px] text-white/50 hover:text-white transition-colors">Supplier Directory</Link>
            <Link href="/pricing" className="text-[13px] text-white/50 hover:text-white transition-colors">List Your Business</Link>
            <Link href="/dashboard" className="text-[13px] text-white/50 hover:text-white transition-colors">Supplier Portal</Link>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col gap-4 lg:ml-auto">
            <h4 className="font-sans font-bold text-[14px] text-white uppercase tracking-wider mb-2">Resources</h4>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white transition-colors">Buyer Guide</Link>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white transition-colors">Supplier Tips</Link>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white transition-colors">Help Center</Link>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col gap-4 lg:ml-auto">
            <h4 className="font-sans font-bold text-[14px] text-white uppercase tracking-wider mb-2">Legal</h4>
            <Link href="/legal/terms" className="text-[13px] text-white/50 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/legal/privacy" className="text-[13px] text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/legal/cookies" className="text-[13px] text-white/50 hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/legal/refund" className="text-[13px] text-white/50 hover:text-white transition-colors">Refund Policy</Link>
          </div>

        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[12px] text-white/30">
            &copy; {new Date().getFullYear()} Biznecto Inc. All rights reserved.
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-teal hover:text-white transition-colors cursor-pointer">in</div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-teal hover:text-white transition-colors cursor-pointer">X</div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-teal hover:text-white transition-colors cursor-pointer">ig</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
