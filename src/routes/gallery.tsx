import { createFileRoute } from "@tanstack/react-router";
import { CampusLife as GalleryComponent } from "@/components/site/CampusLife";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
});

function Gallery() {
  return (
    <div>
      <GalleryComponent />
    </div>
  );
}
