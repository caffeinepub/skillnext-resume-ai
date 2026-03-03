import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border flex flex-col">
      <Skeleton className="h-44 w-full rounded-none skeleton-shimmer" />
      <div className="p-4 flex flex-col gap-3">
        <Skeleton className="h-5 w-3/4 skeleton-shimmer" />
        <Skeleton className="h-4 w-full skeleton-shimmer" />
        <Skeleton className="h-4 w-2/3 skeleton-shimmer" />
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <Skeleton className="h-7 w-16 skeleton-shimmer" />
          <Skeleton className="h-9 w-28 rounded-lg skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

const SKELETON_KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
];

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {SKELETON_KEYS.slice(0, count).map((key) => (
        <ProductSkeleton key={key} />
      ))}
    </div>
  );
}
