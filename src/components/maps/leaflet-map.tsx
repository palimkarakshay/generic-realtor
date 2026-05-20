"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix the default-icon path issue with Leaflet + bundlers (icons live in /node_modules)
// by inlining a small SVG marker. No external requests, no broken-icon dance.
const inlineIcon = L.divIcon({
  className: "leaflet-inline-icon",
  html: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.27 0 0 6.05 0 13.52 0 23.69 14 40 14 40s14-16.31 14-26.48C28 6.05 21.73 0 14 0z" fill="#0fb39a"/>
    <circle cx="14" cy="13.5" r="5" fill="#ffffff"/>
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -34],
});

export function LeafletMap({ lat, lng, label }: { lat: number; lng: number; label?: string }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: 360, width: "100%" }}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={inlineIcon}>
        {label ? <Popup>{label}</Popup> : null}
      </Marker>
    </MapContainer>
  );
}
