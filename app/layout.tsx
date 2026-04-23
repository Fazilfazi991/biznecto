import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/layout/AuthProvider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Biznecto | Connect with Global Buyers, Suppliers & Business Opportunities",
  description: "Connect with verified global buyers and suppliers on Biznecto — the fastest-growing B2B trade platform for UAE, GCC, and international markets.",
  openGraph: {
    title: "Biznecto | Connect with Global Buyers, Suppliers & Business Opportunities",
    description: "Post buyer requirements, find verified suppliers, and grow your global trade network.",
    url: "https://biznecto.com",
    siteName: "Biznecto",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon.ico?v=2", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.ico?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${fraunces.variable} font-sans antialiased bg-white text-body min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
