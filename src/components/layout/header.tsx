import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { siteConfig } from "@/lib/site-config";
import { HeaderSearchButton } from "./header-search-button";

const navLinks: { href: string; label: string }[] = [
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/open-houses", label: "Open houses" },
  { href: "/sell", label: "Sell" },
  { href: "/lease-out", label: "Lease out" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-canvas/90 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-3 transition"
        >
          <span className="h-11 w-11 overflow-hidden rounded-full border border-border bg-parchment ring-2 ring-accent/30 transition group-hover:ring-accent">
            <SmartImage
              src={siteConfig.realtor.photo}
              alt={`Portrait of ${siteConfig.realtor.name}`}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base text-ink transition group-hover:text-accent-deep">
              {siteConfig.realtor.name}
            </span>
            <span className="hidden text-caption text-muted sm:inline">
              {siteConfig.realtor.title}
            </span>
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
