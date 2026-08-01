import { useState } from "react";
import { Expand, X } from "lucide-react";
import library from "@/assets/gallery-library.jpg";
import events from "@/assets/gallery-events.jpg";
import visit from "@/assets/gallery-visit.jpg";
import classroom from "@/assets/gallery-class.jpg";
import lab from "@/assets/hero-1.jpg";
import workshop from "@/assets/hero-3.jpg";
import { Reveal, SectionHeading } from "./primitives";

const ITEMS = [
  { img: lab, label: "Computer labs", w: 900, h: 1200 },
  { img: events, label: "Campus events", w: 900, h: 600 },
  { img: library, label: "Library", w: 800, h: 900 },
  { img: workshop, label: "Workshops", w: 900, h: 700 },
  { img: visit, label: "Industrial visits", w: 800, h: 1000 },
  { img: classroom, label: "Classrooms", w: 900, h: 700 },
];

export function CampusLife() {
  const [active, setActive] = useState<number | null>(null);
  const activeItem = active === null ? null : ITEMS[active];

  return (

    <section id="campus" className="py-24 lg:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Campus life"
          title="A campus that keeps you learning after class hours."
          intro="Labs, library, sports, cultural nights and industry visits — student life at Udupi Academy is designed to build confidence, not just credentials."
        />

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {ITEMS.map((it, i) => (
            <Reveal key={it.label} delay={(i % 3) * 90} className="break-inside-avoid">
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-[1.75rem]"
              >
                <img
                  src={it.img}
                  alt={`${it.label} at Udupi Academy`}
                  width={it.w}
                  height={it.h}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-5 left-5 flex items-center gap-2 text-sm font-semibold text-primary-foreground opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <Expand className="size-4" /> {it.label}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeItem && (
        <div
          role="dialog"
          aria-label={activeItem.label}
          className="fixed inset-0 z-[80] grid place-items-center bg-ink/85 p-6 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close image"
            className="absolute top-6 right-6 grid size-12 place-items-center rounded-full bg-white/10 text-primary-foreground hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            <X className="size-5" />
          </button>
          <img
            src={activeItem.img}
            alt={activeItem.label}
            className="max-h-[82vh] w-auto rounded-[1.75rem] object-contain shadow-lift"
          />
        </div>
      )}

    </section>
  );
}
