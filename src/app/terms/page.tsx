import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for this website.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-display-xl text-ink">Terms of use</h1>

      <h2 className="mt-10 font-display text-display-md text-ink">Who this site belongs to</h2>
      <p className="mt-4 text-body text-ink-soft">
        This website is operated by {siteConfig.realtor.name}, {siteConfig.realtor.title},
        registered with the Real Estate Council of Ontario (RECO #
        {siteConfig.realtor.recoNumber}), under the brokerage{" "}
        {siteConfig.brokerage.name}.
      </p>

      <h2 className="mt-10 font-display text-display-md text-ink">Information accuracy</h2>
      <p className="mt-4 text-body text-ink-soft">
        Listing information is provided in good faith and believed accurate at the time of
        publication. It is not guaranteed and should be independently verified before any
        purchase, lease, or financial decision.
      </p>

      <h2 className="mt-10 font-display text-display-md text-ink">Not advice</h2>
      <p className="mt-4 text-body text-ink-soft">
        Content on this site (including mortgage calculators, LTT estimators, and tenant-rights
        primers) is educational, not legal, financial, or tax advice. Consult a licensed
        professional for advice specific to your situation.
      </p>

      <h2 className="mt-10 font-display text-display-md text-ink">Solicitation</h2>
      <p className="mt-4 text-body text-ink-soft">{siteConfig.compliance.independent}</p>

      <h2 className="mt-10 font-display text-display-md text-ink">External links</h2>
      <p className="mt-4 text-body text-ink-soft">
        Links to third-party sites (Realtor.ca, the LTB, government information pages) are
        provided for convenience. I&apos;m not responsible for their content.
      </p>

      <h2 className="mt-10 font-display text-display-md text-ink">Changes</h2>
      <p className="mt-4 text-body text-ink-soft">
        These terms may be updated. The current version is always on this page.
      </p>

      <p className="mt-10 text-caption text-muted">
        Last updated: {new Date().toLocaleDateString("en-CA")}.
      </p>
    </article>
  );
}
