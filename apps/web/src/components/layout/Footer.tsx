import Link from "next/link";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

/* ------------------------------------------------------------------ */
/*  Footer column data                                                 */
/* ------------------------------------------------------------------ */

const footerColumns = [
  {
    title: "O nama",
    links: [
      { label: "O nama", href: "/o-nama" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Politika privatnosti", href: "/politika-privatnosti" },
      { label: "Uslovi koriscenja", href: "/uslovi-koriscenja" },
    ],
  },
  {
    title: "Enciklopedija",
    links: [
      { label: "Znakovi zodijaka", href: "/znakovi" },
      { label: "Planete", href: "/planete" },
      { label: "Kuce", href: "/kuce" },
      { label: "Aspekti", href: "/aspekti" },
      { label: "Podznak", href: "/podznak" },
    ],
  },
  {
    title: "Kalkulatori",
    links: [
      { label: "Natalna karta", href: "/izrada-natalne-karte" },
      { label: "Uporedna karta", href: "/uporedna-natalna-karta" },
      { label: "Kompozit horoskop", href: "/kompozit-horoskop" },
      { label: "Tranziti", href: "/natalna-karta-tranziti" },
      { label: "Solarni horoskop", href: "/solarni-horoskop" },
      { label: "Numerologija", href: "/numerologija-kalkulator" },
    ],
  },
  {
    title: "Horoskop",
    links: [
      { label: "Dnevni horoskop", href: "/dnevni-horoskop" },
      { label: "Nedeljni horoskop", href: "/nedeljni-horoskop" },
      { label: "Mesecni horoskop", href: "/mesecni-horoskop" },
      { label: "Ljubavni horoskop", href: "/ljubavni-horoskop" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-start/90">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm transition-colors duration-150",
                        "text-text-muted hover:text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-border" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold text-text-primary transition-colors hover:text-primary"
          >
            <span className="mr-1">&#9733;</span>
            {brand.name}
          </Link>

          {/* Copyright */}
          <p className="text-sm text-text-muted">
            {brand.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
