import { useState } from "react";
import { Building2, TrendingUp } from "lucide-react";
import { Counter, Eyebrow, Reveal } from "./primitives";
import { cn } from "@/lib/utils";

const STATS = [
  { v: 95, s: "%", l: "Placement rate" },
  { v: 4.8, s: " LPA", l: "Average package", d: 1 },
  { v: 12.5, s: " LPA", l: "Highest package", d: 1 },
  { v: 118, s: "+", l: "Hiring partners" },
];

const YEARS = [
  { year: "2021", pct: 78 },
  { year: "2022", pct: 84 },
  { year: "2023", pct: 88 },
  { year: "2024", pct: 92 },
  { year: "2025", pct: 95 },
];

const INDUSTRIES = ["All", "IT", "Healthcare", "Finance", "Retail", "Hospitality", "Manufacturing"];

const COMPANIES = [
  { name: "Infosys BPM", industry: "IT" },
  { name: "Wipro", industry: "IT" },
  { name: "Mindtree", industry: "IT" },
  { name: "Manipal Hospitals", industry: "Healthcare" },
  { name: "KMC Health", industry: "Healthcare" },
  { name: "Apollo Clinics", industry: "Healthcare" },
  { name: "HDFC Bank", industry: "Finance" },
  { name: "Axis Bank", industry: "Finance" },
  { name: "Bajaj Finserv", industry: "Finance" },
  { name: "Reliance Retail", industry: "Retail" },
  { name: "Lulu Group", industry: "Retail" },
  { name: "Taj Hotels", industry: "Hospitality" },
  { name: "Marriott", industry: "Hospitality" },
  { name: "Bosch", industry: "Manufacturing" },
  { name: "Sundaram Fasteners", industry: "Manufacturing" },
  { name: "Syngene", industry: "Manufacturing" },
];

export function Placements() {
  const [filter, setFilter] = useState("All");
  const list =
    filter === "All" ? COMPANIES : COMPANIES.filter((c) => c.industry === filter);

  return (
    <section id="placements" className="relative overflow-hidden bg-ink py-24 text-primary-foreground lg:py-32">
      <div className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(60%_50%_at_15%_0%,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_70%),radial-gradient(50%_45%_at_90%_20%,color-mix(in_oklab,var(--gold)_25%,transparent),transparent_70%)]" />

      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <Eyebrow tone="dark">Placement success</Eyebrow>
            <h2 className="mt-6 text-4xl leading-[1.05] font-extrabold text-balance sm:text-5xl lg:text-[3.4rem]">
              Careers launched, <span className="text-gradient-gold">not just certificates issued.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-primary-foreground/70">
              Our placement cell works with 118 recruiters across six industries. Every
              student gets interview training, portfolio reviews and direct referrals
              until they are placed — no time limit.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.l}
              delay={i * 80}
              className="glass-dark rounded-[1.75rem] p-7 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <p className="font-display text-5xl font-extrabold text-gold">
                <Counter to={s.v} suffix={s.s} decimals={s.d ?? 0} />
              </p>
              <p className="mt-2 text-sm text-primary-foreground/65">{s.l}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          {/* Animated graph */}
          <Reveal className="glass-dark rounded-[1.75rem] p-8">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <TrendingUp className="size-4 text-gold" /> Placement rate by year
            </div>
            <ul className="mt-8 space-y-4">
              {YEARS.map((y, i) => (
                <li key={y.year} className="flex items-center gap-4">
                  <span className="w-12 font-mono text-xs text-primary-foreground/60">
                    {y.year}
                  </span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <Bar pct={y.pct} delay={i * 120} />
                  </span>
                  <span className="w-10 text-right text-xs font-semibold">{y.pct}%</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Company wall with filters */}
          <Reveal delay={120} className="glass-dark rounded-[1.75rem] p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Building2 className="size-4 text-gold" />
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setFilter(ind)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                    filter === ind
                      ? "bg-gold text-gold-foreground"
                      : "bg-white/10 text-primary-foreground/70 hover:bg-white/20",
                  )}
                >
                  {ind}
                </button>
              ))}
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {list.map((c) => (
                <li
                  key={c.name}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center text-sm font-semibold text-primary-foreground/80 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:text-primary-foreground"
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Bar({ pct, delay }: { pct: number; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <span
        className="block h-full rounded-full bg-gradient-to-r from-accent to-gold transition-[width] duration-1000 ease-out"
        style={{ width: `${pct}%` }}
      />
    </Reveal>
  );
}
