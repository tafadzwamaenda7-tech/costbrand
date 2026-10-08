import { createFileRoute } from "@tanstack/react-router";
import { ProjectsSection } from "@/components/site-sections";
import { siteMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/projects")({
  head: () => siteMeta(
    "Projects",
    "Explore agricultural project and partnership conversations with Costbrand, a Zimbabwean company.",
  ),
  component: ProjectsPage,
});

function ProjectsPage() {
  return <main><ProjectsSection /></main>;
}
