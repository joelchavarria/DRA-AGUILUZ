import type { NextConfig } from "next";

const config: NextConfig = {
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90] },
  async redirects() {
    return [
      { source: "/experiencias", destination: "/dra-aguiluz", permanent: true },
      { source: "/galeria", destination: "/dra-aguiluz", permanent: true },
    ];
  },
};
export default config;
