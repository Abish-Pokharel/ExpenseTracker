import { SummaryCardSkeleton } from "./Skeleton";

export default function SummaryCards({ expenses = [], loading = false }) {
  const incomeEntries = expenses.filter((e) => e.type === "income");
  const expenseEntries = expenses.filter((e) => e.type === "expense");

  const totalIncome = incomeEntries.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const totalExpense = expenseEntries.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const remainingBalance = totalIncome - totalExpense;

  const expenseEntriesCount = expenseEntries.length;
  const averageSpend = expenseEntriesCount ? totalExpense / expenseEntriesCount : 0;

  const stats = [
    { label: "Total income", value: totalIncome, tone: "text-green" },
    { label: "Total expense", value: totalExpense, tone: "text-rust" },
    {
      label: "Remaining balance",
      value: remainingBalance,
      tone: remainingBalance >= 0 ? "text-teal" : "text-rust",
    },
    { label: "Average per entry", value: averageSpend, tone: "text-teal" },
  ];

  const formatCurrency = (value) => {
    return `Rs ${Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SummaryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, tone }) => (
        <div key={label} className="bg-white border border-line rounded-xl px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-muted font-medium mb-2">
            {label}
          </p>
          <p className={`font-mono text-2xl font-semibold ${tone}`}>
            {formatCurrency(value)}
          </p>
        </div>
      ))}
    </div>
  );
}