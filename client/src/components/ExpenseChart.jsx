import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const palette = ["#0F6B5C", "#C4432B", "#4A6B7A", "#8A6A3D", "#5B6CFA", "#9B5DE5"];

const currencyFormatter = (value) => `Rs ${Number(value).toLocaleString()}`;

const getMonthKey = (value) => {
  if (!value) return "unknown";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "unknown";

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

export default function ExpenseChart({ expenses = [] }) {
  const expenseData = useMemo(() => {
    return (expenses || [])
      .map((item) => ({
        ...item,
        type: item.type || "expense",
        amount: Number(item.amount || 0),
      }))
      .filter((item) => (item.type || "expense") === "expense" && item.amount > 0);
  }, [expenses]);

  const pieData = useMemo(() => {
    const totals = expenseData.reduce((acc, item) => {
      const category = item.category || "Other";
      acc[category] = (acc[category] || 0) + Number(item.amount || 0);
      return acc;
    }, {});

    return Object.entries(totals).map(([category, amount], index) => ({
      name: category,
      value: amount,
      fill: palette[index % palette.length],
    }));
  }, [expenseData]);

  const barData = useMemo(() => {
    const totals = expenseData.reduce((acc, item) => {
      const month = getMonthKey(item.date);
      acc[month] = (acc[month] || 0) + Number(item.amount || 0);
      return acc;
    }, {});

    return Object.entries(totals)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total }));
  }, [expenseData]);

  const hasData = pieData.length > 0 && barData.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white border border-line rounded-xl p-5">
        <div className="mb-4">
          <h3 className="font-display text-lg font-semibold text-ink">Spending by category</h3>
          <p className="text-sm text-muted">Expense totals grouped by category</p>
        </div>
        <div className="h-72">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={92}
                  paddingAngle={2}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={currencyFormatter} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">No expense data yet.</div>
          )}
        </div>
      </div>

      <div className="bg-white border border-line rounded-xl p-5">
        <div className="mb-4">
          <h3 className="font-display text-lg font-semibold text-ink">Expenses by month</h3>
          <p className="text-sm text-muted">Monthly spending trend</p>
        </div>
        <div className="h-72">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid stroke="#E4E2DC" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                <Tooltip formatter={currencyFormatter} />
                <Bar dataKey="total" fill="#0F6B5C" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">No expense data yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
