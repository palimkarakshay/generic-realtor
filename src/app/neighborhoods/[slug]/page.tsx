import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { neighborhoods, getNeighborhoodBySlug } from "@/lib/neighborhoods";
import { ListingMap } from "@/components/maps/listing-map";
import { activeSaleListings, activeRentListings } from "@/lib/listings";
import { ListingCard } from "@/components/listings/listing-card";
import { PageHero } from "@/components/layout/page-hero";
import { pollinationsImage } from "@/lib/utils";

const CINEMATIC_PREFIX =
  "Cinematic editorial photograph, 35mm film look, warm Kodak Portra color grading, soft golden hour light, hyperreal architectural detail, shallow depth of field, photoreal, no text, no watermark, no logo,";

const neighborhoodHeroPrompts: Record<string, string> = {
  "downtown-kitchener":
    "King Street East Downtown Kitchener Ontario with the ION light rail gliding past, the historic Walper Hotel red brick facade catching late sun, scattered pedestrians, summer evening, long warm shadows",
  "uptown-waterloo":
    "King Street North Uptown Waterloo Ontario at golden hour, leafy maples turning amber, locals on indie coffee shop patios, brick and limestone storefronts glowing warm, a young couple walking",
  "westmount-kitchener":
    "Quiet tree-lined residential street in Westmount Kitchener Ontario with mid-century brick bungalows, mature maples arching overhead, dappled afternoon sunlight on the asphalt, a kid on a bike in the distance",
  "doon-south":
    "Newer subdivision street in Doon South Kitchener Ontario with modern stone-and-brick townhomes and well-kept lawns, families pulling into driveways, soft late-afternoon light, suburban calm",
  "stanley-park":
    "Family-friendly Stanley Park Kitchener Ontario residential street with mature trees and tidy post-war detached homes, kids' bikes on the lawn, summer evening light",
  "laurelwood":
    "Laurelwood neighborhood Waterloo Ontario suburban street backing onto the Hillside Park forest trail, modern family homes with mature trees, soft afternoon light filtering through leaves",
  "preston":
    "Old Preston downtown Cambridge Ontario historic two-storey brick storefronts on King Street East, small independent shops, autumn afternoon, warm golden light on the brick",
  "galt":
    "Historic Galt downtown Cambridge Ontario with the Main Street stone bridge over the Grand River and limestone Victorian buildings, river reflections, soft warm daylight, painterly",
  "st-jacobs":
    "Rural St Jacobs Ontario countryside with the historic Mill and dam on the Conestoga River, Mennonite horse-and-buggy on a country road, autumn fields, golden hour glow",
};

function heroForNeighborhood(slug: string, name: string): string {
  const subject =
    neighborhoodHeroPrompts[slug] ??
    `${name} residential street in Kitchener Waterloo Ontario, mature trees, soft afternoon light`;
  const prompt = `${CINEMATIC_PREFIX} ${subject}`;
  // Stable seed per slug, shifted so we don't collide with old cached generations
  let seed = 3300;
  for (let i = 0; i < slug.length; i++) seed = (seed * 31 + slug.charCodeAt(i)) & 0xffff;
  return pollinationsImage(prompt, { seed, width: 2000, height: 800, model: "flux" });
}

export async function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) return { title: "Neighborhood not found" };
  return {
    title: `${n.name} — neighborhood guide`,
    description: `What to expect in ${n.name}: the pace, the price band, and the quirks.`,
  };
}

// MDX-style content blocks keyed by slug. In v1 we ship one fully-written guide
// (Uptown Waterloo) and concise placeholders for the others. The realtor fills
// these in as they get to know each area — empty-but-honest beats AI-generated.
const guides: Record<
  string,
  { tagline: string; sections: { heading: string; body: string }[] }
> = {
  "uptown-waterloo": {
    tagline: "Walkable, expensive, and the only KW node that feels like a small downtown.",
    sections: [
      {
        heading: "The vibe",
        body: "Uptown Waterloo is the part of KW that someone who's only spent an afternoon here would assume the whole region looks like. King Street between Erb and Bridgeport is the densest stretch of independent restaurants in either city, the LRT line cuts through it, and you can walk from a coffee shop to a bookstore to a yoga studio in 10 minutes. The price you pay for that is exactly what you'd expect: condo prices and rents are the highest in Waterloo Region, full stop.",
      },
      {
        heading: "What you'll pay",
        body: "Condos in Uptown core: $480k–$750k for a one-bedroom, $650k–$1.1M for a two-bedroom (2025 prices). Rentals: $1,900–$2,400 for one-bedrooms, $2,200–$2,900 for two-bedrooms. Detached houses are rare in the immediate core; the surrounding streets (Mary, Park, William) run $900k–$1.4M for older brick singles. The big variable is whether the unit faces King Street (noise) or one of the side streets (quiet).",
      },
      {
        heading: "Who it suits",
        body: "Young professionals who don't want a car, empty-nesters downsizing from suburban Waterloo, and students with money. Less ideal for families: most Uptown units are 1- or 2-bedroom condos, and the school options in walking distance are limited.",
      },
      {
        heading: "What surprised me",
        body: "How quickly the vibe changes block by block. Uptown core has the energy. Two blocks south, by the Waterloo Park area, it goes residential and quiet. Three blocks north (Bridgeport-and-King) gets messier — student rentals, less polished. People who think 'Uptown' is one thing are usually surprised.",
      },
    ],
  },
};

function defaultGuide(name: string) {
  return {
    tagline: `Detailed guide coming soon. Notes below are short — I'll expand them as I work more deals in ${name}.`,
    sections: [
      {
        heading: "The vibe",
        body: `I'd rather wait to write about ${name} until I have a few deals behind me here and can speak from real experience instead of recycled descriptions. If you're interested in ${name} specifically, send me a note — I'm happy to share what I know in conversation, even if it's not on the site yet.`,
      },
    ],
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) notFound();

  const guide = guides[slug] ?? defaultGuide(n.name);
  const relevantListings = [...activeSaleListings, ...activeRentListings]
    .filter((l) => l.city.toLowerCase() === n.name.split(" ")[0].toLowerCase().replace(/[(),]/g, ""))
    .slice(0, 3);

  return (
    <article>
      <PageHero src={heroForNeighborhood(slug, n.name)} alt={`A scene from ${n.name}`} />

      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 md:py-16">
        <p className="text-caption text-accent-deep">Neighborhood</p>
        <h1 className="mt-3 font-display text-display-xl text-ink">{n.name}</h1>
        <p className="mt-4 text-body-lg text-ink-soft">{guide.tagline}</p>

        <div className="mt-10 overflow-hidden rounded-lg border border-border-subtle">
          <ListingMap lat={n.lat} lng={n.lng} label={n.name} />
        </div>

        <div className="mt-12 max-w-prose space-y-10">
          {guide.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-display-md text-ink">{s.heading}</h2>
              <p className="mt-4 text-body text-ink-soft">{s.body}</p>
            </section>
          ))}
        </div>

        {relevantListings.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-display text-display-md text-ink">
              Currently in {n.name.split(",")[0]}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {relevantListings.map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-16 rounded-lg border border-border-subtle bg-canvas-elevated p-6 text-center">
          <p className="text-body text-ink-soft">
            Thinking about {n.name.split(",")[0]} specifically? Tell me what you&apos;re looking
            for.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </article>
  );
}
