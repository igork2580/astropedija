import type { Metadata } from "next";
import Link from "next/link";
import { zodiacSigns } from "@/data/zodiac-signs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mesečni horoskop",
  description: "Pročitajte mesečni horoskop za sve zodijačke znakove. Pregled najvažnijih mesečnih tranzita.",
};

export const revalidate = 86400;

export default function MesecniHoroskopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Mesečni horoskop" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Mesečni horoskop</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Izaberite vaš zodijački znak i pročitajte mesečnu prognozu.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {zodiacSigns.map((sign) => (
          <Link
            key={sign.slug}
            href={`/mesecni-horoskop/${sign.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/50 hover:bg-surface-hover hover:-translate-y-1"
          >
            <span className="text-4xl mb-3">{sign.symbol}</span>
            <span className="font-semibold text-text-primary group-hover:text-primary transition-colors">{sign.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
