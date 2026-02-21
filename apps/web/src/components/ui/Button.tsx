"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Slot – lightweight asChild helper (renders child element instead  */
/*  of the wrapper, merging props & className)                        */
/* ------------------------------------------------------------------ */

import {
  isValidElement,
  cloneElement,
  type ReactElement,
  Children,
} from "react";

function Slot({
  children,
  ...props
}: { children?: ReactNode } & Record<string, unknown>) {
  if (!isValidElement(children)) return null;

  const childProps = children.props as Record<string, unknown>;

  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    ...props,
    ...childProps,
    className: cn(props.className as string, childProps.className as string),
  });
}

/* ------------------------------------------------------------------ */
/*  Variants                                                          */
/* ------------------------------------------------------------------ */

const variantStyles = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-lg shadow-primary/25",
  secondary:
    "bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-dark shadow-lg shadow-secondary/25",
  outline:
    "border border-border bg-transparent text-text-primary hover:bg-surface-hover",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary",
} as const;

const sizeStyles = {
  sm: "h-8 px-3 text-sm gap-1.5 rounded-lg",
  md: "h-10 px-5 text-base gap-2 rounded-xl",
  lg: "h-12 px-7 text-lg gap-2.5 rounded-xl",
} as const;

/* ------------------------------------------------------------------ */
/*  Button                                                            */
/* ------------------------------------------------------------------ */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  /** When true, renders the child element instead of a <button>. */
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-start",
      "disabled:pointer-events-none disabled:opacity-50",
      variantStyles[variant],
      sizeStyles[size],
      className,
    );

    if (asChild) {
      return (
        <Slot className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
