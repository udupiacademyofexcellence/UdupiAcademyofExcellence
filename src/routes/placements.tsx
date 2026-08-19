import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/primitives";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/placements")({
  component: PlacementsPage,
});

const STUDENTS = [
  { name: "Ashwisha", company: "Bangalore Airport", role: "Customer Service" },
  { name: "Anusha", company: "Bangalore Airport", role: "Customer Service" },
  { name: "Sneha Shetty", company: "Bangalore Airport T1", role: "Duty Free" },
  { name: "Akshay", company: "Mangalore Airport", role: "Indigo Airline" },
  { name: "Sushmitha", company: "Mangalore Airport", role: "Indigo Airline" },
  { name: "Monika", company: "Bangalore Airport", role: "TFS Lounge" },
  { name: "Vaishak", company: "Bangalore Airport", role: "Celebrity Aviation" },
];

const TIMELINE = [
  { num: "01", text: "Enroll in a job training course." },
  { num: "02", text: "Complete training at Bangalore, Udupi or Sirsi." },
  { num: "03", text: "Prepare for interviews and connect with employers." },
  { num: "04", text: "Get placed and pay after placement." },
];

function PlacementsPage() {
  return (
    <div className="min-h-screen">
      
      {/* Placement Hero - Dark Navy */}
      <section className="bg-ink pt-40 pb-32 text-white">
        <div className="container-wide">
          <Reveal>
            <h1 className="font-display text-[4rem] leading-[0.9] sm:text-[5rem] lg:text-[7rem] font-extrabold tracking-tight">
              100% <br/>
              <span className="text-gold italic pr-4">Placement</span><br/>
              Guarantee.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 text-2xl lg:text-3xl font-display font-bold text-white/90">
              Pay After Placement.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 max-w-lg">
              <p className="text-lg leading-relaxed text-white/70">
                More than 50+ students placed in the past 6 months after completing our job training courses.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Placement Statistic - Warm Cream */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide text-center">
          <Reveal>
            <h2 className="font-display text-[6rem] sm:text-[8rem] lg:text-[10rem] leading-[0.8] font-extrabold text-gold tracking-tight">
              50+
            </h2>
            <p className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-ink mt-6 tracking-tight">
              Students placed in the past 6 months.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Placement Examples - White Grid */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide">
          <Reveal>
            <h3 className="font-display text-4xl font-extrabold text-ink mb-16">
              Recent Placements
            </h3>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {STUDENTS.map((s, i) => (
              <Reveal 
                key={i} 
                delay={(i % 4) * 100}
                className="border border-ink/10 p-8 hover:border-gold transition-colors duration-500 bg-white shadow-sm hover:shadow-md"
              >
                <p className="font-display text-2xl font-bold text-ink">{s.name}</p>
                <div className="w-8 h-0.5 bg-gold my-4"></div>
                <p className="text-sm font-semibold tracking-widest uppercase text-ink/70">
                  {s.role}
                </p>
                <p className="mt-1 text-sm text-ink/50">{s.company}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Training-to-placement process - Light Cream */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <Reveal>
            <h3 className="font-display text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-16 lg:mb-24">
              How it works.
            </h3>
          </Reveal>

          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 relative">
            {/* Desktop horizontal line */}
            <div className="hidden lg:block absolute top-[30px] left-8 right-8 h-[2px] bg-ink/10"></div>
            
            {TIMELINE.map((step, i) => (
              <Reveal key={step.num} delay={i * 100} className="relative z-10 flex flex-row lg:flex-col gap-6 lg:gap-8 items-start">
                <div className="w-16 h-16 shrink-0 rounded-full bg-white border-2 border-gold flex items-center justify-center font-display text-2xl font-bold text-ink">
                  {step.num}
                </div>
                <p className="font-display text-xl font-bold text-ink leading-snug lg:pr-4 mt-2 lg:mt-0">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - White */}
      <section className="py-24 lg:py-40 bg-white text-center border-t border-ink/10">
        <div className="container-wide">
          <Reveal>
            <h2 className="font-display text-[4rem] sm:text-[5.5rem] lg:text-[7rem] leading-[0.9] font-extrabold text-ink tracking-tight">
              Train.<br/>
              Get placed.<br/>
              <span className="text-gold italic">Then pay.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-16">
              <Link to="/contact" className="inline-flex items-center justify-center bg-ink px-10 py-5 text-[13px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-gold hover:text-ink">
                Enquire Now <ArrowRight className="ml-3 size-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
