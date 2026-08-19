import { ArrowUp } from "lucide-react";
import { Link } from "@tanstack/react-router";

const COLUMNS = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Courses", href: "/courses" },
      { name: "Placements", href: "/placements" },
      { name: "Gallery", href: "/gallery" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { name: "Aviation & Hospitality", href: "/courses" },
      { name: "Fire And Industrial Safety", href: "/courses" },
      { name: "Hotel Management", href: "/courses" },
      { name: "Effective Communication", href: "/courses" },
      { name: "Fashion Designing", href: "/courses" },
      { name: "Interior Designing", href: "/courses" },
      { name: "Hospital Administration", href: "/courses" },
    ],
  },
  {
    title: "Centres",
    links: [
      { name: "Bangalore", href: "/contact" },
      { name: "Udupi", href: "/contact" },
      { name: "Sirsi", href: "/contact" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "+91 63639 13356", href: "tel:+916363913356" },
      { name: "MISGAR UNIQUE ZONE SHIVAJI CHOWK, RAYARPETE ROAD, SIRSI - 581401", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink pt-20 pb-10 text-primary-foreground">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div>
            <div className="flex items-center">
              <Link to="/">
                <img src="/UA_Logo.png" alt="Udupi Academy" className="h-12 w-auto" />
              </Link>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
              100% Placement Guarantee. Pay after placement. Job training centres in Bangalore, Udupi, and Sirsi.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.name}>
                      {l.href.startsWith("tel:") ? (
                        <a
                          href={l.href}
                          className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                        >
                          {l.name}
                        </a>
                      ) : (
                        <Link
                          to={l.href}
                          className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                        >
                          {l.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 text-xs text-primary-foreground/45">
          <p>© {new Date().getFullYear()} Udupi Academy. All rights reserved.</p>
          <div className="flex items-center gap-6 sm:mr-24">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 transition-colors hover:bg-white/18"
            >
              Back to top <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
