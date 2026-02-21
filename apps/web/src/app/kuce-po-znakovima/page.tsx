import type { Metadata } from "next";
import Link from "next/link";
import { zodiacSigns } from "@/data/zodiac-signs";
import { houses } from "@/data/houses";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kuće po znakovima",
  description: "Saznajte kako se svaka astrološka kuća izražava u svakom zodijačkom znaku. 144 kombinacije kuća i znakova.",
};

export default function KucePoZnakovima() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Kuće po znakovima" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Kuće po znakovima</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Znak na vrhu kuće pokazuje kako pristupate toj oblasti života i koje kvalitete unosite u nju.
      </p>
      <div className="mt-8 space-y-10">
        {houses.map((house) => (
          <div key={house.slug}>
            <h2 className="text-xl font-bold mb-4">
              <span className="text-primary">{house.number}.</span> {house.name}
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {zodiacSigns.map((sign) => (
                <Link
                  key={`${house.number}-${sign.slug}`}
                  href={`/kuce-po-znakovima/${house.number}-kuca-u-${sign.slug}`}
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
