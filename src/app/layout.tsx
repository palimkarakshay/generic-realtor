import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.site.url),
  title: {
    default: siteConfig.site.name,
    template: `%s · ${siteConfig.realtor.name}`,
  },
  description: siteConfig.site.description,
  applicationName: siteConfig.site.shortName,
  openGraph: {
    type: "website",
    locale: siteConfig.site.locale,
    siteName: siteConfig.site.shortName,
    title: siteConfig.site.name,
    description: siteConfig.site.description,
    url: siteConfig.site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.site.name,
    description: siteConfig.site.description,
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cloudflareToken = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;

  return (
    <html lang="en-CA">
      <body className="flex min-h-screen flex-col bg-canvas text-ink-soft antialiased">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        {cloudflareToken ? (
          <Script
            strategy="afterInteractive"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token":"${cloudflareToken}"}`}
          />
        ) : null}
      </body>
    </html>
  );
}
