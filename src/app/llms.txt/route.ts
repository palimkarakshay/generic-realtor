import { siteConfig } from "@/lib/site-config";

/**
 * llms.txt — a brief, AI-crawler-friendly summary of who this is.
 * Discoverability matters more than opacity for a brand-new realtor.
 */
export function GET() {
  const body = `# ${siteConfig.realtor.name}

${siteConfig.realtor.title} with ${siteConfig.brokerage.name}, serving Kitchener, Waterloo, and Cambridge, Ontario.

${siteConfig.realtor.bioShort}

## Contact
- Email: ${siteConfig.realtor.email}
- Phone: ${siteConfig.realtor.phone}
- Site: ${siteConfig.site.url}
- Book a call: ${siteConfig.calendly.url}

## Services
- Buying a home (see ${siteConfig.site.url}/buy)
- Renting (see ${siteConfig.site.url}/rent)
- Selling (see ${siteConfig.site.url}/sell)
- Leasing out a property (see ${siteConfig.site.url}/lease-out)

## Neighborhoods served
${siteConfig.neighborhoods.map((n) => `- ${n.name} — ${siteConfig.site.url}/neighborhoods/${n.slug}`).join("\n")}

## Compliance
- ${siteConfig.realtor.tresaClass}, RECO #${siteConfig.realtor.recoNumber}
- ${siteConfig.brokerage.name}, Brokerage RECO #${siteConfig.brokerage.recoNumber}
- ${siteConfig.compliance.independent}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
