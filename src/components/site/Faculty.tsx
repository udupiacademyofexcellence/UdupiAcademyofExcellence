import { Award, Linkedin, Mail } from "lucide-react";
import f1 from "@/assets/faculty-1.jpg";
import f2 from "@/assets/faculty-2.jpg";
import f3 from "@/assets/faculty-3.jpg";
import { Reveal, SectionHeading } from "./primitives";

const FACULTY = [
  {
    img: f1,
    name: "Dr. Ramesh Shenoy",
    role: "Director, Academics",
    exp: "24 years",
    spec: "Industrial Engineering",
    win: "Ex-Bosch plant training head",
  },
  {
    img: f2,
    name: "Dr. Anitha Rao",
    role: "Head, Allied Healthcare",
    exp: "18 years",
    spec: "Clinical Skills & Patient Care",
    win: "Manipal Hospitals clinical educator",
  },
  {
    img: f3,
    name: "Nikhil Pai",
    role: "Lead Trainer, Technology",
    exp: "11 years",
    spec: "Full Stack & Cloud",
    win: "Built engineering teams at 2 startups",
  },
];

export function Faculty() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Faculty"
          title="Taught by practitioners, not just professors."
          intro="Our trainers spend part of every year inside industry, so the curriculum never drifts from what employers actually hire for."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FACULTY.map((f, i) => (
            <Reveal key={f.name} delay={i * 100} className="group relative overflow-hidden rounded-[2rem] border border-border bg-card">
              <div className="overflow-hidden">
                <img
                  src={f.img}
                  alt={`${f.name}, ${f.role}`}
                  width={800}
                  height={900}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{f.name}</h3>
                <p className="text-sm text-accent">{f.role}</p>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-primary/95 p-6 text-primary-foreground opacity-0 backdrop-blur-md transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-lg font-bold">{f.name}</h3>
                <dl className="mt-3 space-y-1.5 text-sm text-primary-foreground/75">
                  <div className="flex gap-2">
                    <dt className="font-semibold text-primary-foreground">Experience:</dt>
                    <dd>{f.exp}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold text-primary-foreground">Specialisation:</dt>
                    <dd>{f.spec}</dd>
                  </div>
                  <div className="flex gap-2">
                    <Award className="mt-0.5 size-4 shrink-0 text-gold" />
                    <dd>{f.win}</dd>
                  </div>
                </dl>
                <div className="mt-4 flex gap-2">
                  <a
                    href="#enquiry"
                    aria-label={`LinkedIn profile of ${f.name}`}
                    className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <Linkedin className="size-4" />
                  </a>
                  <a
                    href="#enquiry"
                    aria-label={`Email ${f.name}`}
                    className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <Mail className="size-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
