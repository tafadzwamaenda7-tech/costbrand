import { createFileRoute } from "@tanstack/react-router";
import { MachinerySection } from "@/components/site-sections";
import { siteMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/machinery")({
  head: () => siteMeta(
    "Machinery",
    "Discuss agricultural machinery and equipment enquiries with Costbrand, including farm equipment, irrigation, pumps and processing.",
  ),
  component: MachineryPage,
});

function MachineryPage() {
  return <main><MachinerySection /></main>;
}
