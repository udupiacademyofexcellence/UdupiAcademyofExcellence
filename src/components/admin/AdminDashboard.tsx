import { useEffect, useState, useCallback } from "react";
import {
  Star,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase, type Feedback, type FeedbackStatus } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

const PAGE_SIZE = 15;

const COURSES = [
  "Aviation & Hospitality",
  "Fire And Industrial Safety Engineering",
  "Hotel Management",
  "Effective Communication & Interview Preparations",
  "Diploma In Fashion Designing",
  "Diploma Interior Designing",
  "Diploma In Hospital Administration",
];

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="bg-white border border-ink/10 rounded-lg p-5 flex items-center gap-4">
      <div className={cn("flex size-11 items-center justify-center rounded-full", accent ?? "bg-surface")}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold tracking-widest uppercase text-ink/50">{label}</p>
        <p className="font-display text-2xl font-extrabold text-ink mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ── Star Row ─────────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} stars`} role="img">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn("size-3.5", s <= rating ? "text-gold fill-gold" : "text-ink/15 fill-transparent")}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

// ── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: FeedbackStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider",
        status === "approved" && "bg-emerald-50 text-emerald-700",
        status === "pending" && "bg-amber-50 text-amber-700",
        status === "rejected" && "bg-red-50 text-red-700"
      )}
    >
      {status === "approved" && <CheckCircle className="size-3" aria-hidden="true" />}
      {status === "pending" && <Clock className="size-3" aria-hidden="true" />}
      {status === "rejected" && <XCircle className="size-3" aria-hidden="true" />}
      {status}
    </span>
  );
}

// ── Action Buttons ────────────────────────────────────────────────────────────
function ActionButtons({
  feedback,
  onAction,
  loading,
}: {
  feedback: Feedback;
  onAction: (id: string, action: "approved" | "rejected") => Promise<void>;
  loading: boolean;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {feedback.status !== "approved" && (
        <button
          disabled={loading}
          onClick={() => onAction(feedback.id, "approved")}
          className="flex items-center gap-1.5 rounded border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 min-h-[36px]"
          aria-label={`Approve feedback from ${feedback.student_name}`}
        >
          <CheckCircle className="size-3.5" aria-hidden="true" />
          Approve
        </button>
      )}
      {feedback.status !== "rejected" && (
        <button
          disabled={loading}
          onClick={() => onAction(feedback.id, "rejected")}
          className="flex items-center gap-1.5 rounded border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 min-h-[36px]"
          aria-label={`Reject feedback from ${feedback.student_name}`}
        >
          <XCircle className="size-3.5" aria-hidden="true" />
          Reject
        </button>
      )}
    </div>
  );
}

