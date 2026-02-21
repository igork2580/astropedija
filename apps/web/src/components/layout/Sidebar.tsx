import Link from "next/link";
import { cn } from "@/lib/utils";
import { zodiacSigns } from "@/data/zodiac-signs";
import { CurrentPlanetsWidget } from "@/components/sky";
import { MoonPhaseWidget } from "@/components/sky";

/* ------------------------------------------------------------------ */
/*  Sidebar card wrapper                                               */
/* ------------------------------------------------------------------ */

function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-5",
        "shadow-lg shadow-black/10",
      )}
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Zodiac signs grid                                                  */
/* ------------------------------------------------------------------ */

function ZodiacSignsGrid() {
  return (
    <SidebarCard title="Znakovi zodijaka">
      <div className="grid grid-cols-3 gap-2">
        {zodiacSigns.map((sign) => (
          <Link
            key={sign.slug}
            href={`/znakovi/${sign.slug}`}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl p-2.5",
              "text-text-secondary transition-all duration-150",
              "hover:bg-surface-hover hover:text-text-primary hover:scale-105",
            )}
          >
            <span className="text-2xl" aria-hidden="true">
              {sign.symbol}
            </span>
            <span className="text-xs font-medium">{sign.name}</span>
          </Link>
        ))}
      </div>
    </SidebarCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Current sky section (real widgets)                                  */
/* ------------------------------------------------------------------ */

function CurrentSkySection() {
  return (
    <SidebarCard title="Trenutno nebo">
      <div className="space-y-4">
        <CurrentPlanetsWidget />
        <MoonPhaseWidget />
        <Link
          href="/trenutne-planete"
          className={cn(
            "block text-center text-sm font-medium",
            "text-primary hover:text-primary-light transition-colors duration-150",
          )}
        >
          Detaljni pregled &rarr;
        </Link>
      </div>
    </SidebarCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Popular calculators                                                */
/* ------------------------------------------------------------------ */

const popularCalculators = [
  { label: "Natalna karta", href: "/izrada-natalne-karte" },
  { label: "Uporedna karta", href: "/uporedna-natalna-karta" },
  { label: "Kompozit horoskop", href: "/kompozit-horoskop" },
  { label: "Tranziti", href: "/natalna-karta-tranziti" },
  { label: "Solarni horoskop", href: "/solarni-horoskop" },
  { label: "Numerologija", href: "/numerologija-kalkulator" },
];

function PopularCalculators() {
  return (
    <SidebarCard title="Popularni kalkulatori">
      <ul className="space-y-1">
        {popularCalculators.map((calc) => (
          <li key={calc.href}>
            <Link
              href={calc.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm",
                "text-text-secondary transition-colors duration-150",
                "hover:bg-surface-hover hover:text-primary",
              )}
            >
              <span className="text-primary" aria-hidden="true">
                &#9656;
              </span>
              {calc.label}
            </Link>
          </li>
        ))}
      </ul>
    </SidebarCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar (Server Component)                                         */
/* ------------------------------------------------------------------ */

export function Sidebar() {
  return (
    <div className="space-y-6">
      <ZodiacSignsGrid />
      <CurrentSkySection />
      <PopularCalculators />
    </div>
  );
}
