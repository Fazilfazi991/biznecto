import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for self-hosted deployments (Hostinger, VPS, etc.)
  output: "standalone",

  // Allow images from external sources
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },

  // Silence Prisma warnings in production
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
};

export default nextConfig;
