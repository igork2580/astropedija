import type { Metadata } from "next";
import Link from "next/link";
import { houses } from "@/data/houses";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "12 astroloških kuća — oblasti života u natalnoj karti",
  description: "12 astroloških kuća pokriva oblasti od identiteta do karijere. Zavise od tačnog vremena rođenja i sistema kuća (Placidus, Koch i dr.).",
};

export default function KucePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Kuće" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Astrološke kuće</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Kuće u natalnoj karti zavise od tačnog vremena rođenja — razlika od samo
        4 minuta pomera ascendent za jedan stepen. Najčešći Placidus sistem deli
        ekliptiku na 12 nejednakih segmenata, gde svaka kuća pokriva konkretnu
        oblast života: 1. kuća određuje identitet i fizički izgled, 7. partnerstvo,
        10. karijeru i javni ugled. Planete u kući pojačavaju tu temu, a prazan
        sektor ne znači da je oblast zanemarena — njen vladar pokazuje gde se
        energija usmerava.
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
