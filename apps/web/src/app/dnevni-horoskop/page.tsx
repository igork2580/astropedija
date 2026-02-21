import type { Metadata } from "next";
import Link from "next/link";
import { zodiacSigns } from "@/data/zodiac-signs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Dnevni horoskop",
  description: "Dnevni horoskop za svih 12 znakova — ažurira se svakodnevno. Ovan, Bik, Blizanci, Rak, Lav, Devica, Vaga, Škorpija, Strelac, Jarac, Vodolija, Ribe.",
};

export const revalidate = 3600; // ISR: 1 hour

export default function DnevniHoroskopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Dnevni horoskop" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Dnevni horoskop</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Izaberite znak i pročitajte dnevni horoskop — ljubav, posao, zdravlje, energija dana.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {zodiacSigns.map((sign) => (
          <Link
            key={sign.slug}
            href={`/dnevni-horoskop/${sign.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/50 hover:bg-surface-hover hover:-translate-y-1"
          >
            <span className="text-4xl mb-3">{sign.symbol}</span>
            <span className="font-semibold text-text-primary group-hover:text-primary transition-colors">
              {sign.name}
            </span>
            <span className="text-xs text-text-muted mt-1">{sign.dateRange}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
