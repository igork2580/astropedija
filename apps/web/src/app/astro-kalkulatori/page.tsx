import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Astro kalkulatori",
  description: "Besplatni astrološki kalkulatori - natalna karta, sinastija, kompozit, tranziti, solarni horoskop, numerologija i više.",
};

const calculators = [
  { title: "Natalna karta", href: "/izrada-natalne-karte", description: "Kompletna natalna karta sa interpretacijom", icon: "🗺️" },
  { title: "Uporedna karta (Sinastija)", href: "/uporedna-natalna-karta", description: "Kompatibilnost dve osobe", icon: "💑" },
  { title: "Kompozit horoskop", href: "/kompozit-horoskop", description: "Kompozitna karta para", icon: "🤝" },
  { title: "Natalna karta + tranziti", href: "/natalna-karta-tranziti", description: "Trenutni tranziti nad natalnom kartom", icon: "🔄" },
  { title: "Solarni horoskop", href: "/solarni-horoskop", description: "Solarna karta za godinu", icon: "☀️" },
  { title: "Numerologija kalkulator", href: "/numerologija-kalkulator", description: "Izračunajte vaš životni broj", icon: "🔢" },
];

export default function AstroKalkulatoriPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Astro kalkulatori" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Astro kalkulatori</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Koristite naše besplatne astrološke kalkulatore za izradu natalne karte, sinastije, tranzita i više.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/50 hover:bg-surface-hover hover:-translate-y-1"
          >
            <span className="text-3xl mb-3">{calc.icon}</span>
            <h2 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
              {calc.title}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">{calc.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
