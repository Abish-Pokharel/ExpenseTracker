import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Receipt } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(formData);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Unable to sign in right now.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Receipt className="w-6 h-6 text-teal" strokeWidth={2.2} />
          <span className="font-display text-lg font-semibold">Ledger</span>
        </div>

        <div className="bg-white border border-line rounded-xl p-7">
          <h1 className="font-display text-xl font-semibold mb-1">Welcome back</h1>
          <p className="text-sm text-muted mb-6">Log in to track your expenses.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error ? <p className="text-sm text-rust">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-teal text-white text-sm font-medium hover:bg-teal/90 transition-colors disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Log in"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-5">
          Don't have an account? <Link to="/register" className="text-teal font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}