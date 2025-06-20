import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "leadsoft-challenge-production-e34a.up.railway.app",
        pathname: "/api/candidates/**",
      },
    ],
  },
};

export default nextConfig;
