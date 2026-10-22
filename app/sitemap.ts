import { MetadataRoute } from "next";
import { siteConfig } from "../config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-10-23T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/issues/02`,
      lastModified: new Date("2026-10-23T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/issues/01`,
      lastModified: new Date("2026-10-19T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/issues`,
      lastModified: new Date("2026-10-23T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
