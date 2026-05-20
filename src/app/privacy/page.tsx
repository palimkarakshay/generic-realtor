import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this site collects, uses, and stores your personal information.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 prose-content">
      <h1 className="font-display text-display-xl text-ink">Privacy</h1>
      <p className="mt-4 text-body-lg text-ink-soft">
        Plain-language version: I collect only what you give me when you fill out a form, I use it
        only to reply to your inquiry, and I don&apos;t sell it.
      </p>

      <h2 className="mt-10 font-display text-display-md text-ink">What this site collects</h2>
      <ul className="mt-4 space-y-3 text-body text-ink-soft">
        <li>
          <strong className="text-ink">Form submissions:</strong> your name, email, phone (if you
          choose), and the message you write me. Stored in my email and in a private spreadsheet I
          use as a lead log.
        </li>
        <li>
          <strong className="text-ink">Aggregate site analytics:</strong> Cloudflare Web Analytics,
          which is cookieless and does not identify individual visitors.
        </li>
        <li>
          <strong className="text-ink">Bot protection:</strong> Cloudflare Turnstile, which
          inspects your browser environment briefly to confirm you&apos;re not a bot. It does not
          set tracking cookies.
        </li>
      </ul>

      <h2 className="mt-10 font-display text-display-md text-ink">What I do with it</h2>
      <p className="mt-4 text-body text-ink-soft">
        I reply to you. That&apos;s it. If you&apos;d like ongoing emails (newsletters, new
        listings) I&apos;ll ask separately and you&apos;ll have to opt in. I don&apos;t sell or
        rent your information.
      </p>

      <h2 className="mt-10 font-display text-display-md text-ink">CASL (Canada&apos;s Anti-Spam Law)</h2>
      <p className="mt-4 text-body text-ink-soft">{siteConfig.compliance.casl}</p>

      <h2 className="mt-10 font-display text-display-md text-ink">PIPEDA</h2>
      <p className="mt-4 text-body text-ink-soft">{siteConfig.compliance.pipeda}</p>

      <h2 className="mt-10 font-display text-display-md text-ink">Your rights</h2>
      <p className="mt-4 text-body text-ink-soft">
        You can ask me what information I have about you, ask me to delete it, or unsubscribe from
        emails at any time. Email{" "}
        <a href={`mailto:${siteConfig.realtor.email}`} className="underline">
          {siteConfig.realtor.email}
        </a>{" "}
        with the request.
      </p>

      <h2 className="mt-10 font-display text-display-md text-ink">Service providers</h2>
      <ul className="mt-4 space-y-2 text-body text-ink-soft">
        <li>Cloudflare (hosting, analytics, bot protection) — Pages Free tier</li>
        <li>Resend (transactional email) — Free tier</li>
        <li>Google Workspace (email + Sheets log)</li>
      </ul>

      <p className="mt-10 text-caption text-muted">
        Last updated: {new Date().toLocaleDateString("en-CA")}.
      </p>
    </article>
  );
}
