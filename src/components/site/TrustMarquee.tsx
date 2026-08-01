import { Award, Building2, Landmark, ShieldCheck } from "lucide-react";
import { Reveal } from "./primitives";

const LOGOS = [
  "Infosys BPM",
  "Manipal Hospitals",
  "TCS",
  "Wipro",
  "HDFC Bank",
  "Taj Hotels",
  "Reliance Retail",
  "Bosch",
  "Syngene",
  "Deloitte",
];

const BADGES = [
  { icon: Landmark, label: "Govt. of Karnataka recognised" },
  { icon: ShieldCheck, label: "NSDC Skill India partner" },
  { icon: Award, label: "ISO 9001:2015 certified" },
  { icon: Building2, label: "NAAC-aligned quality framework" },
];

export function TrustMarquee() {
  return (
    <section aria-label="Recruiters and accreditations" className="border-y border-border bg-surface py-14">
      <div className="container-wide">
        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            Trusted by recruiters, regulators & industry
          </p>
          <div className="flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground"
              >
                <b.icon className="size-3.5 text-gold" />
                {b.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {LOGOS.map((logo) => (
                <li
                  key={logo}
                  className="px-8 font-display text-2xl font-bold whitespace-nowrap text-foreground/25 transition-colors duration-300 hover:text-foreground/70 sm:text-3xl"
                >
                  {logo}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
