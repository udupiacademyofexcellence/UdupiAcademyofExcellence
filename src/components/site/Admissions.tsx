import {
  Award,
  BadgeIndianRupee,
  CalendarCheck,
  FileCheck2,
  FileText,
  HeartHandshake,
  MessageSquareText,
  Mic,
  Trophy,
  Wallet,
} from "lucide-react";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";

const STEPS = [
  { icon: MessageSquareText, title: "Counselling", text: "Free 30-minute session to map your goals to the right programme." },
  { icon: FileText, title: "Application", text: "Submit the online form with your basic academic details." },
  { icon: FileCheck2, title: "Document verification", text: "Marks cards, ID proof and photographs verified on campus." },
  { icon: Mic, title: "Interview", text: "A short aptitude and motivation conversation with faculty." },
  { icon: BadgeIndianRupee, title: "Enrollment", text: "Fee plan, scholarship confirmation and seat allotment." },
  { icon: CalendarCheck, title: "Orientation", text: "Batch induction, mentor allocation and campus walkthrough." },
];

const SCHOLARSHIPS = [
  { icon: Award, title: "Merit scholarship", pct: "Up to 50%", text: "For 85%+ in qualifying exams." },
  { icon: HeartHandshake, title: "Need-based aid", pct: "Up to 40%", text: "Income-linked support for deserving families." },
  { icon: Trophy, title: "Sports quota", pct: "Up to 35%", text: "District and state level athletes." },
  { icon: BadgeIndianRupee, title: "Government schemes", pct: "Varies", text: "SC/ST, minority and Skill India grants." },
  { icon: Wallet, title: "Education loan", pct: "0% EMI", text: "Tie-ups with 6 nationalised banks." },
];

export function Admissions() {
  return (
    <section id="admissions" className="py-24 lg:py-32">
      <div className="container-wide grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Admission process"
            title="Six steps. Two weeks. One decision that changes everything."
            intro="Rolling admissions across three intakes a year. Our counsellors guide you through every stage — no agents, no hidden charges."
          />
          <Reveal delay={140} className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#enquiry" variant="primary">
              Start your application
            </MagneticButton>
            <MagneticButton href="#enquiry" variant="outline">
              Download brochure
            </MagneticButton>
          </Reveal>
        </div>

        <ol className="relative space-y-4 border-l border-border pl-8">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="relative">
              <span className="absolute top-7 -left-[43px] grid size-6 place-items-center rounded-full border border-border bg-background font-mono text-[10px] font-bold text-accent">
                {i + 1}
              </span>
              <div className="lift rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-surface text-accent">
                    <s.icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <div id="scholarships" className="container-wide mt-24">
        <SectionHeading
          eyebrow="Scholarships & funding"
          title="Fees should never decide your future."
          align="center"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SCHOLARSHIPS.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 80}
              className="lift group rounded-[1.75rem] border border-border bg-card p-6"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-gold/15 text-gold-foreground transition-transform duration-500 group-hover:scale-110">
                <s.icon className="size-5" />
              </span>
              <p className="mt-5 font-display text-2xl font-extrabold text-accent">{s.pct}</p>
              <h3 className="mt-1 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
