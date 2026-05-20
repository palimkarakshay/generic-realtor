import Link from "next/link";
import { type Listing } from "@/lib/schemas";
import { formatCAD, formatNumber, daysSince } from "@/lib/utils";
import { SmartImage } from "@/components/ui/smart-image";

export function ListingCard({ listing }: { listing: Listing }) {
  const photo = listing.photos[0];

  // Days on Market — only show if we have a listedAt date.
  const dom = listing.listedAt ? daysSince(listing.listedAt) : null;

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block overflow-hidden rounded-xl bg-canvas-elevated shadow-sm ring-1 ring-border-subtle transition hover:shadow-xl hover:ring-accent"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-parchment">
        {photo ? (
          <SmartImage
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            <span className="text-caption">Photo coming soon</span>
          </div>
        )}

        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={
              "rounded-full px-2.5 py-1 text-caption font-medium uppercase shadow-sm " +
              (listing.listingType === "sale"
                ? "bg-accent text-canvas"
                : "bg-lake text-canvas")
            }
          >
            {listing.listingType === "sale" ? "For sale" : "For rent"}
          </span>
          {listing.status !== "active" ? (
            <span className="rounded-full bg-ink px-2.5 py-1 text-caption font-medium uppercase text-canvas">
              {listing.status}
            </span>
          ) : null}
        </div>

        {dom !== null && dom > 0 ? (
          <span className="absolute right-3 top-3 rounded-full bg-canvas/95 px-2.5 py-1 text-caption text-ink-soft backdrop-blur-sm">
            {dom} day{dom === 1 ? "" : "s"} on market
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <p className="font-display text-display-sm text-ink tabular-nums">
          {listing.listingType === "sale"
            ? formatCAD(listing.price)
            : `${formatCAD(listing.monthlyRent)}/mo`}
        </p>

        <p className="mt-1 text-body-sm text-ink-soft">
          {listing.address}, {listing.city}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted">
          <span className="tabular-nums">{listing.beds} bd</span>
          <span className="tabular-nums">{listing.baths} ba</span>
          {listing.sqft ? <span className="tabular-nums">{formatNumber(listing.sqft)} sqft</span> : null}
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
