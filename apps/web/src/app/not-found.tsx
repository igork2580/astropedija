import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <span className="text-6xl">404</span>
      <h1 className="mt-4 text-2xl font-bold">Stranica nije pronađena</h1>
      <p className="mt-3 text-text-secondary">
        Stranica koju tražite ne postoji ili je premeštena.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
      >
        Nazad na početnu
      </Link>
    </div>
  );
}
