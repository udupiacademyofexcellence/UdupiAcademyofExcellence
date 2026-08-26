import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/Student-aviation.jpg";
import { Reveal } from "./primitives";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-surface pt-32 pb-20">
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="relative z-20">
            <Reveal>
              <p className="text-[10px] font-bold tracking-[0.15em] text-ink/60 uppercase mb-6 leading-snug">
                Job Training Centres in Bangalore, Udupi &amp; Sirsi
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display text-[2.75rem] leading-[0.95] font-extrabold text-ink sm:text-[5.5rem] lg:text-[7rem] tracking-tight">
                Udupi{" "}
                Academy{" "}
                <span className="text-gold italic">of Excellence.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 w-full max-w-md text-base sm:text-lg leading-relaxed text-ink/70 pr-4 sm:pr-0">
                Job-ready training in Aviation, Hospitality, Hotel Management, Fire Safety, Fashion Designing, Interior Designing and Effective Communication.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="inline-flex items-center justify-center bg-ink px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-gold hover:text-ink">
                  Enquire Now <ArrowRight className="ml-2 size-4" />
                </Link>
                <Link to="/courses" className="inline-flex items-center justify-center border border-ink/20 px-8 py-4 text-sm font-semibold text-ink transition-all hover:border-ink hover:bg-ink hover:text-white">
                  Explore Courses
                </Link>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6 border-t border-ink/10 pt-8">
                <div>
                  <p className="font-display text-3xl sm:text-4xl font-extrabold text-ink">50+</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/60 mt-1">Students Placed</p>
                </div>
                <div>
                  <p className="font-display text-3xl sm:text-4xl font-extrabold text-ink">100%</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/60 mt-1">Placement Guarantee</p>
                </div>
                <div>
                  <p className="font-display text-lg sm:text-xl font-extrabold text-gold leading-none italic">Pay After<br/>Placement</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Image Column - Editorial overlap */}
          <div className="relative mt-12 lg:mt-0 hidden md:block">
            <Reveal delay={400}>
              <div className="relative aspect-[3/4] w-full max-w-md ml-auto">
                {/* Gold offset block */}
                <div className="absolute -inset-4 bg-gold/10 -z-10 translate-x-6 translate-y-6"></div>
                {/* Image */}
                <img
                  src={heroImg}
                  alt="Udupi Academy student in aviation training"
                  className="size-full object-cover grayscale-[20%] contrast-125"
                />
                {/* Editorial corner accent */}
                <div className="absolute -top-4 -left-4 size-16 border-t-2 border-l-2 border-gold"></div>
                <div className="absolute -bottom-4 -right-4 size-16 border-b-2 border-r-2 border-gold"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
