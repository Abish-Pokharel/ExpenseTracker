import { SummaryCardSkeleton } from "./Skeleton";

export default function SummaryCards({ expenses = [], loading = false }) {
  const totalExpense = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const entryCount = expenses.length;
  const averageSpend = entryCount ? totalExpense / entryCount : 0;

  const stats = [
    { label: "Total expense", value: totalExpense, tone: "text-rust" },
    { label: "Entries", value: entryCount, tone: "text-teal" },
    { label: "Average", value: averageSpend, tone: "text-green" },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <SummaryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, tone }) => (
        <div key={label} className="rounded-xl border border-line bg-white px-5 py-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
          <p className={`font-mono text-2xl font-semibold ${tone}`}>Rs {Number(value).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}