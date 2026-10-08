import { createFileRoute } from "@tanstack/react-router";
import { AgricultureSection } from "@/components/site-sections";
import { siteMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/agriculture")({
  head: () => siteMeta(
    "Agriculture",
    "Explore Costbrand's agricultural work across production, crop and grain growing, commercial farming, irrigation and farm development.",
  ),
  component: AgriculturePage,
});

function AgriculturePage() {
  return <main><AgricultureSection /></main>;
}
