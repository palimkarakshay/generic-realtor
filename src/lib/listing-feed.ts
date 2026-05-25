import { allListings, activeRentListings, activeSaleListings, soldListings } from "@/lib/listings";
import { applyFilters, type ListingFilters, type ListingMode } from "@/lib/listing-filters";
import type { Listing } from "@/lib/schemas";

/**
 * Listing feed abstraction. Two implementations are anticipated:
 *
 *  - staticFeed():  uses the JSON-backed listings shipped in /content/listings.
 *                   This is what the site uses today.
 *  - idxFeed():     would query an IDX provider (Repliers, RealtyNinja,
 *                   iHomefinder) via their REST API. Stubbed below — wiring
 *                   is intentionally deferred until after Phase 3 is shipped.
 *
 * Callers depend on the ListingFeed interface, NOT the implementation, so
 * swapping in IDX later is a one-line change in this file.
 */

export interface ListingFeed {
  /** Listings matching the filter set. */
  search(filters: ListingFilters): Promise<Listing[]>;
  /** All listings for the given mode, no other filters. Useful for the map default. */
  forMode(mode: ListingMode): Promise<Listing[]>;
  /** Single listing by slug. */
  bySlug(slug: string): Promise<Listing | undefined>;
}

class StaticFeed implements ListingFeed {
  async search(filters: ListingFilters): Promise<Listing[]> {
    return applyFilters(allListings, filters);
  }

  async forMode(mode: ListingMode): Promise<Listing[]> {
    switch (mode) {
      case "rent":
        return activeRentListings;
      case "sale":
        return activeSaleListings;
      case "sold":
        return soldListings;
    }
  }

  async bySlug(slug: string): Promise<Listing | undefined> {
    return allListings.find((l) => l.slug === slug);
  }
}

const STATIC_FEED = new StaticFeed();

/** Default feed used by all UI today. Swap this binding to wire IDX. */
export function listingFeed(): ListingFeed {
  return STATIC_FEED;
}
