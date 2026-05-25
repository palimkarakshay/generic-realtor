import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SmartImage } from "@/components/ui/smart-image";
import { pollinationsImage } from "@/lib/utils";

const fieldPhoto = pollinationsImage(
  "Candid editorial photograph, 50mm lens, warm afternoon window light, a friendly Canadian woman real estate agent in her early thirties sitting across a wooden table in a Kitchener Ontario indie coffee shop reviewing paper documents with clients, genuine laughter, hands gesturing over a floorplan, shallow depth of field, photoreal, no text, no watermark, no logo",
  { seed: 1022, width: 1400, height: 900, model: "flux" },
);

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
        <SmartImage
          src={siteConfig.realtor.photo}
          alt={`${siteConfig.realtor.name}, ${siteConfig.realtor.title}`}
          loading="lazy"
          decoding="async"
          className="aspect-[3/4] w-full rounded-lg object-cover"
        />

        <div>
          <p className="text-body-lg text-ink-soft">{siteConfig.realtor.bioLong}</p>

          <h2 className="mt-10 font-display text-display-md text-ink">What I do</h2>
          <p className="mt-4 text-body text-ink-soft">
            Full-service residential real estate: buyer representation, listing services, rentals
            for tenants and landlords, and the paperwork in between. Working knowledge of the
            Ontario Residential Tenancies Act, the mortgage stress test, and how local pricing
            moves block by block.
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

          <SmartImage
            src={fieldPhoto}
            alt={`${siteConfig.realtor.name} meeting with clients in Kitchener`}
            loading="lazy"
            decoding="async"
            className="mt-10 aspect-[16/9] w-full rounded-lg object-cover"
          />

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
            >
              Get in touch
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
