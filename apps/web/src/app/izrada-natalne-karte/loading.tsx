import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Title skeleton */}
      <Skeleton className="h-10 w-3/4 sm:w-1/2" />

      {/* Description skeleton */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>

      {/* Form skeleton */}
      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-lg shadow-black/5">
        <div className="space-y-5">
          {/* Name input */}
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>

          {/* Date row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Skeleton className="h-4 w-12 mb-2" />
              <Skeleton className="h-11 rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-4 w-14 mb-2" />
              <Skeleton className="h-11 rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-11 rounded-xl" />
            </div>
          </div>

          {/* Time row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-4 w-10 mb-2" />
              <Skeleton className="h-11 rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-4 w-12 mb-2" />
              <Skeleton className="h-11 rounded-xl" />
            </div>
          </div>

          {/* City input */}
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>

          {/* Submit button */}
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
