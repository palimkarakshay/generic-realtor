import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas";
import {
  appendLeadFile,
  postLeadToSheets,
  sendLeadEmails,
  verifyTurnstile,
} from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Bot check
  const turnstileOk = await verifyTurnstile(lead.turnstileToken);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Turnstile verification failed" }, { status: 403 });
  }

  const enriched = { ...lead, receivedAt: new Date().toISOString() };

  // Fan out — file backup, optional Sheets webhook, Resend email
  await Promise.allSettled([
    appendLeadFile(enriched),
    postLeadToSheets(enriched),
    sendLeadEmails(enriched),
  ]);

  return NextResponse.json({ ok: true });
}
