"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ListingSearchPanel } from "@/components/search/listing-search-panel";
import { ListingsMap } from "@/components/maps/listings-map";
import { ListingCard } from "@/components/listings/listing-card";
import {
  applyFilters,
  defaultFilters,
  filtersFromSearchParams,
  filtersToSearchParams,
  type ListingFilters,
} from "@/lib/listing-filters";
import type { Listing } from "@/lib/schemas";

type MobileView = "map" | "list";

interface ListingsSearchExperienceProps {
  listings: Listing[];
}

/**
 * Half-map listings experience. Desktop: filter panel left (sticky), map +
 * list stacked on the right. Mobile: panel stays in flow at the top, with
 * a tabbed Map/List toggle for the body. Filter changes update the URL in
 * place (router.replace, scroll: false) so the back button still works
 * and deep links survive.
 */
export function ListingsSearchExperience({ listings }: ListingsSearchExperienceProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ListingFilters>(() =>
    searchParams.toString().length > 0
      ? filtersFromSearchParams(searchParams)
      : defaultFilters("rent"),
  );
  const [view, setView] = useState<MobileView>("map");

  const results = useMemo(() => applyFilters(listings, filters), [listings, filters]);

  // Keep URL in sync with filter state (no page navigation, no scroll jump)
  useEffect(() => {
    const next = filtersToSearchParams(filters).toString();
    const current = searchParams.toString();
    if (next === current) return;
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    // searchParams intentionally omitted: we only want to write when filters change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pathname, router]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8">
      <header className="max-w-3xl">
        <p className="text-caption text-lake-deep">All listings</p>
        <h1 className="mt-3 font-display text-display-xl text-ink">
          Search Kitchener-Waterloo
        </h1>
        <p className="mt-3 text-body-lg text-ink-soft">
          Filter on the left, watch the pins move on the right. Click any pin or card
          to open the full listing.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ListingSearchPanel
            value={filters}
            onChange={setFilters}
            resultCount={results.length}
          />
        </div>

        <div>
          <div
            className="mb-4 inline-flex gap-1 rounded-full bg-canvas-elevated p-1 ring-1 ring-border-subtle lg:hidden"
            role="tablist"
            aria-label="View"
          >
            <button
              type="button"
              role="tab"
              aria-selected={view === "map"}
              onClick={() => setView("map")}
              className={
                "rounded-full px-4 py-1.5 text-body-sm transition " +
                (view === "map" ? "bg-ink text-canvas" : "text-ink-soft")
              }
            >
              Map
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "list"}
              onClick={() => setView("list")}
              className={
                "rounded-full px-4 py-1.5 text-body-sm transition " +
                (view === "list" ? "bg-ink text-canvas" : "text-ink-soft")
              }
            >
              List ({results.length})
            </button>
          </div>

          <div className={view === "list" ? "hidden lg:block" : "block"}>
            <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-border-subtle">
              <ListingsMap listings={results} height={520} />
            </div>
          </div>

          <div className={view === "map" ? "hidden lg:block" : "block"}>
            {results.length === 0 ? (
              <p className="mt-6 max-w-prose text-body text-ink-soft">
                Nothing matches the current filters. Try widening the price range, clearing
                the bedroom chips, or switching mode at the top of the panel.
              </p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {results.map((l) => (
                  <ListingCard key={l.slug} listing={l} variant="compact" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
