import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PageLayoutProps {
  title: string;
  description?: string;
  sidebar?: ReactNode;
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  PageLayout                                                         */
/* ------------------------------------------------------------------ */

export function PageLayout({
  title,
  description,
  sidebar,
  children,
}: PageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1
          className={cn(
            "text-3xl font-bold tracking-tight text-text-primary sm:text-4xl",
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {/* Content area with optional sidebar */}
      {sidebar ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="min-w-0">{children}</div>

          {/* Sidebar */}
          <aside className="space-y-6">{sidebar}</aside>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
