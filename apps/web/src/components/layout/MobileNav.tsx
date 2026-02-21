"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mainNavigation, type NavItem } from "@/data/navigation";

/* ------------------------------------------------------------------ */
/*  Accordion section for a single nav group                          */
/* ------------------------------------------------------------------ */

function AccordionSection({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="border-b border-border last:border-b-0">
      <div className="flex items-center">
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex-1 px-6 py-4 text-lg font-medium transition-colors duration-150",
            "text-text-primary hover:text-primary",
          )}
        >
          {item.label}
        </Link>

        {hasChildren && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "flex items-center justify-center px-6 py-4",
              "text-text-muted hover:text-text-primary transition-colors duration-150",
            )}
            aria-label={expanded ? "Zatvori" : "Otvori"}
          >
            <svg
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                expanded && "rotate-180",
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
          </button>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="bg-surface pb-2">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className={cn(
                "block px-10 py-3 text-base transition-colors duration-150",
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
/*  MobileNav                                                          */
/* ------------------------------------------------------------------ */

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        "transition-all duration-300",
        isOpen
          ? "visible opacity-100"
          : "invisible opacity-0 pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-full max-w-sm",
          "bg-gradient-to-b from-bg-start via-bg-mid to-bg-end",
          "border-l border-border shadow-2xl",
          "flex flex-col",
          "transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="text-xl font-bold text-text-primary"
          >
            <span className="mr-2">&#9733;</span>
            Astropedija
          </Link>

          <button
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex items-center justify-center rounded-lg p-2",
              "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
              "transition-colors duration-200",
            )}
            aria-label="Zatvori meni"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto">
          {mainNavigation.map((item) => (
            <AccordionSection
              key={item.href}
              item={item}
              onNavigate={onClose}
            />
          ))}
        </nav>

        {/* Bottom links */}
        <div className="border-t border-border px-6 py-4 space-y-2">
          <Link
            href="/politika-privatnosti"
            onClick={onClose}
            className="block text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            Politika privatnosti
          </Link>
          <Link
            href="/kontakt"
            onClick={onClose}
            className="block text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}
