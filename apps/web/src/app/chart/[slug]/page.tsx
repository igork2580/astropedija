import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { brand } from "@/lib/brand";
import { SharedChartDisplay } from "./SharedChartDisplay";

const API_URL = process.env.API_URL || "http://localhost:8000";

const CHART_TYPE_TITLES: Record<string, string> = {
  natal: "Natalna karta",
  synastry: "Uporedna karta (Sinastija)",
  composite: "Kompozit horoskop",
  transit: "Tranziti",
  "solar-return": "Solarni horoskop",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  let chartTypeTitle = "Astroloska karta";
  try {
    const res = await fetch(`${API_URL}/api/v1/share/${slug}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      chartTypeTitle = CHART_TYPE_TITLES[data.chart_type] || chartTypeTitle;
    }
  } catch {
    // Fall back to generic title
  }

  const title = `${chartTypeTitle} — ${brand.name}`;
  const description = `Pogledaj astrolosku kartu kreiranu na ${brand.name}-u — besplatni astroloski kalkulator.`;
  const url = `${brand.url}/chart/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: brand.name,
      locale: brand.locale,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function SharedChartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Pocetna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Deljena karta" },
        ]}
      />
      <div className="mt-6">
        <SharedChartDisplay slug={slug} />
      </div>
    </div>
  );
}
