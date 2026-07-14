export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-line/60 ${className}`} />;
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="px-5 py-3.5">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="px-5 py-3.5">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      <td className="px-5 py-3.5">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="px-5 py-3.5 text-right">
        <Skeleton className="ml-auto h-4 w-16" />
      </td>
      <td className="px-5 py-3.5 text-right">
        <Skeleton className="ml-auto h-8 w-16" />
      </td>
    </tr>
  );
}

export function SummaryCardSkeleton() {
  return (
    <div className="rounded-xl border border-line bg-white px-5 py-4">
      <Skeleton className="mb-3 h-3 w-20" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
}
