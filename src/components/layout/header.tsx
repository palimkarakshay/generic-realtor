import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { HeaderSearchButton } from "./header-search-button";

const navLinks: { href: string; label: string }[] = [
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/lease-out", label: "Lease out" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-canvas/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link
          href="/"
          className="font-display text-lg leading-none text-ink transition hover:text-accent-deep"
        >
          {siteConfig.realtor.name}
          <span className="ml-2 hidden text-caption text-muted sm:inline">
            {siteConfig.realtor.title}
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-ink-soft transition hover:text-accent-deep"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <HeaderSearchButton />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-canvas transition hover:bg-accent-deep"
          >
            Get in touch
          </Link>
        </div>
      </nav>

      {/* Mobile nav */}
      <ul
        aria-label="Primary mobile"
        className="flex gap-4 overflow-x-auto border-t border-border-subtle px-5 py-2 text-sm text-ink-soft md:hidden"
      >
        {navLinks.map((l) => (
          <li key={l.href} className="shrink-0">
            <Link href={l.href} className="transition hover:text-accent-deep">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
