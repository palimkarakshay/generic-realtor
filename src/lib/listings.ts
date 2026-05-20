import listingsJson from "@/content/listings/index.json";
import { listingSchema, type Listing, type SaleListing, type RentListing } from "@/lib/schemas";

/**
 * Parse + validate listings at import time. Crashes the build if invalid,
 * which is what we want — invalid listing data shouldn't ship.
 */
export const allListings: Listing[] = (listingsJson as unknown[])
  .map((raw) => listingSchema.parse(raw))
  .sort((a, b) => (b.listedAt ?? b.createdAt).localeCompare(a.listedAt ?? a.createdAt));

export const saleListings: SaleListing[] = allListings.filter(
  (l): l is SaleListing => l.listingType === "sale",
);

export const rentListings: RentListing[] = allListings.filter(
  (l): l is RentListing => l.listingType === "rent",
);

export const activeSaleListings = saleListings.filter((l) => l.status === "active");
export const activeRentListings = rentListings.filter((l) => l.status === "active");
export const soldListings = saleListings.filter((l) => l.status === "sold");
export const leasedListings = rentListings.filter((l) => l.status === "leased");

export function getListingBySlug(slug: string): Listing | undefined {
  return allListings.find((l) => l.slug === slug);
}

export function getRelatedListings(slug: string, limit = 3): Listing[] {
  const current = getListingBySlug(slug);
  if (!current) return [];
  return allListings
    .filter((l) => l.slug !== slug && l.listingType === current.listingType && l.status === "active")
    .slice(0, limit);
}
