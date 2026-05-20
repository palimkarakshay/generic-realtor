"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { Listing } from "@/lib/schemas";

const LeafletSearchMap = dynamic(
  () => import("./leaflet-search-map").then((m) => m.LeafletSearchMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[420px] items-center justify-center bg-parchment text-muted">
        <span className="text-caption">Loading map…</span>
      </div>
    ),
  },
);

type TypeFilter = "all" | "sale" | "rent";

export function SearchableListingMap({
  listings,
  height = 520,
}: {
  listings: Listing[];
  height?: number;
}) {
  const [type, setType] = useState<TypeFilter>("all");
  const [minBeds, setMinBeds] = useState(0);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      if (l.lat === undefined || l.lng === undefined) return false;
      if (type === "sale" && l.listingType !== "sale") return false;
      if (type === "rent" && l.listingType !== "rent") return false;
      if (l.beds < minBeds) return false;
      if (q.length > 0) {
        const haystack =
          `${l.address} ${l.city} ${l.title} ${l.propertyType}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [listings, type, minBeds, query]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-canvas shadow-lg shadow-ink/20">
      <div className="border-b border-border-subtle p-4">
        <label className="block">
          <span className="sr-only">Search listings</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search address, city, or property type"
            className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-body-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </label>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-caption">
          <ChipGroup
            label="Type"
            value={type}
            options={[
              { value: "all", label: "All" },
              { value: "sale", label: "For sale" },
              { value: "rent", label: "For rent" },
            ]}
            onChange={(v) => setType(v)}
          />
          <ChipGroup
            label="Beds"
            value={String(minBeds)}
            options={[
              { value: "0", label: "Any" },
              { value: "1", label: "1+" },
              { value: "2", label: "2+" },
              { value: "3", label: "3+" },
              { value: "4", label: "4+" },
            ]}
            onChange={(v) => setMinBeds(Number(v))}
          />
          <p className="ml-auto whitespace-nowrap text-caption uppercase text-muted">
            {filtered.length} of {listings.length}
          </p>
        </div>
      </div>
      <div className="flex-1" style={{ minHeight: height }}>
        <LeafletSearchMap listings={filtered} height={height} />
      </div>
    </div>
  );
}

function ChipGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="uppercase text-muted">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              onClick={() => onChange(o.value)}
              className={
                "rounded-full px-3 py-1 text-caption transition " +
                (active
                  ? "bg-accent text-ink"
                  : "border border-border text-ink-soft hover:border-accent hover:text-accent-deep")
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
