import { ArrowRight } from "lucide-react";
import aviationImg from "@/assets/Aviation & Hospitality.jpg";
import fireSafetyImg from "@/assets/Fire And Industrial Safety Management.png";
import hotelMgmtImg from "@/assets/Hotel Management.jpeg";
import communicationImg from "@/assets/Effective Communication & Interview Preparations.jpg";
import fashionImg from "@/assets/Diploma In Fashion Designing.webp";
import interiorImg from "@/assets/Diploma Interior Designing.webp";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./primitives";

const COURSES = [
  {
    num: "01",
    title: "Aviation & Hospitality",
    duration: "8–10 Month",
    img: aviationImg,
  },
  {
    num: "02",
    title: "Fire And Industrial Safety Management",
    duration: "8–10 Month",
    img: fireSafetyImg,
  },
  {
    num: "03",
    title: "Hotel Management",
    duration: "8–10 Month",
    img: hotelMgmtImg,
  },
  {
    num: "04",
    title: "Effective Communication & Interview Preparations",
    duration: "3–5 Month",
    img: communicationImg,
  },
  {
    num: "05",
    title: "Diploma In Fashion Designing",
    duration: "8–10 Month",
    img: fashionImg,
  },
  {
    num: "06",
    title: "Diploma Interior Designing",
    duration: "8–10 Month",
    img: interiorImg,
  },
];

export function Courses() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-wide">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
              Six job-ready programmes.
            </h2>
          </div>
        </Reveal>

        <div className="border-t border-ink/20">
          {COURSES.map((c) => (
            <Reveal key={c.num} delay={0} className="group border-b border-ink/20">
              <Link to="/courses" className="flex flex-col lg:flex-row lg:items-center justify-between py-10 lg:py-12 px-2 hover:bg-surface transition-colors duration-500 relative overflow-hidden">
                <div className="flex items-start lg:items-center gap-6 lg:gap-12 relative z-10">
                  <span className="font-display text-2xl lg:text-3xl font-extrabold text-ink/30 group-hover:text-gold transition-colors">
                    {c.num}
                  </span>
                  <h3 className="font-display text-2xl lg:text-4xl font-extrabold text-ink tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                    {c.title}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between lg:justify-end gap-12 mt-6 lg:mt-0 relative z-10 pl-14 lg:pl-0">
                  <span className="text-sm font-semibold tracking-widest text-ink/60 uppercase">
                    {c.duration}
                  </span>
                  <div className="size-12 rounded-full border border-ink/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-ink transition-all duration-300">
                    <ArrowRight className="size-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                </div>

                {/* Subtle Image Hover Reveal (Desktop Only) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] aspect-video opacity-0 pointer-events-none group-hover:opacity-10 scale-95 group-hover:scale-100 transition-all duration-700 hidden lg:block z-0">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover grayscale" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-16 flex justify-center">
            <Link to="/courses" className="inline-flex items-center justify-center bg-ink px-8 py-4 text-[13px] font-semibold text-white uppercase tracking-wider transition-all hover:bg-gold hover:text-ink">
              View All Courses <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
