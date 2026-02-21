import type { Metadata } from "next";
import Link from "next/link";
import { planets } from "@/data/planets";
import { zodiacSigns } from "@/data/zodiac-signs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Planete po znakovima",
  description: "Saznajte kako se svaka planeta izražava u svakom zodijačkom znaku. 132 kombinacije planeta i znakova.",
};

export default function PlanetePoZnakovima() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Planete po znakovima" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Planete po znakovima</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Svaka planeta se drugačije izražava u zavisnosti od zodijačkog znaka u kome se nalazi.
      </p>
      <div className="mt-8 space-y-10">
        {planets.map((planet) => (
          <div key={planet.slug}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>{planet.symbol}</span> {planet.name}
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {zodiacSigns.map((sign) => (
                <Link
                  key={`${planet.slug}-${sign.slug}`}
                  href={`/planete-po-znakovima/${planet.slug}-u-${sign.slug}`}
                  className="group flex flex-col items-center rounded-xl border border-border bg-surface p-3 text-center transition-all hover:border-primary/50 hover:bg-surface-hover"
                >
                  <span className="text-lg">{sign.symbol}</span>
                  <span className="text-xs font-medium text-text-secondary group-hover:text-primary mt-1">
                    {sign.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