// ── Mobile Feedback Card ──────────────────────────────────────────────────────
function MobileFeedbackCard({
  item,
  onAction,
  actionLoading,
}: {
  item: Feedback;
  onAction: (id: string, action: "approved" | "rejected") => Promise<void>;
  actionLoading: string | null;
}) {
  const date = new Date(item.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <article className="bg-white border border-ink/10 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display font-bold text-ink text-sm">{item.student_name}</p>
          <p className="text-xs text-ink/50 mt-0.5">{item.course}</p>
        </div>
        <StatusBadge status={item.status} />
      </div>
      <Stars rating={item.rating} />
      {/* Text rendered as text node — XSS safe */}
      <p className="text-sm text-ink/70 leading-relaxed line-clamp-4">{item.feedback}</p>
      <p className="text-xs text-ink/40">{date}</p>
      <ActionButtons
        feedback={item}
        onAction={onAction}
        loading={actionLoading === item.id}
      />
    </article>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export function AdminDashboard() {
  const { user } = useAuth();
  const [items, setItems] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  // Filters
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | "all">("all");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Stats from all data (not paginated)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    avgRating: 0,
  });

  const fetchStats = useCallback(async () => {
    const { data } = await supabase
      .from("feedback")
      .select("status, rating");

    if (!data) return;
    const approved = data.filter((r) => r.status === "approved");
    const avgRating =
      approved.length > 0
        ? approved.reduce((s, r) => s + r.rating, 0) / approved.length
        : 0;
    setStats({
      total: data.length,
      pending: data.filter((r) => r.status === "pending").length,
      approved: approved.length,
      rejected: data.filter((r) => r.status === "rejected").length,
      avgRating: Math.round(avgRating * 10) / 10,
    });
  }, []);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from("feedback")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (statusFilter !== "all") query = query.eq("status", statusFilter);
      if (ratingFilter !== "all") query = query.eq("rating", ratingFilter);
      if (courseFilter !== "all") query = query.eq("course", courseFilter);
      if (searchQuery.trim()) {
        const q = searchQuery.trim();
        query = query.or(
          `student_name.ilike.%${q}%,course.ilike.%${q}%,feedback.ilike.%${q}%`
        );
      }

      const { data, error: supaError, count } = await query;
      if (supaError) throw supaError;
      setItems((data ?? []) as Feedback[]);
      setTotal(count ?? 0);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load feedback. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, ratingFilter, courseFilter, searchQuery]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    setPage(0);
  }, [statusFilter, ratingFilter, courseFilter, searchQuery]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAction = async (id: string, action: "approved" | "rejected") => {
    if (!user) return;
    setActionLoading(id);
    try {
      const { error: supaError } = await supabase
        .from("feedback")
        .update({
          status: action,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id, // RLS enforces this; we also set it client-side for UX
        })
        .eq("id", id);

      if (supaError) throw supaError;

      // Optimistic UI update
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: action, reviewed_at: new Date().toISOString(), reviewed_by: user.id }
            : item
        )
      );
      // Refresh stats
      fetchStats();
    } catch (err) {
      console.error("Action error:", err);
      alert("Failed to update feedback status. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Feedback Dashboard
        </h1>
        <p className="text-ink/50 text-sm mt-1">Review and moderate student submissions.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          label="Total"
          value={stats.total}
          icon={<BarChart3 className="size-5 text-ink/60" />}
          accent="bg-surface"
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          icon={<Clock className="size-5 text-amber-600" />}
          accent="bg-amber-50"
        />
        <StatCard
          label="Approved"
          value={stats.approved}
          icon={<CheckCircle className="size-5 text-emerald-600" />}
          accent="bg-emerald-50"
        />
        <StatCard
          label="Rejected"
          value={stats.rejected}
          icon={<XCircle className="size-5 text-red-500" />}
          accent="bg-red-50"
        />
        <StatCard
          label="Avg Rating"
          value={stats.approved > 0 ? `${stats.avgRating} / 5` : "—"}
          icon={<Star className="size-5 text-gold fill-gold" />}
          accent="bg-gold/10"
        />
      </div>

      {/* Filters */}
      <div className="bg-white border border-ink/10 rounded-lg p-4 flex flex-col sm:flex-row flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink/30" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search name, course, feedback…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-ink/15 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-shadow"
            aria-label="Search feedback"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Status filter */}
          <div className="relative">
            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-ink/40" aria-hidden="true" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FeedbackStatus | "all")}
              className="rounded border border-ink/15 pl-7 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold cursor-pointer bg-white appearance-none"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Rating filter */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="rounded border border-ink/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold cursor-pointer bg-white"
            aria-label="Filter by rating"
          >
            <option value="all">All Ratings</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{"★".repeat(r)} {r} Star{r > 1 ? "s" : ""}</option>
            ))}
          </select>

          {/* Course filter */}
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded border border-ink/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold cursor-pointer bg-white max-w-[180px]"
            aria-label="Filter by course"
          >
            <option value="all">All Courses</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 font-medium">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="flex items-center gap-3 text-ink/40">
            <div className="size-5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            <span className="text-sm">Loading…</span>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      {!loading && items.length > 0 && (
        <>
          <div className="hidden lg:block overflow-hidden rounded-lg border border-ink/10 bg-white">
            <table className="w-full text-sm" aria-label="Feedback submissions">
              <thead>
                <tr className="border-b border-ink/10 bg-surface">
                  <th className="px-4 py-3 text-left text-[11px] font-bold tracking-widest text-ink/50 uppercase">Student</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold tracking-widest text-ink/50 uppercase">Course</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold tracking-widest text-ink/50 uppercase">Rating</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold tracking-widest text-ink/50 uppercase">Feedback</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold tracking-widest text-ink/50 uppercase">Submitted</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold tracking-widest text-ink/50 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold tracking-widest text-ink/50 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {items.map((item) => {
                  const date = new Date(item.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  return (
                    <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-ink">{item.student_name}</p>
                        <p className="text-xs text-ink/40">{item.display_name}</p>
                      </td>
                      <td className="px-4 py-3 text-ink/70 max-w-[140px]">
                        <span className="line-clamp-2 text-xs">{item.course}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Stars rating={item.rating} />
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        {/* Rendered as text — XSS safe */}
                        <p className="text-ink/70 line-clamp-3 text-xs leading-relaxed">{item.feedback}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-ink/50 whitespace-nowrap">{date}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-4 py-3">
                        <ActionButtons
                          feedback={item}
                          onAction={handleAction}
                          loading={actionLoading === item.id}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid lg:hidden gap-3">
            {items.map((item) => (
              <MobileFeedbackCard
                key={item.id}
                item={item}
                onAction={handleAction}
                actionLoading={actionLoading}
              />
            ))}
          </div>
        </>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && !error && (
        <div className="bg-white border border-ink/10 rounded-lg p-12 text-center">
          <Star className="size-10 text-ink/20 mx-auto mb-4" />
          <p className="text-ink/50 font-medium">No feedback found for the current filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-sm text-ink/50">
            Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex items-center gap-1.5 rounded border border-ink/15 px-3 py-2 text-sm font-medium text-ink hover:bg-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[40px]"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" aria-hidden="true" /> Prev
            </button>
            <span className="flex items-center px-4 text-sm text-ink/60">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="flex items-center gap-1.5 rounded border border-ink/15 px-3 py-2 text-sm font-medium text-ink hover:bg-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[40px]"
              aria-label="Next page"
            >
              Next <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
