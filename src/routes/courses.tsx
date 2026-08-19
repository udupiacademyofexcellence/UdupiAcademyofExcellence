import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import aviationImg from "@/assets/Aviation & Hospitality.jpg";
import fireSafetyImg from "@/assets/Fire And Industrial Safety Management.png";
import hotelMgmtImg from "@/assets/Hotel Management.jpeg";
import communicationImg from "@/assets/Effective Communication & Interview Preparations.jpg";
import fashionImg from "@/assets/Diploma In Fashion Designing.webp";
import interiorImg from "@/assets/Diploma Interior Designing.webp";
import { Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
});

const COURSES = [
  { 
    num: "01", 
    title: "Aviation & Hospitality", 
    duration: "8–10 Month", 
    desc: "Comprehensive training for the aviation and hospitality sectors. Job training available at our centres.",
    img: aviationImg,
    bg: "bg-white"
  },
  { 
    num: "02", 
    title: "Fire And Industrial Safety Engineering", 
    duration: "8–10 Month", 
    desc: "Learn essential fire and industrial safety engineering protocols to ensure workplace safety.",
    img: fireSafetyImg,
    bg: "bg-surface"
  },
  { 
    num: "03", 
    title: "Hotel Management", 
    duration: "8–10 Month", 
    desc: "Practical training for a successful career in hotel management and professional hospitality.",
    img: hotelMgmtImg,
    bg: "bg-white"
  },
  { 
    num: "04", 
    title: "Effective Communication & Interview Preparations", 
    duration: "3–5 Month", 
    desc: "Develop strong communication skills and prepare for job interviews effectively.",
    img: communicationImg,
    bg: "bg-muted/30"
  },
  { 
    num: "05", 
    title: "Diploma In Fashion Designing", 
    duration: "8–10 Month", 
    desc: "Learn the art and business of fashion designing with practical industry training.",
    img: fashionImg,
    bg: "bg-white"
  },
  { 
    num: "06", 
    title: "Diploma Interior Designing", 
    duration: "8–10 Month", 
    desc: "Master interior designing concepts to build a career designing professional interior spaces.",
    img: interiorImg,
    bg: "bg-surface"
  },
  { 
    num: "07", 
    title: "Diploma In Hospital Administration", 
    duration: "8–10 Month", 
    desc: "Gain the skills to manage hospital operations, healthcare administration and patient services effectively.",
    img: hotelMgmtImg,
    bg: "bg-white"
  },
];

function CoursesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-24 lg:pt-48 lg:pb-32 bg-ink text-white">
        <div className="container-wide">
          <Reveal>
            <h1 className="font-display text-[4rem] sm:text-[5.5rem] lg:text-[7.5rem] font-extrabold leading-[0.9] tracking-tight">
              Seven job-ready <br/>
              <span className="text-gold italic pr-4">programmes.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Courses List */}
      <div>
        {COURSES.map((c, i) => (
          <section key={c.num} className={cn("py-24 lg:py-40", c.bg)}>
            <div className="container-wide">
              <Reveal delay={0} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* Image Column */}
                <div className={cn("relative aspect-[4/3] w-full", i % 2 === 1 && "lg:order-2")}>
                  {/* Subtle offset background accent */}
                  <div className={cn(
                    "absolute -inset-4 -z-10", 
                    i % 2 === 0 ? "bg-gold/10 -translate-x-6 translate-y-6" : "bg-ink/5 translate-x-6 -translate-y-6"
                  )}></div>
                  <img 
                    src={c.img} 
                    alt={c.title} 
                    className="w-full h-full object-cover grayscale-[15%] shadow-lg"
                  />
                  
                  {/* Subtle design corner accents for variation */}
                  {i % 3 === 0 && (
                    <>
                      <div className="absolute -top-4 -left-4 size-16 border-t-2 border-l-2 border-gold"></div>
                      <div className="absolute -bottom-4 -right-4 size-16 border-b-2 border-r-2 border-gold"></div>
                    </>
                  )}
                </div>

                {/* Text Column */}
                <div className={cn(i % 2 === 1 && "lg:order-1 lg:pr-12")}>
                  <p className="font-display text-[5rem] lg:text-[7rem] font-extrabold text-ink/10 leading-none mb-6">
                    {c.num}
                  </p>
                  <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-ink leading-[1.1] tracking-tight">
                    {c.title}
                  </h2>
                  <p className="mt-8 text-lg leading-relaxed text-ink/70 max-w-lg">
                    {c.desc}
                  </p>

                  <div className="mt-8 border-l-2 border-gold pl-6">
                    <p className="text-[11px] font-bold tracking-widest text-ink/50 uppercase mb-1">Duration</p>
                    <p className="font-display text-xl font-bold text-ink">{c.duration}</p>
                  </div>
                  
                  <div className="mt-12">
                    <Link to="/contact" className="inline-flex items-center justify-center bg-ink px-8 py-4 text-[13px] font-semibold text-white uppercase tracking-wider transition-all hover:bg-gold hover:text-ink">
                      Enquire Now <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
