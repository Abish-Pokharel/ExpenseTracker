import { useEffect, useRef, useState } from "react";
import { Menu, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { getInitial } from "../utils/avatar";

export default function Navbar({ title = "Dashboard", onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
      const clickedOutsideButton = buttonRef.current && !buttonRef.current.contains(event.target);

      if (clickedOutsideMenu && clickedOutsideButton) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-line bg-white px-5 py-4 md:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="text-ink md:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display text-xl font-semibold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-muted transition-colors hover:text-ink">
          <Bell className="h-5 w-5" strokeWidth={1.8} />
        </button>

        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="flex items-center gap-2.5 rounded-full px-1.5 py-1 transition-colors hover:bg-paper"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal font-display text-sm font-semibold text-white">
              {getInitial(user?.name)}
            </div>
            <span className="hidden text-sm font-medium text-ink sm:block">
              {user?.name?.trim() || "User"}
            </span>
          </button>

          <div
            ref={menuRef}
            className={`absolute right-0 top-full mt-2 w-64 origin-top-right rounded-xl border border-line bg-white p-4 shadow-lg transition-all duration-200 ${
              isMenuOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal font-display text-lg font-semibold text-white">
                {getInitial(user?.name)}
              </div>
              <div className="mt-3 text-center">
                <h2 className="font-display text-lg font-semibold text-ink">{user?.name || "User"}</h2>
                <p className="mt-1 text-sm text-muted">{user?.email || "your@email.com"}</p>
              </div>
            </div>

            <div className="mt-4 border-t border-line pt-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-rust-light hover:text-rust"
              >
                <LogOut className="h-4 w-4" strokeWidth={2} />
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}