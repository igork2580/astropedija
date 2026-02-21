import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: `Politika privatnosti sajta ${brand.name} - informacije o prikupljanju i zaštiti vaših ličnih podataka.`,
};

export default function PolitikaPrivatnostiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Politika privatnosti" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Politika privatnosti
      </h1>
      <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
        <p>
          {brand.name} poštuje vašu privatnost i posvećen je zaštiti vaših
          ličnih podataka. Ova politika privatnosti objašnjava koje informacije
          prikupljamo, kako ih koristimo i kako ih štitimo.
        </p>
        <h2 className="text-2xl font-bold text-text-primary">
          Prikupljanje podataka
        </h2>
        <p>
          Prilikom korišćenja naših astroloških kalkulatora, podaci koje unosite
          (datum, vreme i mesto rođenja) čuvaju se lokalno u vašem pregledaču
          (localStorage) radi vašeg komfora. Ovi podaci se ne šalju na naše
          servere niti se dele sa trećim stranama.
        </p>
        <h2 className="text-2xl font-bold text-text-primary">Analitika</h2>
        <p>
          Koristimo Google Analytics za analizu posećenosti sajta, koji
          prikuplja anonimizovane podatke o korišćenju.
        </p>
        <h2 className="text-2xl font-bold text-text-primary">Vaša prava</h2>
        <p>
          Imate pravo da zatražite uvid u svoje podatke, njihovu ispravku ili
          brisanje. Za sva pitanja u vezi sa privatnošću, možete nas kontaktirati
          putem{" "}
          <a
            href="/kontakt"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            kontakt stranice
          </a>
          .
        </p>
        <p className="text-sm text-text-muted">
          Zadržavamo pravo da ažuriramo ovu politiku privatnosti. Sve promene će
          biti objavljene na ovoj stranici.
        </p>
      </div>
    </div>
  );
}
