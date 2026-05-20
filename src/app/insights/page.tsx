import type { Metadata } from "next";
import Link from "next/link";
import { getAllInsights } from "@/lib/insights";
import { formatDate } from "@/lib/utils";
import { SmartImage } from "@/components/ui/smart-image";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Short, honest notes on Kitchener-Waterloo real estate — the math, the neighborhoods, and the trade-offs nobody writes about.",
};

export default function InsightsIndexPage() {
  const posts = getAllInsights();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <header>
        <h1 className="font-display text-display-xl text-ink">Insights</h1>
        <p className="mt-4 text-body-lg text-ink-soft">
          Short notes on Kitchener-Waterloo real estate — the math, the neighborhoods, and the
          trade-offs nobody writes about.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 rounded-lg border border-dashed border-border-subtle bg-canvas-elevated p-6 text-body text-muted">
          No posts yet. The first one will land soon.
        </p>
      ) : (
        <ul className="mt-12 space-y-12">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-border-subtle pb-12 last:border-b-0">
              {p.frontmatter.cover ? (
                <Link href={`/insights/${p.slug}`} className="group block">
                  <SmartImage
                    src={p.frontmatter.cover}
                    alt={p.frontmatter.title}
                    loading="lazy"
                    className="aspect-[16/9] w-full overflow-hidden rounded-lg object-cover transition group-hover:opacity-90"
                  />
                </Link>
              ) : null}
              <p className={`${p.frontmatter.cover ? "mt-6" : ""} text-caption text-muted`}>
                {formatDate(p.frontmatter.publishedAt)}
                {p.frontmatter.tags.length > 0
                  ? ` · ${p.frontmatter.tags.join(", ")}`
                  : null}
              </p>
              <h2 className="mt-2 font-display text-display-md text-ink">
                <Link
                  href={`/insights/${p.slug}`}
                  className="transition hover:text-accent-deep"
                >
                  {p.frontmatter.title}
                </Link>
              </h2>
              <p className="mt-3 text-body text-ink-soft">{p.frontmatter.excerpt}</p>
              <Link
                href={`/insights/${p.slug}`}
                className="mt-4 inline-block text-body-sm text-ink hover:text-accent-deep"
              >
                Read more →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
