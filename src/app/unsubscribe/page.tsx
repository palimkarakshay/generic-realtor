import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Stop receiving email from this site.",
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-display-xl text-ink">Unsubscribe</h1>

      <p className="mt-6 text-body-lg text-ink-soft">
        I&apos;m a one-person business with no marketing automation, so &quot;unsubscribe&quot;
        for me is manual.
      </p>

      <div className="mt-8 rounded-lg border border-border-subtle bg-canvas-elevated p-6">
        {email ? (
          <>
            <p className="text-body text-ink-soft">
              To unsubscribe <strong className="text-ink">{email}</strong>, click the link below
              to email me. I&apos;ll remove you from anything you&apos;re on and reply to
              confirm.
            </p>
            <a
              href={`mailto:${siteConfig.realtor.email}?subject=Unsubscribe%20${encodeURIComponent(
                email,
              )}&body=Please%20remove%20me%20from%20any%20email%20list.%20Thanks.`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
            >
              Email the unsubscribe request
            </a>
          </>
        ) : (
          <>
            <p className="text-body text-ink-soft">
              Email{" "}
              <a href={`mailto:${siteConfig.realtor.email}?subject=Unsubscribe`} className="underline">
                {siteConfig.realtor.email}
              </a>{" "}
              with &quot;unsubscribe&quot; in the subject line. I&apos;ll handle it within one
              business day and reply to confirm.
            </p>
          </>
        )}
      </div>

      <p className="mt-6 text-caption text-muted">
        Required by Canada&apos;s Anti-Spam Legislation (CASL).
      </p>
    </div>
  );
}
