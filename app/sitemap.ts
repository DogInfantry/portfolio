import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { research } from "@/data/research";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/research`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...research.map((doc) => ({
      url: `${site.url}/research/${doc.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: doc.publication ? 0.9 : 0.7,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
