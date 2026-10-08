import { createFileRoute } from "@tanstack/react-router";
import { siteMeta } from "@/lib/site-meta";
import { SourcingSection } from "@/components/site-sections";

export const Route = createFileRoute("/production-and-global-sourcing")({
  head: () =>
    siteMeta(
      "International Sourcing",
      "A considered sourcing process that connects requirements with supplier conversations and the next steps toward Zimbabwe.",
    ),
  component: SourcingPage,
});

function SourcingPage() {
  return (
    <main>
      <SourcingSection />
    </main>
  );
}
