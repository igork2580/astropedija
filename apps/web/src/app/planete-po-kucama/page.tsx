import type { Metadata } from "next";
import Link from "next/link";
import { planets } from "@/data/planets";
import { houses } from "@/data/houses";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Planete po kućama",
  description: "Saznajte kako se svaka planeta izražava u svakoj astrološkoj kući. 132 kombinacije planeta i kuća.",
};

export default function PlanetePoKucama() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Planete po kućama" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Planete po kućama</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Položaj planete u određenoj kući pokazuje u kojoj oblasti života se njena energija manifestuje.
      </p>
      <div className="mt-8 space-y-10">
        {planets.map((planet) => (
          <div key={planet.slug}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>{planet.symbol}</span> {planet.name}
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {houses.map((house) => (
                <Link
                  key={`${planet.slug}-${house.number}`}
                  href={`/planete-po-kucama/${planet.slug}-u-${house.number}-kuci`}
                  className="group flex flex-col items-center rounded-xl border border-border bg-surface p-3 text-center transition-all hover:border-primary/50 hover:bg-surface-hover"
                >
                  <span className="text-lg font-bold text-primary">{house.number}</span>
                  <span className="text-xs font-medium text-text-secondary group-hover:text-primary mt-1">
                    {house.name}
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
