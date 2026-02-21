import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Uslovi korišćenja",
  description: `Uslovi korišćenja sajta ${brand.name}.`,
};

export default function UsloviKoriscenjaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Uslovi korišćenja" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Uslovi korišćenja
      </h1>
      <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
        <p>
          Korišćenjem sajta {brand.name} prihvatate sledeće uslove. Molimo vas
          da ih pažljivo pročitate.
        </p>
        <h2 className="text-2xl font-bold text-text-primary">
          Priroda sadržaja
        </h2>
        <p>
          Sav astrološki sadržaj na ovom sajtu je informativnog i zabavnog
          karaktera. {brand.name} ne pruža medicinske, pravne, finansijske ili
          bilo koje druge stručne savete. Astrološke informacije ne treba
          koristiti kao zamenu za profesionalni savet.
        </p>
        <h2 className="text-2xl font-bold text-text-primary">
          Korišćenje kalkulatora
        </h2>
        <p>
          Naši astrološki kalkulatori koriste astronomske podatke za izračunavanje
          pozicija nebeskih tela. Rezultati su zasnovani na astronomskim
          proračunima i tradicionalnim astrološkim tumačenjima.
        </p>
        <h2 className="text-2xl font-bold text-text-primary">
          Intelektualna svojina
        </h2>
        <p>
          Sav sadržaj na sajtu {brand.name}, uključujući tekstove, grafiku i
          softver, zaštićen je autorskim pravima. Neovlašćeno kopiranje ili
          distribucija sadržaja je zabranjeno.
        </p>
        <h2 className="text-2xl font-bold text-text-primary">
          Izmene uslova
        </h2>
        <p className="text-sm text-text-muted">
          Zadržavamo pravo da izmenimo ove uslove korišćenja u bilo kom
          trenutku. Nastavkom korišćenja sajta nakon izmena, prihvatate
          ažurirane uslove.
        </p>
      </div>
    </div>
  );
}
