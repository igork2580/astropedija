import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Set to true for a shimmer effect instead of basic pulse */
  shimmer?: boolean;
}

function Skeleton({ className, shimmer = false, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface-hover",
        shimmer
          ? "relative isolate overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent"
          : "animate-pulse",
        className,
      )}
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";

export { Skeleton };
