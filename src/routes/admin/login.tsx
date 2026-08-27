import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Eye, EyeOff, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { session, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (!loading && session && isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [loading, session, isAdmin, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // Use Supabase Auth — no custom password logic
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        // Never expose raw Supabase error codes to the user
        setError("Invalid email or password. Please try again.");
        return;
      }

      if (!data.user) {
        setError("Login failed. Please try again.");
        return;
      }

      // Auth success — AuthContext will check isAdmin and redirect will trigger above
      // If not admin, show access denied
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!adminData) {
        // Authenticated but not an admin — sign out immediately
        await supabase.auth.signOut();
        setError("Access denied. This account does not have admin permissions.");
        return;
      }

      navigate({ to: "/admin" });
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="size-8 border-2 border-ink/20 border-t-ink rounded-full animate-spin" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex size-14 items-center justify-center rounded-full bg-white border border-ink/10 shadow-sm mb-4">
            <img src="/UA_Logo.png" alt="Logo" className="size-8 object-contain" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-ink tracking-tight">
            Admin Login
          </h1>
          <p className="text-sm text-ink/50 mt-1">Udupi Academy of Excellence</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white border border-ink/10 p-8"
          aria-label="Admin login form"
        >
          {error && (
            <div
              role="alert"
              className="mb-6 rounded bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium"
            >
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2"
              >
                Email / User ID
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-ink/20 bg-transparent pb-3 text-lg outline-none transition-colors focus:border-gold"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-ink/20 bg-transparent pb-3 pr-10 text-lg outline-none transition-colors focus:border-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 bottom-3 text-ink/30 hover:text-ink/60 transition-colors"
                >
                  {showPassword
                    ? <EyeOff className="size-5" aria-hidden="true" />
                    : <Eye className="size-5" aria-hidden="true" />
                  }
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !email || !password}
            className={cn(
              "mt-10 w-full bg-ink text-white py-4 text-[13px] font-semibold tracking-wider uppercase transition-all",
              "hover:bg-gold hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {submitting ? "Signing in…" : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ink/30">
          Secured by Supabase Auth &middot;{" "}
          <a href="/" className="hover:text-ink/60 transition-colors underline">
            Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
