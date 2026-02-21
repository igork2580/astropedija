import Link from "next/link";
import { ZodiacGrid } from "@/components/zodiac";
import { CurrentPlanetsWidget, MoonPhaseWidget } from "@/components/sky";
import { TransitAlertBanner } from "@/components/sky/TransitAlertBanner";
import { generateWebSiteSchema } from "@/lib/jsonld";
import { brand } from "@/lib/brand";

const featuredCalculators = [
  {
    title: "Natalna karta",
    description: "Pozicije svih 10 planeta, 12 kuca i medjusobni aspekti — sa tumacenjem na srpskom. Treba vam samo datum, vreme i mesto rodjenja.",
    href: "/izrada-natalne-karte",
    icon: "🗺️",
  },
  {
    title: "Uporedna karta (Sinastija)",
    description: "Postavite dve natalne karte jednu preko druge i vidite gde se slazete, a gde se izazivate. Poredjenje planet po planet.",
    href: "/uporedna-natalna-karta",
    icon: "💑",
  },
  {
    title: "Tranziti",
    description: "Koje planete trenutno aktiviraju vasu natalnu kartu? Tranzitni pregled pokazuje aktivne aspekte za danasnji datum.",
    href: "/natalna-karta-tranziti",
    icon: "🔄",
  },
  {
    title: "Kompozit horoskop",
    description: "Jedna karta za dvoje — kompozit racuna srednje tacke izmedju vasih planeta i pokazuje dinamiku veze kao celine.",
    href: "/kompozit-horoskop",
    icon: "🤝",
  },
  {
    title: "Solarni horoskop",
    description: "Karta za vas sledeci rodjendan. Solarni povratak otkriva kljucne teme, izazove i prilike za narednih 12 meseci.",
    href: "/solarni-horoskop",
    icon: "☀️",
  },
  {
    title: "Numerologija",
    description: "Izracunajte broj zivotnog puta, broj sudbine i licni broj na osnovu datuma rodjenja i punog imena.",
    href: "/numerologija-kalkulator",
    icon: "🔢",
  },
];

const encyclopediaSections = [
  { title: "Zodijački znakovi", href: "/znakovi", count: 12, icon: "♈" },
  { title: "Planete", href: "/planete", count: 11, icon: "☉" },
  { title: "Kuće", href: "/kuce", count: 12, icon: "🏠" },
  { title: "Aspekti", href: "/aspekti", count: 8, icon: "△" },
  { title: "Podznak", href: "/podznak", count: 12, icon: "⬆️" },
  { title: "Ljubavni horoskop", href: "/ljubavni-horoskop", count: 144, icon: "❤️" },
];

export default function HomePage() {
  const websiteSchema = generateWebSiteSchema();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* Hero Section */}
      <section className="py-16 text-center sm:py-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
            {brand.name}
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary sm:text-xl">
          Precizni astroloski proracuni, natalne karte sa tumacenjem i enciklopedija
          sa 600+ clanaka — sve na srpskom, sve besplatno.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/izrada-natalne-karte"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40"
          >
            Izradite natalnu kartu
          </Link>
          <Link
            href="/dnevni-horoskop"
            className="inline-flex items-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:bg-surface-hover"
          >
            Dnevni horoskop
          </Link>
        </div>
      </section>

      {/* Zodiac Signs Grid */}
      <section className="pb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Zodijački znakovi</h2>
          <Link
            href="/znakovi"
            className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            Pogledaj sve →
          </Link>
        </div>
        <ZodiacGrid />
      </section>

      {/* Featured Calculators */}
      <section className="pb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Astro kalkulatori</h2>
          <Link
            href="/astro-kalkulatori"
            className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            Svi kalkulatori →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCalculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/50 hover:bg-surface-hover hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              <span className="text-3xl mb-3">{calc.icon}</span>
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                {calc.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {calc.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Encyclopedia Sections */}
      <section className="pb-16">
        <h2 className="mb-8 text-2xl font-bold">Enciklopedija astrologije</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {encyclopediaSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:border-primary/50 hover:bg-surface-hover"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                {section.icon}
              </span>
              <div>
                <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-text-muted">{section.count} članaka</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Horoscope Section */}
      <section className="pb-16">
        <h2 className="mb-8 text-2xl font-bold">Horoskop</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Dnevni horoskop", href: "/dnevni-horoskop", desc: "Kratka prognoza za danas — za svaki znak posebno" },
            { title: "Nedeljni horoskop", href: "/nedeljni-horoskop", desc: "Pregled nedelje po danima: kad potisnuti, kad napraviti potez" },
            { title: "Mesecni horoskop", href: "/mesecni-horoskop", desc: "Kljucni tranziti meseca i kako uticu na vas znak" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-border bg-surface p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-surface-hover hover:shadow-lg hover:shadow-primary/10"
            >
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Transit Alerts */}
      <section className="pb-16">
        <h2 className="mb-6 text-2xl font-bold">Nadolazeći tranziti</h2>
        <TransitAlertBanner />
      </section>


      {/* Current Sky */}
      <section className="pb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trenutno nebo</h2>
          <Link
            href="/trenutne-planete"
            className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            Detaljni pregled →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <CurrentPlanetsWidget />
          <MoonPhaseWidget />
        </div>
      </section>
    </div>
  );
}
