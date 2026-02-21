import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktirajte ${brand.name} tim - pitanja, sugestije i saradnja.`,
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Kontakt" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Kontakt</h1>
      <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
        <p>
          Dobrodošli na kontakt stranicu {brand.name}-a. Ukoliko imate pitanja,
          sugestije ili želite da nas kontaktirate iz bilo kog razloga, stojimo
          vam na raspolaganju.
        </p>
        <h2 className="text-2xl font-bold text-text-primary">
          Kako nas kontaktirati
        </h2>
        <p>
          Možete nam pisati putem elektronske pošte. Trudimo se da odgovorimo na
          sve poruke u roku od 48 sati. Za hitna pitanja u vezi sa
          funkcionisanjem sajta ili prijavom grešaka, molimo vas da to naznačite
          u naslovu poruke.
        </p>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="font-semibold text-text-primary">Email:</p>
          <a
            href="mailto:kontakt@astroput.com"
            className="text-primary hover:text-primary-light transition-colors"
          >
            kontakt@astroput.com
          </a>
        </div>
      </div>
    </div>
  );
}
