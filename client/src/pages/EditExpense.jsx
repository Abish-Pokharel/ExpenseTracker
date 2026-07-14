import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import { getExpenseById, updateExpense } from "../services/expenseService";

export default function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadExpense = async () => {
      setLoading(true);
      try {
        const response = await getExpenseById(id);
        setExpense(response?.data || null);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load expense.");
      } finally {
        setLoading(false);
      }
    };

    loadExpense();
  }, [id]);

  const handleSubmit = async (values) => {
    setError("");
    setSubmitting(true);

    try {
      await updateExpense(id, values);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update expense.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar title="Edit entry" />
        <main className="p-5 md:p-8">
          {error ? <p className="mb-4 text-sm text-rust">{error}</p> : null}
          {loading ? (
            <div className="bg-white border border-line rounded-xl p-6 text-sm text-muted">Loading expense...</div>
          ) : (
            <ExpenseForm mode="edit" initialData={expense} onSubmit={handleSubmit} isSubmitting={submitting} />
          )}
        </main>
      </div>
    </div>
  );
}