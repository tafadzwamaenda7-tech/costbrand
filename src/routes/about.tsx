import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/site-sections";
import { siteMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/about")({
  head: () =>
    siteMeta(
      "About Us",
      "Learn about Costbrand Enterprises (Private) Limited, a Zimbabwean agricultural enterprise and international supply-chain company.",
    ),
  component: () => <main><AboutSection /></main>,
});
