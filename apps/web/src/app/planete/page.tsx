import type { Metadata } from "next";
import Link from "next/link";
import { planets } from "@/data/planets";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Planete u astrologiji — značenje i uticaj",
  description: "10 planeta u astrologiji — od ličnih (Sunce, Mesec, Merkur, Venera, Mars) do generacijskih (Uran, Neptun, Pluton). Značenje, ciklusi i uticaj na kartu.",
};

export default function PlanetePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Planete" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Planete u astrologiji</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Astrologija koristi 10 planeta podeljenih u tri grupe. Lične planete —
        Sunce, Mesec, Merkur, Venera i Mars — kreću se brzo i oblikuju
        svakodnevni temperament. Društvene planete, Jupiter i Saturn, menjaju
        znak na svake 1–2,5 godine i utiču na društveni položaj. Generacijske
        planete — Uran (7 god.), Neptun (14 god.) i Pluton (do 31 god. u jednom
        znaku) — definišu generacijske trendove. Razumevanje ovih ciklusa
        otkriva zašto neke oblasti života deluju ličnije, a neke kolektivnije.
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
