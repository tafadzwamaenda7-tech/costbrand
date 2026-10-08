import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/policy-page";
import { siteMeta } from "@/lib/site-meta";
export const Route = createFileRoute("/terms-and-conditions")({
  head: () =>
    siteMeta(
      "Terms and Conditions",
      "Terms for the supply, orders, payment and delivery of Costbrand Private Limited fresh produce.",
    ),
  component: () => <PolicyPage slug="terms-and-conditions" />,
});
