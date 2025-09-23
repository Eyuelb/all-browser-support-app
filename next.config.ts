import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
   compiler: {
    removeConsole: false,
  },
  async redirects() {
   return [
    {
      source: "/v2",
      destination: "/app/index.html",
      permanent: false,
    },
    {
      source: "/v2/about",
      destination: "/app/about.html",
      permanent: false,
    },
    {
      source: "/v2/contact",
      destination: "/app/contact.html",
      permanent: false,
    },
  ];
  },
};

export default nextConfig;
