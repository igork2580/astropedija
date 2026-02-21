import type { Metadata } from "next";
import Link from "next/link";
import { aspects } from "@/data/aspects";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Astrološki aspekti",
  description: "Saznajte sve o astrološkim aspektima - konjunkcija, opozicija, trigon, kvadrat, sekstil i drugi uglovi između planeta.",
};

export default function AspektiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Aspekti" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Astrološki aspekti</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Aspekti su uglovi koje planete formiraju međusobno. Oni pokazuju kako se različite energije u karti povezuju.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {aspects.map((aspect) => (
          <Link
            key={aspect.slug}
            href={`/aspekti/${aspect.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:bg-surface-hover hover:-translate-y-1"
          >
            <span className="text-3xl mb-2">{aspect.symbol}</span>
            <span className="font-semibold text-text-primary group-hover:text-primary transition-colors">
              {aspect.name}
            </span>
            <span className="text-xs text-text-muted mt-1">{aspect.angle}°</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
