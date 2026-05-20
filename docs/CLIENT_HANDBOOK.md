# Client handbook

The realtor's primary handbook for running this site. Read this start-to-finish on the day the site goes live; reference it afterwards.

## Where things live

| What | Where | Edited via |
|---|---|---|
| Your name, brokerage, RECO #, photo, bio, phone | `src/lib/site-config.ts` | Code editor or GitHub web UI |
| Listings | `src/content/listings/index.json` | `/admin` (Decap CMS) or the JSON file directly |
| Insights / blog posts | `src/content/insights/*.mdx` | `/admin` or text editor |
| Neighborhood guides | `src/app/neighborhoods/[slug]/page.tsx` | Code editor (more advanced) |
| Lead-magnet PDFs | `public/lead-magnets/*.pdf` | Drag-and-drop into the GitHub web UI |
| Photos | `public/images/listings/` | `/admin` upload or drag into GitHub |

## Daily / weekly workflows

### Add a new listing
1. Take 5–10 photos with your phone. Wide shots, good light. The first photo is the most important.
2. Go to `https://yourdomain.ca/admin`.
3. Click **Listings** → **All listings** → **Add Listing**.
4. Fill in the fields. **Set `listingType` first** — it controls which fields matter.
5. Upload the photos. First one becomes the card image.
6. Save. Decap commits to GitHub, the host (Vercel / Netlify) rebuilds in ~60 seconds, the listing is live.

### Mark a listing as sold or leased
1. Open the listing in `/admin`.
2. Change `status` to `sold` (for sale) or `leased` (for rent).
3. Fill in `soldAt` (or `leasedAt`) with today's date.
4. For sale: optionally fill in `soldPrice` so it appears on the recently-sold page.

### Publish an insight / blog post
1. `/admin` → **Insights** → **New Post**.
2. Fill in title, excerpt, body (Markdown). The body is plain Markdown — headings with `#`, bold with `**`, links with `[text](url)`.
3. Set `published: true` when ready.
4. Save. The post commits to GitHub, the host rebuilds, and it appears at `/insights/your-slug` in ~60 seconds.
5. Posts you mark `published: false` are saved but hidden from the public site.

The site automatically picks up new posts from `src/content/insights/` — no code changes needed.

## Photo prep (for listings you photograph yourself)

- **Wide-angle, eye-level.** Don't stand in the corner of the room with a fisheye.
- **Curtains open, lights on.** Even at noon.
- **No clutter.** Take the second photo, then look at it and remove the laundry basket / dirty dishes / iPad. Retake.
- **Stage subtly.** Open a book on a side table. Make the bed properly. Avoid the staged-museum look.
- **First photo is the listing card.** Pick the strongest one.
- **At least 5 photos. Ideally 8–12.** Below 5 looks lazy; above 15 looks padded.

## Lead workflow

1. A visitor fills out the form on `/contact` or a listing page.
2. You get an email at your personal Gmail (forwarded from `hello@yourdomain.ca`).
3. The lead is also appended to your Google Sheet (via the Apps Script webhook — see `docs/OPERATOR_ONBOARDING.md`).
4. **Reply within one business day.** Same day where possible. Speed-to-lead is the single biggest factor in conversion.
5. If you can't, set up a vacation auto-reply on the Gmail filter so they know you're not ghosting them.

## When to upgrade

The site is built to grow with you. Each of these has a clear upgrade trigger:

| You should add | When |
|---|---|
| Twilio SMS speed-to-lead | After your first closed deal |
| Past-client review request automation | After 3 closed deals |
| Follow Up Boss CRM | When you have 5+ leads/wk |
| Google Reviews API integration | When you have 10+ Google reviews |
| 3rd-party IDX widget ($80–150/mo) | When you decide cold-browse traffic matters more than referrals |

Talk to your developer before adding any of these. Each one costs money to integrate.

## Emergencies

**The site is down.**
- the host (Vercel / Netlify) dashboard → check the latest deploy. Roll back to a previous deploy if needed (free, one click).
- If the host or Cloudflare itself is down (rare), there's nothing to do — wait it out.

**A listing has a typo or wrong price.**
- Edit in `/admin` → save. Live in ~60 seconds.
- If you can't reach `/admin`, edit the JSON directly via the GitHub web UI on the `main` branch.

**Someone unsubscribes.**
- They'll email you. Remove them from any list you maintain (CASL requires action within 10 business days).

**Lost access to `/admin`.**
- You can always edit `src/content/listings/index.json` directly via GitHub's web UI. The CMS is convenience, not necessity.

## Things you must keep current (for compliance)

- `siteConfig.realtor.recoNumber` — your RECO registration number
- `siteConfig.brokerage` — name, address, phone, brokerage RECO number
- Listing brokerage attribution on every listing
- Annual renewal of RECO registration (RECO sends reminders)

If you leave a brokerage, update the brokerage block IMMEDIATELY — don't let it sit. Brokerage representation is legally required on every page.
