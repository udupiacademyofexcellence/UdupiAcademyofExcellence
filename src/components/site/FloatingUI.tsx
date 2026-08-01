import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingUI() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [popup, setPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      setShowTop(window.scrollY > 900);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPopup(true), 14000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-accent to-gold"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      <div className="fixed right-5 bottom-24 z-[60] flex flex-col items-end gap-3 sm:bottom-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={cn(
            "grid size-12 place-items-center rounded-full border border-border bg-background shadow-card transition-all duration-500 hover:-translate-y-1",
            showTop ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          <ArrowUp className="size-5" />
        </button>
        <a
          href="https://wa.me/919886012345"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="grid size-14 place-items-center rounded-full bg-[oklch(0.72_0.17_150)] text-white shadow-lift transition-transform duration-300 hover:scale-105"
        >
          <MessageCircle className="size-6" />
        </a>
      </div>

      {/* Mobile sticky CTA */}
      <div className="glass fixed inset-x-0 bottom-0 z-[60] flex gap-2 p-3 sm:hidden">
        <a
          href="tel:+919886012345"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-semibold"
        >
          <Phone className="size-4" /> Call
        </a>
        <a
          href="#enquiry"
          className="inline-flex min-h-12 flex-[1.4] items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
        >
          Apply Now
        </a>
      </div>

      {/* Admission popup */}
      {popup && !dismissed && (
        <div className="fixed bottom-24 left-5 z-[60] hidden w-[330px] animate-[fade-in_0.5s_ease-out] lg:block">
          <div className="glass relative rounded-[1.75rem] p-6 shadow-lift">
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss admissions notice"
              className="absolute top-4 right-4 grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-surface"
            >
              <X className="size-4" />
            </button>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
              Limited seats
            </p>
            <h3 className="mt-2 text-lg font-extrabold">2026 admissions close soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Only 30 seats per batch. Book a free counselling slot this week.
            </p>
            <a
              href="#enquiry"
              onClick={() => setDismissed(true)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground"
            >
              Book counselling
            </a>
          </div>
        </div>
      )}
    </>
  );
}
