import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MENU = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Placements", href: "/placements" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/feedback" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b bg-white/95 backdrop-blur-md",
        scrolled
          ? "border-border py-3 shadow-sm"
          : "border-transparent py-3 lg:py-5"
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src="/UA_Logo.png" alt="Udupi Academy" className="h-10 w-auto shrink-0" />
            <span className="hidden lg:block font-display font-bold text-ink tracking-tight text-lg leading-none">
              Udupi Academy<br/><span className="text-gold">of Excellence</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {MENU.map((m) => (
              <li key={m.label}>
                <Link
                  to={m.href}
                  className="text-[13px] font-semibold uppercase tracking-wider text-ink/70 transition-colors hover:text-gold [&.active]:text-gold"
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-4">
            <Link
              to="/contact"
              className="hidden items-center justify-center bg-ink px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-gold hover:text-ink sm:flex"
            >
              Enquire Now
            </Link>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="grid size-11 place-items-center border border-border bg-white text-ink lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-x-0 top-[100%] bg-white border-b border-border transition-all duration-300 overflow-hidden lg:hidden",
            open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-transparent"
          )}
        >
          <div className="px-5 py-6">
            <ul className="space-y-4">
              {MENU.map((m) => (
                <li key={m.label}>
                  <Link
                    to={m.href}
                    onClick={() => setOpen(false)}
                    className="block text-2xl font-display font-bold text-ink hover:text-gold transition-colors [&.active]:text-gold"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center bg-ink py-4 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-ink"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
