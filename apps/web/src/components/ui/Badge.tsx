import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Variant styles                                                    */
/* ------------------------------------------------------------------ */

const variantStyles = {
  default: "bg-surface border-border text-text-secondary",
  fire: "bg-orange-500/15 border-orange-500/30 text-orange-400",
  earth: "bg-green-500/15 border-green-500/30 text-green-400",
  air: "bg-sky-500/15 border-sky-500/30 text-sky-400",
  water: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  cardinal: "bg-primary/15 border-primary/30 text-primary-light",
  fixed: "bg-secondary/15 border-secondary/30 text-secondary-light",
  mutable: "bg-purple-500/15 border-purple-500/30 text-purple-400",
} as const;

export type BadgeVariant = keyof typeof variantStyles;

/* ------------------------------------------------------------------ */
/*  Badge                                                             */
/* ------------------------------------------------------------------ */

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";

export { Badge };
