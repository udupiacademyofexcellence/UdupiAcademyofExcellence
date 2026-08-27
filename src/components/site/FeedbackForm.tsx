import { useState, useRef, useId, type FormEvent } from "react";
import { z } from "zod";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { Reveal } from "./primitives";

const COURSES = [
  "Aviation & Hospitality",
  "Fire And Industrial Safety Engineering",
  "Hotel Management",
  "Effective Communication & Interview Preparations",
  "Diploma In Fashion Designing",
  "Diploma Interior Designing",
  "Diploma In Hospital Administration",
];

const schema = z.object({
  student_name: z.string().trim().min(2, "Please enter your full name").max(100),
  display_name: z.string().trim().min(2, "Please enter a display name").max(100),
  course: z.enum(COURSES as [string, ...string[]], { required_error: "Please select a course" }),
  rating: z.coerce.number().int().min(1, "Please select a rating").max(5),
  feedback: z.string().trim().min(10, "Please write at least 10 characters").max(2000, "Maximum 2000 characters"),
  display_name_public: z.boolean().optional(),
});

// Simple rate-limiting: track last submission time in module scope
let lastSubmitTime = 0;
const RATE_LIMIT_MS = 30_000; // 30 seconds between submissions

export function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("Something went wrong. Please try again.");
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackId = useId();
  const nameId = useId();
  const displayNameId = useId();
  const courseId = useId();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Rate-limit check
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      setErrorMsg("Please wait a moment before submitting again.");
      setState("error");
      setTimeout(() => setState("idle"), 4000);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check — if bot filled the hidden field, silently reject
    if (formData.get("__hp") as string) {
      setState("sent"); // pretend success to confuse bots
      return;
    }

    const raw = {
      student_name: (formData.get("student_name") as string) ?? "",
      display_name: (formData.get("display_name") as string) ?? "",
      course: (formData.get("course") as string) ?? "",
      rating,
      feedback: (formData.get("feedback") as string) ?? "",
      display_name_public: formData.get("display_name_public") === "on",
    };

    const result = schema.safeParse(raw);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        next[String(i.path[0])] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setState("sending");

    try {
      // Trim all text inputs before sending
      const payload = {
        student_name: result.data.student_name.trim(),
        display_name: result.data.display_name.trim(),
        course: result.data.course,
        rating: result.data.rating,
        feedback: result.data.feedback.trim(),
        display_name_public: result.data.display_name_public ?? false,
        status: "pending",
      };

      const { error } = await supabase.from("feedback").insert([payload]);

      if (error) {
        // Never expose raw DB error to user
        console.error("Feedback insert error:", error.message);
        setErrorMsg("Something went wrong. Please try again.");
        setState("error");
        setTimeout(() => setState("idle"), 5000);
        return;
      }

      lastSubmitTime = Date.now();
      setState("sent");
      form.reset();
      setRating(0);
      setCharCount(0);
    } catch (err) {
      console.error("Unexpected error submitting feedback:", err);
      setErrorMsg("Something went wrong. Please try again.");
      setState("error");
      setTimeout(() => setState("idle"), 5000);
    }
  };

  if (state === "sent") {
    return (
      <div className="bg-white border border-ink/10 p-10 sm:p-16 text-center">
        <div className="inline-flex size-16 items-center justify-center rounded-full bg-gold/10 mb-6">
          <Star className="size-8 text-gold fill-gold" />
        </div>
        <h3 className="font-display text-2xl font-bold text-ink mb-4">Thank you for sharing your experience.</h3>
        <p className="text-ink/60 max-w-md mx-auto leading-relaxed">
          Your feedback has been submitted for review. Once approved, it will appear on our website.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-8 inline-flex items-center gap-2 border border-ink/20 px-6 py-3 text-[13px] font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-ink/10 p-8 sm:p-12"
      aria-label="Student feedback form"
    >
      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        name="__hp"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
      />

      <h3 className="font-display text-2xl font-bold text-ink mb-8">Share Your Experience</h3>

      <div className="space-y-6">
        {/* Student Name */}
        <div>
          <label htmlFor={nameId} className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2">
            Full Name <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <input
            id={nameId}
            name="student_name"
            type="text"
            autoComplete="name"
            maxLength={100}
            className={cn(
              "w-full border-b bg-transparent pb-3 text-lg outline-none transition-colors focus:border-gold",
              errors.student_name ? "border-destructive" : "border-ink/20"
            )}
          />
          {errors.student_name && <p className="mt-2 text-xs text-destructive font-semibold">{errors.student_name}</p>}
        </div>

        {/* Display Name */}
        <div>
          <label htmlFor={displayNameId} className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2">
            Display Name <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <p className="text-xs text-ink/50 mb-2">How your name will appear publicly if you choose to share it.</p>
          <input
            id={displayNameId}
            name="display_name"
            type="text"
            maxLength={100}
            className={cn(
              "w-full border-b bg-transparent pb-3 text-lg outline-none transition-colors focus:border-gold",
              errors.display_name ? "border-destructive" : "border-ink/20"
            )}
          />
          {errors.display_name && <p className="mt-2 text-xs text-destructive font-semibold">{errors.display_name}</p>}
        </div>

        {/* Course */}
        <div>
          <label htmlFor={courseId} className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2">
            Course <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <select
            id={courseId}
            name="course"
            defaultValue=""
            className={cn(
              "w-full border-b bg-transparent pb-3 text-lg outline-none transition-colors focus:border-gold cursor-pointer",
              errors.course ? "border-destructive" : "border-ink/20"
            )}
          >
            <option value="" disabled>Select your course...</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.course && <p className="mt-2 text-xs text-destructive font-semibold">{errors.course}</p>}
        </div>

        {/* Star Rating */}
        <div>
          <p className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-3">
            Rating <span aria-hidden="true" className="text-destructive">*</span>
          </p>
          <div
            role="radiogroup"
            aria-label="Rating from 1 to 5 stars"
            className="flex gap-2"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={rating === star}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" && rating < 5) setRating(rating + 1);
                  if (e.key === "ArrowLeft" && rating > 1) setRating(rating - 1);
                }}
                className={cn(
                  "p-1 rounded transition-transform focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
                  "hover:scale-110 active:scale-95"
                )}
              >
                <Star
                  className={cn(
                    "size-8 transition-colors",
                    (hoverRating || rating) >= star
                      ? "text-gold fill-gold"
                      : "text-ink/20 fill-transparent"
                  )}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
          {/* Screen-reader live feedback */}
          <p className="sr-only" aria-live="polite">
            {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""} selected` : "No rating selected"}
          </p>
          {errors.rating && <p className="mt-2 text-xs text-destructive font-semibold">{errors.rating}</p>}
        </div>

        {/* Feedback Textarea */}
        <div>
          <label htmlFor={feedbackId} className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2">
            Your Feedback <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <textarea
            id={feedbackId}
            name="feedback"
            rows={5}
            maxLength={2000}
            onChange={(e) => setCharCount(e.target.value.length)}
            className={cn(
              "w-full resize-none border-b bg-transparent pb-3 text-lg outline-none transition-colors focus:border-gold",
              errors.feedback ? "border-destructive" : "border-ink/20"
            )}
            aria-describedby="feedback-counter"
          />
          <div className="flex justify-between items-center mt-1">
            {errors.feedback
              ? <p className="text-xs text-destructive font-semibold">{errors.feedback}</p>
              : <span />
            }
            <p
              id="feedback-counter"
              className={cn("text-xs tabular-nums", charCount > 1900 ? "text-destructive font-semibold" : "text-ink/40")}
              aria-live="polite"
              aria-atomic="true"
            >
              {charCount} / 2000
            </p>
          </div>
        </div>

        {/* Display Name Publicly */}
        <div className="flex items-start gap-3 pt-2">
          <input
            id="display_name_public"
            name="display_name_public"
            type="checkbox"
            className="mt-1 size-4 accent-gold cursor-pointer"
          />
          <label htmlFor="display_name_public" className="text-sm text-ink/70 cursor-pointer leading-relaxed">
            Display my name publicly with my review
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={state === "sending"}
        className={cn(
          "mt-10 inline-flex w-full items-center justify-center gap-3 px-8 py-5 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300",
          state === "error"
            ? "bg-destructive text-white"
            : "bg-ink text-white hover:bg-gold hover:text-ink"
        )}
      >
        {state === "idle" && (
          <>
            Submit Feedback
            <Star className="size-4" />
          </>
        )}
        {state === "sending" && "Submitting…"}
        {state === "error" && errorMsg}
      </button>
    </form>
  );
}
