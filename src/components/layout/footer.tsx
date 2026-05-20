import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border-subtle bg-canvas-elevated">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-display-sm text-ink">{siteConfig.realtor.name}</p>
            <p className="mt-1 text-caption text-muted">{siteConfig.realtor.title}</p>
            <p className="mt-4 max-w-prose text-body-sm text-ink-soft">
              {siteConfig.realtor.bioShort}
            </p>
          </div>

          <div>
            <p className="text-caption text-muted">Site</p>
            <ul className="mt-3 space-y-2 text-body-sm text-ink-soft">
              <li>
                <Link href="/buy" className="hover:text-accent-deep">
                  Buy
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-accent-deep">
                  Rent
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-accent-deep">
                  Sell
                </Link>
              </li>
              <li>
                <Link href="/lease-out" className="hover:text-accent-deep">
                  Lease out
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-accent-deep">
                  All listings
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods" className="hover:text-accent-deep">
                  Neighborhoods
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-caption text-muted">Contact</p>
            <ul className="mt-3 space-y-2 text-body-sm text-ink-soft">
              <li>
                <a href={`mailto:${siteConfig.realtor.email}`} className="hover:text-accent-deep">
                  {siteConfig.realtor.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.realtor.phone}`} className="hover:text-accent-deep">
                  {siteConfig.realtor.phone}
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-deep">
                  Contact form
                </Link>
              </li>
              <li>
                <a href={siteConfig.calendly.url} className="hover:text-accent-deep">
                  Book a call
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Brokerage / RECO trust strip — required by Ontario REBBA/TRESA */}
        <div className="mt-12 grid gap-4 border-t border-border-subtle pt-8 text-caption text-muted md:grid-cols-2">
          <div>
            <p className="font-medium text-ink-soft">{siteConfig.brokerage.name}</p>
            <p>{siteConfig.brokerage.address}</p>
            <p>{siteConfig.brokerage.phone}</p>
          </div>
          <div className="md:text-right">
            <p>
              RECO #{siteConfig.realtor.recoNumber} · {siteConfig.realtor.tresaClass}
            </p>
            <p>Brokerage RECO #{siteConfig.brokerage.recoNumber}</p>
            <p className="mt-2 max-w-md md:ml-auto">{siteConfig.compliance.independent}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-caption text-muted">
          <Link href="/privacy" className="hover:text-accent-deep">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-accent-deep">
            Terms
          </Link>
          <Link href="/unsubscribe" className="hover:text-accent-deep">
            Unsubscribe
          </Link>
          <span className="ml-auto">
            © {new Date().getFullYear()} {siteConfig.realtor.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
