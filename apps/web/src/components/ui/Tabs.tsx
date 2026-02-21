"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs compound components must be used within <Tabs>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Tabs (root)                                                       */
/* ------------------------------------------------------------------ */

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** The currently active tab value (controlled). */
  value?: string;
  /** The default active tab value (uncontrolled). */
  defaultValue?: string;
  /** Callback when the active tab changes. */
  onValueChange?: (value: string) => void;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onValueChange: onValueChangeProp,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const onValueChange = (next: string) => {
      if (!isControlled) setUncontrolledValue(next);
      onValueChangeProp?.(next);
    };

    return (
      <TabsContext.Provider value={{ value, onValueChange }}>
        <div ref={ref} className={cn("flex flex-col", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

/* ------------------------------------------------------------------ */
/*  TabsList                                                          */
/* ------------------------------------------------------------------ */

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-xl bg-surface p-1 border border-border",
        className,
      )}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

/* ------------------------------------------------------------------ */
/*  TabsTrigger                                                       */
/* ------------------------------------------------------------------ */

export interface TabsTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The value that identifies this tab. */
  value: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, ...props }, ref) => {
    const { value: activeValue, onValueChange } = useTabsContext();
    const isActive = activeValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => onValueChange(value)}
        className={cn(
          "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium",
          "transition-all duration-200 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          isActive
            ? "bg-primary text-white shadow-md shadow-primary/25"
            : "text-text-muted hover:text-text-primary hover:bg-surface-hover",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

/* ------------------------------------------------------------------ */
/*  TabsContent                                                       */
/* ------------------------------------------------------------------ */

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** The value that identifies which trigger activates this panel. */
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, ...props }, ref) => {
    const { value: activeValue } = useTabsContext();

    if (activeValue !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state="active"
        className={cn("mt-4", className)}
        {...props}
      />
    );
  },
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
