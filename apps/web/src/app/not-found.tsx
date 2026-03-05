import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:py-32">
      {/* Decorative stars */}
      <div className="relative mx-auto mb-6 inline-block">
        <span className="text-7xl font-bold text-text-muted/20 sm:text-8xl">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-4xl">
          &#9733;
        </span>
      </div>

      <h1 className="text-2xl font-bold sm:text-3xl">
        Stranica nije pronadjena
      </h1>
      <p className="mx-auto mt-4 max-w-md text-text-secondary">
        Stranica koju trazite ne postoji ili je premestena. Proverite adresu ili
        se vratite na pocetnu.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 sm:w-auto"
        >
          Nazad na pocetnu
        </Link>
        <Link
          href="/dnevni-horoskop"
          className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:bg-surface-hover sm:w-auto"
        >
          Dnevni horoskop
        </Link>
      </div>
    </div>
  );
}
