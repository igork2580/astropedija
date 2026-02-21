"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mainNavigation, type NavItem } from "@/data/navigation";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "@/components/auth";
import { brand } from "@/lib/brand";

/* ------------------------------------------------------------------ */
/*  Desktop dropdown for a single nav item                            */
/* ------------------------------------------------------------------ */

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
          "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
        )}
      >
        {item.label}
        {hasChildren && (
          <svg
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              open && "rotate-180",
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </Link>

      {hasChildren && open && (
        <div
          className={cn(
            "absolute top-full left-0 z-50 mt-1 min-w-[220px]",
            "rounded-xl border border-border bg-bg-end/95 backdrop-blur-xl",
            "shadow-xl shadow-black/30",
            "py-2 animate-in fade-in slide-in-from-top-2 duration-200",
          )}
        >
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "block px-4 py-2.5 text-sm transition-colors duration-150",
                "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full",
          "border-b border-border bg-bg-start/80 backdrop-blur-xl",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-text-primary transition-colors hover:text-primary"
          >
            <span className="text-2xl">&#9733;</span>
            {brand.name}
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {mainNavigation.map((item) => (
              <NavDropdown key={item.href} item={item} />
            ))}
          </nav>

          {/* Theme toggle + User menu + Mobile hamburger */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <UserMenu />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "inline-flex items-center justify-center rounded-lg p-2 md:hidden",
              "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
              "transition-colors duration-200",
            )}
            aria-label="Otvori meni"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
