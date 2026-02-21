"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) {
    return (
      <div className="hidden items-center gap-2 md:flex">
        <Link
          href="/prijava"
          className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Prijava
        </Link>
        <Link
          href="/registracija"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          Registracija
        </Link>
      </div>
    );
  }

  const initials = session.user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  return (
    <div ref={menuRef} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary hover:bg-primary/30 transition-colors"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-bg-end/95 backdrop-blur-xl shadow-xl py-2 z-50">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-medium text-text-primary">{session.user.name}</p>
            <p className="text-xs text-text-muted">{session.user.email}</p>
          </div>
          <Link
            href="/profil"
            onClick={() => setOpen(false)}
            className={cn(
              "block px-4 py-2.5 text-sm transition-colors",
              "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
            )}
          >
            Moj profil
          </Link>
          <Link
            href="/moje-karte"
            onClick={() => setOpen(false)}
            className={cn(
              "block px-4 py-2.5 text-sm transition-colors",
              "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
            )}
          >
            Moje karte
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className={cn(
              "w-full text-left px-4 py-2.5 text-sm transition-colors border-t border-border",
              "text-text-secondary hover:text-secondary hover:bg-surface-hover",
            )}
          >
            Odjavite se
          </button>
        </div>
      )}
    </div>
  );
}
