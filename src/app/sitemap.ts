import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { allListings } from "@/lib/listings";
import { getAllInsights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.site.url;
  const now = new Date().toISOString();

  const staticPaths: MetadataRoute.Sitemap = [
    "",
    "/buy",
    "/rent",
    "/sell",
    "/lease-out",
    "/listings",
    "/open-houses",
    "/neighborhoods",
    "/insights",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/unsubscribe",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1.0 : 0.7,
  }));

  const insightPaths: MetadataRoute.Sitemap = getAllInsights().map((p) => ({
    url: `${base}/insights/${p.slug}`,
    lastModified: p.frontmatter.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const listingPaths: MetadataRoute.Sitemap = allListings.map((l) => ({
    url: `${base}/listings/${l.slug}`,
    lastModified: l.updatedAt ?? l.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const neighborhoodPaths: MetadataRoute.Sitemap = siteConfig.neighborhoods.map((n) => ({
    url: `${base}/neighborhoods/${n.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPaths, ...listingPaths, ...neighborhoodPaths, ...insightPaths];
}
