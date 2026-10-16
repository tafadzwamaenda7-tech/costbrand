import { createFileRoute } from "@tanstack/react-router";
import { siteMeta } from "@/lib/site-meta";
import { MarketsSection, FutureBanner } from "@/components/site-sections";

export const Route = createFileRoute("/global-market-reach")({
  head: () =>
    siteMeta(
      "Markets",
      "Costbrand connects Zimbabwean agricultural production with regional and international markets.",
    ),
  component: MarketsPage,
});

function MarketsPage() {
  return (
    <main>
      <MarketsSection />
      <FutureBanner />
    </main>
  );
}
