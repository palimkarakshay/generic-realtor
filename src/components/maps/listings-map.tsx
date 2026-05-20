"use client";

import dynamic from "next/dynamic";
import type { Listing } from "@/lib/schemas";

/**
 * SSR-disabled wrapper around ListingsLeafletMap. Leaflet touches `window`
 * during init and crashes during SSR — same pattern as the single-pin
 * ListingMap on neighborhood/listing detail pages.
 */
const ListingsLeafletMap = dynamic(
  () => import("./listings-leaflet-map").then((m) => m.ListingsLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[480px] w-full items-center justify-center bg-parchment text-muted">
        <span className="text-caption">Loading map…</span>
      </div>
    ),
  },
);

interface ListingsMapProps {
  listings: Listing[];
  height?: number | string;
}

export function ListingsMap(props: ListingsMapProps) {
  return <ListingsLeafletMap {...props} />;
}
