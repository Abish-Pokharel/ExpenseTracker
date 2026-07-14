import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import ExpenseChart from "../components/ExpenseChart";
import SearchBar from "../components/SearchBar";
import ExpenseTable from "../components/ExpenseTable";
import { deleteExpense, getExpenses } from "../services/expenseService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const response = await getExpenses();
      setExpenses(response?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load expenses right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const filteredExpenses = useMemo(() => {
    const keyword = search.toLowerCase();
    if (!keyword) return expenses;

    return expenses.filter((expense) =>
      [expense.title, expense.category, expense.description].join(" ").toLowerCase().includes(keyword)
    );
  }, [expenses, search]);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      await loadExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete expense.");
      throw err;
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Navbar title="Dashboard" />
        <main className="p-5 md:p-8 space-y-6">
          <SummaryCards expenses={expenses} loading={loading} />
          <ExpenseChart expenses={expenses} />
          <div>
            <SearchBar value={search} onChange={setSearch} />
            {error ? <p className="mb-3 text-sm text-rust">{error}</p> : null}
            <ExpenseTable
              expenses={filteredExpenses}
              onEdit={(id) => navigate(`/edit-expense/${id}`)}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}