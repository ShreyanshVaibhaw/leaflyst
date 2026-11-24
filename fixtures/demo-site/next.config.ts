import type { NextConfig } from "next";

const config: NextConfig = {
  async redirects() {
    // A two-hop chain on purpose: /legacy -> /legacy-2 -> /about.
    return [
      { source: "/legacy", destination: "/legacy-2", permanent: false },
      { source: "/legacy-2", destination: "/about", permanent: false },
    ];
  },
};

export default config;
