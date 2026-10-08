import { createFileRoute } from "@tanstack/react-router";
import { siteMeta } from "@/lib/site-meta";
import { HorticulturePage } from "@/components/site-sections";

export const Route = createFileRoute("/our-products")({
  head: () =>
    siteMeta(
      "Horticulture",
      "Explore Costbrand's horticulture and fresh produce work, from growing and sourcing to market enquiries.",
    ),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <main>
      <HorticulturePage />
    </main>
  );
}
