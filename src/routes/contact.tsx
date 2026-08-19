import { createFileRoute } from "@tanstack/react-router";
import { Contact as ContactComponent } from "@/components/site/Contact";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  return (
    <div>
      <ContactComponent />
    </div>
  );
}
