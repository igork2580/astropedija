import type { Metadata } from "next";
import Link from "next/link";
import { planets } from "@/data/planets";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Planete u astrologiji",
  description: "Saznajte sve o planetama u astrologiji - Sunce, Mesec, Merkur, Venera, Mars, Jupiter, Saturn, Uran, Neptun i Pluton.",
};

export default function PlanetePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Planete" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Planete u astrologiji</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Planete su ključni elementi natalne karte. Svaka planeta predstavlja različitu energiju i aspekt ličnosti.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {planets.map((planet) => (
          <Link
            key={planet.slug}
            href={`/planete/${planet.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:bg-surface-hover hover:-translate-y-1"
          >
            <span className="text-3xl mb-2">{planet.symbol}</span>
            <span className="font-semibold text-text-primary group-hover:text-primary transition-colors">
              {planet.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
