import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => <h1 className="text-display-lg text-ink mt-12 mb-6">{children}</h1>,
  h2: ({ children }) => <h2 className="text-display-md text-ink mt-10 mb-5">{children}</h2>,
  h3: ({ children }) => <h3 className="text-display-sm text-ink mt-8 mb-4">{children}</h3>,
  p: ({ children }) => (
    <p className="text-body text-ink-soft mb-5 leading-relaxed">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-ink underline decoration-accent decoration-2 underline-offset-4 transition hover:decoration-accent-deep"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-ink-soft">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-ink-soft">{children}</ol>
  ),
  li: ({ children }) => <li className="text-body leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-accent pl-6 font-display text-xl italic text-ink">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border-subtle" />,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="rounded bg-parchment px-1.5 py-0.5 font-mono text-sm">{children}</code>
  ),
};

// Next.js convention: a `useMDXComponents` export at the project root is the
// global MDX component map. The hook-named export is required by @next/mdx;
// we also export `mdxComponents` (above) for use in server components, where
// React's hook rules forbid calling a function whose name starts with `use`.
export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
