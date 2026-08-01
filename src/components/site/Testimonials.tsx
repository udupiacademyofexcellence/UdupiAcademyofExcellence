import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle, Star } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

const REVIEWS = [
  {
    name: "Sharath Kamath",
    course: "Full Stack Development",
    company: "Placed at Infosys BPM",
    quote:
      "I came in with a PUC certificate and no coding background. The mock interviews and capstone project got me three offers before the course ended.",
    initials: "SK",
  },
  {
    name: "Deeksha Shetty",
    course: "Allied Healthcare",
    company: "Placed at Manipal Hospitals",
    quote:
      "The hospital rotations made the difference. On day one of my job I already knew the ward workflow and the documentation.",
    initials: "DS",
  },
  {
    name: "Imran Basha",
    course: "Industrial Mechatronics",
    company: "Placed at Bosch",
    quote:
      "Real machines, real breakdowns, real troubleshooting. Interviewers were surprised at how much shop-floor exposure I had.",
    initials: "IB",
  },
  {
    name: "Rakshitha Nayak",
    course: "Accounting & Taxation",
    company: "Placed at HDFC Bank",
    quote:
      "Faculty stayed back after hours for GST practice sessions. That kind of commitment is rare and it showed in my results.",
    initials: "RN",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 5200);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden bg-surface py-24 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mesh-bg absolute inset-0 -z-10 opacity-60" />
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Student voices"
            title="5,000 alumni. Thousands of first salaries."
          />
          <Reveal className="flex gap-2">
            <button
              aria-label="Previous testimonial"
              onClick={() => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)}
              className="grid size-12 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-surface"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % REVIEWS.length)}
              className="grid size-12 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-surface"
            >
              <ChevronRight className="size-5" />
            </button>
          </Reveal>
        </div>

        <div className="mt-14 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {REVIEWS.map((r) => (
              <article key={r.name} className="w-full shrink-0 px-1 sm:px-2">
                <div className="glass grid gap-8 rounded-[2rem] p-8 shadow-card lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:p-12">
                  <div>
                    <div className="flex gap-1 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mt-6 font-display text-2xl leading-snug font-semibold text-balance sm:text-3xl">
                      “{r.quote}”
                    </blockquote>
                    <div className="mt-8 flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-2xl bg-primary font-display font-bold text-primary-foreground">
                        {r.initials}
                      </span>
                      <div>
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {r.course} · {r.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="group relative grid min-h-[200px] place-items-center overflow-hidden rounded-[1.5rem] bg-primary text-primary-foreground">
                    <span className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in_oklab,var(--accent)_45%,transparent),transparent)]" />
                    <span className="relative flex flex-col items-center gap-3">
                      <PlayCircle className="size-14 transition-transform duration-500 group-hover:scale-110" />
                      <span className="text-sm font-semibold">Watch video story</span>
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {REVIEWS.map((r, i) => (
            <button
              key={r.name}
              aria-label={`Show testimonial from ${r.name}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index ? "w-10 bg-gold" : "w-4 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
