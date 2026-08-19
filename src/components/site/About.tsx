import campus from "@/assets/academy-building.jpg";
import staffTeaching from "@/assets/StaffTeaching.jpg";
import { Reveal } from "./primitives";

const PILLARS = [
  { num: "01", title: "Mission", text: "To make every learner employable within one year through practical, industry-designed training." },
  { num: "02", title: "Vision", text: "To be the most respected institute for professional skills and career development." },
  { num: "03", title: "Pay After Placement", text: "We believe in our training so much that you only pay after you secure a job." },
];

const CENTRES = [
  { name: "Bangalore", desc: "Professional Job Training Centre" },
  { name: "Udupi", desc: "Professional Job Training Centre" },
  { name: "Sirsi", desc: "MISGAR UNIQUE ZONE SHIVAJI CHOWK, RAYARPETE ROAD, SIRSI - 581401" },
];

export function About() {
  return (
    <section id="about">
      {/* Editorial Hero */}
      <div className="bg-ink pt-32 pb-48 lg:pt-48 lg:pb-64 relative">
        <div className="container-wide relative z-10 text-center">
          <Reveal>
            <h2 className="font-display text-[4rem] sm:text-[5rem] lg:text-[7rem] font-extrabold text-white leading-[0.9] tracking-tight">
              Your career <br/>
              <span className="text-gold italic pr-4">starts here.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Overlapping Image & About Content */}
      <div className="container-wide relative -mt-32 lg:-mt-48 z-20 pb-24 lg:pb-32">
        <Reveal delay={150}>
          <div className="w-full max-w-5xl mx-auto aspect-video mb-24 shadow-2xl relative">
            <div className="absolute -inset-4 bg-gold/10 -z-10 translate-x-4 translate-y-4"></div>
            <img 
              src={campus} 
              alt="Udupi Academy campus" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
          <Reveal>
            <h3 className="font-display text-4xl lg:text-5xl font-extrabold text-ink leading-[1.1] tracking-tight">
              A campus built around one promise — you get hired.
            </h3>
            <p className="mt-8 text-lg leading-relaxed text-ink/70">
              Udupi Academy blends classroom rigour with live industry projects, internships and structured placement preparation. Every programme is co-designed with employers, so what you learn on Monday is what the workplace needs on Friday.
            </p>
          </Reveal>
          <Reveal delay={100} className="relative aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto lg:mr-0 mt-8 lg:mt-0">
            <img 
              src={staffTeaching} 
              alt="Staff teaching at the Academy" 
              className="w-full h-full object-cover grayscale-[10%]"
            />
            <div className="absolute -top-4 -left-4 size-16 border-t-2 border-l-2 border-gold"></div>
            <div className="absolute -bottom-4 -right-4 size-16 border-b-2 border-r-2 border-gold"></div>
          </Reveal>
        </div>
      </div>

      {/* Mission / Vision / Pay After Placement */}
      <div className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 border-t border-ink/10 pt-16">
            {PILLARS.map((p, i) => (
              <Reveal key={p.num} delay={i * 100}>
                <p className="font-display text-5xl font-extrabold text-ink/20">{p.num}</p>
                <h4 className="font-display text-2xl font-bold text-ink mt-4 lg:mt-6">{p.title}</h4>
                <p className="mt-4 text-ink/70 leading-relaxed text-sm lg:text-base">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Training Centres */}
      <div className="py-24 lg:py-32 bg-white">
        <div className="container-wide">
          <Reveal>
            <h3 className="font-display text-3xl font-extrabold text-ink mb-16 text-center">
              Our Training Centres
            </h3>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {CENTRES.map((c, i) => (
              <Reveal key={c.name} delay={i * 100} className="text-center group border border-ink/10 p-12 hover:border-gold transition-colors">
                <h4 className="font-display text-3xl font-bold text-ink group-hover:text-gold transition-colors">{c.name}</h4>
                <div className="w-12 h-1 bg-ink/10 mx-auto mt-6 mb-6 group-hover:bg-gold transition-colors"></div>
                <p className="text-sm font-semibold uppercase tracking-wider text-ink/60">{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
