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

export type OpenHouse = NonNullable<Listing["openHouses"]>[number];
export type ListingWithNextOpenHouse = { listing: Listing; next: OpenHouse };

const todayISO = () => new Date().toISOString().slice(0, 10);

/** Listings with at least one open house today or later, sorted by nearest open. */
export function listingsWithUpcomingOpenHouses(
  now: string = todayISO(),
): ListingWithNextOpenHouse[] {
  return allListings
    .map((listing) => {
      const upcoming = (listing.openHouses ?? [])
        .filter((oh) => oh.date >= now)
        .sort(
          (a, b) =>
            a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime),
        );
      return upcoming.length ? { listing, next: upcoming[0] } : null;
    })
    .filter((x): x is ListingWithNextOpenHouse => x !== null)
    .sort(
      (a, b) =>
        a.next.date.localeCompare(b.next.date) ||
        a.next.startTime.localeCompare(b.next.startTime),
    );
}

/** Every individual upcoming open-house instance (a listing may appear more than once). */
export type OpenHouseInstance = { listing: Listing; open: OpenHouse };

export function upcomingOpenHouseInstances(now: string = todayISO()): OpenHouseInstance[] {
  return allListings
    .flatMap((listing) =>
      (listing.openHouses ?? [])
        .filter((oh) => oh.date >= now)
        .map((open) => ({ listing, open })),
    )
    .sort(
      (a, b) =>
        a.open.date.localeCompare(b.open.date) ||
        a.open.startTime.localeCompare(b.open.startTime),
    );
}

/** Recently sold (sale) + leased (rent) listings, newest first. */
export const recentlyClosedListings: Listing[] = allListings
  .filter(
    (l) =>
      (l.listingType === "sale" && l.status === "sold") ||
      (l.listingType === "rent" && l.status === "leased"),
  )
  .sort((a, b) => {
    const aDate = a.listingType === "sale" ? (a.soldAt ?? "") : (a.leasedAt ?? "");
    const bDate = b.listingType === "sale" ? (b.soldAt ?? "") : (b.leasedAt ?? "");
    return bDate.localeCompare(aDate);
  });
