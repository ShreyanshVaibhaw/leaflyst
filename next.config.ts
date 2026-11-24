import type { NextConfig } from "next";

const config: NextConfig = {
  // These run only on the server and must not be bundled.
  serverExternalPackages: ["playwright", "pg-boss", "postgres"],
};

export default config;
