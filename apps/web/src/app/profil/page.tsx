"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-border rounded" />
          <div className="h-4 w-64 bg-border rounded" />
        </div>
      </div>
    );
  }

  if (!session) {
    redirect("/prijava");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Moj profil</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User info */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold mb-4">Informacije</h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-text-muted">Ime</dt>
              <dd className="text-text-primary font-medium">{session.user?.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-text-muted">Email</dt>
              <dd className="text-text-primary font-medium">{session.user?.email}</dd>
            </div>
          </dl>
        </div>

        {/* Quick links */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold mb-4">Brzi pristup</h2>
          <div className="space-y-3">
            <Link
              href="/moje-karte"
              className="block rounded-xl border border-border p-4 hover:border-primary/50 hover:bg-surface-hover transition-all"
            >
              <h3 className="font-medium text-text-primary">Moje karte</h3>
              <p className="text-sm text-text-muted">Pogledajte sačuvane natalne karte</p>
            </Link>
            <Link
              href="/izrada-natalne-karte"
              className="block rounded-xl border border-border p-4 hover:border-primary/50 hover:bg-surface-hover transition-all"
            >
              <h3 className="font-medium text-text-primary">Nova karta</h3>
              <p className="text-sm text-text-muted">Izradite novu natalnu kartu</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
