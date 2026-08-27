import { type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogOut,
  Star,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top bar (mobile & desktop) */}
      <header className="sticky top-0 z-40 bg-ink text-white border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src="/UA_Logo.png" alt="Udupi Academy Logo" className="h-6 w-auto object-contain brightness-0 invert" />
            <span className="font-display font-bold text-sm tracking-tight leading-tight">
              Udupi Academy<br />
              <span className="text-gold text-xs">Admin Panel</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <span className="hidden sm:block text-xs text-white/50 truncate max-w-[180px]">
              {user.email}
            </span>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded border border-white/20 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase text-white/80 hover:bg-white/10 transition-colors"
          >
            <LogOut className="size-3.5" aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar — desktop only */}
        <aside className="hidden lg:flex flex-col w-56 bg-ink text-white border-r border-white/10 p-4 gap-1">
          <NavItem to="/admin" icon={<LayoutDashboard className="size-4" />} label="Dashboard" />
          <NavItem to="/feedback" icon={<Star className="size-4" />} label="Public Reviews" external />
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-ink text-white flex flex-col p-5 gap-2 transition-transform duration-300 lg:hidden",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-display font-bold text-sm">Navigation</span>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <X className="size-5" />
            </button>
          </div>
          <NavItem
            to="/admin"
            icon={<LayoutDashboard className="size-4" />}
            label="Dashboard"
            onClick={() => setMobileMenuOpen(false)}
          />
          <NavItem
            to="/feedback"
            icon={<Star className="size-4" />}
            label="Public Reviews"
            external
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({
  to,
  icon,
  label,
  external,
  onClick,
}: {
  to: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const cls =
    "flex items-center gap-3 rounded px-3 py-2.5 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors";
  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={cls} onClick={onClick}>
        {icon}
        {label}
      </a>
    );
  }
  return (
    <Link to={to as "/"} className={cls} onClick={onClick}>
      {icon}
      {label}
    </Link>
  );
}
