import Link from "next/link";
import { FourPillars } from "@/components/layout/four-pillars";
import { ListingCard } from "@/components/listings/listing-card";
import { JsonLd } from "@/components/layout/jsonld";
import { SmartImage } from "@/components/ui/smart-image";
import { activeSaleListings, activeRentListings } from "@/lib/listings";
import { getAllInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site-config";
import { realEstateAgentLD } from "@/lib/structured-data";
import { formatDate, pollinationsImage } from "@/lib/utils";

const heroImage = pollinationsImage(
  "View over downtown Kitchener Ontario at golden hour with rooftops, brick buildings, and the green ridges of Doon Hills in the distance, warm autumn light, photograph",
  { seed: 1, width: 1400, height: 1600 },
);

export default function HomePage() {
  const featured = [...activeSaleListings, ...activeRentListings].slice(0, 3);
  const recentInsights = getAllInsights().slice(0, 3);

  return (
    <>
      <JsonLd data={realEstateAgentLD()} />
      {/* Hero */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1.4fr_1fr] md:py-28">
          <div>
            <p className="text-caption text-accent-deep">
              Kitchener · Waterloo · Cambridge
            </p>
            <h1 className="mt-4 font-display text-display-xl text-ink md:text-display-2xl">
              Slow real estate, careful answers, no pressure.
            </h1>
            <p className="mt-6 max-w-prose text-body-lg text-ink-soft">
              {siteConfig.realtor.bioShort}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
              >
                Start a conversation
              </Link>
              <Link
                href={siteConfig.calendly.url}
                className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 text-sm text-ink transition hover:border-accent-deep hover:text-accent-deep"
              >
                {siteConfig.calendly.cta}
              </Link>
            </div>

            <p className="mt-8 max-w-prose text-caption text-muted">
              New to real estate. Not new to KW. I&apos;d rather earn your trust through the
              work than the website — but this is what the website would say.
            </p>
          </div>

          <aside className="relative hidden overflow-hidden rounded-lg border border-border-subtle md:block">
            <SmartImage
              src={heroImage}
              alt="Kitchener-Waterloo at golden hour"
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative h-full min-h-[420px] bg-gradient-to-t from-canvas/90 via-canvas/40 to-transparent p-8 pt-48">
              <p className="text-caption text-canvas drop-shadow">What I offer</p>
              <ul className="mt-4 space-y-3 text-body text-ink-soft">
                <li className="rounded-md bg-canvas/90 px-3 py-2 backdrop-blur-sm">
                  <span className="font-display text-ink">Time.</span> A first conversation is 30
                  minutes, no pitch, no commitment.
                </li>
                <li className="rounded-md bg-canvas/90 px-3 py-2 backdrop-blur-sm">
                  <span className="font-display text-ink">Patience.</span> The right offer can
                  wait a few weeks. The wrong one stays with you for years.
                </li>
                <li className="rounded-md bg-canvas/90 px-3 py-2 backdrop-blur-sm">
                  <span className="font-display text-ink">Honesty.</span> Including when the
                  answer is &quot;it&apos;s not the right time&quot; or &quot;keep renting.&quot;
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <FourPillars />

      {/* Featured listings or honest empty state */}
      <section
        aria-labelledby="featured-heading"
        className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="featured-heading" className="text-display-lg text-ink">
            {featured.length > 0 ? "Currently on the market" : "No active listings yet"}
          </h2>
          {featured.length > 0 ? (
            <Link href="/listings" className="text-body-sm text-ink hover:text-accent-deep">
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
            I&apos;m new to the business and don&apos;t have active listings yet. That doesn&apos;t
            mean I can&apos;t help — most of my work happens before a listing exists, on the
            buyer side. <Link href="/contact" className="underline">Send me a note</Link> and we can
            talk about whether I&apos;m the right person for what you need.
          </p>
        )}
      </section>

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
