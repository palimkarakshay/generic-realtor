import Link from "next/link";
import type { Listing } from "@/lib/schemas";
import { formatCAD, formatNumber } from "@/lib/utils";
import { SmartImage } from "@/components/ui/smart-image";

/**
 * Compact listing card rendered inside a Leaflet popup. Plain React subtree —
 * Leaflet portals it into the popup DOM but React still controls it, so
 * next/link works for client-side nav.
 */
export function MapPinPopup({ listing }: { listing: Listing }) {
  const photo = listing.photos[0];
  const priceLabel =
    listing.listingType === "sale"
      ? formatCAD(listing.price)
      : `${formatCAD(listing.monthlyRent)}/mo`;

  return (
    <div className="w-56">
      {photo ? (
        <SmartImage
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="block aspect-[4/3] w-full rounded-md object-cover"
        />
      ) : null}
      <p className="mt-2 font-display text-base text-ink tabular-nums">{priceLabel}</p>
      <p className="text-xs text-ink-soft">
        {listing.address}, {listing.city}
      </p>
      <p className="text-xs text-muted tabular-nums">
        {listing.beds} bd · {listing.baths} ba
        {listing.sqft ? ` · ${formatNumber(listing.sqft)} sqft` : ""}
      </p>
      <Link
        href={`/listings/${listing.slug}`}
        className="mt-2 inline-block text-xs font-medium text-accent-deep hover:underline"
      >
        View listing →
      </Link>
    </div>
  );
}
