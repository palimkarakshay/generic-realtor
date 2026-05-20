import Link from "next/link";
import { FourPillars } from "@/components/layout/four-pillars";
import { BrandPromiseStrip } from "@/components/marketing/brand-promise-strip";
import { ListingCard } from "@/components/listings/listing-card";
import { JsonLd } from "@/components/layout/jsonld";
import { SmartImage } from "@/components/ui/smart-image";
import { activeSaleListings, activeRentListings } from "@/lib/listings";
import { getAllInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site-config";
import { realEstateAgentLD } from "@/lib/structured-data";
import { formatDate, pollinationsImage } from "@/lib/utils";

const heroImage = pollinationsImage(
  "Wide cinematic photograph of Uptown Waterloo Ontario streetscape at golden hour, low afternoon sun warming red brick facades, the King Street strip with leafy maples turning amber, a young couple walking with coffee, depth of field, 35mm film look, photoreal",
  { seed: 11, width: 1600, height: 1800 },
);

export default function HomePage() {
  const featured = [...activeSaleListings, ...activeRentListings].slice(0, 3);
  const recentInsights = getAllInsights().slice(0, 3);

  return (
    <>
      <JsonLd data={realEstateAgentLD()} />
      {/* Hero — visitor-focused, tool-forward copy. Map+search drops in at Wave 2.5. */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1.4fr_1fr] md:py-28">
          <div>
            <p className="text-caption text-lake-deep">
              Kitchener · Waterloo · Cambridge
            </p>
            <h1 className="mt-4 font-display text-display-xl text-ink md:text-display-2xl">
              Find a place to live in Kitchener-Waterloo.
            </h1>
            <p className="mt-6 max-w-prose text-body-lg text-ink-soft">
              Every rental, every home for sale, and the math to know what you can actually
              afford — in the region I&apos;ve lived my whole life.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/rent"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-lake-deep"
              >
                Browse rentals
              </Link>
              <Link
                href="/buy"
                className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 text-sm text-ink transition hover:border-accent hover:text-accent-deep"
              >
                What can I afford?
              </Link>
            </div>
          </div>

          <aside className="relative hidden overflow-hidden rounded-xl shadow-lg ring-1 ring-border-subtle md:block">
            <SmartImage
              src={heroImage}
              alt="Uptown Waterloo at golden hour"
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative h-full min-h-[460px] bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-8">
              <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-canvas/95 p-4 backdrop-blur-md">
                <p className="text-caption text-lake-deep">Currently in KW</p>
                <p className="mt-1 font-display text-display-sm text-ink">
                  {activeRentListings.length + activeSaleListings.length} active listings
                </p>
                <p className="mt-1 text-body-sm text-ink-soft">
                  Rentals, resales, and pre-list valuations across the region.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <BrandPromiseStrip />

      <FourPillars />

      {/* Featured listings or honest empty state */}
      <section
        aria-labelledby="featured-heading"
        className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="featured-heading" className="text-display-lg text-ink">
            {featured.length > 0 ? "Open this week in KW" : "Featured listings"}
          </h2>
          {featured.length > 0 ? (
            <Link href="/listings" className="text-body-sm text-ink hover:text-lake-deep">
              See all listings →
            </Link>
          ) : null}
        </div>

        {featured.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-prose text-body text-ink-soft">
            No live listings on the wall right now. Most of the work happens before a listing
            exists — browsing rentals, prepping a sale, getting pre-approved.{" "}
            <Link href="/contact" className="underline">Get in touch</Link> and we&apos;ll start
            with what you actually need.
          </p>
        )}
      </section>

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
