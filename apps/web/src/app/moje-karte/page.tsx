"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function SavedChartsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-border rounded" />
          <div className="h-32 w-full bg-border rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!session) {
    redirect("/prijava");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Moje karte</h1>
        <Link
          href="/izrada-natalne-karte"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          Nova karta
        </Link>
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border border-border bg-surface p-12 text-center">
        <p className="text-4xl mb-4">&#9733;</p>
        <h2 className="text-lg font-semibold mb-2">Nemate sačuvanih karata</h2>
        <p className="text-sm text-text-secondary mb-6">
          Kada izradite natalnu kartu, možete je sačuvati ovde za brzi pristup.
        </p>
        <Link
          href="/izrada-natalne-karte"
          className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-all"
        >
          Izradite prvu kartu
        </Link>
      </div>
    </div>
  );
}
