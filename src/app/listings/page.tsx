import type { Metadata } from "next";
import { Suspense } from "react";
import { ListingsSearchExperience } from "./listings-search-experience";
import { allListings, leasedListings } from "@/lib/listings";
import { ListingCard } from "@/components/listings/listing-card";

export const metadata: Metadata = {
  title: "All listings",
  description:
    "Search every active rental, every home for sale, and recently sold properties in Kitchener-Waterloo.",
};

export default function ListingsIndexPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
            <p className="text-caption text-muted">Loading listings…</p>
          </div>
        }
      >
        <ListingsSearchExperience listings={allListings} />
      </Suspense>

      {leasedListings.length > 0 ? (
        <section
          aria-labelledby="recently-leased-heading"
          className="border-t border-border-subtle bg-canvas-elevated"
        >
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <h2
              id="recently-leased-heading"
              className="font-display text-display-lg text-ink"
            >
              Recently leased
            </h2>
            <p className="mt-3 max-w-prose text-body text-ink-soft">
              Rentals that came off the market this season — useful for getting a feel for
              what the rental band looks like by area.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {leasedListings.map((l) => (
                <ListingCard key={l.slug} listing={l} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
