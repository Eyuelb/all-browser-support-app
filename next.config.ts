import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/pass",
        destination: "/app/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
