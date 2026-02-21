import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-surface-hover",
        className,
      )}
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";

export { Skeleton };
