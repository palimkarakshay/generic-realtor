import { siteConfig } from "@/lib/site-config";

/**
 * Full-bleed deep-ink section that sits just below the homepage hero.
 * Houses what used to live in the hero "Time / Patience / Honesty" overlay —
 * relocated so the hero can be tool-forward instead of philosophy-forward.
 */

const promises: { label: string; body: string }[] = [
  {
    label: "Licensed in Ontario",
    body: "Registered with RECO and a member of the Kitchener-Waterloo Association of REALTORS®.",
  },
  {
    label: "Lifelong KW",
    body: "Three real-estate cycles in this region. The neighborhoods, the school zones, the quirks.",
  },
  {
    label: "Same-day reply",
    body: "Every message gets a response the same business day. The form goes straight to my inbox.",
  },
];

export function BrandPromiseStrip() {
  return (
    <section
      aria-labelledby="brand-promise-heading"
      className="bg-ink text-canvas"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
        <p className="text-caption text-lake-deep">{siteConfig.realtor.name}</p>
        <h2
          id="brand-promise-heading"
          className="mt-3 max-w-3xl font-display text-display-lg text-canvas md:text-display-xl"
        >
          Built for the people doing the moving — not for the realtor.
        </h2>
        <p className="mt-5 max-w-2xl text-body-lg text-canvas/80">
          Tools that answer your questions before we ever talk. Honest opinions when we do.
        </p>

        <dl className="mt-12 grid gap-8 border-t border-canvas/15 pt-10 md:grid-cols-3">
          {promises.map((p) => (
            <div key={p.label}>
              <dt className="text-caption text-accent-soft">{p.label}</dt>
              <dd className="mt-2 text-body text-canvas/85">{p.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
