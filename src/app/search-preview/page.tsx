"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ListingSearchPanel } from "@/components/search/listing-search-panel";
import { ListingCard } from "@/components/listings/listing-card";
import { ListingsMap } from "@/components/maps/listings-map";
import {
  applyFilters,
  defaultFilters,
  filtersToSearchParams,
  type ListingFilters,
} from "@/lib/listing-filters";
import { allListings } from "@/lib/listings";

/**
 * Development preview route. Drives the listing search panel against the
 * static feed in isolation so we can verify behaviour before the panel
 * lands in the homepage hero. Deleted after Wave 2.5 (homepage rebuild).
 */
export default function SearchPreviewPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<ListingFilters>(() => defaultFilters("rent"));

  const results = useMemo(() => applyFilters(allListings, filters), [filters]);

  const handleSubmit = (f: ListingFilters) => {
    const params = filtersToSearchParams(f);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <p className="text-caption text-lake-deep">Wave 2.2 preview</p>
      <h1 className="mt-2 font-display text-display-lg text-ink">
        Listing search panel
      </h1>
      <p className="mt-2 max-w-prose text-body text-ink-soft">
        Dev-only surface that exercises the panel + filter pipeline against the
        static listing feed. Goes away when the hero rebuild lands.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="md:sticky md:top-24 md:self-start">
          <ListingSearchPanel
            value={filters}
            onChange={setFilters}
            onSubmit={handleSubmit}
            resultCount={results.length}
          />
          <details className="mt-4 rounded-lg border border-border-subtle bg-canvas-elevated p-3 text-body-sm text-ink-soft">
            <summary className="cursor-pointer text-caption text-muted">Current filters</summary>
            <pre className="mt-2 overflow-x-auto text-caption text-ink-soft tabular-nums">
              {JSON.stringify(filters, null, 2)}
            </pre>
          </details>
        </div>

        <div>
          <p className="text-caption text-muted">{results.length} matching</p>

          <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-border-subtle">
            <ListingsMap listings={results} height={480} />
          </div>

          {results.length === 0 ? (
            <p className="mt-6 text-body text-ink-soft">
              Nothing matches the current filters. Try widening the price range
              or clearing the bedroom chips.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {results.map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
