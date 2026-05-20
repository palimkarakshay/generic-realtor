import type { Metadata } from "next";
import { NeighborhoodGrid } from "@/components/marketing/neighborhood-grid";

export const metadata: Metadata = {
  title: "Kitchener-Waterloo neighborhoods",
  description:
    "Honest, on-the-ground notes about each KW neighborhood I serve — the pace, the price band, and the quirks.",
};

export default function NeighborhoodsPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <p className="text-caption text-lake-deep">Kitchener · Waterloo · Cambridge</p>
        <h1 className="mt-3 font-display text-display-xl text-ink">Neighborhoods</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-soft">
          The KW region isn&apos;t one market — it&apos;s a dozen. What pulls you to Uptown
          Waterloo is the opposite of what pulls someone to Doon South. These are short,
          honest notes on each.
        </p>
      </header>

      <NeighborhoodGrid
        title="All nine guides"
        intro="Click any to read what the neighborhood is actually like — pace, price band, quirks, and what surprised me."
        ctaHref=""
        ctaLabel=""
      />
    </>
  );
}
