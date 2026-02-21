import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SharedChartDisplay } from "./SharedChartDisplay";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Deljena karta - ${slug}`,
    description: "Pogledajte astrolosku kartu deljenu putem Astropedije.",
    robots: { index: false, follow: false },
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
