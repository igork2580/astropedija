import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Besplatni astroloski kalkulatori",
  description: "Natalna karta, sinastija, tranziti, kompozit i solarni horoskop — precizni proracuni sa tumacenjem na srpskom. Bez registracije.",
};

const calculators = [
  { title: "Natalna karta", href: "/izrada-natalne-karte", description: "10 planeta, 12 kuca, svi aspekti — kompletna karta sa tumacenjem", icon: "🗺️" },
  { title: "Uporedna karta (Sinastija)", href: "/uporedna-natalna-karta", description: "Poredjenje dve karte: gde se dopunjujete, gde se izazivate", icon: "💑" },
  { title: "Kompozit horoskop", href: "/kompozit-horoskop", description: "Jedna karta za dvoje — srednje tacke vasih planeta", icon: "🤝" },
  { title: "Natalna karta + tranziti", href: "/natalna-karta-tranziti", description: "Koje planete danas aktiviraju vasu natalnu kartu", icon: "🔄" },
  { title: "Solarni horoskop", href: "/solarni-horoskop", description: "Karta za sledecu godinu zivota — od rodjendana do rodjendana", icon: "☀️" },
  { title: "Numerologija kalkulator", href: "/numerologija-kalkulator", description: "Broj zivotnog puta, sudbine i licni broj iz datuma rodjenja", icon: "🔢" },
];

export default function AstroKalkulatoriPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Astro kalkulatori" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Astroloski kalkulatori</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Svi proracuni koriste Swiss Ephemeris — iste astronomske tablice koje koriste i profesionalni astroloski programi. Rezultate dobijate odmah, bez registracije.
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
