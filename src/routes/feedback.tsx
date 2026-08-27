import { createFileRoute } from "@tanstack/react-router";
import { FeedbackForm } from "@/components/site/FeedbackForm";
import { PublicReviews } from "@/components/site/PublicReviews";
import { Reveal, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/feedback")({
  component: FeedbackPage,
});

function FeedbackPage() {
  return (
    <div>
      {/* ── Public Reviews Section ────────────────────────────────────────── */}
      <section className="py-24 lg:py-40 bg-white" aria-labelledby="reviews-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Student Voices"
            title={
              <>
                What Our <span className="text-gold italic">Students Say</span>
              </>
            }
            intro="Real experiences from students who have trained and built careers with us."
          />
          <div className="mt-16">
            <PublicReviews />
          </div>
        </div>
      </section>

      {/* ── Feedback Submission Section ───────────────────────────────────── */}
      <section className="py-24 lg:py-40 bg-surface" aria-labelledby="feedback-heading">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
            {/* Left: info */}
            <Reveal className="space-y-10">
              <div>
                <h2
                  id="feedback-heading"
                  className="font-display text-[3.5rem] leading-[0.95] sm:text-[4.5rem] font-extrabold text-ink tracking-tight"
                >
                  Share Your
                  <br />
                  <span className="text-gold italic pr-4">Experience.</span>
                </h2>
                <p className="mt-8 max-w-sm text-lg leading-relaxed text-ink/70">
                  Your feedback helps future students make informed decisions and helps us
                  keep improving. We review all submissions before publishing.
                </p>
              </div>
              <div className="grid gap-6 border-t border-ink/10 pt-10">
                <InfoItem
                  number="01"
                  title="Honest Feedback"
                  body="Share your genuine experience — positive or constructive."
                />
                <InfoItem
                  number="02"
                  title="Reviewed Before Publishing"
                  body="Our team reviews every submission to ensure quality."
                />
                <InfoItem
                  number="03"
                  title="Your Privacy Matters"
                  body="Choose whether to display your name publicly or remain anonymous."
                />
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={120}>
              <FeedbackForm />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoItem({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="flex gap-5">
      <span className="font-display text-2xl font-extrabold text-gold/50 leading-none mt-1">
        {number}
      </span>
      <div>
        <p className="font-display font-bold text-ink text-base">{title}</p>
        <p className="mt-1 text-sm text-ink/60 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
