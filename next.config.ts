import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_PUBLIC_BASE_PATH === "/portfolio";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(isGitHubPages ? { basePath: "/portfolio", assetPrefix: "/portfolio/" } : {}),
};

export default nextConfig;
