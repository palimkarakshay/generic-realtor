# Operator onboarding (developer's runbook)

Step-by-step setup for the developer (you, or a tech-savvy friend) deploying this for a brand-new realtor.

## Target: 90-minute setup, $0 cost month one

## Pre-launch checklist

- [ ] Domain registered (~$15–25 CAD/yr, .ca or .com)
- [ ] GitHub account (free)
- [ ] Cloudflare account (free)
- [ ] Resend account (free)
- [ ] Google account (free — for Gmail forwarding + Sheets lead log)
- [ ] Calendly account (free tier)

## 1. Fork / clone the repo

```bash
git clone https://github.com/your-org/generic-realtor.git realtor-name-site
cd realtor-name-site
npm install
cp .env.example .env.local
```

## 2. Configure the realtor's identity

Edit `src/lib/site-config.ts` — change every field. Find every `TODO` token:

```bash
grep -n "TODO" src/lib/site-config.ts
```

You must fill in:
- `realtor.recoNumber` — the realtor's RECO registration number
- `brokerage.name`, `brokerage.address`, `brokerage.phone`, `brokerage.recoNumber`

The site will display the literal "TODO-RECO-NUMBER" until you fix it. This is intentional — it prevents accidentally shipping without compliance info.

## 3. Set up the domain on Cloudflare

1. Add the domain to Cloudflare (free plan).
2. Update the registrar nameservers to Cloudflare's.
3. Wait for activation (~5 min typically).

## 4. Email: Cloudflare Email Routing → realtor's Gmail

1. In the Cloudflare dashboard → Email → Email Routing.
2. Verify destination address (realtor's personal Gmail).
3. Add routing rule: `hello@yourdomain.ca` → realtor's Gmail.
4. Test: send an email to `hello@yourdomain.ca`, confirm it arrives in Gmail.

## 5. Resend transactional email

1. Sign up at resend.com (free).
2. Verify the domain with the DNS records Resend provides (Cloudflare DNS makes this 30 seconds).
3. Create an API key. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=hello@yourdomain.ca
   RESEND_TO_EMAIL=realtor-personal-gmail@gmail.com
   ```

## 6. Cloudflare Turnstile (bot protection)

1. Cloudflare dashboard → Turnstile → Add site.
2. Add `yourdomain.ca` (and `localhost` for dev).
3. Copy the site key and secret. Add to `.env.local`:
   ```
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x...
   TURNSTILE_SECRET_KEY=0x...
   ```

## 7. Cloudflare Web Analytics (optional)

1. Cloudflare dashboard → Analytics & Logs → Web Analytics → Add site.
2. Choose "Manual setup" → copy the token.
3. Add `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=...` to `.env.local`.

## 8. Google Sheets lead-log webhook (Apps Script)

1. Create a Google Sheet titled "Realtor Lead Log".
2. Tools → Apps Script. Paste this code:
   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const lead = JSON.parse(e.postData.contents);
     sheet.appendRow([
       lead.receivedAt, lead.intent, lead.name, lead.email,
       lead.phone || "", lead.message, lead.listingSlug || "",
       lead.source || ""
     ]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }));
   }
   ```
3. Deploy as Web App → execute as Me, accessible to Anyone.
4. Copy the URL. Add `GOOGLE_SHEETS_WEBHOOK_URL=...` to `.env.local`.

## 9. Calendly

1. Sign up at calendly.com (free).
2. Create an event type called "20-minute intro call".
3. Copy the URL → set in `siteConfig.calendly.url`.

## 10. Self-host fonts

See `public/fonts/README.md`. Replace the empty `.woff2` placeholders with real Fraunces + Public Sans variable WOFF2 files.

## 11. Replace placeholder images

- `public/images/realtor-headshot-placeholder.svg` → real headshot
- `public/images/listings/*.svg` → real listing photos (or delete the seed listings in `src/content/listings/index.json`)

## 12. Deploy

### Demo deploy — Vercel Hobby (free)

For the demo you show the realtor before they commit, use Vercel's free Hobby tier. It supports everything in the stack out of the box (Node.js API route, dynamic routes, MDX) with zero configuration.

1. Push the repo to GitHub.
2. Go to vercel.com/new → Import from GitHub → select the repo.
3. Vercel auto-detects Next.js. No framework preset to choose, no build command to set.
4. **Before clicking Deploy**, add environment variables from `.env.local`:
   - `NEXT_PUBLIC_SITE_URL` (will be your Vercel preview URL initially, e.g. `https://your-project.vercel.app`)
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
   - `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` (optional)
   - `GOOGLE_SHEETS_WEBHOOK_URL` (optional)
5. Click Deploy. First build takes ~90 seconds.

Subsequent pushes to `main` redeploy automatically.

### When the realtor signs off — moving to a commercial-OK host

Vercel's Hobby plan is **non-commercial use only**. Once the realtor wants their site at `theirdomain.ca` for commercial use, pick one:

#### Option A — Vercel Pro ($20/mo per seat, easiest)

1. Upgrade the project to Pro in Vercel dashboard.
2. Add `theirdomain.ca` as a custom domain.
3. Point Cloudflare DNS at Vercel's nameservers (or use a CNAME record).
4. Wait for SSL provisioning (~5 min).

#### Option B — Netlify Free (free + commercial-OK)

1. Create a Netlify account.
2. Import from GitHub.
3. Netlify auto-detects Next.js. Same env vars apply.
4. Free tier includes 100GB bandwidth, custom domain, automatic HTTPS, and explicit commercial-use permission.

#### Option C — Cloudflare Pages with `@cloudflare/next-on-pages` (free + commercial-OK, more setup)

Requires converting the API route + dynamic pages to the edge runtime. See `@cloudflare/next-on-pages` docs. Free tier is generous but the conversion is non-trivial. Recommend this only if the realtor wants everything on Cloudflare.

### After the migration

Update the realtor's domain in three places:

- `siteConfig.site.url` in `src/lib/site-config.ts` (or `NEXT_PUBLIC_SITE_URL` env var on the host)
- Resend (verify the new domain there)
- Cloudflare Email Routing (point `hello@theirdomain.ca` at their Gmail)

## 13. Test the full lead path

1. Open the live site.
2. Submit the contact form.
3. Confirm:
   - Realtor's Gmail received the notification
   - Inquirer received the auto-reply
   - Google Sheet got a new row
   - Cloudflare Analytics shows the visit (give it 10 min)

## 14. Set the realtor up on `/admin`

1. Walk them through `/admin` on a screen-share.
2. Have them add a test listing → publish → see it live.
3. Have them edit `siteConfig` via the GitHub web UI (small change, e.g. their bio).
4. Hand off `docs/CLIENT_HANDBOOK.md`.

## 15. Email signature

Tell the realtor to put `https://yourdomain.ca` in their Gmail signature. Free, immediate lead-gen channel. Update RECO #, brokerage, and contact info there too.

## Total cost month one

- Domain: $15–25 CAD/yr (one-time recurring)
- Everything else: $0

## Maintenance schedule (after launch)

- **Day 1:** confirm DNS, email forwarding, form delivery
- **Week 1:** check Cloudflare Analytics, confirm form lead arrived in Sheet
- **Month 1:** verify Resend free-tier usage is well under 100/day; if not, alert realtor before they hit the limit
- **Quarterly:** review the upgrade-path triggers in `docs/CLIENT_HANDBOOK.md`
