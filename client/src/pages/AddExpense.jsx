import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import { addExpense } from "../services/expenseService";

export default function AddExpense() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setError("");
    setSubmitting(true);

    try {
      await addExpense(values);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save expense.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar title="Add entry" />
        <main className="p-5 md:p-8">
          {error ? <p className="mb-4 text-sm text-rust">{error}</p> : null}
          <ExpenseForm mode="add" onSubmit={handleSubmit} isSubmitting={submitting} />
        </main>
      </div>
    </div>
  );
}