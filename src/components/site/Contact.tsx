import { useState, type FormEvent } from "react";
import { Send, Facebook, Instagram } from "lucide-react";
import { z } from "zod";
import { Reveal } from "./primitives";
import { cn } from "@/lib/utils";

const COURSES = [
  "Aviation & Hospitality",
  "Fire And Industrial Safety Engineering",
  "Hotel Management",
  "Effective Communication & Interview Preparations",
  "Diploma In Fashion Designing",
  "Diploma Interior Designing",
  "Diploma In Hospital Administration"
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  course: z.enum(COURSES as [string, ...string[]], { required_error: "Please select a programme" }),
  message: z.string().trim().max(1000).optional(),
});

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
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

    try {
      // Replace this URL with your deployed Google Apps Script Web App URL
      const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
      
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const json = await response.json();
      if (json.result === "success") {
        setState("sent");
        form.reset();
        setTimeout(() => setState("idle"), 5000); // Reset state after 5 seconds
      } else {
        throw new Error(json.error || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setState("error");
      setTimeout(() => setState("idle"), 5000); // Reset state after 5 seconds
    }
  };

  return (
    <section id="enquiry" className="py-24 lg:py-40 bg-surface">
      <div className="container-wide">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          
          {/* Left: Contact Info */}
          <Reveal className="space-y-16">
            <div>
              <h2 className="font-display text-[3.5rem] leading-[0.95] sm:text-[4.5rem] font-extrabold text-ink tracking-tight">
                Talk to us about <br/>
                <span className="text-gold italic pr-4">admissions.</span>
              </h2>
              <p className="mt-8 max-w-sm text-lg leading-relaxed text-ink/70">
                Visit us, call us, or send an enquiry. We prepare you for a real career.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a href="https://www.facebook.com/people/Udupi-academy-of-excellence-sirsi/61590587367659/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-10 place-items-center border border-ink/20 text-ink/60 hover:border-ink hover:text-ink transition-colors">
                  <Facebook className="size-4" />
                </a>
                <a href="https://www.instagram.com/udupiacademy/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center border border-ink/20 text-ink/60 hover:border-ink hover:text-ink transition-colors">
                  <Instagram className="size-4" />
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-12 border-t border-ink/10 pt-12">
              <div>
                <p className="text-[11px] font-bold tracking-widest text-ink/50 uppercase mb-4">Phone</p>
                <a href="tel:+916363913356" className="font-display text-3xl font-bold text-ink hover:text-gold transition-colors">
                  +91 63639 13356
                </a>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-ink/50 uppercase mb-4">Main Campus</p>
                <p className="font-display text-lg font-semibold text-ink leading-snug">
                  MISGAR UNIQUE ZONE<br/>
                  SHIVAJI CHOWK, RAYARPETE ROAD<br/>
                  SIRSI - 581401
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-ink/50 uppercase mb-4">Training Centres</p>
                <ul className="space-y-2 font-display text-lg font-semibold text-ink">
                  <li>Bangalore</li>
                  <li>Udupi</li>
                  <li>Sirsi</li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Right: Enquiry Form */}
          <Reveal delay={120}>
            <form onSubmit={submit} noValidate className="bg-white p-8 sm:p-12 border border-ink/10">
              <h3 className="font-display text-2xl font-bold text-ink mb-8">Send an enquiry</h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={cn("w-full border-b bg-transparent pb-3 text-lg outline-none transition-colors focus:border-gold", errors.name ? "border-destructive" : "border-ink/20")}
                  />
                  {errors.name && <p className="mt-2 text-xs text-destructive font-semibold">{errors.name}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={cn("w-full border-b bg-transparent pb-3 text-lg outline-none transition-colors focus:border-gold", errors.phone ? "border-destructive" : "border-ink/20")}
                    />
                    {errors.phone && <p className="mt-2 text-xs text-destructive font-semibold">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={cn("w-full border-b bg-transparent pb-3 text-lg outline-none transition-colors focus:border-gold", errors.email ? "border-destructive" : "border-ink/20")}
                    />
                    {errors.email && <p className="mt-2 text-xs text-destructive font-semibold">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="course" className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2">Course of Interest</label>
                  <select
                    id="course"
                    name="course"
                    defaultValue=""
                    className={cn("w-full border-b bg-transparent pb-3 text-lg outline-none transition-colors focus:border-gold cursor-pointer", errors.course ? "border-destructive" : "border-ink/20")}
                  >
                    <option value="" disabled>Select a programme...</option>
                    {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.course && <p className="mt-2 text-xs text-destructive font-semibold">{errors.course}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-bold tracking-widest text-ink/60 uppercase mb-2">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full resize-none border-b border-ink/20 bg-transparent pb-3 text-lg outline-none transition-colors focus:border-gold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={state !== "idle"}
                className={cn(
                  "mt-10 inline-flex w-full items-center justify-center gap-3 bg-ink px-8 py-5 text-[13px] font-semibold tracking-wider text-white uppercase transition-all duration-500",
                  state === "sent" ? "bg-gold text-ink" : 
                  state === "error" ? "bg-destructive text-white" : "hover:bg-gold hover:text-ink"
                )}
              >
                {state === "idle" && <>Submit Enquiry <Send className="size-4" /></>}
                {state === "sending" && "Sending…"}
                {state === "sent" && "Thank you. Your enquiry has been submitted successfully."}
                {state === "error" && "Something went wrong. Please try again."}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
