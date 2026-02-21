import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium",
  description:
    "Nadogradite na AstroPut Premium za pristup AI interpretacijama, detaljnim tranzit izveštajima, PDF eksportu i više.",
};

const FEATURES_FREE = [
  "Natalne karte sa svim podacima",
  "Sinastija i kompozit karte",
  "Distribucije elemenata i kvaliteta",
  "Detekcija aspekatskih obrazaca",
  "Dnevni, nedeljni i mesečni horoskopi",
  "Enciklopedija sa 600+ članaka",
];

const FEATURES_PREMIUM = [
  "Sve iz besplatnog plana",
  "AI interpretacija natalne karte",
  "Detaljni tranzit izveštaji",
  "PDF eksport karata",
  "Progresivna karta",
  "Personalizovani uvidi",
  "Prioritetna podrška",
];

export default function PremiumPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-3xl mb-3">&#9733;</p>
        <h1 className="text-3xl font-bold sm:text-4xl">AstroPut Premium</h1>
        <p className="mt-3 text-lg text-text-secondary max-w-2xl mx-auto">
          Otključajte puni potencijal svoje astrološke karte sa AI
          interpretacijama, detaljnim izveštajima i personalizovanim uvidima.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Free plan */}
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-lg font-semibold text-text-primary">Besplatno</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Sve osnovne funkcije astrologije
          </p>
          <p className="mt-4">
            <span className="text-4xl font-bold text-text-primary">0</span>
            <span className="text-text-muted ml-1">RSD/mesečno</span>
          </p>
          <ul className="mt-6 space-y-3">
            {FEATURES_FREE.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                <svg
                  className="h-5 w-5 shrink-0 text-green-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled
            className="mt-8 w-full rounded-xl border border-border px-4 py-3 text-sm font-medium text-text-muted"
          >
            Trenutni plan
          </button>
        </div>

        {/* Premium plan */}
        <div className="rounded-2xl border-2 border-amber-500/50 bg-amber-500/5 p-8 relative">
          <div className="absolute -top-3 right-6">
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
              Preporučeno
            </span>
          </div>
          <h2 className="text-lg font-semibold text-text-primary">Premium</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Puni pristup svim funkcijama
          </p>
          <p className="mt-4">
            <span className="text-4xl font-bold text-text-primary">499</span>
            <span className="text-text-muted ml-1">RSD/mesečno</span>
          </p>
          <ul className="mt-6 space-y-3">
            {FEATURES_PREMIUM.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                <svg
                  className="h-5 w-5 shrink-0 text-amber-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-8 w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
          >
            Uskoro dostupno
          </button>
        </div>
      </div>
    </div>
  );
}
