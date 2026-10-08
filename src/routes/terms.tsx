import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/policy-page";
import { siteMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/terms")({
  head: () =>
    siteMeta(
      "Terms of Use",
      "Terms for using the Costbrand Private Limited website.",
    ),
  component: () => <PolicyPage slug="terms-and-conditions" />,
});
