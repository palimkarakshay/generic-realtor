import { siteConfig } from "@/lib/site-config";

export const neighborhoods = siteConfig.neighborhoods;

export function getNeighborhoodBySlug(slug: string) {
  return neighborhoods.find((n) => n.slug === slug);
}
