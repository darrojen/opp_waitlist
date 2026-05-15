import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        // Google profile photos from OAuth
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        // Google profile photos from OAuth
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        // GitHub avatars
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
