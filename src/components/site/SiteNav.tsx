import { useEffect, useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./primitives";

const MENU: {
  label: string;
  href: string;
  mega?: { title: string; items: { name: string; desc: string; href: string }[] }[];
}[] = [
  {
    label: "Programs",
    href: "#courses",
    mega: [
      {
        title: "Technology",
        items: [
          { name: "Full Stack Development", desc: "12 months · Placement track", href: "#courses" },
          { name: "Data & AI Analytics", desc: "9 months · Industry projects", href: "#courses" },
          { name: "Hardware & Networking", desc: "6 months · Lab intensive", href: "#courses" },
        ],
      },
      {
        title: "Healthcare & Business",
        items: [
          { name: "Allied Healthcare", desc: "12 months · Hospital internship", href: "#courses" },
          { name: "Accounting & Taxation", desc: "6 months · Tally + GST", href: "#courses" },
          { name: "Hospitality Management", desc: "10 months · Hotel training", href: "#courses" },
        ],
      },
      {
        title: "Career Support",
        items: [
          { name: "Placement Cell", desc: "100+ hiring partners", href: "#placements" },
          { name: "Scholarships", desc: "Merit, need & sports", href: "#scholarships" },
          { name: "Download Brochure", desc: "2026 prospectus PDF", href: "#enquiry" },
        ],
      },
    ],
  },
  { label: "Admissions", href: "#admissions" },
  { label: "Placements", href: "#placements" },
  { label: "Campus", href: "#campus" },
  { label: "About", href: "#about" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
      onMouseLeave={() => setMega(null)}
    >
      <div className="container-wide">
        <nav
          className={cn(
            "flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "glass shadow-card"
              : "border border-transparent bg-transparent",
          )}
        >
          <a href="#top" className="flex min-w-0 items-center gap-2">
            <img src="/UA_Logo.png" alt="Udupi Academy" className="h-10 w-auto shrink-0" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {MENU.map((m) => (
              <li key={m.label} onMouseEnter={() => setMega(m.mega ? m.label : null)}>
                <a
                  href={m.href}
                  className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
                >
                  {m.label}
                  {m.mega && <ChevronDown className="size-3.5 opacity-60" />}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              aria-label="Search the site"
              className="hidden size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface hover:text-foreground sm:grid"
            >
              <Search className="size-4" />
            </button>
            <a
              href="#enquiry"
              className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface xl:inline-flex"
            >
              <UserRound className="size-4" /> Student Login
            </a>
            <MagneticButton href="#enquiry" variant="gold" className="px-5 py-2.5 text-[13px]">
              Apply Now
            </MagneticButton>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="grid size-11 place-items-center rounded-full border border-border lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mega menu */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-full hidden px-8 lg:block",
            mega && "pointer-events-auto",
          )}
        >
          <div className="container-wide">
            {MENU.filter((m) => m.mega).map((m) => (
              <div
                key={m.label}
                className={cn(
                  "glass mt-2 grid grid-cols-3 gap-8 rounded-3xl p-8 shadow-lift transition-all duration-300",
                  mega === m.label
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-3 opacity-0",
                )}
              >
                {m.mega!.map((col) => (
                  <div key={col.title}>
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                      {col.title}
                    </p>
                    <ul className="mt-4 space-y-1">
                      {col.items.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            onClick={() => setMega(null)}
                            className="block rounded-2xl px-3 py-2.5 transition-colors hover:bg-surface"
                          >
                            <span className="block text-sm font-semibold">{item.name}</span>
                            <span className="block text-xs text-muted-foreground">
                              {item.desc}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="glass mt-2 rounded-3xl p-4 shadow-lift lg:hidden">
            <ul className="space-y-1">
              {MENU.map((m) => (
                <li key={m.label}>
                  <a
                    href={m.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium hover:bg-surface"
                  >
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <a
                href="#enquiry"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
              >
                Student Login
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
