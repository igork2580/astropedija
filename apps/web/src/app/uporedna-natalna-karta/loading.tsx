import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Title */}
      <Skeleton className="h-10 w-3/4 sm:w-1/2" />

      {/* Description */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>

      {/* Two-person form */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {[1, 2].map((person) => (
          <div
            key={person}
            className="rounded-2xl border border-border bg-surface p-6 shadow-lg shadow-black/5"
          >
            <Skeleton className="h-6 w-24 mb-5" />
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Skeleton className="h-11 rounded-xl" />
                <Skeleton className="h-11 rounded-xl" />
                <Skeleton className="h-11 rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-11 rounded-xl" />
                <Skeleton className="h-11 rounded-xl" />
              </div>
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Submit button */}
      <Skeleton className="mt-6 h-12 w-full rounded-xl sm:w-1/3 sm:mx-auto" />
    </div>
  );
}
