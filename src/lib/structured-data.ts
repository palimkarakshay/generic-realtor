import { siteConfig } from "@/lib/site-config";
import type { Listing } from "@/lib/schemas";

/**
 * JSON-LD generators. Stick to schema.org/RealEstateAgent +
 * schema.org/RealEstateListing — these have the strongest search support.
 *
 * Review + AggregateRating are intentionally omitted until the realtor has
 * ≥10 real reviews (Google Search guidelines now flag thin review markup).
 */

export function realEstateAgentLD() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.realtor.name,
    image: `${siteConfig.site.url}${siteConfig.realtor.photo}`,
    url: siteConfig.site.url,
    telephone: siteConfig.realtor.phone,
    email: siteConfig.realtor.email,
    jobTitle: siteConfig.realtor.title,
    knowsLanguage: siteConfig.realtor.languages,
    areaServed: siteConfig.realtor.serviceAreas.map((a) => ({
      "@type": "City",
      name: a,
      containedInPlace: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
    })),
    affiliation: {
      "@type": "RealEstateOrganization",
      name: siteConfig.brokerage.name,
      address: siteConfig.brokerage.address,
      telephone: siteConfig.brokerage.phone,
    },
  };
}

export function listingLD(listing: Listing) {
  const isSale = listing.listingType === "sale";
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${listing.address}, ${listing.city}`,
    url: `${siteConfig.site.url}/listings/${listing.slug}`,
    description: listing.description,
    datePosted: listing.listedAt ?? listing.createdAt,
    image: listing.photos.map((p) => `${siteConfig.site.url}${p.src}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.province,
      addressCountry: "CA",
      postalCode: listing.postalCode,
    },
    geo:
      listing.lat !== undefined && listing.lng !== undefined
        ? {
            "@type": "GeoCoordinates",
            latitude: listing.lat,
            longitude: listing.lng,
          }
        : undefined,
    numberOfRooms: listing.beds,
    numberOfBathroomsTotal: listing.baths,
    floorSize: listing.sqft
      ? { "@type": "QuantitativeValue", value: listing.sqft, unitCode: "FTK" }
      : undefined,
    offers: {
      "@type": "Offer",
      price: isSale ? listing.price : listing.monthlyRent,
      priceCurrency: "CAD",
      availability: listing.status === "active"
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      ...(isSale
        ? {}
        : {
            unitCode: "MON",
            unitText: "month",
          }),
    },
  };
}

export function breadcrumbLD(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}
