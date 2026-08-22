import { useState } from "react";
import { Expand, X } from "lucide-react";
import { Reveal } from "./primitives";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

// Gallery images — all real academy photographs
import studentAviation from "@/assets/Student-aviation.jpg";
import studentsStaff from "@/assets/Students&staff.jpg";
import fireSafetyGroup from "@/assets/Students-Firesafety-GroupPhoto.jpg";
import academyBuilding from "@/assets/academy-building.jpg";
import academyEvent from "@/assets/academy-event-ceremony.jpg";
import academyStudentGroup from "@/assets/academy-student-group.jpg";
import academyStudentsStaff from "@/assets/academy-students-staff.jpg";
import academyTraining from "@/assets/academy-training-session.jpg";
import academyOpening from "@/assets/Academy-Opening.jpg";
import staffTeaching from "@/assets/StaffTeaching.jpg";
import aviationNew from "@/assets/Aviation.jpeg";
import fireSafetyNew from "@/assets/FireSafety.jpeg";
import hotelMgmtNew from "@/assets/HotelManagement.jpeg";
import fashionNew from "@/assets/Fashion Design.jpeg";

const ALL_GALLERY_ITEMS = [
  { img: aviationNew,          label: "Aviation & hospitality training" },
  { img: fireSafetyNew,        label: "Fire & industrial safety engineering" },
  { img: hotelMgmtNew,         label: "Hotel management training" },
  { img: fashionNew,           label: "Fashion designing programme" },
  { img: studentAviation,      label: "Aviation students" },
  { img: academyStudentsStaff, label: "Students & staff" },
  { img: fireSafetyGroup,      label: "Fire safety group training" },
  { img: academyBuilding,      label: "Academy building" },
  { img: academyEvent,         label: "Academy ceremony & events" },
  { img: academyStudentGroup,  label: "Student group" },
  { img: studentsStaff,        label: "Students & staff at the academy" },
  { img: academyTraining,      label: "Training session" },
  { img: staffTeaching,        label: "Faculty & teaching staff" },
  { img: academyOpening,       label: "Academy opening" },
];

// First 6 shown in the homepage preview
const PREVIEW_ITEMS = ALL_GALLERY_ITEMS.slice(0, 6);

export function CampusLife({ preview = false }: { preview?: boolean }) {
  const [active, setActive] = useState<number | null>(null);

  const displayItems = preview ? PREVIEW_ITEMS : ALL_GALLERY_ITEMS;
  const activeItem = active === null ? null : displayItems[active];

  return (
    <section
      id={preview ? "campus-preview" : "campus"}
      className="py-24 lg:py-32 bg-surface overflow-hidden"
    >
      <div className="container-wide">

        {/* Left-Aligned Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal>
            <h2 className="font-display text-[3.5rem] leading-[0.95] sm:text-[4.5rem] lg:text-[5.5rem] font-extrabold text-ink tracking-tight">
              Life at the <br/>
              <span className="text-gold italic pr-4">Academy.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-ink/70 max-w-xl">
              From culinary training and fire safety drills to airport visits and fashion activities, our students learn by doing.
            </p>
          </Reveal>
        </div>

        {/* Uniform 3-Column Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayItems.map((item, i) => (
              <Reveal key={item.label} delay={i * 80}>
                <button
                  onClick={() => setActive(i)}
                  className="group relative block w-full overflow-hidden bg-ink aspect-[4/3]"
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-6">
                    <span className="font-display text-lg font-bold text-white flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Expand className="size-4 text-gold shrink-0" />
                      <span className="text-left leading-tight">{item.label}</span>
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {/* View Gallery CTA — homepage preview only */}
          {preview && (
            <Reveal delay={100}>
              <div className="mt-12 flex justify-start">
                <Link
                  to="/gallery"
                  className="inline-flex items-center justify-center bg-[#F5B82E] px-8 py-4 text-[13px] font-bold text-ink uppercase tracking-widest transition-all hover:bg-gold/90 hover:shadow-lg group"
                >
                  VIEW GALLERY <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div
          role="dialog"
          aria-label={activeItem.label}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 p-4 md:p-12 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close image"
            className="absolute top-6 right-6 md:top-10 md:right-10 grid size-14 place-items-center bg-white/5 border border-white/10 text-white hover:bg-gold hover:text-ink transition-colors"
            onClick={() => setActive(null)}
          >
            <X className="size-6" />
          </button>
          <div className="max-w-5xl w-full">
            <img
              src={activeItem.img}
              alt={activeItem.label}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <p className="mt-6 text-center font-display text-2xl text-white font-bold">
              {activeItem.label}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
