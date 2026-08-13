import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const defaultDate = () => new Date().toISOString().split("T")[0];

export default function ExpenseForm({ mode = "add", initialData = null, onSubmit, isSubmitting = false }) {
  const navigate = useNavigate();
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(defaultDate());

  useEffect(() => {
    if (initialData) {
      setType(initialData.type || "expense");
      setAmount(initialData.amount ?? "");
      setCategory(initialData.category || (initialData.type === "income" ? "Salary" : "Food"));
      setDescription(initialData.description || "");
      setDate(
        initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : defaultDate()
      );
    }
  }, [initialData]);

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(newType === "income" ? "Salary" : "Food");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onSubmit?.({
        type,
        amount: Number(amount),
        category,
        description,
        date,
      });
      toast.success(
        mode === "edit"
          ? "Changes saved"
          : type === "expense"
          ? "Expense added"
          : "Income added"
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          (mode === "edit"
            ? "Unable to save changes."
            : type === "expense"
            ? "Unable to add expense."
            : "Unable to add income.")
      );
    }
  };

  return (
    <form className="bg-white border border-line rounded-xl p-6 max-w-xl space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleTypeChange("expense")}
          className={`py-2.5 text-center text-sm font-medium rounded-lg border transition-colors ${
            type === "expense"
              ? "border-rust bg-rust-light text-rust"
              : "border-line bg-transparent text-muted hover:text-ink hover:border-ink cursor-pointer"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("income")}
          className={`py-2.5 text-center text-sm font-medium rounded-lg border transition-colors ${
            type === "income"
              ? "border-green bg-teal-light text-green"
              : "border-line bg-transparent text-muted hover:text-ink hover:border-ink cursor-pointer"
          }`}
        >
          Income
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Amount (Rs)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full px-3 py-2.5 rounded-lg border border-line font-mono focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          {type === "expense" ? "Category" : "Source"}
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
        >
          {type === "expense" ? (
            <>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Rent">Rent</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </>
          ) : (
            <>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Allowance">Allowance</option>
              <option value="Gift">Gift</option>
              <option value="Other">Other</option>
            </>
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={type === "expense" ? "What was this for?" : "Where did this come from?"}
          className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
          required
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2.5 rounded-lg bg-teal text-white text-sm font-medium hover:bg-teal/90 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? "Saving..." : mode === "edit" ? "Save changes" : type === "expense" ? "Add expense" : "Add income"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 rounded-lg border border-line text-sm font-medium text-muted hover:text-ink hover:border-ink transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}