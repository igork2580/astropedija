"use client";

import { forwardRef, type SelectHTMLAttributes, useId } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Label text rendered above the select. */
  label?: string;
  /** Error message. */
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id: idProp, children, ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const errorId = `${id}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "h-10 w-full appearance-none rounded-xl border bg-surface px-4 pr-10 text-base text-text-primary",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
              error
                ? "border-secondary focus:ring-secondary/50 focus:border-secondary"
                : "border-border",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            {...props}
          >
            {children}
          </select>

          {/* Chevron icon */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {error && (
          <p id={errorId} className="text-sm text-secondary" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
