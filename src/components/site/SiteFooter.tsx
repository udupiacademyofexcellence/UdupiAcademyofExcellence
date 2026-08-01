import { ArrowUp, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const COLUMNS = [
  {
    title: "Programs",
    links: ["Full Stack Development", "Allied Healthcare", "Mechatronics & CNC", "Accounting & Taxation", "Hospitality Management"],
  },
  { title: "Admissions", links: ["Apply online", "Eligibility", "Fees & instalments", "Scholarships", "Education loans"] },
  { title: "Campus", links: ["Labs & facilities", "Library", "Hostel support", "Events", "Virtual campus tour"] },
  { title: "Resources", links: ["Placement report", "Download brochure", "Blog & news", "Student login", "Contact us"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink pt-20 pb-10 text-primary-foreground">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div>
            <div className="flex items-center">
              <img src="/UA_Logo.png" alt="Udupi Academy" className="h-12 w-auto" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
              Vocational and professional training in coastal Karnataka since 2010.
              Industry-led programmes, practical labs and lifelong placement support.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex max-w-sm gap-2"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                required
                maxLength={255}
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm outline-none placeholder:text-primary-foreground/40 focus:border-gold"
              />
              <button className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground">
                Subscribe
              </button>
            </form>

            <div className="mt-6 flex gap-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="Udupi Academy social profile"
                  className="grid size-11 place-items-center rounded-full bg-white/8 transition-colors hover:bg-white/18"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#enquiry"
                        className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
          {["NSDC Skill India", "ISO 9001:2015", "Govt. of Karnataka", "Skill Connect Partner"].map(
            (c) => (
              <span
                key={c}
                className="rounded-full border border-white/12 px-3.5 py-1.5 text-[11px] font-medium text-primary-foreground/55"
              >
                {c}
              </span>
            ),
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-primary-foreground/45">
          <p>© {new Date().getFullYear()} Udupi Academy. All rights reserved.</p>
          <div className="flex items-center gap-6 sm:mr-24">
            <a href="#top" className="hover:text-primary-foreground">Privacy policy</a>
            <a href="#top" className="hover:text-primary-foreground">Terms</a>
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 transition-colors hover:bg-white/18"
            >
              Back to top <ArrowUp className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
