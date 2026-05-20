import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.realtor.name}, ${siteConfig.realtor.title} serving Kitchener-Waterloo.`,
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-caption text-accent-deep">About</p>
      <h1 className="mt-3 font-display text-display-xl text-ink">{siteConfig.realtor.name}</h1>
      <p className="mt-2 text-body-lg text-ink-soft">
        {siteConfig.realtor.title} · {siteConfig.realtor.pronouns}
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_2fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.realtor.photo}
          alt={`${siteConfig.realtor.name}, ${siteConfig.realtor.title}`}
          className="aspect-[3/4] w-full rounded-lg object-cover"
        />

        <div>
          <p className="text-body-lg text-ink-soft">{siteConfig.realtor.bioLong}</p>

          <h2 className="mt-10 font-display text-display-md text-ink">What I&apos;m doing while I get going</h2>
          <p className="mt-4 text-body text-ink-soft">
            Most brand-new realtors paper over inexperience with stock photos of skylines, an
            inflated headshot, and a font that takes itself too seriously. I&apos;m doing the
            opposite: keep it small, keep it honest, do the homework, earn the next client through
            the work I do for the current one.
          </p>
          <p className="mt-4 text-body text-ink-soft">
            What I&apos;m studying right now: hyper-local KW pricing trends, the mortgage stress
            test math, the way the Residential Tenancies Act actually gets enforced at the LTB.
            Real estate&apos;s a service business; I&apos;d rather come to a conversation knowing
            the answer than improvising.
          </p>

          <h2 className="mt-10 font-display text-display-md text-ink">Service areas</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-body-sm">
            {siteConfig.realtor.serviceAreas.map((a) => (
              <li
                key={a}
                className="rounded-full border border-border-subtle bg-canvas-elevated px-3 py-1 text-ink-soft"
              >
                {a}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-display-md text-ink">Credentials</h2>
          <ul className="mt-3 space-y-1 text-body-sm text-ink-soft">
            <li>{siteConfig.realtor.tresaClass} — Real Estate Council of Ontario</li>
            <li>RECO Registration #{siteConfig.realtor.recoNumber}</li>
            <li>{siteConfig.brokerage.name}</li>
            <li>Languages: {siteConfig.realtor.languages.join(", ")}</li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
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
        </div>
      </div>
    </article>
  );
}
