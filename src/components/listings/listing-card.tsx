import Link from "next/link";
import { type Listing } from "@/lib/schemas";
import { formatCAD, formatNumber, daysSince } from "@/lib/utils";
import { SmartImage } from "@/components/ui/smart-image";

export function ListingCard({ listing }: { listing: Listing }) {
  const photo = listing.photos[0];

  // Days on Market — only show if we have a listedAt date.
  const dom = listing.listedAt ? daysSince(listing.listedAt) : null;

  const todayISO = new Date().toISOString().slice(0, 10);
  const hasUpcomingOpenHouse = (listing.openHouses ?? []).some((oh) => oh.date >= todayISO);

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block overflow-hidden rounded-lg border border-border-subtle bg-canvas-elevated transition hover:border-accent hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-parchment">
        {photo ? (
          <SmartImage
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            <span className="text-caption">Photo coming soon</span>
          </div>
        )}

        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={
              "rounded-full px-2.5 py-1 text-caption font-medium uppercase " +
              (listing.listingType === "sale"
                ? "bg-ink text-canvas"
                : "bg-moss text-canvas")
            }
          >
            {listing.listingType === "sale" ? "For sale" : "For rent"}
          </span>
          {listing.status !== "active" ? (
            <span className="rounded-full bg-accent-deep px-2.5 py-1 text-caption font-medium uppercase text-canvas">
              {listing.status}
            </span>
          ) : null}
          {hasUpcomingOpenHouse ? (
            <span className="rounded-full bg-moss px-2.5 py-1 text-caption font-medium uppercase text-canvas">
              Open house
            </span>
          ) : null}
        </div>

        {dom !== null && dom > 0 ? (
          <span className="absolute right-3 top-3 rounded-full bg-canvas/90 px-2.5 py-1 text-caption text-ink-soft">
            {dom} day{dom === 1 ? "" : "s"} on market
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <p className="font-display text-display-sm text-ink">
          {listing.listingType === "sale"
            ? formatCAD(listing.price)
            : `${formatCAD(listing.monthlyRent)}/mo`}
        </p>

        <p className="mt-1 text-body-sm text-ink-soft">
          {listing.address}, {listing.city}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted">
          <span>{listing.beds} bd</span>
          <span>{listing.baths} ba</span>
          {listing.sqft ? <span>{formatNumber(listing.sqft)} sqft</span> : null}
          {listing.listingType === "rent" && listing.parkingIncluded ? (
            <span>· parking</span>
          ) : null}
          {listing.listingType === "rent" && listing.furnished !== "none" ? (
            <span>· {listing.furnished} furnished</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
