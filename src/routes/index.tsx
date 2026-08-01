import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { TrustMarquee } from "@/components/site/TrustMarquee";
import { About } from "@/components/site/About";
import { WhyBento } from "@/components/site/WhyBento";
import { Courses } from "@/components/site/Courses";
import { Placements } from "@/components/site/Placements";
import { Journey } from "@/components/site/Journey";
import { Faculty } from "@/components/site/Faculty";
import { CampusLife } from "@/components/site/CampusLife";
import { Testimonials } from "@/components/site/Testimonials";
import { Admissions } from "@/components/site/Admissions";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingUI } from "@/components/site/FloatingUI";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <TrustMarquee />
        <About />
        <WhyBento />
        <Courses />
        <Placements />
        <Journey />
        <Faculty />
        <CampusLife />
        <Testimonials />
        <Admissions />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingUI />
    </div>
  );
}
