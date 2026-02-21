"use client";

import { forwardRef, type InputHTMLAttributes, useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text rendered above the input. */
  label?: string;
  /** Error message – switches the input into an error visual state. */
  error?: string;
  /** Subtle helper text displayed below the input. */
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id: idProp, ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

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

        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            "h-10 w-full rounded-xl border bg-surface px-4 text-base text-text-primary placeholder:text-text-muted",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
            error
              ? "border-secondary focus:ring-secondary/50 focus:border-secondary"
              : "border-border",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />

        {error && (
          <p id={errorId} className="text-sm text-secondary" role="alert">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-sm text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
