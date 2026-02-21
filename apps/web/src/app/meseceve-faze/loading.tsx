import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="mt-6 h-10 w-64" />
      <Skeleton className="mt-3 h-6 w-full" />
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
