import type { Metadata } from "next";
import { ZodiacGrid } from "@/components/zodiac";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Zodijački znakovi",
  description:
    "Saznajte sve o 12 zodijačkih znakova - karakteristike, elementi, kvaliteti, vladajuće planete i mnogo više.",
};

export default function ZnakroviPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Zodijački znakovi" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Zodijački znakovi</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Istražite karakteristike svih 12 zodijačkih znakova, od Ovna do Riba.
      </p>
      <div className="mt-8">
        <ZodiacGrid />
      </div>
    </div>
  );
}
