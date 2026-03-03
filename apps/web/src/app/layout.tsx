import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { brand } from "@/lib/brand";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/jsonld";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0c29" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${brand.name} - ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  metadataBase: new URL(brand.url),
  keywords: [
    "astrologija",
    "natalna karta",
    "horoskop",
    "zodijak",
    "tranziti",
    "sinastija",
    "astroloski kalkulator",
    "dnevni horoskop",
    "nedeljni horoskop",
    "planete",
    "kuce u horoskopu",
    "aspekti",
  ],
  authors: [{ name: brand.name, url: brand.url }],
  creator: brand.name,
  publisher: brand.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: brand.locale,
    url: brand.url,
    siteName: brand.name,
    title: `${brand.name} - ${brand.tagline}`,
    description: brand.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@astroput",
    title: `${brand.name} - ${brand.tagline}`,
    description: brand.shortDescription,
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  category: "astrology",
};

/** Inline script to prevent FOUC — sets data-theme before first paint. */
const themeScript = `(function(){try{var t=localStorage.getItem("astroput-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}else if(window.matchMedia("(prefers-color-scheme:light)").matches){document.documentElement.setAttribute("data-theme","light")}}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();
  const siteSchema = generateWebSiteSchema();
  // Note: dangerouslySetInnerHTML is safe here — all JSON-LD content comes from
  // trusted internal brand constants / schema generators, not user input.
  const orgJsonLd = JSON.stringify({ "@context": "https://schema.org", ...orgSchema });
  const siteJsonLd = JSON.stringify(siteSchema);

  return (
    <html lang={brand.language} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MGSFBH8N6H" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MGSFBH8N6H');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgJsonLd }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: siteJsonLd }} />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Preskoči na sadržaj
        </a>
        <SessionProvider>
          <ThemeProvider>
            <AnimationProvider>
              <Header />
              <main id="main-content" className="flex-1">{children}</main>
              <Footer />
            </AnimationProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
