import { ArrowUpRight, Clock, Download, GraduationCap, IndianRupee, Star } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import courseHealth from "@/assets/course-health.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { cn } from "@/lib/utils";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";

const COURSES = [
  {
    img: hero1,
    w: 900,
    h: 1200,
    tag: "Featured",
    title: "Full Stack Web Development",
    desc: "Build production-grade applications with React, Node and cloud deployment, mentored by working engineers.",
    duration: "12 months",
    eligibility: "PUC / 12th pass",
    outcome: "Software Developer, QA Engineer",
    salary: "3.6 – 7.2 LPA",
    placement: "96%",
  },
  {
    img: courseHealth,
    w: 1000,
    h: 700,
    tag: "Popular",
    title: "Allied Healthcare & Patient Care",
    desc: "Clinical skills, patient handling and hospital protocols with rotations at partner hospitals in Udupi and Manipal.",
    duration: "12 months",
    eligibility: "10th / PUC pass",
    outcome: "Patient Care Assistant, OT Technician",
    salary: "2.8 – 5.4 LPA",
    placement: "94%",
  },
  {
    img: hero3,
    w: 900,
    h: 700,
    tag: "High demand",
    title: "Industrial Mechatronics & CNC",
    desc: "Hands-on machining, automation and maintenance training on live industrial equipment inside our workshop.",
    duration: "10 months",
    eligibility: "10th pass / ITI",
    outcome: "CNC Operator, Maintenance Technician",
    salary: "3.0 – 6.0 LPA",
    placement: "92%",
  },
];

export function Courses() {
  return (
    <section id="courses" className="py-24 lg:py-32">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Career programs"
            title="Programs designed backwards — from the job offer."
            intro="Twenty career tracks across technology, healthcare, finance, hospitality and manufacturing. Here are three of the most in-demand."
          />
          <Reveal delay={120}>
            <MagneticButton href="#enquiry" variant="outline">
              View all 20 programs <ArrowUpRight className="size-4" />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-16 space-y-8">
          {COURSES.map((c, i) => (
            <Reveal
              key={c.title}
              delay={60}
              className={cn(
                "lift group grid overflow-hidden rounded-[2rem] border border-border bg-card lg:grid-cols-2",
              )}
            >
              <div
                className={cn(
                  "relative min-h-[16rem] overflow-hidden",
                  i % 2 === 1 && "lg:order-2",
                )}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  width={c.w}
                  height={c.h}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110 lg:absolute lg:inset-0 lg:h-full"
                />
                <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-gold-foreground uppercase">
                  <Star className="size-3 fill-current" /> {c.tag}
                </span>
              </div>

              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-extrabold sm:text-3xl">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{c.desc}</p>

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                  {[
                    { icon: Clock, k: "Duration", v: c.duration },
                    { icon: GraduationCap, k: "Eligibility", v: c.eligibility },
                    { icon: IndianRupee, k: "Expected salary", v: c.salary },
                    { icon: Star, k: "Placement rate", v: c.placement },
                  ].map((row) => (
                    <div key={row.k} className="flex min-w-0 gap-3">
                      <row.icon className="mt-0.5 size-4 shrink-0 text-accent" />
                      <div className="min-w-0">
                        <dt className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                          {row.k}
                        </dt>
                        <dd className="text-sm font-semibold">{row.v}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 rounded-2xl bg-surface px-4 py-3 text-sm">
                  <span className="font-semibold">Career outcome: </span>
                  <span className="text-muted-foreground">{c.outcome}</span>
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton href="#enquiry" variant="primary" className="px-6 py-3">
                    Apply Now
                  </MagneticButton>
                  <MagneticButton href="#enquiry" variant="outline" className="px-6 py-3">
                    Learn More
                  </MagneticButton>
                  <a
                    href="#enquiry"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-accent transition-colors hover:bg-surface"
                  >
                    <Download className="size-4" /> Syllabus
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
