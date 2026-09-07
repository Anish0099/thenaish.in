import type { NextConfig } from "next";

/**
 * `output: "standalone"` produces a self-contained server bundle for
 * Docker (see Dockerfile) but breaks Vercel — Vercel needs the default
 * output with .nft.json trace files. Only turn it on when the Dockerfile
 * sets BUILD_STANDALONE=true.
 */
const nextConfig: NextConfig = {
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
