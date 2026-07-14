import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle, LogOut, Receipt } from "lucide-react";
import { useAuth } from "../context/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add-expense", label: "Add entry", icon: PlusCircle },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 border-r border-line bg-white min-h-screen px-5 py-6">
      <div className="flex items-center gap-2 mb-10 px-1">
        <Receipt className="w-6 h-6 text-teal" strokeWidth={2.2} />
        <span className="font-display text-lg font-semibold tracking-tight">Ledger</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-teal-light text-teal" : "text-muted hover:bg-paper hover:text-ink"
              }`
            }
          >
            <Icon className="w-4 h-4" strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-rust-light hover:text-rust transition-colors"
      >
        <LogOut className="w-4 h-4" strokeWidth={2} />
        Log out
      </button>
    </aside>
  );
}