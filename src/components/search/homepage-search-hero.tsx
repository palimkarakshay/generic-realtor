"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ListingSearchPanel } from "@/components/search/listing-search-panel";
import { ListingsMap } from "@/components/maps/listings-map";
import {
  applyFilters,
  defaultFilters,
  filtersToSearchParams,
  type ListingFilters,
} from "@/lib/listing-filters";
import type { Listing } from "@/lib/schemas";

interface HomepageSearchHeroProps {
  listings: Listing[];
}

/**
 * Homepage hero: glass search panel floating beside a full-width listings
 * map, both driven by a shared filter state. Panel + map update in lockstep
 * with no submit round-trip; the "Show N listings" button serializes filters
 * and routes to /listings for the full half-map experience.
 */
export function HomepageSearchHero({ listings }: HomepageSearchHeroProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<ListingFilters>(() => defaultFilters("rent"));

  const results = useMemo(() => applyFilters(listings, filters), [listings, filters]);

  const handleSubmit = (next: ListingFilters) => {
    const params = filtersToSearchParams(next);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative border-b border-border-subtle bg-canvas-elevated"
    >
      <div className="mx-auto max-w-7xl px-5 pt-10 pb-4 sm:px-8 md:pt-14">
        <p className="text-caption text-lake-deep">Kitchener · Waterloo · Cambridge</p>
        <h1
          id="hero-heading"
          className="mt-3 max-w-4xl font-display text-display-xl text-ink md:text-display-2xl"
        >
          Find a place to live in Kitchener-Waterloo.
        </h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-soft">
          Every rental, every home for sale, and the math to know what you can actually afford —
          on a map of the region I&apos;ve lived my whole life.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 md:pb-20">
        <div className="grid gap-6 lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ListingSearchPanel
              value={filters}
              onChange={setFilters}
              onSubmit={handleSubmit}
              variant="glass"
              resultCount={results.length}
            />
          </div>

          <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-border-subtle">
            <ListingsMap listings={results} height={560} />
          </div>
        </div>
      </div>
    </section>
  );
}
