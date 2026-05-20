"use client";

import { FilterChips } from "./filter-chips";
import { PriceRangeSlider } from "./price-range-slider";
import {
  OPEN_ENDED_BEDS,
  priceBounds,
  type ListingFilters,
  type ListingMode,
  type PropertyTypeFilter,
} from "@/lib/listing-filters";

const BED_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: "Studio" },
  { value: 1, label: "1 bd" },
  { value: 2, label: "2 bd" },
  { value: 3, label: "3 bd" },
  { value: OPEN_ENDED_BEDS, label: "4+ bd" },
];

const PROPERTY_OPTIONS: { value: PropertyTypeFilter; label: string }[] = [
  { value: "condo-apartment", label: "Apartment" },
  { value: "condo-townhouse", label: "Condo Twnhse" },
  { value: "townhouse", label: "Townhouse" },
  { value: "detached", label: "House" },
  { value: "semi-detached", label: "Semi" },
];

const MODE_TABS: { value: ListingMode; label: string }[] = [
  { value: "rent", label: "For rent" },
  { value: "sale", label: "For sale" },
  { value: "sold", label: "Sold" },
];

interface ListingSearchPanelProps {
  value: ListingFilters;
  onChange: (next: ListingFilters) => void;
  /** Optional submit handler (e.g. routing to /listings with serialized filters). */
  onSubmit?: (filters: ListingFilters) => void;
  /** Visual variant — "glass" for hero overlay, "card" for inline placement. */
  variant?: "glass" | "card";
  /** When provided, shown on the submit button as "Show N listings". */
  resultCount?: number;
}

export function ListingSearchPanel({
  value,
  onChange,
  onSubmit,
  variant = "card",
  resultCount,
}: ListingSearchPanelProps) {
  const bounds = priceBounds[value.mode];
  const priceMin = value.priceMin ?? bounds.min;
  const priceMax = value.priceMax ?? bounds.max;

  // Reset price bounds when mode changes — rent and sale ranges differ by orders of magnitude
  const setMode = (m: ListingMode) => {
    const nextBounds = priceBounds[m];
    onChange({ ...value, mode: m, priceMin: nextBounds.min, priceMax: nextBounds.max });
  };

  const containerCls =
    variant === "glass"
      ? "rounded-2xl bg-canvas/95 p-6 shadow-2xl ring-1 ring-border-subtle backdrop-blur-xl sm:p-7"
      : "rounded-2xl bg-canvas-elevated p-6 shadow-sm ring-1 ring-border-subtle sm:p-7";

  return (
    <form
      className={containerCls}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
    >
      <div
        className="flex gap-1 rounded-full bg-canvas p-1 ring-1 ring-border-subtle"
        role="tablist"
        aria-label="Listing mode"
      >
        {MODE_TABS.map((t) => {
          const active = value.mode === t.value;
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMode(t.value)}
              className={
                "flex-1 rounded-full px-3 py-2 text-body-sm transition " +
                (active ? "bg-ink text-canvas shadow-sm" : "text-ink-soft hover:text-ink")
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5">
        <PriceRangeSlider
          min={bounds.min}
          max={bounds.max}
          step={bounds.step}
          value={{ min: priceMin, max: priceMax }}
          onChange={({ min, max }) => onChange({ ...value, priceMin: min, priceMax: max })}
          suffix={value.mode === "rent" ? "/mo" : ""}
        />
        <FilterChips
          label="Bedrooms"
          options={BED_OPTIONS}
          value={value.beds ?? []}
          onChange={(beds) => onChange({ ...value, beds })}
        />
        <FilterChips
          label="Property type"
          options={PROPERTY_OPTIONS}
          value={value.propertyTypes ?? []}
          onChange={(propertyTypes) => onChange({ ...value, propertyTypes })}
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
      >
        {typeof resultCount === "number"
          ? `Show ${resultCount} ${resultCount === 1 ? "listing" : "listings"}`
          : "Search"}
      </button>
    </form>
  );
}
