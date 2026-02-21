export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    label: "Znakovi",
    href: "/znakovi",
    children: [
      { label: "Ovan", href: "/znakovi/ovan" },
      { label: "Bik", href: "/znakovi/bik" },
      { label: "Blizanci", href: "/znakovi/blizanci" },
      { label: "Rak", href: "/znakovi/rak" },
      { label: "Lav", href: "/znakovi/lav" },
      { label: "Devica", href: "/znakovi/devica" },
      { label: "Vaga", href: "/znakovi/vaga" },
      { label: "Skorpija", href: "/znakovi/skorpija" },
      { label: "Strelac", href: "/znakovi/strelac" },
      { label: "Jarac", href: "/znakovi/jarac" },
      { label: "Vodolija", href: "/znakovi/vodolija" },
      { label: "Ribe", href: "/znakovi/ribe" },
    ],
  },
  {
    label: "Horoskop",
    href: "/dnevni-horoskop",
    children: [
      { label: "Dnevni horoskop", href: "/dnevni-horoskop" },
      { label: "Nedeljni horoskop", href: "/nedeljni-horoskop" },
      { label: "Mesečni horoskop", href: "/mesecni-horoskop" },
      { label: "Ljubavni horoskop", href: "/ljubavni-horoskop" },
    ],
  },
  {
    label: "Kalkulatori",
    href: "/astro-kalkulatori",
    children: [
      { label: "Natalna karta", href: "/izrada-natalne-karte" },
      { label: "Uporedna karta", href: "/uporedna-natalna-karta" },
      { label: "Kompozit horoskop", href: "/kompozit-horoskop" },
      { label: "Tranziti", href: "/natalna-karta-tranziti" },
      { label: "Solarni horoskop", href: "/solarni-horoskop" },
      { label: "Progresivna karta", href: "/progresivna-karta" },
      { label: "Davison karta", href: "/davison-karta" },
      { label: "Numerologija", href: "/numerologija-kalkulator" },
    ],
  },
  {
    label: "Enciklopedija",
    href: "/planete",
    children: [
      { label: "Planete", href: "/planete" },
      { label: "Kuće", href: "/kuce" },
      { label: "Aspekti", href: "/aspekti" },
      { label: "Podznak", href: "/podznak" },
      { label: "Planete po znakovima", href: "/planete-po-znakovima" },
      { label: "Planete po kućama", href: "/planete-po-kucama" },
      { label: "Kuće po znakovima", href: "/kuce-po-znakovima" },
    ],
  },
  {
    label: "Nebo",
    href: "/trenutne-planete",
    children: [
      { label: "Trenutne planete", href: "/trenutne-planete" },
      { label: "Nadolazeći tranziti", href: "/tranziti" },
      { label: "Mesečeve faze", href: "/meseceve-faze" },
    ],
  },
];
