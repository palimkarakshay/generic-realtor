import { promises as fs } from "fs";
import path from "path";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";
import type { LeadInput } from "@/lib/schemas";

const LEADS_FILE = path.resolve(process.cwd(), "data", "leads.jsonl");

/**
 * Verify a Cloudflare Turnstile token server-side.
 * Free service, no credit card.
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // No secret configured — accept in development only.
    return process.env.NODE_ENV !== "production";
  }
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

/** Append the lead to a JSONL file (local backup). */
export async function appendLeadFile(lead: LeadInput & { receivedAt: string }) {
  try {
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await fs.appendFile(LEADS_FILE, JSON.stringify(lead) + "\n", "utf-8");
  } catch (err) {
    // File-system errors shouldn't break the form submission on Cloudflare Pages
    // (where the filesystem is read-only). Just log.
    console.warn("Failed to append lead to JSONL:", err);
  }
}

/**
 * Forward to Google Sheets via Apps Script web-app webhook.
 * Free, no third-party SaaS. Leave the URL blank to skip.
 */
export async function postLeadToSheets(lead: LeadInput & { receivedAt: string }) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
  } catch (err) {
    console.warn("Failed to post lead to Sheets:", err);
  }
}

/** Send the realtor's notification + the inquirer's auto-reply via Resend. */
export async function sendLeadEmails(lead: LeadInput & { receivedAt: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email send");
    return;
  }
  const resend = new Resend(apiKey);

  const from = process.env.RESEND_FROM_EMAIL ?? siteConfig.realtor.email;
  const to = process.env.RESEND_TO_EMAIL ?? siteConfig.realtor.email;

  const intentLabel: Record<LeadInput["intent"], string> = {
    buying: "Buying",
    renting: "Renting",
    selling: "Selling",
    valuation: "Home valuation",
    lease_out: "Leasing out",
    general: "General inquiry",
    "listing-inquiry": "Listing inquiry",
  };

  const subject = `New ${intentLabel[lead.intent]} lead — ${lead.name}`;
  const adminHtml = `
    <h2>New lead from ${siteConfig.site.shortName}</h2>
    <p><strong>Intent:</strong> ${intentLabel[lead.intent]}</p>
    ${lead.listingSlug ? `<p><strong>Listing:</strong> ${lead.listingSlug}</p>` : ""}
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    ${lead.phone ? `<p><strong>Phone:</strong> ${lead.phone}</p>` : ""}
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(lead.message)}</pre>
    ${lead.source ? `<p style="color:#888"><small>Source: ${escapeHtml(lead.source)}</small></p>` : ""}
    <p style="color:#888"><small>Received: ${lead.receivedAt}</small></p>
  `;

  const replyHtml = `
    <p>Hi ${escapeHtml(lead.name.split(" ")[0])},</p>
    <p>Thanks for the note. I&apos;ve received it and I&apos;ll get back to you within one business day with a real reply — not just a templated acknowledgement.</p>
    <p>If something&apos;s urgent in the meantime, you can call me directly at ${siteConfig.realtor.phone}.</p>
    <p>${siteConfig.realtor.name}<br/>${siteConfig.realtor.title}<br/>${siteConfig.brokerage.name}</p>
    <p style="color:#888;font-size:12px;margin-top:24px">
      You&apos;re receiving this because you submitted a form on
      <a href="${siteConfig.site.url}">${siteConfig.site.url}</a>.
      <a href="${siteConfig.site.url}/unsubscribe?email=${encodeURIComponent(lead.email)}">Unsubscribe</a>.
    </p>
  `;

  await Promise.all([
    resend.emails.send({
      from,
      to,
      subject,
      html: adminHtml,
      replyTo: lead.email,
    }),
    resend.emails.send({
      from,
      to: lead.email,
      subject: `I got your note — ${siteConfig.realtor.name}`,
      html: replyHtml,
    }),
  ]);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
