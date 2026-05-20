import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllInsights, getInsightBySlug } from "@/lib/insights";
import { mdxComponents } from "../../../../mdx-components";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { SmartImage } from "@/components/ui/smart-image";

export async function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.publishedAt,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-caption text-accent-deep">
        {formatDate(post.frontmatter.publishedAt)}
        {post.frontmatter.tags.length > 0 ? ` · ${post.frontmatter.tags.join(", ")}` : null}
      </p>
      <h1 className="mt-3 font-display text-display-xl text-ink">{post.frontmatter.title}</h1>
      <p className="mt-4 text-body-lg text-ink-soft">{post.frontmatter.excerpt}</p>

      {post.frontmatter.cover ? (
        <SmartImage
          src={post.frontmatter.cover}
          alt={post.frontmatter.title}
          loading="eager"
          decoding="async"
          className="mt-10 aspect-[16/9] w-full overflow-hidden rounded-lg object-cover"
        />
      ) : null}

      <div className="mt-10 max-w-prose">
        <MDXRemote source={post.body} components={mdxComponents} />
      </div>

      <div className="mt-16 border-t border-border-subtle pt-10">
        <p className="text-body text-ink-soft">
          Want to talk about anything in this post? Send a note — I read every one.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
          >
            Get in touch
          </Link>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 text-sm text-ink transition hover:border-accent-deep hover:text-accent-deep"
          >
            More insights
          </Link>
        </div>
        <p className="mt-10 text-caption text-muted">
          {siteConfig.realtor.name}, {siteConfig.realtor.title} · RECO #
          {siteConfig.realtor.recoNumber} · {siteConfig.brokerage.name}
        </p>
      </div>
    </article>
  );
}
