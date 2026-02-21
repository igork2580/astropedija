import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Card                                                              */
/* ------------------------------------------------------------------ */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border bg-surface",
        "transition-all duration-300",
        "hover:bg-surface-hover hover:shadow-lg hover:shadow-primary/5",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

/* ------------------------------------------------------------------ */
/*  CardHeader                                                        */
/* ------------------------------------------------------------------ */

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pt-6 pb-2", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

/* ------------------------------------------------------------------ */
/*  CardContent                                                       */
/* ------------------------------------------------------------------ */

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

/* ------------------------------------------------------------------ */
/*  CardFooter                                                        */
/* ------------------------------------------------------------------ */

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 pb-6 pt-2 flex items-center",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
