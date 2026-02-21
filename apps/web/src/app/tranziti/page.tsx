import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TransitCalendar } from "@/components/sky/TransitCalendar";

export const metadata: Metadata = {
  title: "Nadolazeći tranziti",
  description:
    "Pogledajte nadolazeće astrološke tranzite — ulasci planeta u nove znakove, retrograde i važni aspekti.",
};

export default function TransitsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Nebo", href: "/trenutne-planete" },
          { label: "Tranziti" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Nadolazeći tranziti
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Pratite planetarne tranzite — ulasci u nove znakove, retrograde i
        direktne stanice. Saznajte šta vas očekuje u narednim danima.
      </p>
      <div className="mt-8">
        <TransitCalendar />
      </div>
    </div>
  );
}
