import { Reveal } from "./primitives";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PREVIEW_STUDENTS = [
  { name: "Ashwisha", location: "Bangalore Airport", role: "CUSTOMER SERVICE" },
  { name: "Anusha", location: "Bangalore Airport", role: "CUSTOMER SERVICE" },
  { name: "Sneha Shetty", location: "Bangalore Airport T1", role: "DUTY FREE" },
  { name: "Akshay", location: "Mangalore Airport", role: "INDIGO AIRLINE" },
  { name: "Sushmitha", location: "Mangalore Airport", role: "INDIGO AIRLINE" },
  { name: "Monika", location: "Bangalore Airport", role: "TFS LOUNGE" },
  { name: "Vaishak", location: "Bangalore Airport", role: "CELEBRITY AVIATION" },
];

export function Placements() {
  // Split into left and right columns for the staggered look
  const leftColStudents = PREVIEW_STUDENTS.filter((_, i) => i % 2 === 0);
  const rightColStudents = PREVIEW_STUDENTS.filter((_, i) => i % 2 !== 0);

  return (
    <section id="placements" className="bg-ink py-24 lg:py-32 text-white overflow-hidden relative">
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-[45%_55%] gap-16 lg:gap-20">
          
          {/* LEFT: Typographic Content */}
          <div className="lg:sticky lg:top-32 self-start">
            <Reveal>
              <h2 className="font-display text-[4rem] leading-[0.9] sm:text-[5rem] lg:text-[6.5rem] font-extrabold tracking-tight">
                100% <br/>
                <span className="text-gold italic pr-4">Placement</span><br/>
                Guarantee.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 text-2xl lg:text-3xl font-display font-bold text-white/90">
                Pay After Placement.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8 border-l-[3px] border-gold pl-6">
                <p className="text-lg leading-relaxed text-white/70 max-w-sm">
                  More than <strong className="text-white font-semibold">200+ students placed</strong> in the past 6 months after completing our job training courses.
                </p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-12">
                <Link to="/placements" className="inline-flex items-center text-[13px] font-bold text-white uppercase tracking-widest transition-colors hover:text-gold group">
                  VIEW ALL PLACEMENTS <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Placement Examples (Staggered Grid) */}
          <div className="hidden lg:grid grid-cols-2 gap-x-16">
            {/* Column 1 */}
            <div className="flex flex-col gap-12 mt-12">
              {leftColStudents.map((s, i) => (
                <Reveal key={s.name} delay={i * 100}>
                  <div className="border-t border-white/10 pt-6">
                    <p className="font-display text-3xl font-bold text-white">{s.name}</p>
                    <p className="mt-4 text-[13px] font-bold tracking-widest uppercase text-gold">
                      {s.role}
                    </p>
                    <p className="mt-1 text-sm text-white/50">{s.location}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Column 2 (Offset) */}
            <div className="flex flex-col gap-12 mt-32">
              {rightColStudents.map((s, i) => (
                <Reveal key={s.name} delay={i * 100 + 100}>
                  <div className="border-t border-white/10 pt-6">
                    <p className="font-display text-3xl font-bold text-white">{s.name}</p>
                    <p className="mt-4 text-[13px] font-bold tracking-widest uppercase text-gold">
                      {s.role}
                    </p>
                    <p className="mt-1 text-sm text-white/50">{s.location}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mobile version of preview */}
          <div className="flex flex-col gap-8 lg:hidden mt-8">
             {PREVIEW_STUDENTS.map((s, i) => (
              <Reveal key={s.name} delay={i * 50}>
                <div className="border-t border-white/10 pt-6">
                  <p className="font-display text-2xl font-bold text-white">{s.name}</p>
                  <p className="mt-3 text-xs font-bold tracking-widest uppercase text-gold">
                    {s.role}
                  </p>
                  <p className="mt-1 text-sm text-white/50">{s.location}</p>
                </div>
              </Reveal>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
