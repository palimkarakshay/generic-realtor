"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

/**
 * Compact "Search KW" affordance that appears in the header once the user
 * has scrolled past the homepage hero. On /listings the panel itself is
 * always visible, so the button is hidden there — no point linking back to
 * the page you're already on.
 */
export function HeaderSearchButton() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const handler = () => setShown(window.scrollY > 420);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <Link
      href="/listings"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={
        "hidden items-center gap-2 rounded-full border border-ink px-4 py-2 text-sm text-ink transition md:inline-flex md:hover:border-accent-deep md:hover:text-accent-deep " +
        (shown ? "opacity-100" : "pointer-events-none opacity-0")
      }
    >
      <Search className="size-4" aria-hidden />
      Search KW
    </Link>
  );
}
