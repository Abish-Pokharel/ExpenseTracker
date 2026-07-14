import { Inbox } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({
  title = "No expenses yet",
  description = "Add your first expense to start tracking your spending.",
  actionLabel,
  onAction,
}) {
  const content = (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-paper/60 px-6 py-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-light text-teal">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal/90"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );

  if (onAction && !actionLabel) {
    return content;
  }

  return actionLabel && !onAction ? (
    <Link to="/add-expense" className="block">
      {content}
    </Link>
  ) : (
    content
  );
}
