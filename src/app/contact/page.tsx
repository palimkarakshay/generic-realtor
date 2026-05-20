import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site-config";
import type { LeadInput } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Get in touch",
  description: "Send me a note about buying, renting, selling, or leasing out in Kitchener-Waterloo.",
};

const validIntents: LeadInput["intent"][] = [
  "buying",
  "renting",
  "selling",
  "valuation",
  "lease_out",
  "general",
  "listing-inquiry",
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; listing?: string; source?: string }>;
}) {
  const { intent, listing, source } = await searchParams;
  const defaultIntent: LeadInput["intent"] | undefined =
    intent && validIntents.includes(intent as LeadInput["intent"])
      ? (intent as LeadInput["intent"])
      : undefined;

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-display-xl text-ink">Get in touch</h1>
      <p className="mt-4 max-w-prose text-body-lg text-ink-soft">
        The form goes straight to my inbox. I read every message, I reply same day where I can,
        and never later than the next business day.
      </p>

      <div className="mt-10">
        <ContactForm defaultIntent={defaultIntent} defaultListing={listing} source={source} />
      </div>

      <div className="mt-16 border-t border-border-subtle pt-8 text-body-sm text-ink-soft">
        <p>
          Prefer email? Write me at{" "}
          <a href={`mailto:${siteConfig.realtor.email}`} className="underline">
            {siteConfig.realtor.email}
          </a>
          .
        </p>
        <p className="mt-2">
          Prefer a call?{" "}
          <a href={`tel:${siteConfig.realtor.phone}`} className="underline">
            {siteConfig.realtor.phone}
          </a>{" "}
          — or{" "}
          <a href={siteConfig.calendly.url} className="underline">
            book a 20-minute slot
          </a>
          .
        </p>
      </div>
    </div>
  );
}
