import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/policy-page";
import { siteMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/privacy")({
  head: () =>
    siteMeta(
      "Privacy Policy",
      "How Costbrand Private Limited collects, uses and protects personal information.",
    ),
  component: () => <PolicyPage slug="privacy-policy" />,
});
