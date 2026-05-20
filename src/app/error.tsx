"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
      <p className="text-caption text-accent-deep">Something broke</p>
      <h1 className="mt-3 font-display text-display-xl text-ink">
        Sorry — that didn&apos;t go right.
      </h1>
      <p className="mt-4 text-body-lg text-ink-soft">
        I get a notification when this happens, so I&apos;ll already be looking at it. If
        it&apos;s urgent, send me an email directly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-ink px-5 py-3 text-sm text-ink transition hover:border-accent-deep hover:text-accent-deep"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
