import {
  BriefcaseBusiness,
  ClipboardCheck,
  FolderKanban,
  LifeBuoy,
  Presentation,
  Rocket,
  Users,
} from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";

const STEPS = [
  { icon: ClipboardCheck, title: "Admission", text: "Counselling and course fit assessment." },
  { icon: Users, title: "Orientation", text: "Meet mentors, batch and career roadmap." },
  { icon: Presentation, title: "Training", text: "Classroom plus 70% hands-on lab work." },
  { icon: FolderKanban, title: "Projects", text: "Live client-grade capstone projects." },
  { icon: BriefcaseBusiness, title: "Internship", text: "8–12 weeks with a partner company." },
  { icon: Rocket, title: "Placement", text: "Interviews, referrals and offer support." },
  { icon: LifeBuoy, title: "Career support", text: "Lifetime alumni upskilling access." },
];

export function Journey() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Student journey"
          title="Seven stages from enquiry to employment."
          align="center"
        />

        <div className="relative mt-16">
          <div className="absolute top-7 right-0 left-0 hidden h-px bg-border lg:block" />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-7 lg:gap-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative">
                <span className="relative z-10 grid size-14 place-items-center rounded-2xl border border-border bg-background text-accent shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold">
                  <s.icon className="size-6" />
                </span>
                <p className="mt-5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 text-base font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
