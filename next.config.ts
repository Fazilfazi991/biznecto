import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from external sources
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },

  // Silence Prisma/bcrypt warnings during Vercel builds
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
};

export default nextConfig;
