import { ArrowRight, BadgeCheck, Sparkles, TrendingUp } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import { Counter, Eyebrow, MagneticButton, Reveal } from "./primitives";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Full-bleed background image on the right half */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]">
        <img
          src={hero1}
          alt="Students learning in a modern Udupi Academy lab"
          className="size-full object-cover object-center"
        />
        {/* gradient fade into left content */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent lg:via-background/20" />
        {/* bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Ambient blobs */}
      <div className="mesh-bg absolute inset-0 -z-10" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(60%_50%_at_20%_30%,black,transparent)]" />

      <div className="container-wide relative flex min-h-screen items-center pb-24 pt-36 lg:pt-40">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Admissions open · Batch 2026</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[2.9rem] leading-[0.98] font-extrabold text-balance sm:text-6xl lg:text-[4.6rem]">
              Transform skills into{" "}
              <span className="relative inline-block">
                <span className="text-gradient-gold">successful careers.</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  className="absolute -bottom-2 left-0 w-full text-gold/60"
                >
                  <path
                    d="M2 8C60 3 140 2 298 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Professional training that prepares students for real jobs through
              industry-led education, practical learning and dedicated placement
              support — in the heart of Udupi, Karnataka.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton href="#enquiry" variant="primary">
                Apply Now <ArrowRight className="size-4" />
              </MagneticButton>
              <MagneticButton href="#courses" variant="outline">
                Explore Courses
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-8">
              {[
                { v: 5000, s: "+", l: "Students trained" },
                { v: 100, s: "+", l: "Hiring partners" },
                { v: 20, s: "+", l: "Career programs" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl font-extrabold">
                    <Counter to={s.v} suffix={s.s} />
                  </p>
                  <p className="text-sm text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Floating glass cards */}
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap gap-3">
              <div className="glass flex items-center gap-3 rounded-2xl px-5 py-3 shadow-card">
                <span className="grid size-9 place-items-center rounded-xl bg-gold/20 text-gold-foreground">
                  <TrendingUp className="size-4" />
                </span>
                <div>
                  <p className="font-display text-xl font-extrabold leading-none">
                    <Counter to={95} suffix="%" />
                  </p>
                  <p className="text-xs text-muted-foreground">Placement rate</p>
                </div>
              </div>

              <div className="glass flex items-center gap-3 rounded-2xl px-5 py-3 shadow-card">
                <span className="pulse-ring grid size-9 place-items-center rounded-xl bg-accent/15 text-accent">
                  <BadgeCheck className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">NSDC & Govt. recognised</p>
                  <p className="text-xs text-muted-foreground">Certified since 2010</p>
                </div>
              </div>

              <div className="glass flex items-center gap-2 rounded-full px-4 py-2 shadow-card">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-gold" />
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  <Sparkles className="mr-1 inline size-3 text-gold" />
                  <Counter to={38} /> students enrolled this week
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
