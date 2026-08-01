import {
  Briefcase,
  GraduationCap,
  Handshake,
  Laptop,
  MessagesSquare,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { Counter, Reveal, SectionHeading } from "./primitives";

export function WhyBento() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Why Udupi Academy"
          title="Eight reasons students choose us over a regular college."
          intro="A support system engineered for outcomes — from your first counselling call to your first salary credit."
        />

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Feature tile */}
          <Reveal className="lift group relative overflow-hidden rounded-[1.75rem] bg-primary p-8 text-primary-foreground md:col-span-2 md:row-span-2">
            <div className="absolute -top-16 -right-16 size-64 rounded-full bg-gold/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
            <span className="glass-dark grid size-12 place-items-center rounded-2xl">
              <Target className="size-6" />
            </span>
            <h3 className="mt-6 text-3xl leading-tight font-extrabold">
              Placement-first curriculum
            </h3>
            <p className="mt-3 max-w-md text-primary-foreground/70">
              Every module maps to a job role. Mock interviews from month one, resume
              clinics, aptitude drills and a dedicated placement officer per batch.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
              <div>
                <p className="font-display text-4xl font-extrabold text-gold">
                  <Counter to={95} suffix="%" />
                </p>
                <p className="text-sm text-primary-foreground/60">Placed within 6 months</p>
              </div>
              <div>
                <p className="font-display text-4xl font-extrabold text-gold">
                  <Counter to={4.8} decimals={1} suffix=" LPA" />
                </p>
                <p className="text-sm text-primary-foreground/60">Average package 2025</p>
              </div>
            </div>
          </Reveal>

          {[
            { icon: Briefcase, title: "Industry experts", text: "Trainers with 10+ years of live industry practice." },
            { icon: Wrench, title: "Practical training", text: "70% lab time. Real tools, real machines, real code." },
            { icon: Laptop, title: "Modern campus", text: "12 labs, smart classrooms, high-speed connectivity." },
            { icon: GraduationCap, title: "Scholarships", text: "Merit, need-based and sports grants up to 50%." },
          ].map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 70}
              className="lift group rounded-[1.75rem] border border-border bg-card p-6"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-accent/15 to-gold/15 text-accent transition-transform duration-500 group-hover:-rotate-6">
                <c.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </Reveal>
          ))}

          <Reveal className="lift rounded-[1.75rem] border border-gold/40 bg-gradient-to-br from-gold/20 to-transparent p-6 md:col-span-2">
            <span className="grid size-11 place-items-center rounded-2xl bg-gold text-gold-foreground">
              <Handshake className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-bold">Guaranteed internships</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Every diploma includes a paid or credited internship with one of our 100+
              partner organisations across Udupi, Mangaluru and Bengaluru.
            </p>
          </Reveal>

          {[
            { icon: MessagesSquare, title: "Soft skills lab", text: "Communication, interview and workplace etiquette coaching." },
            { icon: Sparkles, title: "Career guidance", text: "1:1 mentoring, psychometric mapping and alumni networking." },
          ].map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 70}
              className="lift group rounded-[1.75rem] border border-border bg-card p-6"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-accent/15 to-gold/15 text-accent transition-transform duration-500 group-hover:-rotate-6">
                <c.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
