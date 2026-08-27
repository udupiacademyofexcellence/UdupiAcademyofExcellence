import { useEffect, useState, useCallback } from "react";
import { Star, RefreshCw, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase, type PublicReview } from "@/lib/supabase";
import { Reveal } from "./primitives";

const PAGE_SIZE = 6;

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const starSize = size === "lg" ? "size-5" : "size-4";
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            starSize,
            s <= rating ? "text-gold fill-gold" : "text-ink/15 fill-transparent"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: PublicReview }) {
  const displayName = review.display_name_public ? review.display_name : "Verified Student";
  const date = new Date(review.created_at).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });

  return (
    <article className="bg-white border border-ink/10 p-6 sm:p-8 flex flex-col gap-4 lift">
      <StarDisplay rating={review.rating} />
      {/* Use p with textContent-equivalent rendering — XSS safe via React's safe rendering */}
      <p className="text-ink/80 leading-relaxed text-base flex-1">{review.feedback}</p>
      <footer className="border-t border-ink/8 pt-4">
        <p className="font-display font-bold text-ink text-sm">{displayName}</p>
        <p className="text-xs text-ink/50 mt-1">
          {review.course} · {date}
        </p>
      </footer>
    </article>
  );
}

function AverageRating({ reviews }: { reviews: PublicReview[] }) {
  if (reviews.length === 0) return null;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const rounded = Math.round(avg * 10) / 10;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12">
      <div className="text-center sm:text-left">
        <p className="font-display text-7xl font-extrabold text-ink leading-none">
          {rounded.toFixed(1)}
          <span className="text-2xl text-ink/40 font-bold"> / 5</span>
        </p>
        <StarDisplay rating={Math.round(avg)} size="lg" />
        <p className="mt-2 text-sm text-ink/50">
          Based on {reviews.length} student review{reviews.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

export function PublicReviews({ limit }: { limit?: number }) {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [allReviews, setAllReviews] = useState<PublicReview[]>([]);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      // Only fetch public-safe columns — never student_name, reviewed_by, etc.
      const { data, error: supaError } = await supabase
        .from("feedback")
        .select("id, display_name, display_name_public, course, rating, feedback, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(limit ?? 100);

      if (supaError) throw supaError;

      const items = (data ?? []) as PublicReview[];
      setAllReviews(items);
      setReviews(items.slice(0, PAGE_SIZE));
      setHasMore(items.length > PAGE_SIZE);
    } catch (err) {
      console.error("Failed to load reviews:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const loadMore = () => {
    const nextPage = page + 1;
    const nextSlice = allReviews.slice(0, (nextPage + 1) * PAGE_SIZE);
    setReviews(nextSlice);
    setPage(nextPage);
    setHasMore(nextSlice.length < allReviews.length);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4 text-ink/40">
          <RefreshCw className="size-8 animate-spin" />
          <p className="text-sm font-medium">Loading reviews…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-ink/50">Unable to load reviews right now.</p>
        <button
          onClick={fetchReviews}
          className="text-sm font-semibold text-gold underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <MessageSquare className="size-10 text-ink/20" />
        <p className="text-ink/50">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div>
      {!limit && <AverageRating reviews={allReviews} />}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <Reveal key={review.id} delay={i * 60}>
            <ReviewCard review={review} />
          </Reveal>
        ))}
      </div>
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 border border-ink/20 px-8 py-4 text-[13px] font-semibold uppercase tracking-wider text-ink transition-all hover:bg-ink hover:text-white"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}
