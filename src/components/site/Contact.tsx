import { useState, type FormEvent } from "react";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Youtube } from "lucide-react";
import { z } from "zod";
import { Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  course: z.string().trim().min(2, "Tell us the programme you want").max(120),
  message: z.string().trim().max(1000).optional(),
});

const FIELDS = [
  { name: "name", label: "Full name", type: "text" },
  { name: "email", label: "Email address", type: "email" },
  { name: "phone", label: "Phone number", type: "tel" },
  { name: "course", label: "Programme of interest", type: "text" },
] as const;

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        next[String(i.path[0])] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setState("sending");
    setTimeout(() => setState("sent"), 1100);
  };

  return (
    <section id="enquiry" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mesh-bg absolute inset-0 -z-10 opacity-70" />
      <div className="container-wide">
        <SectionHeading
          eyebrow="Get in touch"
          title="Talk to an admissions counsellor today."
          intro="Visit the campus, call us, or send an enquiry — we respond within one working day."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal className="space-y-4">
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-card">
              <iframe
                title="Udupi Academy location map"
                src="https://www.google.com/maps?q=Udupi,Karnataka&output=embed"
                loading="lazy"
                className="h-[300px] w-full border-0 grayscale-[35%] transition-all duration-700 hover:grayscale-0"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: MapPin, title: "Campus", lines: ["Court Road, Udupi", "Karnataka 576101"] },
                { icon: Phone, title: "Call us", lines: ["+91 98860 12345", "+91 820 252 0000"] },
                { icon: Mail, title: "Email", lines: ["admissions@udupiacademy.in"] },
                { icon: Clock, title: "Office hours", lines: ["Mon–Sat · 9:00 – 18:00", "Sunday by appointment"] },
              ].map((c) => (
                <div key={c.title} className="rounded-3xl border border-border bg-card p-6">
                  <span className="grid size-10 place-items-center rounded-2xl bg-surface text-accent">
                    <c.icon className="size-4" />
                  </span>
                  <p className="mt-4 font-semibold">{c.title}</p>
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm break-words text-muted-foreground">
                      {l}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#enquiry"
                  aria-label={`Udupi Academy on ${Icon.displayName ?? "social media"}`}
                  className="grid size-12 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-surface"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={submit} noValidate className="glass rounded-[2rem] p-8 shadow-lift lg:p-10">
              <h3 className="text-2xl font-extrabold">Enquire about a programme</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill this in and a counsellor will call you back.
              </p>

              <div className="mt-8 space-y-5">
                {FIELDS.map((f) => (
                  <div key={f.name} className="relative">
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      placeholder=" "
                      maxLength={255}
                      className={cn(
                        "peer w-full rounded-2xl border bg-background px-4 pt-6 pb-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/15",
                        errors[f.name] ? "border-destructive" : "border-border",
                      )}
                    />
                    <label
                      htmlFor={f.name}
                      className="pointer-events-none absolute top-2 left-4 text-[11px] font-medium tracking-wide text-muted-foreground transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px]"
                    >
                      {f.label}
                    </label>
                    {errors[f.name] && (
                      <p className="mt-1.5 px-1 text-xs text-destructive">{errors[f.name]}</p>
                    )}
                  </div>
                ))}

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    maxLength={1000}
                    placeholder=" "
                    className="peer w-full resize-none rounded-2xl border border-border bg-background px-4 pt-6 pb-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/15"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute top-2 left-4 text-[11px] font-medium tracking-wide text-muted-foreground transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px]"
                  >
                    Message (optional)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={state !== "idle"}
                className={cn(
                  "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-all duration-500",
                  state === "sent"
                    ? "bg-gold text-gold-foreground"
                    : "bg-primary text-primary-foreground shadow-card hover:shadow-lift",
                )}
              >
                {state === "idle" && (
                  <>
                    Submit enquiry <Send className="size-4" />
                  </>
                )}
                {state === "sending" && "Sending…"}
                {state === "sent" && "Thank you — we'll call you shortly"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
