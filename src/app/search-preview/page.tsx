"use client";

import { useMemo, useState } from "react";
import { ListingSearchPanel } from "@/components/search/listing-search-panel";
import { ListingCard } from "@/components/listings/listing-card";
import {
  applyFilters,
  priceBounds,
  type ListingFilters,
} from "@/lib/listing-filters";
import { allListings } from "@/lib/listings";

/**
 * Development preview route. Drives the listing search panel against the
 * static feed in isolation so we can verify behaviour before the panel
 * lands in the homepage hero. Deleted after Wave 2.5 (homepage rebuild).
 */
export default function SearchPreviewPage() {
  const [filters, setFilters] = useState<ListingFilters>({
    mode: "rent",
    priceMin: priceBounds.rent.min,
    priceMax: priceBounds.rent.max,
    beds: [],
    propertyTypes: [],
  });

  const results = useMemo(() => applyFilters(allListings, filters), [filters]);

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
          {results.length === 0 ? (
            <p className="mt-3 text-body text-ink-soft">
              Nothing matches the current filters. Try widening the price range
              or clearing the bedroom chips.
            </p>
          ) : (
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
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
