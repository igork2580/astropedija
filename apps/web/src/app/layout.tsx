import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Astropedija - Enciklopedija astrologije",
    template: "%s | Astropedija",
  },
  description:
    "Astropedija je vaš vodič kroz svet astrologije. Besplatni astro kalkulatori, natalne karte, horoskop, zodijačke karakteristike i još mnogo toga.",
  metadataBase: new URL("https://astropedija.com"),
  openGraph: {
    type: "website",
    locale: "sr_RS",
    siteName: "Astropedija",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
