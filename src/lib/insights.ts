import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { insightFrontmatterSchema, type InsightFrontmatter } from "@/lib/schemas";

const INSIGHTS_DIR = path.join(process.cwd(), "src/content/insights");

export type Insight = {
  slug: string;
  frontmatter: InsightFrontmatter;
  body: string;
};

/**
 * Read all .mdx files from src/content/insights/ at build time.
 * Frontmatter is parsed by gray-matter and validated by Zod.
 * Unpublished posts (`published: false`) are filtered out.
 */
export function getAllInsights(): Insight[] {
  let files: string[];
  try {
    files = readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = readFileSync(path.join(INSIGHTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = insightFrontmatterSchema.parse(data);
      return { slug, frontmatter, body: content };
    })
    .filter((p) => p.frontmatter.published)
    .sort((a, b) => b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt));
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return getAllInsights().find((p) => p.slug === slug);
}
