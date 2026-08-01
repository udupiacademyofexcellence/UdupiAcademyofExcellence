import { Compass, Flag, HeartHandshake } from "lucide-react";
import campus from "@/assets/campus.jpg";
import { Counter, Reveal, SectionHeading } from "./primitives";

const MILESTONES = [
  { year: "2010", title: "Founded in Udupi", text: "Started with two classrooms and 40 learners." },
  { year: "2014", title: "Industry alliances", text: "First 25 hiring partners onboarded." },
  { year: "2019", title: "New campus", text: "45,000 sq.ft. skill campus with 12 labs." },
  { year: "2026", title: "5,000+ alumni", text: "Placed across 8 industries in India & Gulf." },
];

const PILLARS = [
  {
    icon: Flag,
    title: "Mission",
    text: "Make every learner employable within one year through practical, industry-designed training.",
  },
  {
    icon: Compass,
    title: "Vision",
    text: "To be coastal Karnataka's most respected institute for professional skills and careers.",
  },
  {
    icon: HeartHandshake,
    title: "Values",
    text: "Integrity, mentorship, discipline and lifelong support for every student we admit.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="container-wide grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
        <div className="relative">
          <Reveal className="overflow-hidden rounded-[2.5rem] shadow-lift">
            <img
              src={campus}
              alt="Udupi Academy campus building"
              width={1400}
              height={1000}
              loading="lazy"
              className="aspect-4/5 w-full object-cover transition-transform duration-[1.4s] hover:scale-105 sm:aspect-4/3 lg:aspect-4/5"
            />
          </Reveal>

          <Reveal
            delay={150}
            className="glass absolute -right-2 bottom-8 w-[220px] rounded-3xl p-5 shadow-lift lg:-right-12"
          >
            <p className="font-display text-4xl font-extrabold">
              <Counter to={16} suffix=" yrs" />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Training careers in coastal Karnataka since 2010.
            </p>
          </Reveal>

          <Reveal
            delay={250}
            className="glass absolute -top-6 -left-2 rounded-2xl px-4 py-3 shadow-card lg:-left-10"
          >
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Since 2010
            </p>
          </Reveal>
        </div>

        <div>
          <SectionHeading
            eyebrow="About the academy"
            title={
              <>
                A campus built around one promise —{" "}
                <span className="text-gradient-gold">you get hired.</span>
              </>
            }
            intro="Udupi Academy blends classroom rigour with live industry projects, internships and structured placement preparation. Every programme is co-designed with employers, so what you learn on Monday is what the workplace needs on Friday."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 90}
                className="lift rounded-3xl border border-border bg-card p-6"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-surface text-accent">
                  <p.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </Reveal>
            ))}
          </div>

          <ol className="mt-10 grid gap-6 sm:grid-cols-2">
            {MILESTONES.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 80} className="relative pl-6">
                <span className="absolute top-1.5 left-0 size-2.5 rounded-full bg-gold" />
                <span className="absolute top-4 bottom-0 left-[4.5px] w-px bg-border" />
                <p className="font-mono text-sm font-bold text-accent">{m.year}</p>
                <p className="mt-1 font-semibold">{m.title}</p>
                <p className="text-sm text-muted-foreground">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
