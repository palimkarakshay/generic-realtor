import Link from "next/link";
import { FourPillars } from "@/components/layout/four-pillars";
import { BrandPromiseStrip } from "@/components/marketing/brand-promise-strip";
import { FeaturedListingsBento } from "@/components/marketing/featured-listings-bento";
import { HomepageSearchHero } from "@/components/search/homepage-search-hero";
import { QuickAffordability } from "@/components/calculators/quick-affordability";
import { JsonLd } from "@/components/layout/jsonld";
import { activeSaleListings, activeRentListings } from "@/lib/listings";
import { getAllInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site-config";
import { realEstateAgentLD } from "@/lib/structured-data";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const heroListings = [...activeRentListings, ...activeSaleListings];
  const featured = [...activeRentListings, ...activeSaleListings].slice(0, 6);
  const recentInsights = getAllInsights().slice(0, 3);

  return (
    <>
      <JsonLd data={realEstateAgentLD()} />

      <HomepageSearchHero listings={heroListings} />

      <BrandPromiseStrip />

      <QuickAffordability />

      <FourPillars />

      <FeaturedListingsBento listings={featured} />

      {/* Neighborhoods preview */}
      <section className="bg-canvas-elevated" aria-labelledby="neighborhoods-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 id="neighborhoods-heading" className="text-display-lg text-ink">
            Where to live in Kitchener-Waterloo
          </h2>
          <p className="mt-3 max-w-prose text-body-lg text-ink-soft">
            Nine neighborhoods, each with its own pace, price band, and quirks. Pick one you&apos;re
            curious about — the page tells you what it&apos;s actually like.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {siteConfig.neighborhoods.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/neighborhoods/${n.slug}`}
                  className="block rounded-md border border-border-subtle bg-canvas px-4 py-3 text-body-sm text-ink-soft transition hover:border-accent hover:text-accent-deep"
                >
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/neighborhoods"
            className="mt-8 inline-block text-body-sm text-ink hover:text-accent-deep"
          >
            All neighborhood guides →
          </Link>
        </div>
      </section>

      {/* Recent insights */}
      {recentInsights.length > 0 ? (
        <section
          aria-labelledby="insights-heading"
          className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="insights-heading" className="text-display-lg text-ink">
              Notes from the field
            </h2>
            <Link href="/insights" className="text-body-sm text-ink hover:text-accent-deep">
              All insights →
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {recentInsights.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/insights/${p.slug}`}
                  className="group block h-full rounded-lg border border-border-subtle bg-canvas-elevated p-6 transition hover:border-accent hover:shadow-sm"
                >
                  <p className="text-caption text-muted">
                    {formatDate(p.frontmatter.publishedAt, { month: "short", day: "numeric" })}
                  </p>
                  <h3 className="mt-2 font-display text-display-sm text-ink transition group-hover:text-accent-deep">
                    {p.frontmatter.title}
                  </h3>
                  <p className="mt-3 text-body-sm text-ink-soft">{p.frontmatter.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
