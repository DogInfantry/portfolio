import type { NextConfig } from "next";

/**
 * Two deploy targets, and they want different things.
 *
 * GitHub Pages is a static file host: it needs `output: "export"`, directory
 * style URLs, and the repo name as a base path. It also has no image
 * optimizer, so `unoptimized` is not optional there. Without it the export
 * emits `/_next/image?url=...` for every screenshot and cover, that endpoint
 * does not exist in the exported tree, and every image on the site 404s.
 *
 * Vercel runs the optimizer, so outside Pages the export is switched off and
 * the covers are served as AVIF. They are document page renders and the
 * largest is 758KB as PNG, so this is worth keeping.
 *
 * The flag is the env var the Pages workflow already sets, so nothing else
 * needs to know which target it is building for.
 */
const isGitHubPages = process.env.NEXT_PUBLIC_BASE_PATH === "/portfolio";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      trailingSlash: true,
      basePath: "/portfolio",
      assetPrefix: "/portfolio/",
      images: { unoptimized: true },
    }
  : {
      images: { formats: ["image/avif", "image/webp"] },
    };

export default nextConfig;
