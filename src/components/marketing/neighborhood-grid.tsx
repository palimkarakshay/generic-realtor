import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SmartImage } from "@/components/ui/smart-image";
import { pollinationsImage } from "@/lib/utils";

const CINEMATIC_PREFIX =
  "Cinematic editorial neighborhood photograph, 35mm look, warm afternoon golden-hour light, hyperreal architectural detail, soft long shadows, photoreal, no text, no watermark, no logo,";

function thumbFor(slug: string, name: string, accent: string): string {
  // Stable seed per slug, shifted from the previous /neighborhoods seeds
  let seed = 4400;
  for (let i = 0; i < slug.length; i++) seed = (seed * 31 + slug.charCodeAt(i)) & 0xffff;
  const prompt = `${CINEMATIC_PREFIX} characteristic ${accent} ${name} Kitchener Waterloo Ontario, mature trees, no people in frame`;
  return pollinationsImage(prompt, { seed, width: 1000, height: 750, model: "flux" });
}

const slugAccent: Record<string, string> = {
  "downtown-kitchener": "King Street with the ION light rail and Walper Hotel",
  "uptown-waterloo": "King Street North leafy maple-lined storefronts",
  "westmount-kitchener": "tree-lined residential street with mid-century brick",
  "doon-south": "newer modern stone-and-brick subdivision street",
  "stanley-park": "post-war detached homes on a family street",
  laurelwood: "modern family homes backing onto Hillside Park trail",
  preston: "historic two-storey brick storefronts in old downtown",
  galt: "limestone Victorian downtown with the Main Street stone bridge over the Grand River",
  "st-jacobs": "historic Mill on the Conestoga River and Mennonite countryside",
};

interface NeighborhoodGridProps {
  /** Section heading. */
  title?: string;
  /** Optional intro paragraph above the grid. */
  intro?: string;
  /** Trailing link rendered as a "see all" affordance. */
  ctaLabel?: string;
  ctaHref?: string;
  /** When true the grid renders on a contrasting elevated background. */
  elevated?: boolean;
}

/**
 * Visual asymmetric grid of KW neighborhoods. Replaces the old plain-link list
 * on the homepage and the uniform 3-up grid on /neighborhoods. The first card
 * spans two columns on desktop so the eye has a clear entry point.
 */
export function NeighborhoodGrid({
  title = "Where to live in Kitchener-Waterloo",
  intro = "Nine neighborhoods, each with its own pace, price band, and quirks. Pick one you're curious about — the page tells you what it's actually like.",
  ctaLabel = "All neighborhood guides →",
  ctaHref = "/neighborhoods",
  elevated = false,
}: NeighborhoodGridProps) {
  const wrapperCls = elevated
    ? "bg-canvas-elevated"
    : "bg-canvas";

  return (
    <section
      aria-labelledby="neighborhood-grid-heading"
      className={wrapperCls}
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 id="neighborhood-grid-heading" className="font-display text-display-lg text-ink">
          {title}
        </h2>
        <p className="mt-3 max-w-prose text-body-lg text-ink-soft">{intro}</p>

        <ul className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.neighborhoods.map((n, idx) => {
            const accent = slugAccent[n.slug] ?? `${n.name} residential street`;
            const span = idx === 0 ? "lg:col-span-2 lg:row-span-1" : "";
            return (
              <li key={n.slug} className={span}>
                <Link
                  href={`/neighborhoods/${n.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-border-subtle transition hover:shadow-xl hover:ring-accent"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-parchment">
                    <SmartImage
                      src={thumbFor(n.slug, n.name, accent)}
                      alt={`A scene from ${n.name}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-display-sm text-canvas">{n.name}</h3>
                      <p className="mt-1 text-body-sm text-canvas/85">{n.vibe}</p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {ctaHref ? (
          <Link
            href={ctaHref}
            className="mt-10 inline-flex items-center gap-1 text-body-sm text-ink transition hover:text-accent-deep"
          >
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
