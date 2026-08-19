import { createFileRoute } from "@tanstack/react-router";
import { About as AboutComponent } from "@/components/site/About";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div>
      <AboutComponent />
    </div>
  );
}
