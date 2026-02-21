import type { Metadata } from "next";
import Link from "next/link";
import { houses } from "@/data/houses";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Astrološke kuće",
  description: "Saznajte sve o 12 astroloških kuća - oblasti života koje svaka kuća predstavlja i kako ih tumačiti u natalnoj karti.",
};

export default function KucePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Kuće" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Astrološke kuće</h1>
      <p className="mt-3 text-lg text-text-secondary">
        12 astroloških kuća predstavljaju različite oblasti života. Svaka kuća otkriva gde se energija planeta manifestuje.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {houses.map((house) => (
          <Link
            key={house.slug}
            href={`/kuce/${house.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:bg-surface-hover hover:-translate-y-1"
          >
            <span className="text-3xl font-bold mb-2 text-primary">{house.number}</span>
            <span className="font-semibold text-text-primary group-hover:text-primary transition-colors text-center">
              {house.name}
            </span>
            <span className="text-xs text-text-muted mt-1">{house.naturalSign}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
