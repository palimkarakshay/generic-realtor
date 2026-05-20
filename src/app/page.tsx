import Link from "next/link";
import { FourPillars } from "@/components/layout/four-pillars";
import { ListingCard } from "@/components/listings/listing-card";
import { JsonLd } from "@/components/layout/jsonld";
import { SmartImage } from "@/components/ui/smart-image";
import { SearchableListingMap } from "@/components/listings/searchable-listing-map";
import { OpenHouseStrip } from "@/components/open-houses/open-house-strip";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import {
  activeSaleListings,
  activeRentListings,
  recentlyClosedListings,
} from "@/lib/listings";
import { getAllInsights } from "@/lib/insights";
import { allTestimonials } from "@/lib/testimonials";
import { siteConfig } from "@/lib/site-config";
import { realEstateAgentLD } from "@/lib/structured-data";
import { formatCAD, formatDate, formatNumber } from "@/lib/utils";

export default function HomePage() {
  const featured = [...activeSaleListings, ...activeRentListings].slice(0, 3);
  const [primary, ...rest] = featured;
  const allActive = [...activeSaleListings, ...activeRentListings];
  const recentInsights = getAllInsights().slice(0, 3);
  const closed = recentlyClosedListings.slice(0, 3);

  return (
    <>
      <JsonLd data={realEstateAgentLD()} />
      {/* Map-led top — what the visitor came for */}
      <section aria-labelledby="map-heading" className="bg-canvas-elevated">
        <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-caption uppercase text-accent-deep">
                Kitchener · Waterloo · Cambridge
              </p>
              <h1
                id="map-heading"
                className="mt-1 font-display text-display-md text-ink sm:text-display-lg"
              >
                Find a home on the map.
              </h1>
            </div>
            <Link
              href="/listings"
              className="text-body-sm text-ink underline-offset-4 hover:text-accent-deep hover:underline"
            >
              Browse all listings →
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-5 sm:px-8">
          <SearchableListingMap listings={allActive} height={560} />
        </div>
      </section>

      {/* Open houses strip */}
      <OpenHouseStrip />

      {/* Featured listings — hero card + 2-up */}
      <section
        aria-labelledby="featured-heading"
        className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="featured-heading" className="text-display-lg text-ink">
            {featured.length > 0 ? "Currently on the market" : "No active listings yet"}
          </h2>
          {featured.length > 0 ? (
            <Link
              href="/listings"
              className="text-body-sm text-ink underline-offset-4 hover:text-accent-deep hover:underline"
            >
              See all listings →
            </Link>
          ) : null}
        </div>

        {primary ? (
          <Link
            href={`/listings/${primary.slug}`}
            className="group mt-8 grid gap-0 overflow-hidden rounded-xl border border-border-subtle bg-canvas-elevated shadow-sm transition hover:border-accent hover:shadow-md md:grid-cols-[1.3fr_1fr]"
          >
            <div className="relative aspect-[16/10] bg-parchment md:aspect-auto">
              {primary.photos[0] ? (
                <SmartImage
                  src={primary.photos[0].src}
                  alt={primary.photos[0].alt}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-[1.02]"
                />
              ) : null}
              <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-caption font-medium uppercase text-ink">
                Featured · {primary.city}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8">
              <p className="text-caption uppercase text-accent-deep">
                {primary.listingType === "sale" ? "For sale" : "For rent"}
              </p>
              <p className="mt-2 font-display text-display-xl text-ink">
                {primary.listingType === "sale"
                  ? formatCAD(primary.price)
                  : `${formatCAD(primary.monthlyRent)}/mo`}
              </p>
              <p className="mt-2 text-body-lg text-ink-soft">{primary.title}</p>
              <p className="mt-1 text-body-sm text-muted">
                {primary.address}, {primary.city}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-caption uppercase text-muted">
                <span>{primary.beds} bd</span>
                <span>{primary.baths} ba</span>
                {primary.sqft ? <span>{formatNumber(primary.sqft)} sqft</span> : null}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-accent-deep group-hover:underline">
                View this listing →
              </span>
            </div>
          </Link>
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        ) : null}

        {featured.length === 0 ? (
          <p className="mt-6 max-w-prose text-body text-ink-soft">
            I&apos;m new to the business and don&apos;t have active listings yet. That doesn&apos;t
            mean I can&apos;t help — most of my work happens before a listing exists, on the
            buyer side. <Link href="/contact" className="underline">Send me a note</Link> and we can
            talk about whether I&apos;m the right person for what you need.
          </p>
        ) : null}
      </section>

      {/* Compact agent intro — secondary placement, honest about being new */}
      <section aria-labelledby="agent-intro" className="bg-ink text-canvas">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1fr_2fr] md:items-center md:py-20">
          <div className="overflow-hidden rounded-lg border border-canvas/10">
            <SmartImage
              src={siteConfig.realtor.photo}
              alt={`Portrait of ${siteConfig.realtor.name}`}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div>
            <p className="text-caption uppercase text-accent">
              Working with me
            </p>
            <h2
              id="agent-intro"
              className="mt-3 font-display text-display-md text-canvas md:text-display-lg"
            >
              Slow real estate, careful answers, no pressure.
            </h2>
            <p className="mt-4 max-w-prose text-body-lg text-canvas/85">
              {siteConfig.realtor.bioShort}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink transition hover:bg-accent-soft"
              >
                Start a conversation
              </Link>
              <Link
                href={siteConfig.calendly.url}
                className="inline-flex items-center gap-2 rounded-full border border-canvas/40 px-5 py-3 text-sm text-canvas transition hover:border-accent hover:text-accent"
              >
                {siteConfig.calendly.cta}
              </Link>
            </div>
            <p className="mt-5 text-caption uppercase text-canvas/55">
              {siteConfig.realtor.name} · {siteConfig.realtor.title} · New to the business, not to KW
            </p>
          </div>
        </div>
      </section>

      <FourPillars />

      {/* Neighborhoods preview */}
      <section className="bg-canvas-elevated" aria-labelledby="neighborhoods-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 id="neighborhoods-heading" className="text-display-lg text-ink">
            The neighborhoods I know
          </h2>
          <p className="mt-3 max-w-prose text-body-lg text-ink-soft">
            Each of these has its own pace, its own price band, and its own quirks. I&apos;ve
            written about what I notice on the ground.
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

      {/* Testimonials */}
      {allTestimonials.length > 0 ? (
        <section aria-labelledby="testimonials-heading" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 id="testimonials-heading" className="text-display-lg text-ink">
            Early voices
          </h2>
          <p className="mt-3 max-w-prose text-body text-ink-soft">
            Riley is brand-new to the business. These are pre-licensing mentors, referral partners,
            and mock-client conversations — labelled honestly. Real client quotes will replace the
            drafts as the work happens.
          </p>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {allTestimonials.map((t) => (
              <li key={t.id}>
                <TestimonialCard testimonial={t} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Recently closed */}
      {closed.length > 0 ? (
        <section aria-labelledby="closed-heading" className="bg-canvas-elevated">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 id="closed-heading" className="text-display-lg text-ink">
              Recently closed
            </h2>
            <p className="mt-2 max-w-prose text-body text-ink-soft">
              The work that&apos;s behind me, with the numbers attached.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {closed.map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Recent insights */}
      {recentInsights.length > 0 ? (
        <section
          aria-labelledby="insights-heading"
          className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="insights-heading" className="text-display-lg text-ink">
              Recent thinking
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
