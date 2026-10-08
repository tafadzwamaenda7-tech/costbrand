import { createFileRoute } from "@tanstack/react-router";
import { SourcingSection } from "@/components/site-sections";
import { siteMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/international-sourcing")({
  head: () =>
    siteMeta(
      "International Sourcing",
      "International sourcing support connecting requirements with verified suppliers.",
    ),
  component: () => <main><SourcingSection /></main>,
});
