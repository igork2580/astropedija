import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProgressedChartCalculator } from "@/components/calculator/ProgressedChartCalculator";

export const metadata: Metadata = {
  title: "Progresivna karta",
  description:
    "Izradite sekundarnu progresivnu kartu. Otkrijte kako se vaš horoskop razvija tokom života metodom dan-za-godinu.",
};

export default function ProgressedChartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Progresivna karta" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Progresivna karta
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Sekundarne progresije koriste metodu &quot;dan za godinu&quot; — svaki
        dan posle rođenja odgovara jednoj godini vašeg života. Otkrijte kako se
        vaše planetarne energije razvijaju tokom vremena.
      </p>
      <div className="mt-8">
        <ProgressedChartCalculator />
      </div>
    </div>
  );
}
