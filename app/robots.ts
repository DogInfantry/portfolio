import type { MetadataRoute } from "next";
import { site } from "@/data/site";
// Required by output: "export". Both of these are generated from the data
// files at build time and have nothing request-scoped in them, so pinning them
// static is a statement of fact rather than a workaround.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
