import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: {
    default: `${brand.name} - ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  metadataBase: new URL(brand.url),
  openGraph: {
    type: "website",
    locale: brand.locale,
    siteName: brand.name,
  },
  manifest: "/manifest.json",
};

/** Inline script to prevent FOUC — sets data-theme before first paint. */
const themeScript = `(function(){try{var t=localStorage.getItem("astroput-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}else if(window.matchMedia("(prefers-color-scheme:light)").matches){document.documentElement.setAttribute("data-theme","light")}}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={brand.language} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MGSFBH8N6H" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MGSFBH8N6H');` }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <ThemeProvider>
            <AnimationProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </AnimationProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
