import { useMemo, useState } from "react";
import { Minus, Plus, Search } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What are the eligibility criteria for admission?",
    a: "Most diploma programmes require a 10th or PUC pass. Technology and healthcare tracks prefer PUC with any stream. Working professionals can join evening batches with relevant experience.",
  },
  {
    q: "Is placement guaranteed after the course?",
    a: "We provide unlimited placement assistance until you are placed — interview preparation, referrals and recruiter drives. Our 2025 batch recorded a 95% placement rate within six months.",
  },
  {
    q: "Can I pay the fees in instalments?",
    a: "Yes. Fees can be paid in up to four instalments, and we have 0% EMI education loan tie-ups with six nationalised banks.",
  },
  {
    q: "Do you provide hostel accommodation?",
    a: "We partner with verified hostels and PGs within two kilometres of campus for both men and women, with transport support during evening batches.",
  },
  {
    q: "Are the certificates government recognised?",
    a: "All programmes are certified under our NSDC Skill India partnership and are recognised by the Government of Karnataka, along with an ISO 9001:2015 quality certification.",
  },
  {
    q: "When do the next batches begin?",
    a: "We run three intakes a year — January, June and September. Seats are limited to 30 per batch to protect lab time per student.",
  },
];

export function Faq() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => (f.q + f.a).toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="container-wide grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Everything parents and students ask us."
          />
          <Reveal delay={120} className="relative mt-8">
            <Search className="absolute top-1/2 left-5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              aria-label="Search frequently asked questions"
              className="w-full rounded-full border border-border bg-background py-4 pr-5 pl-12 text-sm outline-none placeholder:text-muted-foreground focus:border-accent focus:ring-4 focus:ring-accent/15"
            />
          </Reveal>
        </div>

        <ul className="space-y-3">
          {filtered.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} delay={i * 60}>
                <div
                  className={cn(
                    "rounded-3xl border bg-card transition-colors duration-300",
                    isOpen ? "border-accent/40" : "border-border",
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-bold sm:text-lg">{f.q}</span>
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full transition-colors",
                        isOpen ? "bg-accent text-accent-foreground" : "bg-surface text-foreground",
                      )}
                    >
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
          {filtered.length === 0 && (
            <li className="rounded-3xl border border-border bg-card px-6 py-8 text-sm text-muted-foreground">
              No questions matched “{query}”. Call us on +91 98860 12345 and we'll answer
              directly.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
