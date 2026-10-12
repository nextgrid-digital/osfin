import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/products/settlement-mesh", destination: "/products/match-iq", permanent: true },
      { source: "/products/exception-resolution", destination: "/products/exception-desk", permanent: true },
      { source: "/products/control-views", destination: "/products/regulatory-reporting", permanent: true },
    ];
  },
};

export default nextConfig;
