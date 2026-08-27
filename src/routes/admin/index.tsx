import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});

function AdminPage() {
  const { session, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    // Not authenticated — redirect to login
    if (!session) {
      navigate({ to: "/admin/login" });
      return;
    }
    // Authenticated but not admin — redirect to login with denial
    if (!isAdmin) {
      navigate({ to: "/admin/login" });
    }
  }, [loading, session, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div
            className="size-8 border-2 border-ink/20 border-t-ink rounded-full animate-spin"
            aria-label="Checking authentication"
            role="status"
          />
          <p className="text-sm text-ink/40 font-medium">Verifying access…</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard until auth is confirmed — prevents flash of content
  if (!session || !isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
