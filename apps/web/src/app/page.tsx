import Link from "next/link";
import { ZodiacGrid } from "@/components/zodiac";
import { CurrentPlanetsWidget, MoonPhaseWidget } from "@/components/sky";
import { TransitAlertBanner } from "@/components/sky/TransitAlertBanner";
import { generateWebSiteSchema, generateSoftwareAppSchema } from "@/lib/jsonld";
import { brand } from "@/lib/brand";

const featuredCalculators = [
  {
    title: "Natalna karta",
    description:
      "Pozicije svih 10 planeta, 12 kuca i medjusobni aspekti sa tumacenjem na srpskom. Treba vam samo datum, vreme i mesto rodjenja.",
    href: "/izrada-natalne-karte",
    icon: "\u{1F5FA}\uFE0F",
  },
  {
    title: "Uporedna karta (Sinastija)",
    description:
      "Postavite dve natalne karte jednu preko druge i vidite gde se slazete, a gde se izazivate. Poredjenje planet po planet.",
    href: "/uporedna-natalna-karta",
    icon: "\u{1F491}",
  },
  {
    title: "Tranziti",
    description:
      "Koje planete trenutno aktiviraju vasu natalnu kartu? Tranzitni pregled pokazuje aktivne aspekte za danasnji datum.",
    href: "/natalna-karta-tranziti",
    icon: "\u{1F504}",
  },
  {
    title: "Kompozit horoskop",
    description:
      "Jedna karta za dvoje. Kompozit racuna srednje tacke izmedju vasih planeta i pokazuje dinamiku veze kao celine.",
    href: "/kompozit-horoskop",
    icon: "\u{1F91D}",
  },
  {
    title: "Solarni horoskop",
    description:
      "Karta za vas sledeci rodjendan. Solarni povratak otkriva kljucne teme, izazove i prilike za narednih 12 meseci.",
    href: "/solarni-horoskop",
    icon: "\u2600\uFE0F",
  },
  {
    title: "Numerologija",
    description:
      "Izracunajte broj zivotnog puta, broj sudbine i licni broj na osnovu datuma rodjenja i punog imena.",
    href: "/numerologija-kalkulator",
    icon: "\u{1F522}",
  },
];

const encyclopediaSections = [
  { title: "Zodijački znakovi", href: "/znakovi", count: 12, icon: "\u2648" },
  { title: "Planete", href: "/planete", count: 11, icon: "\u2609" },
  { title: "Kuće", href: "/kuce", count: 12, icon: "\u{1F3E0}" },
  { title: "Aspekti", href: "/aspekti", count: 8, icon: "\u25B3" },
  { title: "Podznak", href: "/podznak", count: 12, icon: "\u2B06\uFE0F" },
  {
    title: "Ljubavni horoskop",
    href: "/ljubavni-horoskop",
    count: 144,
    icon: "\u2764\uFE0F",
  },
];

export default function HomePage() {
  const websiteSchema = generateWebSiteSchema();
  const appSchema = generateSoftwareAppSchema();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* ============================================================= */}
      {/*  Hero Section — full-width with gradient overlay               */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Radial glow behind headline */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/8 blur-[120px]" />
          {/* Floating constellation dots */}
          <div className="absolute left-[15%] top-[20%] h-1 w-1 rounded-full bg-amber-300/60 animate-pulse" />
          <div className="absolute right-[20%] top-[30%] h-1.5 w-1.5 rounded-full bg-primary-light/50 animate-pulse [animation-delay:1s]" />
          <div className="absolute left-[30%] bottom-[25%] h-1 w-1 rounded-full bg-amber-400/40 animate-pulse [animation-delay:0.5s]" />
          <div className="absolute right-[35%] top-[15%] h-0.5 w-0.5 rounded-full bg-white/30 animate-pulse [animation-delay:1.5s]" />
          <div className="absolute left-[60%] bottom-[35%] h-1 w-1 rounded-full bg-primary/40 animate-pulse [animation-delay:2s]" />
          <div className="absolute right-[10%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-amber-300/30 animate-pulse [animation-delay:0.8s]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            {/* Decorative zodiac wheel accent */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-sm sm:text-sm">
              <span className="text-amber-400">\u2609</span>
              <span>600+ clanaka</span>
              <span className="text-text-muted">\u00B7</span>
              <span>8 kalkulatora</span>
              <span className="text-text-muted">\u00B7</span>
              <span>Sve besplatno</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                {brand.name}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
              Precizni astroloski proracuni, natalne karte sa tumacenjem i
              enciklopedija sa 600+ clanaka. Sve na srpskom, sve besplatno.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href="/izrada-natalne-karte"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 sm:w-auto"
              >
                Izradite natalnu kartu
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/dnevni-horoskop"
                className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-surface/60 px-7 py-3.5 text-sm font-semibold text-text-primary backdrop-blur-sm transition-all duration-300 hover:bg-surface-hover hover:border-primary/30 sm:w-auto"
              >
                Dnevni horoskop
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted sm:text-sm">
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Swiss Ephemeris preciznost
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Bez registracije
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Na srpskom jeziku
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* All remaining sections use the standard max-width container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================= */}
        {/*  Zodiac Signs Grid                                             */}
        {/* ============================================================= */}
        <section className="pb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Zodijački znakovi</h2>
            <Link
              href="/znakovi"
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              Pogledaj sve \u2192
            </Link>
          </div>
          <ZodiacGrid />
        </section>

        {/* ============================================================= */}
        {/*  Featured Calculators                                          */}
        {/* ============================================================= */}
        <section className="pb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Astro kalkulatori</h2>
            <Link
              href="/astro-kalkulatori"
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              Svi kalkulatori \u2192
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

        {/* ============================================================= */}
        {/*  Encyclopedia Sections                                         */}
        {/* ============================================================= */}
        <section className="pb-16">
          <h2 className="mb-8 text-2xl font-bold">
            Enciklopedija astrologije
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {encyclopediaSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:border-primary/50 hover:bg-surface-hover"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                  {section.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-text-muted">
                    {section.count} članaka
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================================= */}
        {/*  Horoscope Section                                             */}
        {/* ============================================================= */}
        <section className="pb-16">
          <h2 className="mb-8 text-2xl font-bold">Horoskop</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Dnevni horoskop",
                href: "/dnevni-horoskop",
                desc: "Kratka prognoza za danas, za svaki znak posebno",
                icon: "\u2609",
              },
              {
                title: "Nedeljni horoskop",
                href: "/nedeljni-horoskop",
                desc: "Pregled nedelje po danima: kad potisnuti, kad napraviti potez",
                icon: "\u{1F4C5}",
              },
              {
                title: "Mesecni horoskop",
                href: "/mesecni-horoskop",
                desc: "Kljucni tranziti meseca i kako uticu na vas znak",
                icon: "\u{1F319}",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-border bg-surface p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-surface-hover hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                <span className="mb-3 inline-block text-3xl">{item.icon}</span>
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================================= */}
        {/*  Transit Alerts                                                */}
        {/* ============================================================= */}
        <section className="pb-16">
          <h2 className="mb-6 text-2xl font-bold">Nadolazeci tranziti</h2>
          <TransitAlertBanner />
        </section>

        {/* ============================================================= */}
        {/*  Current Sky                                                   */}
        {/* ============================================================= */}
        <section className="pb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Trenutno nebo</h2>
            <Link
              href="/trenutne-planete"
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              Detaljni pregled \u2192
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <CurrentPlanetsWidget />
            <MoonPhaseWidget />
          </div>
        </section>
      </div>
    </div>
  );
}
