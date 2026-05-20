/**
 * Single source of truth for realtor identity, brokerage, and KW context.
 * The brand-new realtor changes ONLY this file (plus listings + insights MDX)
 * to make the template their own.
 *
 * Every TODO token is intentional — they appear in compliance footers so the
 * realtor cannot accidentally ship the site without filling them in.
 */

export const siteConfig = {
  /** Realtor identity */
  realtor: {
    name: "Riley Avery",
    /** RECO (Real Estate Council of Ontario) registration number — required on every page footer */
    recoNumber: "TODO-RECO-NUMBER",
    /** TRESA registration class — Salesperson or Broker */
    tresaClass: "Salesperson" as "Salesperson" | "Broker",
    title: "Sales Representative",
    pronouns: "she/her",
    bioShort:
      "Brand-new to real estate, lifelong KW resident, and committed to earning your trust through patient, careful work — not slick pitches.",
    bioLong:
      "I grew up between Kitchener and Waterloo, watched the region change through three real-estate cycles, and decided to get licensed because friends kept asking me the same questions and deserved better answers than what they were getting. I'm new to the business but not to the place. What I can promise: a slower, more careful pace; honest answers, including the ones you don't want to hear; and a refusal to push a deal that isn't right for you.",
    photo: "https://image.pollinations.ai/prompt/Editorial%20portrait%20photograph%2C%2085mm%20lens%2C%20soft%20north-window%20natural%20daylight%2C%20a%20friendly%20Canadian%20woman%20real%20estate%20agent%20in%20her%20early%20thirties%20with%20a%20warm%20genuine%20smile%2C%20smart-casual%20blazer%20over%20a%20cream%20top%2C%20neutral%20warm-gray%20studio%20backdrop%2C%20shallow%20depth%20of%20field%2C%20natural%20skin%20tones%2C%20approachable%2C%20photoreal%2C%20no%20text%2C%20no%20watermark%2C%20no%20logo?width=1000&height=1300&seed=1011&model=flux&nologo=true",
    email: "hello@yourdomain.ca",
    phone: "+1-519-555-0100",
    languages: ["English"] as string[],
    serviceAreas: ["Kitchener", "Waterloo", "Cambridge", "Woolwich Township"] as string[],
  },

  /** Brokerage (REQUIRED on every page by Ontario REBBA/TRESA) */
  brokerage: {
    name: "TODO Realty Inc., Brokerage",
    address: "TODO Street Address, Kitchener, ON N0X 0X0",
    phone: "+1-519-555-0000",
    /** Brokerage RECO number — distinct from individual realtor's */
    recoNumber: "TODO-BROKERAGE-RECO",
    website: "https://example.com",
  },

  /** Site basics */
  site: {
    name: "Riley Avery — Kitchener Real Estate",
    shortName: "Riley Avery",
    description:
      "Honest, patient real-estate help in Kitchener-Waterloo. New to the business, not to the area. Buying, selling, renting, or leasing out — let's talk first.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.ca",
    locale: "en-CA",
    timezone: "America/Toronto",
    socials: {
      instagram: "https://instagram.com/your-handle",
      linkedin: "https://linkedin.com/in/your-handle",
    },
  },

  /** Compliance copy that has to appear in every footer */
  compliance: {
    casl: "By submitting a form on this site you consent to receive emails from Riley Avery about your inquiry. You can unsubscribe at any time.",
    pipeda:
      "Your personal information is collected, used, and disclosed only to respond to your inquiry, in accordance with PIPEDA and Ontario's privacy laws.",
    independent:
      "Not intended to solicit clients currently under contract with another brokerage.",
  },

  /** Calendly */
  calendly: {
    url: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/your-username/intro",
    cta: "Book a 20-minute intro call",
  },

  /** The 9 KW neighborhoods this site has pages for. `vibe` is a short
   * one-liner used in card UI; the detail page carries the long-form notes. */
  neighborhoods: [
    {
      slug: "downtown-kitchener",
      name: "Downtown Kitchener",
      lat: 43.4516,
      lng: -80.4925,
      vibe: "Tech, ION light rail, brick-loft city living",
    },
    {
      slug: "uptown-waterloo",
      name: "Uptown Waterloo",
      lat: 43.4643,
      lng: -80.5204,
      vibe: "Patios, indie shops, walk-everywhere",
    },
    {
      slug: "westmount-kitchener",
      name: "Westmount (Kitchener)",
      lat: 43.4378,
      lng: -80.5072,
      vibe: "Mature trees, mid-century homes, family feel",
    },
    {
      slug: "doon-south",
      name: "Doon South",
      lat: 43.3854,
      lng: -80.4376,
      vibe: "Newer suburban builds, growing families",
    },
    {
      slug: "stanley-park",
      name: "Stanley Park",
      lat: 43.4742,
      lng: -80.4520,
      vibe: "Post-war detached, classic Kitchener residential",
    },
    {
      slug: "laurelwood",
      name: "Laurelwood",
      lat: 43.4847,
      lng: -80.5701,
      vibe: "Trail access, modern family homes",
    },
    {
      slug: "preston",
      name: "Preston (Cambridge)",
      lat: 43.3922,
      lng: -80.3582,
      vibe: "Historic small shops, quieter Cambridge",
    },
    {
      slug: "galt",
      name: "Galt (Cambridge)",
      lat: 43.3553,
      lng: -80.3145,
      vibe: "Limestone Victorian downtown on the Grand",
    },
    {
      slug: "st-jacobs",
      name: "St. Jacobs",
      lat: 43.5435,
      lng: -80.5526,
      vibe: "Rural mill town, farmers' market country",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type Neighborhood = (typeof siteConfig.neighborhoods)[number];
