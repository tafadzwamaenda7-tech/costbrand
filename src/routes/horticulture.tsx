import { createFileRoute } from "@tanstack/react-router";
import { HorticulturePage } from "@/components/site-sections";
import { siteMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/horticulture")({
  head: () =>
    siteMeta(
      "Horticulture",
      "Growing quality horticultural products for Zimbabwean and international markets.",
    ),
  component: () => <main><HorticulturePage /></main>,
});
