import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "AstroPut: besplatni astrološki kalkulatori zasnovani na Swiss Ephemeris, enciklopedija sa 600+ članaka i dnevni horoskop — sve na srpskom.",
};

export default function ONamaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "O nama" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">O nama</h1>
      <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
        <p>
          {brand.name} postoji zato što kvalitetan astrološki sadržaj na srpskom
          praktično ne postoji. Većina sajtova nudi prepisane horoskope i
          površne opise znakova. Mi smo hteli nešto ozbiljnije — mesto gde
          možete izračunati tačnu natalnu kartu, pogledati gde su planete sad,
          i zapravo razumeti šta to znači.
        </p>
        <h2 className="text-2xl font-bold text-text-primary">
          Kako funkcioniše
        </h2>
        <p>
          Svi proračuni na sajtu koriste{" "}
          <strong>Swiss Ephemeris</strong> — istu astronomsku biblioteku koju
          koriste profesionalni astrološki programi. To znači da su pozicije
          planeta tačne na delić lučne sekunde. Natalnu kartu, sinastiju,
          solarni povratak, tranzite — sve računamo na istom nivou preciznosti
          koji biste dobili u skupom desktop softveru.
        </p>
        <p>
          Pored kalkulatora, imamo enciklopediju sa{" "}
          <strong>preko 600 članaka</strong> — znakovi, planete, kuće, aspekti,
          dignitet, fiksne zvezde. Svaki članak je pisan da bude razumljiv i
          onome ko tek počinje i onome ko već tumači karte.
        </p>
        <h2 className="text-2xl font-bold text-text-primary">
          Zašto besplatno
        </h2>
        <p>
          Sajt je potpuno besplatan i ne zahteva registraciju. Nema paywall-a,
          nema „premium tumačenja", nema skrivenih troškova. Otvorite
          kalkulator, unesite podatke, dobijete rezultat. Smatramo da osnovni
          astrološki alati treba da budu dostupni svima — naročito kad na
          srpskom do sada nije bilo ničeg uporedivog.
        </p>
      </div>
    </div>
  );
}
