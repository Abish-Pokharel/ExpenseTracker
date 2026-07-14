import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmptyState from "./EmptyState";
import ConfirmDialog from "./ConfirmDialog";
import { TableRowSkeleton } from "./Skeleton";

export default function ExpenseTable({ expenses = [], onEdit, onDelete, loading = false }) {
  const navigate = useNavigate();
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-paper text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium text-right">Amount</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRowSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!expenses.length) {
    return (
      <div className="rounded-xl border border-line bg-white p-6">
        <EmptyState
          title="No expenses yet"
          description="Add your first expense to start tracking your spending."
          actionLabel="Add your first expense"
          onAction={() => navigate("/add-expense")}
        />
      </div>
    );
  }

  const confirmDelete = async () => {
    if (!pendingDeleteId) {
      return;
    }

    try {
      await onDelete?.(pendingDeleteId);
      toast.success("Expense deleted");
    } catch {
      toast.error("Unable to delete expense.");
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-paper text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium text-right">Amount</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id || expense.id} className="border-b border-line last:border-0 hover:bg-paper/60 transition-colors">
                <td className="px-5 py-3.5 text-muted">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="px-5 py-3.5">
                  <span className="rounded-full bg-teal-light px-2 py-0.5 text-xs font-medium text-teal">
                    {expense.category}
                  </span>
                </td>
                <td className="px-5 py-3.5">{expense.title}</td>
                <td className="px-5 py-3.5 text-right font-mono font-medium text-rust">
                  - Rs {Number(expense.amount).toLocaleString()}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-3 text-muted">
                    <button onClick={() => onEdit?.(expense._id || expense.id)} className="transition-colors hover:text-teal">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => setPendingDeleteId(expense._id || expense.id)} className="transition-colors hover:text-rust">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        isOpen={Boolean(pendingDeleteId)}
        title="Delete expense"
        message="Are you sure you want to delete this expense? This can't be undone."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </>
  );
}