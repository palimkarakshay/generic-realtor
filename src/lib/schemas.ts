import { z } from "zod";

/**
 * Listing schema. Single collection — `listingType` discriminates sale from rent
 * so we can render different fact strips and CTAs from the same template.
 */

const baseListing = z.object({
  listingId: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  title: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  province: z.string().default("ON"),
  postalCode: z.string().optional(),
  beds: z.number().int().nonnegative(),
  baths: z.number().nonnegative(),
  sqft: z.number().int().positive().optional(),
  propertyType: z.enum([
    "detached",
    "semi-detached",
    "townhouse",
    "condo-apartment",
    "condo-townhouse",
    "duplex",
    "triplex",
    "land",
  ]),
  description: z.string().min(1),
  features: z.array(z.string()).default([]),
  photos: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    )
    .default([]),
  /** WGS84 coords for the Leaflet map */
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  /** Brokerage info (overrides site default if provided) */
  brokerage: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

const saleListing = baseListing.extend({
  listingType: z.literal("sale"),
  price: z.number().positive(),
  status: z.enum(["active", "pending", "sold", "expired"]).default("active"),
  lotSizeSqft: z.number().positive().optional(),
  yearBuilt: z.number().int().optional(),
  /** ISO date — used to compute Days on Market */
  listedAt: z.string().optional(),
  /** ISO date — only set when sold */
  soldAt: z.string().optional(),
  soldPrice: z.number().positive().optional(),
});

const rentListing = baseListing.extend({
  listingType: z.literal("rent"),
  monthlyRent: z.number().positive(),
  status: z.enum(["active", "leased", "pending"]).default("active"),
  leaseTerm: z.enum(["12-months", "month-to-month", "6-months", "other"]).default("12-months"),
  furnished: z.enum(["none", "partially", "fully"]).default("none"),
  petsAllowed: z.enum(["yes", "cats-only", "no", "case-by-case"]).default("case-by-case"),
  parkingIncluded: z.boolean().default(false),
  utilitiesIncluded: z
    .array(z.enum(["heat", "hydro", "water", "internet", "none"]))
    .default(["none"]),
  availableFrom: z.string().optional(),
  /** ISO date — used to compute Days on Market */
  listedAt: z.string().optional(),
  /** ISO date — only set when leased */
  leasedAt: z.string().optional(),
});

export const listingSchema = z.discriminatedUnion("listingType", [saleListing, rentListing]);
export type Listing = z.infer<typeof listingSchema>;
export type SaleListing = z.infer<typeof saleListing>;
export type RentListing = z.infer<typeof rentListing>;

/** Insights / blog posts */
export const insightFrontmatterSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: z.string(),
  tags: z.array(z.string()).default([]),
  /** Optional cover image */
  cover: z.string().optional(),
  /** Hidden in lists until set true */
  published: z.boolean().default(true),
});
export type InsightFrontmatter = z.infer<typeof insightFrontmatterSchema>;

/** Neighborhood MDX frontmatter */
export const neighborhoodFrontmatterSchema = z.object({
  name: z.string(),
  slug: z.string(),
  tagline: z.string(),
  lat: z.number(),
  lng: z.number(),
  vibe: z.string(),
});
export type NeighborhoodFrontmatter = z.infer<typeof neighborhoodFrontmatterSchema>;

/** Lead intake schema — used by the contact form. */
export const leadSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(1, "Please share a few details").max(4000),
  /**
   * Lead intent — drives lead routing and email subject.
   */
  intent: z.enum([
    "buying",
    "renting",
    "selling",
    "valuation",
    "lease_out",
    "general",
    "listing-inquiry",
  ]),
  /** When intent === 'listing-inquiry', the slug of the listing */
  listingSlug: z.string().optional(),
  /** UTM/source attribution captured client-side */
  source: z.string().optional(),
  /** Cloudflare Turnstile token */
  turnstileToken: z.string().min(1),
  /** CASL consent — must be true */
  consent: z.boolean().refine((v) => v === true, {
    message: "We need your consent to email you back",
  }),
});
export type LeadInput = z.infer<typeof leadSchema>;
