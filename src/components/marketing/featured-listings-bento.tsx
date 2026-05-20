import Link from "next/link";
import type { Listing } from "@/lib/schemas";
import { ListingCard } from "@/components/listings/listing-card";

interface FeaturedListingsBentoProps {
  listings: Listing[];
  title?: string;
  /** Link rendered next to the heading when listings exist. */
  ctaLabel?: string;
  ctaHref?: string;
  /** Empty-state copy when no listings are available. */
  emptyMessage?: string;
}

/**
 * Asymmetric featured-listings layout. One hero card sits beside two stacked
 * supporting cards; any extras flow into a compact row below. Replaces the
 * uniform 3-up grid that read flat — and gives the upcoming agent's "best
 * one this week" some visual weight.
 */
export function FeaturedListingsBento({
  listings,
  title = "Open this week in KW",
  ctaLabel = "See all listings →",
  ctaHref = "/listings",
  emptyMessage,
}: FeaturedListingsBentoProps) {
  const [hero, a, b, ...overflow] = listings;

  return (
    <section
      aria-labelledby="featured-bento-heading"
      className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="featured-bento-heading" className="font-display text-display-lg text-ink">
          {listings.length > 0 ? title : "Featured listings"}
        </h2>
        {listings.length > 0 ? (
          <Link href={ctaHref} className="text-body-sm text-ink hover:text-lake-deep">
            {ctaLabel}
          </Link>
        ) : null}
      </div>

      {listings.length === 0 ? (
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          {emptyMessage ??
            "No live listings on the wall right now. Most of the work happens before a listing exists — browsing rentals, prepping a sale, getting pre-approved."}
        </p>
      ) : (
        <>
          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <ListingCard listing={hero} variant="feature" />
            <div className="grid gap-5">
              {a ? <ListingCard listing={a} variant="default" /> : null}
              {b ? <ListingCard listing={b} variant="default" /> : null}
            </div>
          </div>

          {overflow.length > 0 ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {overflow.map((l) => (
                <ListingCard key={l.slug} listing={l} variant="compact" />
              ))}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
