import { createFileRoute } from "@tanstack/react-router";
import { siteMeta } from "@/lib/site-meta";
import { AboutSection } from "@/components/site-sections";

export const Route = createFileRoute("/about-us")({
  head: () =>
    siteMeta(
      "About Us",
      "Learn about Costbrand Private Limited, a Zimbabwean company building resilient global produce partnerships.",
    ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <AboutSection />
    </main>
  );
}
