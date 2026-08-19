import { createFileRoute, Link } from "@tanstack/react-router";
import { Courses } from "@/components/site/Courses";
import { Contact } from "@/components/site/Contact";
import { Hero } from "@/components/site/Hero";
import { Placements } from "@/components/site/Placements";
import { CampusLife } from "@/components/site/CampusLife";
import { Reveal } from "@/components/site/primitives";
import { ArrowRight } from "lucide-react";
import campus from "@/assets/academy-building.jpg";
import hero3 from "@/assets/academy-students-staff.jpg";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Hero />
      
      {/* About Preview */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
            <Reveal>
              <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-ink leading-[1.1] tracking-tight">
                Your career <br/>
                <span className="text-gold italic">starts here.</span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-ink/70">
                Udupi Academy blends classroom rigour with live industry projects, internships and structured placement preparation.
              </p>
              <div className="mt-10">
                <Link to="/about" className="inline-flex items-center justify-center border border-ink/20 px-8 py-4 text-[13px] font-semibold text-ink uppercase tracking-wider transition-all hover:bg-ink hover:text-white">
                  Learn More
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100} className="relative w-full max-w-lg mx-auto lg:ml-auto lg:mr-0 aspect-[4/3]">
              <img src={campus} alt="Campus" className="absolute inset-0 w-full h-full object-cover grayscale-[20%] shadow-xl z-10" />
              <img src={hero3} alt="Training" className="absolute -bottom-12 -left-12 w-2/3 aspect-square object-cover grayscale-[10%] shadow-2xl z-20 border-4 border-white" />
            </Reveal>
          </div>
        </div>
      </section>

      <Courses />
      <Placements />
      <CampusLife preview />
      
      {/* Final CTA */}
      <section className="py-24 lg:py-40 bg-surface text-center">
        <div className="container-wide">
          <Reveal>
            <h2 className="font-display text-[4rem] sm:text-[5.5rem] lg:text-[7rem] leading-[0.9] font-extrabold text-ink tracking-tight">
              Ready to start <br/>
              <span className="text-gold italic">your career?</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 text-xl text-ink/70 font-display font-bold">
              Explore our programmes or talk to our admissions team.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center bg-ink px-10 py-5 text-[13px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-gold hover:text-ink">
                Enquire Now <ArrowRight className="ml-3 size-5" />
              </Link>
              <Link to="/courses" className="inline-flex items-center justify-center border border-ink/20 bg-white px-10 py-5 text-[13px] font-semibold tracking-wider text-ink uppercase transition-colors hover:bg-ink hover:text-white hover:border-ink">
                View Courses
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
