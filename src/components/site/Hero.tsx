import { ArrowRight, CheckCircle2, MapPin, Star } from "lucide-react";
import heroImg from "@/assets/Student-aviation.jpg";
import academyImg from "@/assets/academy-student-group.jpg";
import { Reveal } from "./primitives";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-surface"
    >
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gold blob top-right */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.85 0.15 85 / 0.18) 0%, transparent 70%)" }}
        />
        {/* Dark blob bottom-left */}
        <div
          className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.14 0.03 260 / 0.07) 0%, transparent 70%)" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="container-wide relative z-10 pt-28 pb-12 sm:pt-32 sm:pb-16">
        {/* ── Location pill ── */}
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-ink/55 shadow-sm backdrop-blur-sm mb-6">
            <MapPin className="size-3 text-gold shrink-0" />
            Bangalore · Udupi · Sirsi
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col">
            {/* Headline */}
            <Reveal delay={60}>
              <h1 className="font-display font-extrabold tracking-tight leading-[0.92] text-ink">
                <span className="block text-[2.6rem] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5.2rem]">
                  Udupi Academy
                </span>
                <span
                  className="block text-[2.6rem] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5.2rem] italic"
                  style={{ color: "oklch(0.72 0.17 75)" }}
                >
                  of Excellence.
                </span>
              </h1>
            </Reveal>

            {/* Sub-text */}
            <Reveal delay={140}>
              <p className="mt-5 max-w-[520px] text-[0.95rem] sm:text-base leading-relaxed text-ink/65">
                Job-ready training in{" "}
                <span className="font-semibold text-ink/80">Aviation</span>,{" "}
                <span className="font-semibold text-ink/80">Hospitality</span>,{" "}
                <span className="font-semibold text-ink/80">Hotel Management</span>,{" "}
                <span className="font-semibold text-ink/80">Fire Safety</span>,{" "}
                <span className="font-semibold text-ink/80">Fashion &amp; Interior Designing</span> and more.
              </p>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-ink px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all duration-300 hover:bg-[oklch(0.72_0.17_75)] hover:text-ink hover:shadow-[0_8px_30px_-8px_oklch(0.85_0.15_85/0.6)] active:scale-95"
                >
                  Enquire Now <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 border border-ink/20 bg-white/60 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-ink rounded-full transition-all duration-300 hover:border-ink/60 hover:bg-white active:scale-95"
                >
                  Explore Courses
                </Link>
              </div>
            </Reveal>

            {/* ── Stats Row ── */}
            <Reveal delay={300}>
              <div className="mt-10 pt-8 border-t border-ink/10">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {/* Stat 1 */}
                  <div>
                    <p className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-none">50+</p>
                    <p className="mt-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-ink/50 leading-tight">
                      Students Placed
                    </p>
                  </div>

                  {/* Stat 2 */}
                  <div className="pl-3 sm:pl-4 border-l border-ink/10">
                    <p className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-none">100%</p>
                    <p className="mt-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-ink/50 leading-tight">
                      Placement Guarantee
                    </p>
                  </div>

                  {/* Pay After Placement — pill badge, never clips */}
                  <div className="pl-3 sm:pl-4 border-l border-ink/10 flex flex-col justify-center">
                    <div className="inline-flex items-start gap-1 rounded-xl bg-[oklch(0.85_0.15_85/0.15)] border border-[oklch(0.85_0.15_85/0.35)] px-2.5 py-2 w-fit">
                      <CheckCircle2 className="size-3.5 text-[oklch(0.55_0.16_70)] shrink-0 mt-px" />
                      <span className="text-[10px] sm:text-[11px] font-bold text-[oklch(0.45_0.14_70)] leading-tight">
                        Pay After<br />Placement
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT: Image card ── */}
          <Reveal delay={160} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_-24px_oklch(0.14_0.03_260/0.28)] aspect-[4/5] sm:aspect-[3/4] w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
              <img
                src={heroImg}
                alt="Udupi Academy aviation student in training"
                className="size-full object-cover"
                loading="eager"
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/65 to-transparent" />

              {/* Admissions Open badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 shadow-md">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-ink/80 uppercase tracking-wider">Admissions Open</span>
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/90 text-sm font-semibold leading-snug">
                  Launch your career in Aviation &amp; Hospitality
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="size-3 text-gold fill-gold" />
                  ))}
                  <span className="text-white/60 text-[10px] ml-1">Trusted by 500+ students</span>
                </div>
              </div>
            </div>

            {/* Floating mini card — desktop only, overlaps image */}
            <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl bg-white shadow-[0_8px_32px_-8px_oklch(0.14_0.03_260/0.18)] border border-ink/5 px-4 py-3 max-w-[200px]">
              <img
                src={academyImg}
                alt="Academy students"
                className="size-12 rounded-xl object-cover shrink-0"
              />
              <div>
                <p className="text-xs font-bold text-ink leading-tight">3 Locations</p>
                <p className="text-[10px] text-ink/50 mt-0.5 leading-tight">Bangalore · Udupi · Sirsi</p>
              </div>
            </div>

            {/* Gold corner accents */}
            <div className="absolute -top-3 -right-3 size-12 rounded-tl-2xl border-t-2 border-l-2 pointer-events-none" style={{ borderColor: "oklch(0.85 0.15 85)" }} />
            <div className="absolute -bottom-3 -right-3 size-12 rounded-br-2xl border-b-2 border-r-2 pointer-events-none" style={{ borderColor: "oklch(0.85 0.15 85)" }} />
          </Reveal>
        </div>

        {/* ── Mobile-only location card ── */}
        <Reveal delay={380} className="mt-8 sm:hidden">
          <div className="flex items-center gap-3 rounded-2xl bg-white shadow-[0_8px_32px_-8px_oklch(0.14_0.03_260/0.12)] border border-ink/5 px-4 py-3">
            <img
              src={academyImg}
              alt="Academy students"
              className="size-12 rounded-xl object-cover shrink-0"
            />
            <div>
              <p className="text-xs font-bold text-ink leading-tight">3 Locations across Karnataka</p>
              <p className="text-[10px] text-ink/50 mt-0.5 leading-tight">Bangalore · Udupi · Sirsi</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
