import type { Listing, RentListing, SaleListing } from "@/lib/schemas";

/**
 * Pure filter helpers for the homepage hero search panel and the
 * /listings half-map page. Pure functions only — no React, no I/O —
 * so the same logic works against the static feed today and an IDX
 * query later.
 */

export type ListingMode = "rent" | "sale" | "sold";

export type PropertyTypeFilter = Listing["propertyType"];

export interface ListingFilters {
  mode: ListingMode;
  /** Inclusive min, in dollars. 0 means no lower bound. */
  priceMin?: number;
  /** Inclusive max, in dollars. 0 or undefined means no upper bound. */
  priceMax?: number;
  /**
   * Bedroom counts to include. Each entry matches an exact bed count,
   * EXCEPT the open-ended sentinel OPEN_ENDED_BEDS (4) which matches `>=4`.
   * So [1,2,3] = strictly 1, 2, or 3 beds; [1,2,3,4] = 1, 2, 3, or 4+ beds.
   * Empty array means any.
   */
  beds?: number[];
  /** Property types to include. Empty means any. */
  propertyTypes?: PropertyTypeFilter[];
  /** Restrict to one of the configured neighborhoods (by slug). */
  neighborhoodSlug?: string;
  /** Free-text city filter — case-insensitive match against the listing's city. */
  city?: string;
}

/**
 * Mode → relevant base set helper. Lets callers pass the full collection and
 * let the filter pick out the right slice.
 */
export function listingsForMode(all: Listing[], mode: ListingMode): Listing[] {
  switch (mode) {
    case "rent":
      return all.filter((l): l is RentListing => l.listingType === "rent" && l.status === "active");
    case "sale":
      return all.filter((l): l is SaleListing => l.listingType === "sale" && l.status === "active");
    case "sold":
      return all.filter((l): l is SaleListing => l.listingType === "sale" && l.status === "sold");
  }
}

/** The dollar value used to compare a listing's price for the given mode. */
export function priceFor(listing: Listing, mode: ListingMode): number {
  if (mode === "rent" && listing.listingType === "rent") return listing.monthlyRent;
  if (mode === "sale" && listing.listingType === "sale") return listing.price;
  if (mode === "sold" && listing.listingType === "sale")
    return listing.soldPrice ?? listing.price;
  return Number.NaN;
}

/**
 * Sentinel value for the "4+" chip. When present in a beds filter, listings
 * with `beds >= 4` match.
 */
export const OPEN_ENDED_BEDS = 4;

/**
 * Decide whether a listing matches the bedroom chips.
 * - undefined / empty → match anything
 * - chips match exact bed counts
 * - OPEN_ENDED_BEDS (4) is the only open-ended chip; it matches `beds >= 4`
 */
export function matchesBeds(listing: Listing, beds: number[] | undefined): boolean {
  if (!beds || beds.length === 0) return true;
  if (beds.includes(OPEN_ENDED_BEDS) && listing.beds >= OPEN_ENDED_BEDS) return true;
  return beds.includes(listing.beds);
}

/** Apply every filter; pure, deterministic. */
export function applyFilters(all: Listing[], filters: ListingFilters): Listing[] {
  const base = listingsForMode(all, filters.mode);
  return base.filter((l) => {
    const price = priceFor(l, filters.mode);
    if (typeof filters.priceMin === "number" && filters.priceMin > 0 && price < filters.priceMin)
      return false;
    if (typeof filters.priceMax === "number" && filters.priceMax > 0 && price > filters.priceMax)
      return false;

    if (!matchesBeds(l, filters.beds)) return false;

    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      if (!filters.propertyTypes.includes(l.propertyType)) return false;
    }

    if (filters.city && filters.city.trim().length > 0) {
      if (l.city.toLowerCase() !== filters.city.trim().toLowerCase()) return false;
    }

    return true;
  });
}

/**
 * Sensible default ranges per mode. Used as initial slider bounds and
 * to gate "no upper limit" UI affordances.
 */
export const priceBounds: Record<ListingMode, { min: number; max: number; step: number }> = {
  rent: { min: 500, max: 6000, step: 50 },
  sale: { min: 300_000, max: 2_500_000, step: 10_000 },
  sold: { min: 300_000, max: 2_500_000, step: 10_000 },
};

/** Build an initial filter state for a mode with default bounds. */
export function defaultFilters(mode: ListingMode = "rent"): ListingFilters {
  const b = priceBounds[mode];
  return { mode, priceMin: b.min, priceMax: b.max, beds: [], propertyTypes: [] };
}

/**
 * Serialize filters into a URL query string. Inverse of filtersFromSearchParams.
 * Omits defaults so the URL stays clean.
 */
export function filtersToSearchParams(filters: ListingFilters): URLSearchParams {
  const params = new URLSearchParams();
  const b = priceBounds[filters.mode];

  params.set("mode", filters.mode);
  if (typeof filters.priceMin === "number" && filters.priceMin !== b.min)
    params.set("min", String(filters.priceMin));
  if (typeof filters.priceMax === "number" && filters.priceMax !== b.max)
    params.set("max", String(filters.priceMax));
  if (filters.beds && filters.beds.length > 0)
    params.set("beds", filters.beds.join(","));
  if (filters.propertyTypes && filters.propertyTypes.length > 0)
    params.set("types", filters.propertyTypes.join(","));
  if (filters.city && filters.city.trim()) params.set("city", filters.city.trim());
  if (filters.neighborhoodSlug) params.set("hood", filters.neighborhoodSlug);

  return params;
}

const VALID_MODES: readonly ListingMode[] = ["rent", "sale", "sold"];
const VALID_TYPES: readonly PropertyTypeFilter[] = [
  "detached",
  "semi-detached",
  "townhouse",
  "condo-apartment",
  "condo-townhouse",
  "duplex",
  "triplex",
  "land",
];

/** Parse a URL query into a filter state. Invalid params fall back to defaults. */
export function filtersFromSearchParams(
  params: URLSearchParams | ReadonlyURLSearchParams,
): ListingFilters {
  const rawMode = params.get("mode") as ListingMode | null;
  const mode: ListingMode = rawMode && VALID_MODES.includes(rawMode) ? rawMode : "rent";
  const b = priceBounds[mode];

  const minStr = params.get("min");
  const maxStr = params.get("max");
  const priceMin = minStr && Number.isFinite(Number(minStr)) ? Number(minStr) : b.min;
  const priceMax = maxStr && Number.isFinite(Number(maxStr)) ? Number(maxStr) : b.max;

  const beds = (params.get("beds") ?? "")
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n) && n >= 0);

  const propertyTypes = (params.get("types") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is PropertyTypeFilter =>
      (VALID_TYPES as readonly string[]).includes(s),
    );

  return {
    mode,
    priceMin,
    priceMax,
    beds,
    propertyTypes,
    city: params.get("city") ?? undefined,
    neighborhoodSlug: params.get("hood") ?? undefined,
  };
}

/** Type alias to keep filtersFromSearchParams typings tidy. */
type ReadonlyURLSearchParams = {
  get(name: string): string | null;
};
