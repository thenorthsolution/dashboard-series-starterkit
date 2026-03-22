import type { NextConfig } from "next";

/**
 * Next.js 15 configuration for the Discord Dashboard web app.
 *
 * Key decisions:
 * - `transpilePackages` ensures our local workspace packages (database, types)
 *   are compiled by Next.js rather than expected to be pre-built. This gives us
 *   hot-reload across packages during development.
 * - Images are configured to allow Discord's CDN so guild icons and user avatars
 *   render without the Next.js image domain error.
 */
const nextConfig: NextConfig = {
  transpilePackages: ["@repo/database", "@repo/types", "@repo/adapter"],

  images: {
    remotePatterns: [
      {
        // Discord CDN — guild icons, user avatars, emoji
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    // Required for Next.js 15 + NextAuth v5 Server Actions
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;
