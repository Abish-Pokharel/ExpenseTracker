import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const defaultForm = {
  title: "",
  amount: "",
  category: "Food",
  description: "",
  date: new Date().toISOString().split("T")[0],
  paymentMethod: "Cash",
};

export default function ExpenseForm({ mode = "add", initialData = null, onSubmit, isSubmitting = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        amount: initialData.amount ?? "",
        category: initialData.category || "Food",
        description: initialData.description || "",
        date: initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : defaultForm.date,
        paymentMethod: initialData.paymentMethod || "Cash",
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onSubmit?.({ ...formData, amount: Number(formData.amount) });
      toast.success(mode === "edit" ? "Changes saved" : "Expense added");
    } catch (error) {
      toast.error(error?.response?.data?.message || (mode === "edit" ? "Unable to save changes." : "Unable to add expense."));
    }
  };

  return (
    <form className="bg-white border border-line rounded-xl p-6 max-w-xl space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1.5">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Dinner with friends"
          className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Amount (Rs)</label>
        <input
          name="amount"
          type="number"
          min="0"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0.00"
          className="w-full px-3 py-2.5 rounded-lg border border-line font-mono focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Payment method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Esewa">Esewa</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="What was this for?"
          className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Date</label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2.5 rounded-lg bg-teal text-white text-sm font-medium hover:bg-teal/90 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? "Saving..." : mode === "edit" ? "Save changes" : "Add entry"}
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