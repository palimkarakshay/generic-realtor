"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPinPopup } from "./map-pin-popup";
import type { Listing } from "@/lib/schemas";

/** KW centroid — Downtown Kitchener. Fallback when no listings are visible. */
const KW_CENTER: [number, number] = [43.4516, -80.4925];
const KW_DEFAULT_ZOOM = 12;

/**
 * Tone-coded pins so the map reads at a glance:
 * - lake (teal)      → for-rent
 * - accent (terracotta) → for-sale
 * - ink (near-black) → sold
 */
function makePin(fill: string, dot: string): L.DivIcon {
  return L.divIcon({
    className: "leaflet-inline-icon",
    html: `<svg width="28" height="40" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.27 0 0 6.05 0 13.52 0 23.69 14 40 14 40s14-16.31 14-26.48C28 6.05 21.73 0 14 0z" fill="${fill}"/>
      <circle cx="14" cy="13.5" r="5" fill="${dot}"/>
    </svg>`,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -34],
  });
}

const PIN_RENT = makePin("#0e7490", "#cffafe"); // lake / lake-soft
const PIN_SALE = makePin("#c2410c", "#f7f2e7"); // accent / canvas
const PIN_SOLD = makePin("#0f1419", "#f7f2e7"); // ink / canvas

function iconFor(listing: Listing): L.DivIcon {
  if (listing.listingType === "rent") return PIN_RENT;
  if (listing.status === "sold") return PIN_SOLD;
  return PIN_SALE;
}

interface PositionedListing {
  listing: Listing;
  lat: number;
  lng: number;
}

function FitToPins({ pins }: { pins: PositionedListing[] }) {
  const map = useMap();
  useEffect(() => {
    if (pins.length === 0) {
      map.setView(KW_CENTER, KW_DEFAULT_ZOOM);
      return;
    }
    if (pins.length === 1) {
      map.setView([pins[0].lat, pins[0].lng], 14);
      return;
    }
    const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [map, pins]);
  return null;
}

interface ListingsLeafletMapProps {
  listings: Listing[];
  /** CSS height. Defaults to 480px desktop / responsive via wrapper. */
  height?: number | string;
}

export function ListingsLeafletMap({ listings, height = 480 }: ListingsLeafletMapProps) {
  const pins = useMemo<PositionedListing[]>(
    () =>
      listings
        .filter(
          (l): l is Listing & { lat: number; lng: number } =>
            typeof l.lat === "number" && typeof l.lng === "number",
        )
        .map((l) => ({ listing: l, lat: l.lat, lng: l.lng })),
    [listings],
  );

  return (
    <MapContainer
      center={KW_CENTER}
      zoom={KW_DEFAULT_ZOOM}
      scrollWheelZoom={false}
      style={{ height, width: "100%" }}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitToPins pins={pins} />
      {pins.map((p) => (
        <Marker
          key={p.listing.slug}
          position={[p.lat, p.lng]}
          icon={iconFor(p.listing)}
        >
          <Popup>
            <MapPinPopup listing={p.listing} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
