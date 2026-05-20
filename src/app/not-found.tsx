import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
      <p className="text-caption text-accent-deep">404</p>
      <h1 className="mt-3 font-display text-display-xl text-ink">
        That page isn&apos;t here.
      </h1>
      <p className="mt-4 text-body-lg text-ink-soft">
        Maybe it&apos;s a listing that&apos;s been taken down, or a link that got mangled. Try one
        of these instead:
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-3 text-body-sm">
        {[
          { href: "/", label: "Home" },
          { href: "/listings", label: "Listings" },
          { href: "/buy", label: "Buy" },
          { href: "/rent", label: "Rent" },
          { href: "/contact", label: "Contact" },
        ].map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="rounded-full border border-ink px-4 py-2 text-ink transition hover:border-accent-deep hover:text-accent-deep"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
